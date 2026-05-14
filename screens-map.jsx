// Campus Map Hub — scrollable image-based map with overlay pins.

const CM = window.PIXEL_COLORS;

// Pin positions on the campus-map-v3.png image (1371 x 1147),
// expressed as percentages so they survive any image scale.
// Coordinates align with the image's pre-existing labels.
const MAP_NODES = [
  {
    id: 'great_hall',
    name: 'Great Hall',
    sub: 'Orientation',
    xPct: 31, yPct: 27,
    num: 1,
  },
  {
    id: 'service_center',
    name: 'Student Centre',
    sub: 'Identity & cards',
    xPct: 22.5, yPct: 57,
    num: 2,
  },
  {
    id: 'library',
    name: 'The Library',
    sub: 'Books & print',
    xPct: 58.5, yPct: 24,
    num: 3,
  },
  {
    id: 'club_fair',
    name: 'Club Fair',
    sub: 'Community',
    xPct: 67, yPct: 53,
    num: 4,
  },
  {
    id: 'classroom',
    name: 'Lecture Theatre',
    sub: 'First lecture',
    xPct: 91, yPct: 47,
    num: 5,
  },
];

// ─────────────────────────────────────────────────────────────
// CampusMapHub
// ─────────────────────────────────────────────────────────────
function CampusMapHub({ state, onEnter, onOpen }) {
  const completed = state.completedNodes;
  const visited = state.visitedNodes;
  const hasMap = state.inventory.includes('school_map');
  const recommend = recommendNext(state);
  const scrollerRef = React.useRef(null);

  // Image scale: render the 1371px image at ~820px wide so
  // it's clearly scrollable inside the phone viewport.
  const MAP_W = 820;
  const MAP_H = Math.round(MAP_W * (1147 / 1371));

  // On mount: center scroll on the recommended node (or Great Hall).
  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = MAP_NODES.find(n => n.id === (recommend || 'great_hall'));
    if (!target) return;
    const tx = (target.xPct / 100) * MAP_W - el.clientWidth / 2;
    const ty = (target.yPct / 100) * MAP_H - el.clientHeight / 2;
    el.scrollTo({ left: tx, top: ty, behavior: 'smooth' });
  }, [recommend, state.screen]);

  const nodeStatus = (id) => {
    if (completed.includes(id)) return 'completed';
    if (visited.includes(id)) return 'discovered';
    return 'locked';
  };

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${CM.skyL} 0%, ${CM.sky} 100%)`,
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Top bar with greeting + menu */}
      <MapTopBar state={state} onOpen={onOpen} />

      {/* Scrollable map canvas */}
      <div style={{
        flex: 1, margin: '0 12px',
        border: `3px solid ${CM.line}`,
        boxShadow: `4px 4px 0 ${CM.line}`,
        background: CM.sand500,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div
          ref={scrollerRef}
          style={{
            width: '100%', height: '100%',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div style={{
            position: 'relative',
            width: MAP_W,
            height: MAP_H,
          }}>
            <img
              src="assets/campus-map-v3.png"
              alt="Sandstone U campus map"
              width={MAP_W}
              height={MAP_H}
              draggable={false}
              style={{
                display: 'block',
                width: MAP_W,
                height: MAP_H,
                imageRendering: 'auto',
                userSelect: 'none',
              }}
            />

            {/* Pin overlays — just yellow stars on quest nodes */}
            {MAP_NODES.map(node => (
              <MapPin
                key={node.id}
                node={node}
                status={nodeStatus(node.id)}
                recommended={hasMap && recommend === node.id}
                onClick={() => onEnter(node.id)}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint badge */}
        <ScrollHintBadge hasMap={hasMap} />

        {/* Compass marker */}
        <div style={{
          position: 'absolute', right: 8, top: 8,
          fontFamily: 'Silkscreen, monospace',
          fontSize: 9, color: '#fff',
          background: 'rgba(42,30,18,0.75)',
          border: `2px solid ${CM.energy}`,
          padding: '3px 6px',
          pointerEvents: 'none',
        }}>
          N ↑ • DRAG TO PAN
        </div>
      </div>

      {/* Bottom: stats + next hint */}
      <MapBottomBar state={state} recommend={recommend} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ScrollHintBadge — appears once on first map view
// ─────────────────────────────────────────────────────────────
function ScrollHintBadge({ hasMap }) {
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setShow(false), 3200);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="blink" style={{
      position: 'absolute', left: '50%', bottom: 32, transform: 'translateX(-50%)',
      background: CM.jac700, color: '#fff',
      border: `3px solid ${CM.line}`, boxShadow: `3px 3px 0 ${CM.line}`,
      padding: '6px 10px',
      fontFamily: 'Silkscreen, monospace', fontSize: 10,
      pointerEvents: 'none', whiteSpace: 'nowrap',
    }}>
      ▲ SWIPE TO EXPLORE CAMPUS ▼
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MapPin — all 5 quest pins are YELLOW STARS. No text labels.
// Status barely changes the look (just a small overlay glyph).
// Recommended → animated waving mascot + GO HERE banner + sparkles.
// ─────────────────────────────────────────────────────────────
function MapPin({ node, status, recommended, onClick }) {
  const isRec = recommended;

  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: `${node.xPct}%`, top: `${node.yPct}%`,
        transform: 'translate(-50%, 14px)',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: isRec ? 10 : 5,
      }}
    >
      {/* Yellow star — always rendered first so position stays consistent */}
      <div
        className={isRec ? 'shimmer' : (status === 'discovered' ? 'floaty' : '')}
        style={{ position: 'relative', filter: status === 'locked' ? 'brightness(0.85)' : 'none' }}
      >
        {/* Floating "GO HERE" callout + waving mascot for the recommended node,
            absolutely positioned ABOVE the star so it doesn't push the star down */}
        {isRec && (
          <div style={{
            position: 'absolute',
            bottom: 'calc(100% + 4px)',
            left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <div className="floaty" style={{ marginBottom: 2 }}>
              <WavingMascot scale={2.4} />
            </div>
            <div className="blink" style={{
              fontFamily: 'Silkscreen, monospace', fontSize: 10, color: '#fff',
              background: CM.coral, padding: '3px 8px',
              border: `2px solid ${CM.line}`,
              boxShadow: `2px 2px 0 ${CM.line}`,
              whiteSpace: 'nowrap',
            }}>
              ♥ GO HERE!
            </div>
            <div style={{
              width: 0, height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: `7px solid ${CM.line}`,
              marginTop: -1,
            }} />
          </div>
        )}

        {/* Sparkles only on recommended */}
        {isRec && (
          <>
            <div style={{ position: 'absolute', top: -10, left: -12, zIndex: 2 }} className="blink">
              <Sparkle scale={2} color={CM.white} />
            </div>
            <div style={{ position: 'absolute', top: -4, right: -12, zIndex: 2 }} className="blink">
              <Sparkle scale={2} color={CM.energy} />
            </div>
          </>
        )}

        <StarSprite scale={3.6} color={'#FF3DA7'} dark={'#A8166B'} />

        {/* Tiny check on completed */}
        {status === 'completed' && (
          <div style={{
            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
            fontFamily: 'Press Start 2P, monospace', fontSize: 14,
            color: CM.prepD,
            textShadow: `1px 1px 0 ${CM.white}, -1px -1px 0 ${CM.white}, 1px -1px 0 ${CM.white}, -1px 1px 0 ${CM.white}`,
          }}>✓</div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Top bar
// ─────────────────────────────────────────────────────────────
function MapTopBar({ state, onOpen }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 12px',
      background: `linear-gradient(180deg, ${CM.jac700} 0%, ${CM.jac500} 100%)`,
      borderBottom: `3px solid ${CM.line}`,
    }}>
      <div style={{
        background: CM.sand100, border: `2px solid ${CM.line}`,
        padding: 2,
      }}>
        <Avatar id={state.player.avatar} scale={2} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'Silkscreen, monospace', fontSize: 9, color: CM.sand50,
        }}>HEY,</div>
        <div style={{
          fontFamily: 'Silkscreen, monospace', fontSize: 12, color: '#fff',
        }}>{state.player.nickname.toUpperCase()}</div>
      </div>
      <button
        className="px-btn"
        style={{ padding: '6px 8px', fontSize: 9, background: CM.energy }}
        onClick={() => onOpen('badges')}
      >
        ★ {state.badges.length}
      </button>
      <button
        className="px-btn"
        style={{ padding: '6px 8px', fontSize: 9, background: CM.prep, color: '#fff' }}
        onClick={() => onOpen('stats')}
      >
        ▤ STATS
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bottom bar — stats + next hint
// ─────────────────────────────────────────────────────────────
function MapBottomBar({ state, recommend }) {
  const recNode = MAP_NODES.find(n => n.id === recommend);
  const nextLabel = recNode
    ? `Next: ${recNode.name}`
    : (state.completedNodes.includes('classroom') ? 'Day complete!' : 'Pick a node above.');

  return (
    <div style={{
      padding: '10px 12px 12px',
      background: CM.jac900,
      color: '#fff',
      borderTop: `3px solid ${CM.line}`,
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <StatRow label="ENERGY" val={state.stats.energy} max={6} color={CM.energy} icon={<Bolt scale={2} />} />
        <StatRow label="STRESS" val={state.stats.stress} max={6} color={CM.stress} icon={<StressIcon scale={2} />} />
        <StatRow label="PREP"   val={state.stats.preparation} max={6} color={CM.prep} icon={<BookIcon scale={2} />} />
      </div>
      <div style={{
        marginTop: 2, padding: '4px 8px',
        background: 'rgba(255,255,255,0.08)',
        fontFamily: 'VT323, monospace', fontSize: 16, color: CM.sand50,
        borderLeft: `3px solid ${CM.energy}`,
      }}>
        ▶ {nextLabel}
      </div>
    </div>
  );
}

function StatRow({ label, val, max, color, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {icon}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 8 }}>{label}</div>
        <StatBarSimple value={val} max={max} color={color} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Recommendation logic — returns next recommended node id
// ─────────────────────────────────────────────────────────────
function recommendNext(state) {
  const completed = state.completedNodes;
  const inv = state.inventory;
  if (!completed.includes('great_hall')) return 'great_hall';
  if (!completed.includes('service_center')) return 'service_center';
  if (inv.includes('student_card') && !completed.includes('library')) return 'library';
  if (!completed.includes('club_fair')) return 'club_fair';
  if (!completed.includes('classroom')) return 'classroom';
  return null;
}

Object.assign(window, {
  CampusMapHub, MAP_NODES, recommendNext,
});
