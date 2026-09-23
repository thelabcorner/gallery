import { useEffect, useRef, type RefObject } from 'react'

type Orientation = 'vertical' | 'horizontal'

type PremiumScrollbarProps = {
  viewportRef: RefObject<HTMLElement | null>
  orientation: Orientation
  watchKey?: string | number
}

export function PremiumScrollbar({
  viewportRef,
  orientation,
  watchKey,
}: PremiumScrollbarProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    const thumb = thumbRef.current
    if (!viewport || !track || !thumb) return

    let raf = 0
    let hideTimer = 0
    let dragging = false
    let dragStartPointer = 0
    let dragStartScroll = 0

    const getMetrics = () => {
      const vertical = orientation === 'vertical'
      const client = vertical ? viewport.clientHeight : viewport.clientWidth
      const scroll = vertical ? viewport.scrollHeight : viewport.scrollWidth
      const position = vertical ? viewport.scrollTop : viewport.scrollLeft
      const trackLength = vertical ? track.clientHeight : track.clientWidth
      const maxScroll = Math.max(0, scroll - client)
      const thumbLength = maxScroll <= 0
        ? trackLength
        : Math.max(28, Math.min(trackLength, trackLength * client / scroll))
      const travel = Math.max(0, trackLength - thumbLength)
      const offset = maxScroll > 0 ? position / maxScroll * travel : 0

      return { vertical, client, scroll, maxScroll, trackLength, thumbLength, travel, offset }
    }

    const paint = () => {
      raf = 0
      const metrics = getMetrics()
      const hidden = metrics.scroll <= metrics.client + 1 || metrics.trackLength <= 0
      track.dataset.hidden = hidden ? 'true' : 'false'

      if (metrics.vertical) {
        thumb.style.height = metrics.thumbLength.toFixed(2) + 'px'
        thumb.style.width = ''
        thumb.style.transform = 'translate3d(0,' + metrics.offset.toFixed(2) + 'px,0)'
      } else {
        thumb.style.width = metrics.thumbLength.toFixed(2) + 'px'
        thumb.style.height = ''
        thumb.style.transform = 'translate3d(' + metrics.offset.toFixed(2) + 'px,0,0)'
      }
    }

    const schedulePaint = () => {
      if (raf) return
      raf = requestAnimationFrame(paint)
    }

    const wake = () => {
      track.dataset.active = 'true'
      window.clearTimeout(hideTimer)
      hideTimer = window.setTimeout(() => {
        if (!dragging) track.removeAttribute('data-active')
      }, 850)
    }

    const onScroll = () => {
      schedulePaint()
      wake()
    }

    const onThumbPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      event.preventDefault()
      event.stopPropagation()
      dragging = true
      track.dataset.dragging = 'true'
      track.dataset.active = 'true'
      dragStartPointer = orientation === 'vertical' ? event.clientY : event.clientX
      dragStartScroll = orientation === 'vertical' ? viewport.scrollTop : viewport.scrollLeft
      thumb.setPointerCapture(event.pointerId)
    }

    const onThumbPointerMove = (event: PointerEvent) => {
      if (!dragging) return
      const metrics = getMetrics()
      if (metrics.travel <= 0 || metrics.maxScroll <= 0) return

      const pointer = metrics.vertical ? event.clientY : event.clientX
      const delta = pointer - dragStartPointer
      const nextScroll = dragStartScroll + delta / metrics.travel * metrics.maxScroll

      if (metrics.vertical) viewport.scrollTop = nextScroll
      else viewport.scrollLeft = nextScroll
    }

    const endDrag = (event: PointerEvent) => {
      if (!dragging) return
      dragging = false
      track.removeAttribute('data-dragging')
      if (thumb.hasPointerCapture(event.pointerId)) thumb.releasePointerCapture(event.pointerId)
      wake()
    }

    const onTrackPointerDown = (event: PointerEvent) => {
      if (event.target === thumb || event.button !== 0) return
      event.preventDefault()

      const metrics = getMetrics()
      if (metrics.travel <= 0 || metrics.maxScroll <= 0) return

      const rect = track.getBoundingClientRect()
      const pointer = metrics.vertical ? event.clientY - rect.top : event.clientX - rect.left
      const targetOffset = Math.max(0, Math.min(metrics.travel, pointer - metrics.thumbLength / 2))
      const nextScroll = targetOffset / metrics.travel * metrics.maxScroll

      if (metrics.vertical) viewport.scrollTo({ top: nextScroll, behavior: 'smooth' })
      else viewport.scrollTo({ left: nextScroll, behavior: 'smooth' })
      wake()
    }

    const resizeObserver = new ResizeObserver(schedulePaint)
    resizeObserver.observe(viewport)

    const firstChild = viewport.firstElementChild
    if (firstChild instanceof HTMLElement) resizeObserver.observe(firstChild)

    viewport.addEventListener('scroll', onScroll, { passive: true })
    thumb.addEventListener('pointerdown', onThumbPointerDown)
    thumb.addEventListener('pointermove', onThumbPointerMove)
    thumb.addEventListener('pointerup', endDrag)
    thumb.addEventListener('pointercancel', endDrag)
    track.addEventListener('pointerdown', onTrackPointerDown)

    schedulePaint()

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(hideTimer)
      resizeObserver.disconnect()
      viewport.removeEventListener('scroll', onScroll)
      thumb.removeEventListener('pointerdown', onThumbPointerDown)
      thumb.removeEventListener('pointermove', onThumbPointerMove)
      thumb.removeEventListener('pointerup', endDrag)
      thumb.removeEventListener('pointercancel', endDrag)
      track.removeEventListener('pointerdown', onTrackPointerDown)
    }
  }, [orientation, viewportRef, watchKey])

  return (
    <div
      ref={trackRef}
      className="premium-scrollbar"
      data-orientation={orientation}
      data-hidden="true"
      aria-hidden="true"
    >
      <div ref={thumbRef} className="premium-scrollbar-thumb" />
    </div>
  )
}
