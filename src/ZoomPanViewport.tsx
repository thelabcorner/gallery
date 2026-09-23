import {
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react'
import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type WheelEvent as ReactWheelEvent,
} from 'react'

type Camera = {
  x: number
  y: number
  scale: number
}

type Velocity = {
  x: number
  y: number
}

type PointerPoint = {
  x: number
  y: number
}

type PinchGesture = {
  distance: number
  centerX: number
  centerY: number
  scale: number
  cameraX: number
  cameraY: number
}

type GestureMode = 'idle' | 'pan' | 'pinch'

type ZoomPanViewportProps = {
  children: ReactNode
  className?: string
  minScale?: number
  maxScale?: number
  resetKey?: string
  ariaLabel?: string
  showHint?: boolean
}

const EPSILON_POSITION = 0.01
const EPSILON_SCALE = 0.0001

export function ZoomPanViewport({
  children,
  className = '',
  minScale = 0.55,
  maxScale = 18,
  resetKey,
  ariaLabel = 'Interactive artwork viewport',
  showHint = true,
}: ZoomPanViewportProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const zoomReadoutRef = useRef<HTMLSpanElement>(null)
  const frameRef = useRef<number | null>(null)
  const lastFrameRef = useRef(0)
  const baseSizeRef = useRef({ width: 1, height: 1 })
  const currentRef = useRef<Camera>({ x: 0, y: 0, scale: 1 })
  const targetRef = useRef<Camera>({ x: 0, y: 0, scale: 1 })
  const velocityRef = useRef<Velocity>({ x: 0, y: 0 })
  const draggingRef = useRef(false)
  const pointerRef = useRef({ id: -1, x: 0, y: 0, time: 0 })
  const activePointersRef = useRef(new Map<number, PointerPoint>())
  const gestureModeRef = useRef<GestureMode>('idle')
  const pinchRef = useRef<PinchGesture>({
    distance: 1,
    centerX: 0,
    centerY: 0,
    scale: 1,
    cameraX: 0,
    cameraY: 0,
  })

  const clampScale = useCallback(
    (scale: number) => Math.min(maxScale, Math.max(minScale, scale)),
    [maxScale, minScale],
  )

  const captureBaseSize = useCallback(() => {
    const camera = cameraRef.current
    if (!camera) return

    const previousWidth = camera.style.width
    const previousHeight = camera.style.height
    camera.style.width = ''
    camera.style.height = ''

    const rect = camera.getBoundingClientRect()
    baseSizeRef.current = {
      width: Math.max(1, rect.width),
      height: Math.max(1, rect.height),
    }

    camera.style.width = previousWidth
    camera.style.height = previousHeight
  }, [])

  const applyCamera = useCallback((camera: Camera) => {
    const node = cameraRef.current
    if (!node) return

    const base = baseSizeRef.current
    node.style.width = (base.width * camera.scale).toFixed(2) + 'px'
    node.style.height = (base.height * camera.scale).toFixed(2) + 'px'
    node.style.transform =
      'translate3d(calc(-50% + ' + camera.x.toFixed(2) + 'px), calc(-50% + ' + camera.y.toFixed(2) + 'px), 0)'

    if (zoomReadoutRef.current) {
      zoomReadoutRef.current.textContent = Math.round(camera.scale * 100) + '%'
    }
  }, [])

  const animate = useCallback(function tick(now: number) {
    const dt = Math.min(34, Math.max(1, now - lastFrameRef.current))
    lastFrameRef.current = now

    const current = currentRef.current
    const target = targetRef.current
    const velocity = velocityRef.current

    if (!draggingRef.current && (Math.abs(velocity.x) > .01 || Math.abs(velocity.y) > .01)) {
      const frameRatio = dt / 16.667
      target.x += velocity.x * frameRatio
      target.y += velocity.y * frameRatio

      const friction = Math.pow(.885, frameRatio)
      velocity.x *= friction
      velocity.y *= friction
    }

    const moveBlend = 1 - Math.exp(-dt / 48)
    const zoomBlend = 1 - Math.exp(-dt / 58)

    current.x += (target.x - current.x) * moveBlend
    current.y += (target.y - current.y) * moveBlend
    current.scale += (target.scale - current.scale) * zoomBlend

    applyCamera(current)

    const cameraMoving =
      Math.abs(target.x - current.x) > EPSILON_POSITION ||
      Math.abs(target.y - current.y) > EPSILON_POSITION ||
      Math.abs(target.scale - current.scale) > EPSILON_SCALE
    const hasVelocity = Math.abs(velocity.x) > .01 || Math.abs(velocity.y) > .01

    if (cameraMoving || hasVelocity || draggingRef.current) {
      frameRef.current = requestAnimationFrame(tick)
    } else {
      frameRef.current = null
    }
  }, [applyCamera])

  const ensureAnimation = useCallback(() => {
    if (frameRef.current !== null) return
    lastFrameRef.current = performance.now()
    frameRef.current = requestAnimationFrame(animate)
  }, [animate])

  const reset = useCallback((immediate = false) => {
    velocityRef.current = { x: 0, y: 0 }
    targetRef.current = { x: 0, y: 0, scale: 1 }

    if (immediate) {
      currentRef.current = { x: 0, y: 0, scale: 1 }
      applyCamera(currentRef.current)
      return
    }

    ensureAnimation()
  }, [applyCamera, ensureAnimation])

  const zoomAt = useCallback((nextScale: number, clientX?: number, clientY?: number) => {
    const viewport = viewportRef.current
    if (!viewport) return

    const rect = viewport.getBoundingClientRect()
    const target = targetRef.current
    const next = clampScale(nextScale)
    const cursorX = (clientX ?? rect.left + rect.width / 2) - (rect.left + rect.width / 2)
    const cursorY = (clientY ?? rect.top + rect.height / 2) - (rect.top + rect.height / 2)

    // Keep the same artwork point under the cursor while the physical artboard
    // is resized. Translation remains in screen pixels; scale changes layout size.
    const ratio = next / target.scale
    target.x = cursorX - (cursorX - target.x) * ratio
    target.y = cursorY - (cursorY - target.y) * ratio
    target.scale = next

    velocityRef.current = { x: 0, y: 0 }
    ensureAnimation()
  }, [clampScale, ensureAnimation])

  const handleWheel = useCallback((event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault()
    const delta = Math.max(-120, Math.min(120, event.deltaY))
    const zoomFactor = Math.exp(-delta * .0018)
    zoomAt(targetRef.current.scale * zoomFactor, event.clientX, event.clientY)
  }, [zoomAt])

  const beginPinch = useCallback(() => {
    const viewport = viewportRef.current
    const points = Array.from(activePointersRef.current.values())
    if (!viewport || points.length < 2) return false

    const [first, second] = points
    const dx = second.x - first.x
    const dy = second.y - first.y
    const distance = Math.hypot(dx, dy)
    if (distance < 1) return false

    const rect = viewport.getBoundingClientRect()
    const centerX = (first.x + second.x) / 2 - (rect.left + rect.width / 2)
    const centerY = (first.y + second.y) / 2 - (rect.top + rect.height / 2)
    const target = targetRef.current

    pinchRef.current = {
      distance,
      centerX,
      centerY,
      scale: target.scale,
      cameraX: target.x,
      cameraY: target.y,
    }

    gestureModeRef.current = 'pinch'
    draggingRef.current = true
    velocityRef.current = { x: 0, y: 0 }
    viewport.dataset.dragging = 'true'
    ensureAnimation()
    return true
  }, [ensureAnimation])

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch' && event.button !== 0) return
    const viewport = viewportRef.current
    if (!viewport) return

    activePointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })

    viewport.setPointerCapture(event.pointerId)
    velocityRef.current = { x: 0, y: 0 }

    if (activePointersRef.current.size === 2) {
      beginPinch()
      return
    }

    if (activePointersRef.current.size > 2) return

    gestureModeRef.current = 'pan'
    draggingRef.current = true
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
    }

    viewport.dataset.dragging = 'true'
    ensureAnimation()
  }, [beginPinch, ensureAnimation])

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!activePointersRef.current.has(event.pointerId)) return

    activePointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })

    if (activePointersRef.current.size >= 2) {
      if (gestureModeRef.current !== 'pinch' && !beginPinch()) return

      const viewport = viewportRef.current
      const points = Array.from(activePointersRef.current.values())
      if (!viewport || points.length < 2) return

      const [first, second] = points
      const distance = Math.hypot(second.x - first.x, second.y - first.y)
      if (distance < 1) return

      const rect = viewport.getBoundingClientRect()
      const centerX = (first.x + second.x) / 2 - (rect.left + rect.width / 2)
      const centerY = (first.y + second.y) / 2 - (rect.top + rect.height / 2)
      const pinch = pinchRef.current
      const nextScale = clampScale(pinch.scale * (distance / pinch.distance))
      const ratio = nextScale / pinch.scale
      const target = targetRef.current

      // Keep the artwork point under the original pinch midpoint anchored beneath
      // the moving midpoint. This gives simultaneous pan + zoom without jumps.
      target.x = centerX - (pinch.centerX - pinch.cameraX) * ratio
      target.y = centerY - (pinch.centerY - pinch.cameraY) * ratio
      target.scale = nextScale
      velocityRef.current = { x: 0, y: 0 }
      ensureAnimation()
      return
    }

    if (gestureModeRef.current !== 'pan' || event.pointerId !== pointerRef.current.id) return

    const now = performance.now()
    const previous = pointerRef.current
    const dt = Math.max(1, now - previous.time)
    const dx = event.clientX - previous.x
    const dy = event.clientY - previous.y

    targetRef.current.x += dx
    targetRef.current.y += dy

    const frameVelocityX = dx * 16.667 / dt
    const frameVelocityY = dy * 16.667 / dt
    velocityRef.current.x = velocityRef.current.x * .58 + frameVelocityX * .42
    velocityRef.current.y = velocityRef.current.y * .58 + frameVelocityY * .42

    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: now,
    }

    ensureAnimation()
  }, [beginPinch, clampScale, ensureAnimation])

  const endPointer = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!activePointersRef.current.has(event.pointerId)) return

    const wasPinching = gestureModeRef.current === 'pinch'
    activePointersRef.current.delete(event.pointerId)

    const viewport = viewportRef.current
    if (viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId)
    }

    if (activePointersRef.current.size >= 2) {
      beginPinch()
      return
    }

    if (activePointersRef.current.size === 1) {
      const [remainingId, remaining] = Array.from(activePointersRef.current.entries())[0]
      gestureModeRef.current = 'pan'
      draggingRef.current = true
      velocityRef.current = { x: 0, y: 0 }
      pointerRef.current = {
        id: remainingId,
        x: remaining.x,
        y: remaining.y,
        time: performance.now(),
      }
      viewport?.setAttribute('data-dragging', 'true')
      ensureAnimation()
      return
    }

    gestureModeRef.current = 'idle'
    draggingRef.current = false
    viewport?.removeAttribute('data-dragging')

    // Pinch release should settle in place; single-pointer pans retain inertia.
    if (wasPinching) velocityRef.current = { x: 0, y: 0 }
    ensureAnimation()
  }, [beginPinch, ensureAnimation])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      captureBaseSize()
      reset(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [captureBaseSize, reset, resetKey])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const observer = new ResizeObserver(() => {
      if (targetRef.current.scale === 1) {
        captureBaseSize()
        reset(true)
      }
    })
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [captureBaseSize, reset])

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      ref={viewportRef}
      className={'zoom-pan-viewport ' + className}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onDoubleClick={() => reset()}
    >
      <div ref={cameraRef} className="zoom-pan-camera">
        {children}
      </div>

      {showHint && (
        <div className="viewport-hint" aria-hidden="true">
          <Maximize2 />
          <span>Vector zoom · Drag to pan</span>
        </div>
      )}

      <div className="viewport-controls" onPointerDown={(event) => event.stopPropagation()}>
        <button type="button" aria-label="Zoom out" title="Zoom out" onClick={() => zoomAt(targetRef.current.scale / 1.35)}>
          <Minus />
        </button>
        <span ref={zoomReadoutRef}>100%</span>
        <button type="button" aria-label="Zoom in" title="Zoom in" onClick={() => zoomAt(targetRef.current.scale * 1.35)}>
          <Plus />
        </button>
        <i />
        <button type="button" aria-label="Reset view" title="Reset view" onClick={() => reset()}>
          <RotateCcw />
        </button>
      </div>
    </div>
  )
}
