// Meta screens — Badges, Stats / Activity Dashboard, Ending.

const CM2 = window.PIXEL_COLORS;

const BADGE_DEFS = [
  { id: 'orientation', name: 'Orientation', desc: 'Attended the opening lecture in the Great Hall.', node: 'great_hall' },
  { id: 'identity',    name: 'Identity',    desc: 'Got a student card. You exist on paper now.',     node: 'service_center' },
  { id: 'community',   name: 'Community',   desc: 'Joined a society at the Club Fair.',              node: 'club_fair' },
  { id: 'resource',    name: 'Resource',    desc: 'Borrowed, printed, computed — full library run.', node: 'library' },
  { id: 'class',       name: 'Class',       desc: 'Made it to your first lecture.',                  node: 'classroom' },
];

// ─────────────────────────────────────────────────────────────
// BADGES screen
// ─────────────────────────────────────────────────────────────
function BadgesScreen({ state, back }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${CM2.jac500} 0%, ${CM2.jac700} 100%)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <NodeHeader title="BADGE COLLECTION" sub={`${state.badges.length} / ${BADGE_DEFS.length} earned`} back={back} color={CM2.jac700} />
      <div style={{ flex: 1, padding: 14, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {BADGE_DEFS.map(b => {
          const earned = state.badges.includes(b.id);
          return (
            <div
              key={b.id}
              className={earned ? 'popin' : ''}
              style={{
                background: earned ? CM2.paper : 'rgba(255,255,255,0.12)',
                border: `3px solid ${CM2.line}`,
                boxShadow: earned ? `4px 4px 0 ${CM2.line}` : 'none',
                padding: 10, display: 'flex', gap: 10, alignItems: 'center',
                color: earned ? CM2.ink : 'rgba(255,255,255,0.7)',
              }}
            >
              <BadgeIcon kind={b.id} earned={earned} scale={4} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 12, letterSpacing: 0.5 }}>
                  {earned ? '★' : '☆'} {b.name.toUpperCase()} BADGE
                </div>
                <div style={{ fontFamily: 'VT323, monospace', fontSize: 14, marginTop: 4 }}>
                  {earned ? b.desc : `Locked — visit ${b.node.replace(/_/g, ' ')}.`}
                </div>
              </div>
            </div>
          );
        })}
        <button className="px-btn primary" onClick={back} style={{ width: '100%', marginTop: 10 }}>◀ BACK</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STATS DASHBOARD — current-run cloud read-back
