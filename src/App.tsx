import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Aperture,
  ArrowDownToLine,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Command,
  Copy,
  Expand,
  Grid2X2,
  Heart,
  Layers3,
  Menu,
  Moon,
  MoreHorizontal,
  Search,
  Sparkles,
  Sun,
} from 'lucide-react'
import { ArtworkVisual, VirtualArtworkVisual } from './artworks'
import { artworks, collections, type Artwork } from './artwork-data'
import { ZoomPanViewport } from './ZoomPanViewport'
import { PremiumScrollbar } from './PremiumScrollbar'

type BrowseMode = 'gallery' | 'contact'
type ViewMode = BrowseMode | 'focus'
type PreviewTone = 'art' | 'paper' | 'ink' | 'grid' | 'transparent'

const modeLabels: Record<ViewMode, string> = {
  gallery: 'Gallery',
  contact: 'Contact sheet',
  focus: 'Focus',
}

function IconButton({
  label,
  children,
  active = false,
  onClick,
}: {
  label: string
  children: ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button className="icon-button" data-active={active} type="button" title={label} aria-label={label} onClick={onClick}>
      {children}
    </button>
  )
}

function Rail({
  activeCollection,
  setActiveCollection,
  expanded,
  setExpanded,
}: {
  activeCollection: string
  setActiveCollection: (value: string) => void
  expanded: boolean
  setExpanded: (value: boolean) => void
}) {
  return (
    <aside className="rail" data-expanded={expanded}>
      <div className="rail-primary">
        <button className="brand-mark" type="button" aria-label="SVG Archive home"><Aperture /></button>

        <nav className="rail-icons" aria-label="Archive sections">
          <IconButton label="All works" active={activeCollection === 'All'} onClick={() => setActiveCollection('All')}><Grid2X2 /></IconButton>
          <IconButton label="Collections" active={expanded} onClick={() => setExpanded(!expanded)}><Layers3 /></IconButton>
          <IconButton label="Favorites"><Heart /></IconButton>
          <IconButton label="Discover"><Sparkles /></IconButton>
        </nav>

        <div className="rail-bottom">
          <IconButton label={expanded ? 'Collapse collections' : 'Expand collections'} onClick={() => setExpanded(!expanded)}><Menu /></IconButton>
          <button className="avatar-dot" type="button" aria-label="Archive profile">JC</button>
        </div>
      </div>

      <div className="rail-secondary" aria-hidden={!expanded}>
        <div className="rail-secondary-head"><span>Collections</span><span>{artworks.length}</span></div>
        <div className="collection-list">
          {collections.map((collection) => {
            const count = collection === 'All'
              ? artworks.length
              : collection === 'Animated'
                ? artworks.filter((item) => item.animated).length
                : artworks.filter((item) => item.collection === collection).length
            return (
              <button
                type="button"
                key={collection}
                className="collection-row"
                data-active={activeCollection === collection}
                onClick={() => setActiveCollection(collection)}
              >
                <span>{collection}</span><span>{count}</span>
              </button>
            )
          })}
        </div>
        <div className="rail-note">
          <span>Personal archive</span>
          <p>Studies in geometry, rhythm, color and procedural form.</p>
        </div>
      </div>
    </aside>
  )
}

function Topbar({
  activeCollection,
  count,
  viewMode,
  focusArtwork,
  onModeChange,
  onExitFocus,
  onSearch,
  dark,
  setDark,
}: {
  activeCollection: string
  count: number
  viewMode: ViewMode
  focusArtwork?: Artwork
  onModeChange: (mode: ViewMode) => void
  onExitFocus: () => void
  onSearch: () => void
  dark: boolean
  setDark: (value: boolean) => void
}) {
  return (
    <header className="topbar" data-focus={viewMode === 'focus'}>
      <div className="topbar-context">
        {viewMode === 'focus' && (
          <button className="focus-back" type="button" onClick={onExitFocus} aria-label="Return to archive">
            <ArrowLeft />
          </button>
        )}
        <span className="eyebrow">Archive</span>
        <span className="slash">/</span>
        <strong>{viewMode === 'focus' && focusArtwork ? focusArtwork.title : activeCollection}</strong>
        <span className="quiet-count">{viewMode === 'focus' && focusArtwork ? focusArtwork.id : count}</span>
      </div>

      <div className="topbar-actions">
        <button className="search-trigger" type="button" onClick={onSearch}>
          <Search /><span>Search archive</span><kbd><Command />K</kbd>
        </button>

        <div className="segmented" aria-label="View mode">
          {(Object.keys(modeLabels) as ViewMode[]).map((mode) => (
            <button key={mode} type="button" data-active={viewMode === mode} onClick={() => onModeChange(mode)}>
              {modeLabels[mode]}
            </button>
          ))}
        </div>

        <IconButton label={dark ? 'Use light theme' : 'Use dark theme'} onClick={() => setDark(!dark)}>
          {dark ? <Sun /> : <Moon />}
        </IconButton>
        <IconButton label="More options"><MoreHorizontal /></IconButton>
      </div>
    </header>
  )
}

