export type ArtworkKind =
  | 'signal'
  | 'orbit'
  | 'fold'
  | 'lattice'
  | 'echo'
  | 'ribbon'
  | 'halo'
  | 'field'
  | 'petal'
  | 'shift'
  | 'arc'
  | 'nodes'
  | 'moire'
  | 'strata'
  | 'vortex'
  | 'prism'
  | 'weave'
  | 'eclipse'
  | 'flux'
  | 'tiles'
  | 'contour'
  | 'constellation'
  | 'chamber'
  | 'spiral'
  | 'bands'
  | 'spokes'
  | 'portals'
  | 'bubbles'
  | 'measure'
  | 'shear'
  | 'fossil'
  | 'suns'
  | 'counterform'
  | 'columns'
  | 'tension'
  | 'recursive'
  | 'pulse'
  | 'polar'
  | 'slipstream'
  | 'axis'
  | 'anim-breathe'
  | 'anim-orbit'
  | 'anim-loom'
  | 'anim-pendulum'
  | 'anim-rose'
  | 'anim-scanner'
  | 'anim-aperture'
  | 'anim-drift'
  | 'anim-wavegate'
  | 'anim-dial'
  | 'anim-conveyor'
  | 'anim-grid'
  | 'anim-transit'
  | 'anim-matrix'
  | 'anim-tide'
  | 'anim-engine'
  | 'anim-morph'
  | 'anim-shutter'
  | 'anim-chain'
  | 'anim-radar'
  | 'anim-prism'
  | 'anim-accordion'
  | 'anim-lens'
  | 'anim-rain'
  | 'anim-helix'
  | 'anim-tilescan'
  | 'anim-compass'
  | 'anim-echo'
  | 'anim-cascade'
  | 'anim-piston'
  | 'anim-ripple'
  | 'anim-swarm'

export type Artwork = {
  id: string
  title: string
  year: number
  collection: 'Geometry' | 'Generative' | 'Fields' | 'Motion'
  tags: string[]
  description: string
  kind: ArtworkKind
  surface: string
  ink: string
  accent: string
  size: 'square' | 'wide' | 'tall' | 'hero'
  animated?: boolean
}