// ─────────────────────────────────────────────────────────────
function StatsScreen({ state, back }) {
  const total = 5;
  const done = state.completedNodes.length;

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${CM2.prepD} 0%, #2a4f48 100%)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <NodeHeader title="STATS / ACTIVITY" sub="This semester's progress." back={back} color={CM2.prepD} />
      <div style={{ flex: 1, padding: 12, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Player card */}
        <div className="px-card" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{
            background: CM2.sand100, border: `3px solid ${CM2.line}`,
            padding: 4,
          }}>
            <Avatar id={state.player.avatar} scale={4} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 14, color: CM2.ink }}>
              {state.player.nickname.toUpperCase()}
            </div>
            <div style={{ fontFamily: 'VT323, monospace', fontSize: 14, color: CM2.inkSoft }}>
              First-year • Sandstone U
            </div>
            <div style={{ display: 'flex', gap: 3, marginTop: 4, flexWrap: 'wrap' }}>
              {state.player.interests.map(i => (
                <div key={i} style={{
                  fontFamily: 'Silkscreen, monospace', fontSize: 8,
                  background: CM2.jac500, color: '#fff',
                  padding: '1px 4px', border: `2px solid ${CM2.line}`,
                }}>{i.toUpperCase()}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="px-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 11 }}>QUESTS</div>
            <div style={{ fontFamily: 'VT323, monospace', fontSize: 18 }}><b>{done} / {total}</b></div>
          </div>
          <div style={{
            height: 18, background: CM2.ink,
            border: `3px solid ${CM2.line}`,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `repeating-linear-gradient(90deg, ${CM2.energy} 0 6px, ${CM2.energyD} 6px 12px)`,
              width: `${(done / total) * 100}%`,
              transition: 'width 200ms',
            }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, marginTop: 8 }}>
            {MAP_NODES.map(n => {
              const isDone = state.completedNodes.includes(n.id);
              return (
                <div key={n.id} style={{
                  background: isDone ? CM2.prep : 'rgba(255,255,255,0.6)',
                  border: `2px solid ${CM2.line}`,
                  padding: 4, textAlign: 'center',
                  fontFamily: 'Silkscreen, monospace', fontSize: 7,
                  color: isDone ? '#fff' : CM2.ink,
                }}>
                  {isDone ? '✓' : '◌'}<br />{n.name.split(' ')[0].toUpperCase()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status snapshot */}
        <div className="px-card">
          <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 11, marginBottom: 8 }}>STATUS SNAPSHOT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <StatBigRow label="ENERGY" val={state.stats.energy} color={CM2.energy} icon={<Bolt scale={3} />} />
            <StatBigRow label="STRESS" val={state.stats.stress} color={CM2.stress} icon={<StressIcon scale={3} />} />
            <StatBigRow label="PREP"   val={state.stats.preparation} color={CM2.prep} icon={<BookIcon scale={3} />} />
          </div>
        </div>

        {/* Inventory */}
        <div className="px-card">
          <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 11, marginBottom: 8 }}>INVENTORY</div>
          {state.inventory.length === 0 ? (
            <div style={{ fontFamily: 'VT323, monospace', fontSize: 16, color: CM2.inkSoft }}>
              Backpack is empty. Start at the Great Hall for your starter kit.
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {state.inventory.map(id => (
                <div key={id} style={{
                  background: CM2.sand100, border: `2px solid ${CM2.line}`,
                  padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  width: 70,
                }}>
                  <ItemSprite id={id} scale={2.4} />
                  <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 7, textAlign: 'center', marginTop: 2 }}>
                    {id.replace(/_/g, ' ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Badges row */}
        <div className="px-card">
          <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 11, marginBottom: 6 }}>BADGES</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {BADGE_DEFS.map(b => (
              <div key={b.id} style={{
                background: state.badges.includes(b.id) ? CM2.paper : '#dccdb0',
                border: `2px solid ${CM2.line}`, padding: 4,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                width: 56, opacity: state.badges.includes(b.id) ? 1 : 0.55,
              }}>
                <BadgeIcon kind={b.id} earned={state.badges.includes(b.id)} scale={2.4} />
                <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 7, marginTop: 2 }}>
                  {b.name.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity log */}
        <div className="px-card">
          <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 11, marginBottom: 6 }}>RECENT ACTIVITY</div>
          {state.activityLog.length === 0 ? (
            <div style={{ fontFamily: 'VT323, monospace', fontSize: 16, color: CM2.inkSoft }}>
              No events logged yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {state.activityLog.slice().reverse().slice(0, 6).map((e, i) => (
                <div key={i} style={{
                  fontFamily: 'VT323, monospace', fontSize: 14, color: CM2.ink,
                  borderLeft: `3px solid ${CM2.jac500}`, paddingLeft: 6,
                }}>
                  <span style={{ color: CM2.inkSoft }}>[{e.time}]</span> {e.message}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="px-btn primary" onClick={back} style={{ width: '100%' }}>◀ BACK TO MAP</button>
      </div>
    </div>
  );
}

function StatBigRow({ label, val, color, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {icon}
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'Silkscreen, monospace', fontSize: 9,
        }}>
          <span>{label}</span><span>{val}/6</span>
        </div>
        <StatBarSimple value={val} max={6} color={color} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ENDING SCREEN
// ─────────────────────────────────────────────────────────────
function determineEnding(state) {
  const prep = state.stats.preparation;
  const stress = state.stats.stress;
  const badges = state.badges.length;
  const hasAllPath = state.inventory.length >= 6;
  const hasCommunity = state.badges.includes('community');
  const wasLate = !state.inventory.includes('timetable');

  if (prep >= 5 && badges === 5 && stress <= 1) {
    return {
      id: 'balanced',
      title: 'Balanced Starter',
      icon: '★',
      color: CM2.energy,
      tagline: 'You handled day one like a third-year.',
      body: 'You did orientation, got your card, hit the library, found a community and made class on time. Every freshman should be so lucky. Tomorrow will be easier.',
    };
  }
  if (prep >= 4 && state.inventory.includes('course_book') && state.inventory.includes('printed_material')) {
    return {
      id: 'academic',
      title: 'Academic Explorer',
      icon: '✦',
      color: CM2.prep,
      tagline: 'Books first, vibes later.',
      body: 'You prioritised resources and content. Stress simmered but never boiled. You walk into your first tute the most prepared person in the room.',
    };
  }
  if (hasCommunity && state.completedNodes.includes('club_fair') && stress <= 3) {
    return {
      id: 'connector',
      title: 'Campus Connector',
      icon: '♥',
      color: CM2.stress,
      tagline: 'You made friends before you made enemies of the printer.',
      body: 'You spent more energy on people than paperwork. Your social calendar is fuller than your backpack, but that\'s on purpose.',
    };
  }
  return {
    id: 'survivor',
    title: 'Struggling Survivor',
    icon: '◇',
    color: CM2.inkSoft,
    tagline: 'You made it. Barely.',
    body: 'A few rooms locked you out. A few stops you skipped. Tomorrow you\'ll know what your student card unlocks — and what your timetable saves you from.',
  };
}

function EndingScreen({ state, restart }) {
  const ending = determineEnding(state);
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${ending.color} 0%, ${CM2.jac900} 100%)`,
      display: 'flex', flexDirection: 'column',
      padding: 18, position: 'relative', overflow: 'hidden',
    }}>
      <PixelStars />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ textAlign: 'center', marginTop: 12 }} className="popin">
          <div style={{
            fontFamily: 'Silkscreen, monospace', fontSize: 12, color: '#fff', letterSpacing: 1,
            opacity: 0.8,
          }}>YOUR ENDING</div>
          <div style={{
            fontFamily: 'Press Start 2P, monospace', fontSize: 56, color: '#fff',
            margin: '12px 0', textShadow: `3px 3px 0 ${CM2.jac900}`,
          }}>{ending.icon}</div>
          <div style={{
            fontFamily: 'Press Start 2P, monospace', fontSize: 14, color: '#fff',
            textShadow: `2px 2px 0 ${CM2.jac900}`,
          }}>{ending.title.toUpperCase()}</div>
          <div style={{
            fontFamily: 'VT323, monospace', fontSize: 18, color: '#fff',
            marginTop: 8, opacity: 0.9,
          }}>{ending.tagline}</div>
        </div>

        <div className="px-card" style={{ marginTop: 18 }}>
          <div style={{ fontFamily: 'VT323, monospace', fontSize: 18, color: CM2.ink, lineHeight: 1.2 }}>
            {ending.body}
          </div>
        </div>

        <div className="px-card" style={{ marginTop: 12, background: 'rgba(255,255,255,0.85)' }}>
          <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 10, color: CM2.ink, marginBottom: 6 }}>
            ◆ FINAL SUMMARY
          </div>
          <SummaryRow label="QUESTS"  value={`${state.completedNodes.length}/5`} />
          <SummaryRow label="BADGES"  value={`${state.badges.length}/5`} />
          <SummaryRow label="ITEMS"   value={`${state.inventory.length}/7`} />
          <SummaryRow label="ENERGY"  value={`${state.stats.energy}/6`} />
          <SummaryRow label="STRESS"  value={`${state.stats.stress}/6`} />
          <SummaryRow label="PREP"    value={`${state.stats.preparation}/6`} />
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="px-btn" onClick={restart} style={{ flex: 1 }}>↻ NEW RUN</button>
          <button className="px-btn primary" onClick={restart} style={{ flex: 2 }}>◆ THE END ▶</button>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      fontFamily: 'VT323, monospace', fontSize: 16, color: CM2.ink,
      padding: '2px 0', borderBottom: `1px dashed ${CM2.inkSoft}`,
    }}>
      <span>{label}</span><b>{value}</b>
    </div>
  );
}

Object.assign(window, {
  BadgesScreen, StatsScreen, EndingScreen, determineEnding, BADGE_DEFS,
});