function ArtworkCard({
  artwork,
  index,
  onOpen,
  compact = false,
}: {
  artwork: Artwork
  index: number
  onOpen: () => void
  compact?: boolean
}) {
  return (
    <button
      type="button"
      className="art-card"
      data-size={compact ? 'compact' : artwork.size}
      onClick={onOpen}
      style={{ '--delay': Math.min(index * 18, 220) + 'ms' } as CSSProperties}
    >
      <div className="art-surface" style={{ background: artwork.surface }}>
        <VirtualArtworkVisual artwork={artwork} eager={index < 12} />
        {!compact && (
          <div className="art-overlay" aria-hidden="true">
            <div><span>{artwork.id}</span><Expand /></div>
            <div><span>{artwork.title}</span><span>{artwork.year}</span></div>
          </div>
        )}
      </div>
    </button>
  )
}

function GalleryView({ items, onOpen }: { items: Artwork[]; onOpen: (artwork: Artwork) => void }) {
  return <div className="gallery-grid">
    {items.map((artwork, index) => <ArtworkCard key={artwork.id} artwork={artwork} index={index} onOpen={() => onOpen(artwork)} />)}
  </div>
}

function ContactView({ items, onOpen }: { items: Artwork[]; onOpen: (artwork: Artwork) => void }) {
  return <div className="contact-grid">
    {items.map((artwork, index) => (
      <div className="contact-item" key={artwork.id}>
        <ArtworkCard artwork={artwork} index={index} compact onOpen={() => onOpen(artwork)} />
        <div className="contact-meta"><span>{artwork.id}</span><span>{artwork.title}</span></div>
      </div>
    ))}
  </div>
}

function getSvgMarkup(artwork: Artwork) {
  const nodes = document.querySelectorAll('[data-artwork-id="' + artwork.id + '"] svg')
  const svg = nodes[nodes.length - 1]
  if (!(svg instanceof SVGElement)) return null
  const clone = svg.cloneNode(true) as SVGElement
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  return clone.outerHTML
}