export const artworks: Artwork[] = [
  { id: 'A-001', title: 'Signal Bloom', year: 2026, collection: 'Generative', tags: ['Radial', 'Interference', 'Procedural'], kind: 'signal', size: 'hero', surface: '#f1eee8', ink: '#151515', accent: '#f05a38', description: 'A radial interference study where repeated lines gather into a soft optical bloom.' },
  { id: 'A-002', title: 'Orbital Index', year: 2026, collection: 'Geometry', tags: ['Orbit', 'Linework', 'Balance'], kind: 'orbit', size: 'square', surface: '#17191d', ink: '#f2efe8', accent: '#9ec9ff', description: 'Concentric trajectories interrupted by a single offset coordinate system.' },
  { id: 'A-003', title: 'Fold No. 4', year: 2025, collection: 'Motion', tags: ['Fold', 'Kinetic', 'Depth'], kind: 'fold', size: 'square', surface: '#dbe7cf', ink: '#203323', accent: '#779f58', description: 'A folded plane study reduced to a few directional cuts and weighted shadows.' },
  { id: 'A-004', title: 'Soft Lattice', year: 2026, collection: 'Fields', tags: ['Grid', 'Distortion', 'Field'], kind: 'lattice', size: 'tall', surface: '#ede5ff', ink: '#351f52', accent: '#9e72df', description: 'A regular lattice displaced by a quiet central force, held just before collapse.' },
  { id: 'A-005', title: 'Echo Chamber', year: 2025, collection: 'Geometry', tags: ['Repeat', 'Contour', 'Negative Space'], kind: 'echo', size: 'wide', surface: '#f4c756', ink: '#1f1b12', accent: '#fff6d7', description: 'Nested contours expand from an imperfect center while preserving a strict cadence.' },
  { id: 'A-006', title: 'Ribbon Study', year: 2026, collection: 'Motion', tags: ['Ribbon', 'Flow', 'Vector'], kind: 'ribbon', size: 'square', surface: '#f2f4f7', ink: '#18212d', accent: '#5479ff', description: 'One continuous vector ribbon folds through itself without surrendering legibility.' },
  { id: 'A-007', title: 'Double Halo', year: 2024, collection: 'Geometry', tags: ['Halo', 'Symmetry', 'Void'], kind: 'halo', size: 'wide', surface: '#251b24', ink: '#f4e8f0', accent: '#f590bc', description: 'Two near-symmetrical halos use overlap and absence to create a third implied form.' },
  { id: 'A-008', title: 'Vector Field 08', year: 2026, collection: 'Fields', tags: ['Vector', 'Field', 'Direction'], kind: 'field', size: 'square', surface: '#daeaf0', ink: '#173945', accent: '#2a8ea7', description: 'A directional field visualized as hundreds of restrained marks around a quiet attractor.' },
  { id: 'A-009', title: 'Petal Engine', year: 2025, collection: 'Generative', tags: ['Petal', 'Rotation', 'System'], kind: 'petal', size: 'tall', surface: '#efe1dc', ink: '#452622', accent: '#c75c4e', description: 'A rotational system that sits between botanical form and mechanical repetition.' },
  { id: 'A-010', title: 'Phase Shift', year: 2026, collection: 'Fields', tags: ['Wave', 'Phase', 'Interference'], kind: 'shift', size: 'wide', surface: '#e8e9ff', ink: '#202349', accent: '#5c63d8', description: 'Phase-offset waves that separate and recombine as a single continuous field.' },
  { id: 'A-011', title: 'Arc Memory', year: 2025, collection: 'Motion', tags: ['Arc', 'Trace', 'Gesture'], kind: 'arc', size: 'square', surface: '#131a18', ink: '#e3eee8', accent: '#6ce1b4', description: 'A family of arcs preserving the trace of an imagined object moving through space.' },
  { id: 'A-012', title: 'Node Weather', year: 2026, collection: 'Generative', tags: ['Nodes', 'Network', 'Density'], kind: 'nodes', size: 'hero', surface: '#eee8d9', ink: '#2f2a20', accent: '#c69236', description: 'A dense node system that behaves more like weather than a diagram.' },
  { id: 'A-013', title: 'Moiré Meridian', year: 2026, collection: 'Fields', tags: ['Moiré', 'Interference', 'Line'], kind: 'moire', size: 'wide', surface: '#ececf2', ink: '#171720', accent: '#7479ff', description: 'Two disciplined line systems drift through each other and produce a third, unstable rhythm.' },
  { id: 'A-014', title: 'Strata / 06', year: 2026, collection: 'Geometry', tags: ['Strata', 'Section', 'Topography'], kind: 'strata', size: 'tall', surface: '#e7dfd1', ink: '#31281f', accent: '#c75d3b', description: 'Layered sectional profiles compressed into a geological object with a single hot seam.' },
  { id: 'A-015', title: 'Vortex Ledger', year: 2025, collection: 'Generative', tags: ['Vortex', 'Rotation', 'Density'], kind: 'vortex', size: 'square', surface: '#15201f', ink: '#e9f1ec', accent: '#85e8bf', description: 'A rotational ledger where every mark records a small deviation from the center field.' },
  { id: 'A-016', title: 'Prismatic Cut', year: 2026, collection: 'Geometry', tags: ['Prism', 'Facet', 'Refraction'], kind: 'prism', size: 'hero', surface: '#f0ede7', ink: '#222127', accent: '#ff6e88', description: 'Hard geometric planes split a quiet field into measured facets and a single refracted axis.' },
  { id: 'A-017', title: 'Quiet Weave', year: 2025, collection: 'Fields', tags: ['Weave', 'Textile', 'Rhythm'], kind: 'weave', size: 'square', surface: '#e2e8dd', ink: '#233126', accent: '#728d72', description: 'A woven vector study built from alternating tension, spacing and deliberate defects.' },
  { id: 'A-018', title: 'Eclipse Register', year: 2026, collection: 'Geometry', tags: ['Eclipse', 'Overlap', 'Register'], kind: 'eclipse', size: 'wide', surface: '#211b20', ink: '#f6ecef', accent: '#db7b9d', description: 'Offset eclipses behave like registration marks caught between astronomical and print geometry.' },
  { id: 'A-019', title: 'Flux Garden', year: 2026, collection: 'Generative', tags: ['Flux', 'Flow', 'Particles'], kind: 'flux', size: 'tall', surface: '#e8eef5', ink: '#173046', accent: '#4ea2d8', description: 'A particle garden that bends around invisible constraints while keeping the overall field calm.' },
  { id: 'A-020', title: 'Tessellation Fault', year: 2025, collection: 'Geometry', tags: ['Tessellation', 'Fault', 'Module'], kind: 'tiles', size: 'square', surface: '#f2e8d8', ink: '#34291c', accent: '#dc7b3c', description: 'A strict modular tessellation interrupted by one fault line that shifts the visual phase.' },
  { id: 'A-021', title: 'Contour Signal', year: 2026, collection: 'Fields', tags: ['Contour', 'Signal', 'Elevation'], kind: 'contour', size: 'wide', surface: '#dfe9e7', ink: '#1f3a36', accent: '#4ba99a', description: 'Topographic contours tighten around an artificial signal source, halfway between map and waveform.' },
  { id: 'A-022', title: 'Constellation Draft', year: 2024, collection: 'Generative', tags: ['Constellation', 'Draft', 'Points'], kind: 'constellation', size: 'square', surface: '#111722', ink: '#e8edf6', accent: '#85a8ff', description: 'A sparse construction drawing where stars, measurements and provisional connections share one plane.' },
  { id: 'A-023', title: 'Inner Chamber', year: 2026, collection: 'Motion', tags: ['Chamber', 'Depth', 'Perspective'], kind: 'chamber', size: 'hero', surface: '#eae5dd', ink: '#26231f', accent: '#9d6c45', description: 'A nested chamber built from receding frames that imply a slow camera push into impossible depth.' },
  { id: 'A-024', title: 'Spiral Reserve', year: 2026, collection: 'Motion', tags: ['Spiral', 'Reserve', 'Gesture'], kind: 'spiral', size: 'wide', surface: '#eee7f2', ink: '#33253b', accent: '#a76fc4', description: 'A reserved spiral gesture surrounded by echoes that suggest stored rotational energy.' },
  { id: 'A-025', title: 'Blind Frequency', year: 2026, collection: 'Fields', tags: ['Frequency', 'Bands', 'Occlusion'], kind: 'bands', size: 'wide', surface: '#e9e5dc', ink: '#24231f', accent: '#e14f3e', description: 'Horizontal frequency bands are interrupted by a narrow blind zone, turning repetition into signal loss.' },
  { id: 'A-026', title: 'Radial Census', year: 2026, collection: 'Generative', tags: ['Radial', 'Count', 'Density'], kind: 'spokes', size: 'square', surface: '#f1efe8', ink: '#1e2221', accent: '#5e8f75', description: 'A census of radial marks whose small differences become visible only through accumulation.' },
  { id: 'A-027', title: 'Offset Cathedral', year: 2025, collection: 'Geometry', tags: ['Arch', 'Portal', 'Offset'], kind: 'portals', size: 'tall', surface: '#ddd8cf', ink: '#2a2926', accent: '#a86a3b', description: 'Nested portals drift off-axis until an architectural rhythm becomes almost impossible.' },
  { id: 'A-028', title: 'Pressure Map', year: 2026, collection: 'Fields', tags: ['Pressure', 'Cells', 'Field'], kind: 'bubbles', size: 'hero', surface: '#dfe8ee', ink: '#203543', accent: '#e68c5b', description: 'A field of circular cells swells and contracts around an invisible pressure source.' },
  { id: 'A-029', title: 'Broken Measure', year: 2025, collection: 'Geometry', tags: ['Measure', 'Rule', 'Break'], kind: 'measure', size: 'wide', surface: '#f0eadc', ink: '#29251d', accent: '#c63f32', description: 'A precise measuring system interrupted by one impossible interval.' },
  { id: 'A-030', title: 'Kinetic Grid', year: 2026, collection: 'Motion', tags: ['Grid', 'Shear', 'Kinetic'], kind: 'shear', size: 'hero', surface: '#e9e6ef', ink: '#24212e', accent: '#765ed3', description: 'A rigid grid appears to shear in sections, as if different regions are moving at different speeds.' },
  { id: 'A-031', title: 'Signal Fossil', year: 2024, collection: 'Generative', tags: ['Fossil', 'Trace', 'Organic'], kind: 'fossil', size: 'tall', surface: '#e4dfd2', ink: '#3b352c', accent: '#8b6f3e', description: 'Layered signal traces harden into a form that feels excavated rather than generated.' },
  { id: 'A-032', title: 'Black Sun Study', year: 2026, collection: 'Geometry', tags: ['Sun', 'Radial', 'Contrast'], kind: 'suns', size: 'square', surface: '#ede8dc', ink: '#161615', accent: '#d96b34', description: 'A dense black solar body surrounded by an exacting ring of short radial events.' },
  { id: 'A-033', title: 'Counterform No. 2', year: 2025, collection: 'Geometry', tags: ['Counterform', 'Block', 'Void'], kind: 'counterform', size: 'wide', surface: '#151719', ink: '#f1ede4', accent: '#ffcf5a', description: 'Large masses are composed around a central void, making absence the most stable object in the frame.' },
  { id: 'A-034', title: 'Drift Columns', year: 2026, collection: 'Fields', tags: ['Columns', 'Drift', 'Wave'], kind: 'columns', size: 'tall', surface: '#e2ebe7', ink: '#1f3932', accent: '#cf6d5b', description: 'Vertical columns drift laterally in a slow phase pattern without breaking their overall cadence.' },
  { id: 'A-035', title: 'Tension Diagram', year: 2026, collection: 'Motion', tags: ['Tension', 'Anchor', 'Line'], kind: 'tension', size: 'square', surface: '#f1ece7', ink: '#28211e', accent: '#dd5547', description: 'Anchored lines pull against a small number of weighted nodes, turning force into composition.' },
  { id: 'A-036', title: 'Recursive Window', year: 2025, collection: 'Geometry', tags: ['Recursive', 'Window', 'Frame'], kind: 'recursive', size: 'hero', surface: '#e7e7e2', ink: '#20211f', accent: '#5c76b5', description: 'A window repeats inward while shifting just enough to imply a recursion that never quite converges.' },
  { id: 'A-037', title: 'Pulse Stack', year: 2026, collection: 'Fields', tags: ['Pulse', 'Stack', 'Waveform'], kind: 'pulse', size: 'wide', surface: '#172023', ink: '#e7f0ef', accent: '#63d2c2', description: 'Stacked pulse traces form a dense banded object somewhere between waveform and landscape.' },
  { id: 'A-038', title: 'Polar Bloom', year: 2026, collection: 'Generative', tags: ['Polar', 'Bloom', 'Rose'], kind: 'polar', size: 'square', surface: '#eee4e8', ink: '#3c2630', accent: '#d46d93', description: 'A polar rose is sampled repeatedly until its petals behave like an optical field.' },
  { id: 'A-039', title: 'Slipstream', year: 2025, collection: 'Motion', tags: ['Slipstream', 'Flow', 'Velocity'], kind: 'slipstream', size: 'wide', surface: '#dfe6ed', ink: '#183043', accent: '#ef704e', description: 'Long trajectories compress through a narrow passage and release into a calmer downstream field.' },
  { id: 'A-040', title: 'Axis Collapse', year: 2026, collection: 'Generative', tags: ['Axis', 'Collapse', 'Rotation'], kind: 'axis', size: 'hero', surface: '#edece5', ink: '#22221e', accent: '#e4a22f', description: 'A coordinate system is repeated through rotation until orientation collapses into a new central structure.' },
  { id: 'A-041', title: 'Breathing Index', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Pulse', 'Rings'], kind: 'anim-breathe', size: 'square', surface: '#ece8df', ink: '#25231f', accent: '#e65c47', animated: true, description: 'Concentric index rings inhale and exhale on offset cycles, producing a quiet mechanical respiration.' },
  { id: 'A-042', title: 'Orbit Relay', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Orbit', 'Relay'], kind: 'anim-orbit', size: 'wide', surface: '#15191d', ink: '#e9edf0', accent: '#67b6ff', animated: true, description: 'Three relay points pass around eccentric orbital tracks at deliberately mismatched periods.' },
  { id: 'A-043', title: 'Phase Loom', year: 2026, collection: 'Fields', tags: ['Animated', 'SMIL', 'Interference', 'Loom'], kind: 'anim-loom', size: 'hero', surface: '#e8e5ef', ink: '#292438', accent: '#8a6de3', animated: true, description: 'Two woven line fields slide through one another slowly enough for interference bands to appear and dissolve.' },
  { id: 'A-044', title: 'Pendulum Choir', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Pendulum', 'Phase'], kind: 'anim-pendulum', size: 'wide', surface: '#ebe7de', ink: '#29251e', accent: '#cc6e3e', animated: true, description: 'A row of pendulums swings at neighboring periods until order repeatedly slips into phase drift.' },
  { id: 'A-045', title: 'Kinetic Rose', year: 2026, collection: 'Generative', tags: ['Animated', 'SMIL', 'Rose', 'Rotation'], kind: 'anim-rose', size: 'tall', surface: '#efe2e8', ink: '#422832', accent: '#d96f99', animated: true, description: 'Counter-rotating petal systems produce a rose that appears to fold through itself without changing topology.' },
  { id: 'A-046', title: 'Scanner Field', year: 2026, collection: 'Fields', tags: ['Animated', 'SMIL', 'Scan', 'Signal'], kind: 'anim-scanner', size: 'wide', surface: '#dce9e7', ink: '#1e3834', accent: '#39a692', animated: true, description: 'A narrow scanning front crosses a restrained vector field and briefly excites each region it passes.' },
  { id: 'A-047', title: 'Elastic Aperture', year: 2026, collection: 'Geometry', tags: ['Animated', 'SMIL', 'Aperture', 'Scale'], kind: 'anim-aperture', size: 'hero', surface: '#e9e7e2', ink: '#222321', accent: '#5e7fc2', animated: true, description: 'Nested apertures expand at staggered rates, turning one stable frame into a slow elastic lens.' },
  { id: 'A-048', title: 'Drift Register', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Drift', 'Register'], kind: 'anim-drift', size: 'square', surface: '#171b1c', ink: '#edf0ef', accent: '#e5af4e', animated: true, description: 'Registration circles wander through sub-pixel-like offsets before periodically resolving into alignment.' },
  { id: 'A-049', title: 'Wave Gate', year: 2026, collection: 'Fields', tags: ['Animated', 'SMIL', 'Wave', 'Dash'], kind: 'anim-wavegate', size: 'wide', surface: '#e5e8f2', ink: '#242c4c', accent: '#626ed9', animated: true, description: 'Moving dash phases travel through a gated wave system, making static paths appear to carry energy.' },
  { id: 'A-050', title: 'Rotary Dial', year: 2026, collection: 'Geometry', tags: ['Animated', 'SMIL', 'Dial', 'Rotation'], kind: 'anim-dial', size: 'square', surface: '#eee9de', ink: '#25231d', accent: '#d0603f', animated: true, description: 'Two calibrated dial rings counter-rotate around a stationary index, producing a precise instrument-like motion.' },
  { id: 'A-051', title: 'Endless Conveyor', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Loop', 'Translation'], kind: 'anim-conveyor', size: 'wide', surface: '#e7e4dc', ink: '#292720', accent: '#df8b3d', animated: true, description: 'A repeating field of modules advances forever while one accent module travels against the flow.' },
  { id: 'A-052', title: 'Breathing Grid', year: 2026, collection: 'Fields', tags: ['Animated', 'SMIL', 'Grid', 'Elastic'], kind: 'anim-grid', size: 'hero', surface: '#e3ebe5', ink: '#26372c', accent: '#69a77a', animated: true, description: 'A strict grid expands and contracts anisotropically as if the coordinate system itself were breathing.' },
  { id: 'A-053', title: 'Sine Transit', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Transit', 'Path'], kind: 'anim-transit', size: 'wide', surface: '#e2e8ed', ink: '#21313d', accent: '#e7674a', animated: true, description: 'A bright transit point follows a continuous oscillating route while faint echoes move at neighboring speeds.' },
  { id: 'A-054', title: 'Blink Matrix', year: 2026, collection: 'Generative', tags: ['Animated', 'SMIL', 'Matrix', 'Sequence'], kind: 'anim-matrix', size: 'square', surface: '#121719', ink: '#dfe9e7', accent: '#64e0c0', animated: true, description: 'A matrix of restrained nodes blinks in a deterministic traveling sequence that never uses runtime randomness.' },
  { id: 'A-055', title: 'Tidal Contours', year: 2026, collection: 'Fields', tags: ['Animated', 'SMIL', 'Contour', 'Tide'], kind: 'anim-tide', size: 'tall', surface: '#e5e9e5', ink: '#2a3930', accent: '#559676', animated: true, description: 'Nested contours swell along alternating axes, giving a topographic drawing the rhythm of a tide.' },
  { id: 'A-056', title: 'Phase Engine', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Rotor', 'Phase'], kind: 'anim-engine', size: 'hero', surface: '#171718', ink: '#efebe5', accent: '#f0a13b', animated: true, description: 'Multiple rotors run in opposing phase relationships around a stable core like a diagram for an impossible machine.' },
  { id: 'A-057', title: 'Morph Ledger', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Morph', 'Path'], kind: 'anim-morph', size: 'wide', surface: '#ece8e1', ink: '#28231f', accent: '#d65b45', animated: true, description: 'A family of compatible paths continuously reshapes between ordered and unstable states.' },
  { id: 'A-058', title: 'Optical Shutter', year: 2026, collection: 'Geometry', tags: ['Animated', 'SMIL', 'Shutter', 'Aperture'], kind: 'anim-shutter', size: 'square', surface: '#17191b', ink: '#f0ede7', accent: '#79b8ff', animated: true, description: 'Rotating shutter blades open and close around a fixed optical center with mechanical precision.' },
  { id: 'A-059', title: 'Linked Phase', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Linkage', 'Mechanism'], kind: 'anim-chain', size: 'wide', surface: '#e9e5dc', ink: '#2c2922', accent: '#cc7c3d', animated: true, description: 'A deterministic chain of linked pivots transfers motion across the frame in delayed phase.' },
  { id: 'A-060', title: 'Radar Bloom', year: 2026, collection: 'Fields', tags: ['Animated', 'SMIL', 'Radar', 'Sweep'], kind: 'anim-radar', size: 'hero', surface: '#111816', ink: '#dfece6', accent: '#5ee2aa', animated: true, description: 'A radial sweep passes through concentric signal rings while echoes briefly illuminate behind it.' },
  { id: 'A-061', title: 'Chromatic Prism', year: 2026, collection: 'Geometry', tags: ['Animated', 'SMIL', 'Prism', 'Facet'], kind: 'anim-prism', size: 'tall', surface: '#eeeae4', ink: '#242327', accent: '#e65f78', animated: true, description: 'A faceted prism continuously shifts its internal planes while the outer silhouette remains disciplined.' },
  { id: 'A-062', title: 'Accordion Field', year: 2026, collection: 'Fields', tags: ['Animated', 'SMIL', 'Accordion', 'Compression'], kind: 'anim-accordion', size: 'wide', surface: '#e7ebe5', ink: '#28382f', accent: '#76a879', animated: true, description: 'Parallel bands compress and release in sequence, producing a soft mechanical wave across the field.' },
  { id: 'A-063', title: 'Breathing Lens', year: 2026, collection: 'Geometry', tags: ['Animated', 'SMIL', 'Lens', 'Refraction'], kind: 'anim-lens', size: 'hero', surface: '#e6e8ed', ink: '#252b38', accent: '#637ddd', animated: true, description: 'Two opposing lens curves breathe toward and away from one another, creating a slow optical pressure.' },
  { id: 'A-064', title: 'Signal Rain', year: 2026, collection: 'Generative', tags: ['Animated', 'SMIL', 'Rain', 'Signal'], kind: 'anim-rain', size: 'tall', surface: '#14191d', ink: '#e4ebef', accent: '#67c8ff', animated: true, description: 'A sparse rain of signal bars falls at deterministic intervals while one channel travels upward against the flow.' },
  { id: 'A-065', title: 'Helix Transit', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Helix', 'Transit'], kind: 'anim-helix', size: 'wide', surface: '#eee8ec', ink: '#382a34', accent: '#c46f9f', animated: true, description: 'Paired oscillating strands move through one another while transit points chase along the helix.' },
  { id: 'A-066', title: 'Tile Scanner', year: 2026, collection: 'Fields', tags: ['Animated', 'SMIL', 'Tiles', 'Scanner'], kind: 'anim-tilescan', size: 'square', surface: '#ebe8df', ink: '#29271f', accent: '#d78a3f', animated: true, description: 'A tiled matrix is activated column by column by a moving scan front.' },
  { id: 'A-067', title: 'Compass Drift', year: 2026, collection: 'Geometry', tags: ['Animated', 'SMIL', 'Compass', 'Needle'], kind: 'anim-compass', size: 'square', surface: '#e8e7e2', ink: '#22231f', accent: '#d35b48', animated: true, description: 'A calibrated compass needle drifts through several stable headings rather than spinning continuously.' },
  { id: 'A-068', title: 'Echo Pulse', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Echo', 'Pulse'], kind: 'anim-echo', size: 'hero', surface: '#171719', ink: '#eeece7', accent: '#b08cff', animated: true, description: 'A central pulse launches expanding echoes whose timing slowly slips out of synchronization.' },
  { id: 'A-069', title: 'Falling Cascade', year: 2026, collection: 'Generative', tags: ['Animated', 'SMIL', 'Cascade', 'Sequence'], kind: 'anim-cascade', size: 'tall', surface: '#e4e9e7', ink: '#243733', accent: '#5aa892', animated: true, description: 'A descending staircase of marks cascades through the frame and rebuilds itself from the top.' },
  { id: 'A-070', title: 'Piston Study', year: 2026, collection: 'Motion', tags: ['Animated', 'SMIL', 'Piston', 'Mechanical'], kind: 'anim-piston', size: 'wide', surface: '#ece8df', ink: '#29261f', accent: '#e06042', animated: true, description: 'A set of linked pistons cycles at neighboring periods to create a controlled mechanical rhythm.' },
  { id: 'A-071', title: 'Ripple Chamber', year: 2026, collection: 'Fields', tags: ['Animated', 'SMIL', 'Ripple', 'Propagation'], kind: 'anim-ripple', size: 'hero', surface: '#e2e9ed', ink: '#203440', accent: '#4f9ecf', animated: true, description: 'Offset ripple sources propagate through a shared chamber and repeatedly interfere.' },
  { id: 'A-072', title: 'Orbit Swarm', year: 2026, collection: 'Generative', tags: ['Animated', 'SMIL', 'Swarm', 'Orbit'], kind: 'anim-swarm', size: 'hero', surface: '#121719', ink: '#e8efed', accent: '#66d8b4', animated: true, description: 'A deterministic swarm of small bodies follows neighboring orbital paths without runtime randomness.' },
]

export const collections = ['All', 'Animated', 'Geometry', 'Generative', 'Fields', 'Motion'] as const