function FocusWorkspace({
  artwork,
  items,
  index,
  tone,
  setTone,
  onPrev,
  onNext,
  onSelect,
}: {
  artwork: Artwork
  items: Artwork[]
  index: number
  tone: PreviewTone
  setTone: (tone: PreviewTone) => void
  onPrev: () => void
  onNext: () => void
  onSelect: (index: number) => void
}) {
  const detailsRef = useRef<HTMLElement>(null)
  const filmstripRef = useRef<HTMLElement>(null)

  const copySvg = async () => {
    const markup = getSvgMarkup(artwork)
    if (markup && navigator.clipboard) await navigator.clipboard.writeText(markup)
  }

  const downloadSvg = () => {
    const markup = getSvgMarkup(artwork)
    if (!markup) return
    const blob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' })
    const href = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = href
    anchor.download = artwork.id.toLowerCase() + '-' + artwork.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.svg'
    anchor.click()
    URL.revokeObjectURL(href)
  }

  return (
    <div className="focus-workspace" style={{ '--art-surface': artwork.surface } as CSSProperties}>
      <div className="focus-main">
        <section className="focus-canvas" data-tone={tone}>
          <ZoomPanViewport resetKey={artwork.id} ariaLabel={'Zoom and pan ' + artwork.title}>
            <div className="focus-artboard" style={{ background: artwork.surface }}>
              <ArtworkVisual artwork={artwork} />
            </div>
          </ZoomPanViewport>

          <div className="focus-sequence">
            <button type="button" onClick={onPrev} aria-label="Previous artwork"><ChevronLeft /></button>
            <span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            <button type="button" onClick={onNext} aria-label="Next artwork"><ChevronRight /></button>
          </div>
        </section>

        <div className="premium-scroll-shell focus-details-shell">
          <aside ref={detailsRef} className="focus-details premium-scroll-viewport">
          <div className="focus-details-head">
            <span className="eyebrow">{artwork.id}</span>
            <h1>{artwork.title}</h1>
            <p>{artwork.description}</p>
          </div>

          <div className="focus-record">
            <div><span>Collection</span><strong>{artwork.collection}</strong></div>
            <div><span>Year</span><strong>{artwork.year}</strong></div>
            <div><span>Medium</span><strong>{artwork.animated ? 'Vector · Animated SVG' : 'Vector · SVG'}</strong></div>
            <div><span>Canvas</span><strong>1200 × 1200</strong></div>
          </div>

          <section className="focus-detail-section">
            <span className="section-label">Surface</span>
            <div className="surface-switcher">
              {(['art', 'paper', 'ink', 'grid', 'transparent'] as PreviewTone[]).map((item) => (
                <button key={item} type="button" data-active={tone === item} onClick={() => setTone(item)} title={item === 'art' ? 'Match artwork' : item}>
                  <i data-tone={item} /><span>{item === 'art' ? 'Artwork' : item}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="focus-detail-section">
            <span className="section-label">Study notes</span>
            <div className="focus-tags">{artwork.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </section>

          <div className="focus-utility-actions">
            <button type="button" onClick={() => void copySvg()}><Copy />Copy SVG</button>
            <button type="button" onClick={downloadSvg}><ArrowDownToLine />Download</button>
          </div>

          <div className="focus-neighbor">
            <span className="section-label">Sequence</span>
            <div>
              <button type="button" onClick={onPrev}>
                <span>Previous</span>
                <strong>{items[(index - 1 + items.length) % items.length]?.title}</strong>
              </button>
              <button type="button" onClick={onNext}>
                <span>Next</span>
                <strong>{items[(index + 1) % items.length]?.title}</strong>
              </button>
            </div>
          </div>
          </aside>
          <PremiumScrollbar viewportRef={detailsRef} orientation="vertical" watchKey={artwork.id} />
        </div>
      </div>

      <div className="premium-scroll-shell focus-filmstrip-shell">
      <nav ref={filmstripRef} className="focus-filmstrip premium-scroll-viewport" aria-label="Artwork sequence">
        {items.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            data-active={itemIndex === index}
            onClick={() => onSelect(itemIndex)}
            aria-label={'View ' + item.title}
          >
            <div style={{ background: item.surface }}>
              <VirtualArtworkVisual
                artwork={item}
                eager={Math.min(Math.abs(itemIndex - index), items.length - Math.abs(itemIndex - index)) <= 6}
              />
            </div>
            <span>{item.id}</span>
          </button>
        ))}
      </nav>
      <PremiumScrollbar viewportRef={filmstripRef} orientation="horizontal" watchKey={artwork.id + ':' + items.length} />
      </div>
    </div>
  )
}

function CommandPalette({
  open,
  onClose,
  onOpenArtwork,
  onSelectCollection,
}: {
  open: boolean
  onClose: () => void
  onOpenArtwork: (artwork: Artwork) => void
  onSelectCollection: (collection: string) => void
}) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return artworks.slice(0, 7)
    return artworks.filter((item) => (
      [item.title, item.id, item.collection].concat(item.tags).join(' ').toLowerCase().includes(normalized)
    )).slice(0, 9)
  }, [query])

  if (!open) return null

  return (
    <div className="command-layer" role="dialog" aria-modal="true" aria-label="Search archive">
      <button className="command-dismiss" type="button" onClick={onClose} aria-label="Close search" />
      <div className="command-palette">
        <div className="command-input">
          <Search />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, collections or tags" />
          <span>Esc</span>
        </div>

        {!query && (
          <div className="command-group">
            <span className="command-label">Collections</span>
            <div className="command-collection-row">
              {collections.map((collection) => (
                <button key={collection} type="button" onClick={() => { onSelectCollection(collection); onClose() }}>{collection}</button>
              ))}
            </div>
          </div>
        )}

        <div className="command-group">
          <span className="command-label">{query ? 'Results' : 'Recent works'}</span>
          <div className="command-results">
            {results.map((artwork) => (
              <button key={artwork.id} type="button" onClick={() => { onOpenArtwork(artwork); onClose() }}>
                <div className="command-thumb" style={{ background: artwork.surface }}><ArtworkVisual artwork={artwork} /></div>
                <div><strong>{artwork.title}</strong><span>{artwork.collection} · {artwork.year}</span></div>
                <span>{artwork.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeCollection, setActiveCollection] = useState('All')
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const [lastBrowseMode, setLastBrowseMode] = useState<BrowseMode>('gallery')
  const [commandOpen, setCommandOpen] = useState(false)
  const [previewTone, setPreviewTone] = useState<PreviewTone>('art')
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)
  const [focusIndex, setFocusIndex] = useState(0)
  const archiveRef = useRef<HTMLElement>(null)

  const visibleArtworks = useMemo(() => {
    if (activeCollection === 'All') return artworks
    if (activeCollection === 'Animated') return artworks.filter((artwork) => artwork.animated)
    return artworks.filter((artwork) => artwork.collection === activeCollection)
  }, [activeCollection])

  const focusArtwork = visibleArtworks[focusIndex] ?? visibleArtworks[0]

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const enterFocus = (artwork: Artwork) => {
    const localIndex = visibleArtworks.findIndex((item) => item.id === artwork.id)
    if (localIndex >= 0) {
      setFocusIndex(localIndex)
    } else {
      setActiveCollection('All')
      setFocusIndex(artworks.findIndex((item) => item.id === artwork.id))
    }
    if (viewMode !== 'focus') setLastBrowseMode(viewMode === 'contact' ? 'contact' : 'gallery')
    setViewMode('focus')
  }

  const changeMode = (mode: ViewMode) => {
    if (mode === 'focus') {
      if (viewMode !== 'focus') setLastBrowseMode(viewMode === 'contact' ? 'contact' : 'gallery')
      setViewMode('focus')
      return
    }
    setLastBrowseMode(mode)
    setViewMode(mode)
  }

  const exitFocus = () => setViewMode(lastBrowseMode)

  const selectCollection = (collection: string) => {
    setActiveCollection(collection)
    setFocusIndex(0)
  }

  const moveFocus = (direction: -1 | 1) => {
    if (!visibleArtworks.length) return
    setFocusIndex((index) => (index + direction + visibleArtworks.length) % visibleArtworks.length)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const element = event.target as HTMLElement | null
      const typing = element?.tagName === 'INPUT' || element?.tagName === 'TEXTAREA'

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen(true)
        return
      }
      if (typing) return

      if (event.key === '/') {
        event.preventDefault()
        setCommandOpen(true)
      } else if (event.key === 'Escape') {
        if (commandOpen) setCommandOpen(false)
        else if (viewMode === 'focus') exitFocus()
      } else if (viewMode === 'focus' && event.key === 'ArrowLeft') {
        moveFocus(-1)
      } else if (viewMode === 'focus' && event.key === 'ArrowRight') {
        moveFocus(1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return (
    <div className="app-shell">
      <Rail activeCollection={activeCollection} setActiveCollection={selectCollection} expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />

      <div className="workspace">
        <Topbar
          activeCollection={activeCollection}
          count={visibleArtworks.length}
          viewMode={viewMode}
          focusArtwork={focusArtwork}
          onModeChange={changeMode}
          onExitFocus={exitFocus}
          onSearch={() => setCommandOpen(true)}
          dark={dark}
          setDark={setDark}
        />

        <div className="premium-scroll-shell archive-scroll-shell">
          <main ref={archiveRef} className="archive-content premium-scroll-viewport" data-mode={viewMode}>
            {viewMode === 'gallery' && <GalleryView items={visibleArtworks} onOpen={enterFocus} />}
            {viewMode === 'contact' && <ContactView items={visibleArtworks} onOpen={enterFocus} />}
            {viewMode === 'focus' && focusArtwork && (
              <FocusWorkspace
                artwork={focusArtwork}
                items={visibleArtworks}
                index={focusIndex}
                tone={previewTone}
                setTone={setPreviewTone}
                onPrev={() => moveFocus(-1)}
                onNext={() => moveFocus(1)}
                onSelect={setFocusIndex}
              />
            )}
          </main>
          <PremiumScrollbar
            viewportRef={archiveRef}
            orientation="vertical"
            watchKey={viewMode + ':' + activeCollection + ':' + visibleArtworks.length}
          />
        </div>

        <footer className="statusbar">
          <span>{viewMode === 'focus' && focusArtwork ? focusArtwork.id + ' · ' + focusArtwork.collection : visibleArtworks.length + ' works'}</span>
          <span>{viewMode === 'focus' ? 'Scroll to zoom · Drag to pan · Double-click to reset' : 'SVG · Abstract studies · 2024—2026'}</span>
        </footer>
      </div>

      <CommandPalette
        key={commandOpen ? 'open' : 'closed'}
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onOpenArtwork={enterFocus}
        onSelectCollection={selectCollection}
      />
    </div>
  )
}

export default App
