// Node screens — Great Hall, Student Service Center, Club Fair, Library, Classroom.

const CN = window.PIXEL_COLORS;

// ─────────────────────────────────────────────────────────────
// Generic node header
// ─────────────────────────────────────────────────────────────
function NodeHeader({ title, sub, back, color = CN.jac500 }) {
  return (
    <div style={{
      padding: '10px 12px',
      background: color, color: '#fff',
      borderBottom: `3px solid ${CN.line}`,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <button
        onClick={back}
        className="px-btn"
        style={{ padding: '4px 8px', fontSize: 10, background: CN.paper, color: CN.ink, boxShadow: `2px 2px 0 ${CN.line}` }}
      >◀ MAP</button>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 13, letterSpacing: 0.5 }}>{title}</div>
        {sub && <div style={{ fontFamily: 'VT323, monospace', fontSize: 14, opacity: 0.85 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// GREAT HALL — Orientation
// ═══════════════════════════════════════════════════════════════
function GreatHallScreen({ state, back, dispatch, pushToast }) {
  const done = state.completedNodes.includes('great_hall');
  const [step, setStep] = React.useState(done ? 'done' : 'intro');

  const onAttend = () => {
    setStep('attending');
    setTimeout(() => setStep('reward'), 1400);
  };

  const onClaim = () => {
    dispatch({ type: 'COMPLETE_GREAT_HALL' });
    pushToast('+ school_map  + timetable  STRESS -2');
    setStep('done');
  };

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${CN.jac700} 0%, ${CN.jac500} 60%, ${CN.sand200} 100%)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <NodeHeader title="GREAT HALL" sub="The orientation lecture is starting." back={back} color={CN.jac700} />

      <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
        {/* Stage scene */}
        <div style={{
          background: `linear-gradient(180deg, ${CN.jac300} 0%, ${CN.sand200} 100%)`,
          border: `3px solid ${CN.line}`,
          boxShadow: `4px 4px 0 ${CN.line}`,
          padding: 16, position: 'relative', overflow: 'hidden',
        }}>
          {/* Cute clouds */}
          <div style={{ position: 'absolute', top: 8, left: 10, opacity: 0.9 }} className="floaty">
            <CloudSprite scale={2} />
          </div>
          <div style={{ position: 'absolute', top: 22, right: 10 }} className="floaty">
            <CloudSprite scale={1.6} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            <div className="floaty"><GreatHall scale={4} /></div>
          </div>
          {/* Pixel crowd */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 8, position: 'relative', zIndex: 2 }}>
            {[3, 1, 2, 0, 5].map(i => <Avatar key={i} id={i} scale={1.5} />)}
          </div>
        </div>

        {step === 'intro' && (
          <>
            <DialogBox speaker="DEAN PIXLE">
              "Welcome, freshmen! Take a seat. Today I'll hand each of you a campus map and a class timetable — your two starter items."
            </DialogBox>
            <QuestBanner
              title="◆ QUEST: ATTEND ORIENTATION"
              sub="Stay for the lecture to claim school_map + timetable."
              color={CN.jac700}
            />
            <button className="px-btn primary" onClick={onAttend} style={{ width: '100%' }}>
              ▶ TAKE YOUR SEAT
            </button>
          </>
        )}

        {step === 'attending' && (
          <>
            <DialogBox>
              <Typewriter text="...The clock tower bell rings. The Dean speaks. The hall is full of murmuring students..." />
            </DialogBox>
            <div style={{
              display: 'flex', justifyContent: 'center',
              fontFamily: 'Silkscreen, monospace', fontSize: 11, color: '#fff',
              padding: 6, background: CN.jac900,
            }} className="blink">
              ◌ LISTENING ◌
            </div>
          </>
        )}

        {step === 'reward' && (
          <div className="popin" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <QuestBanner title="◆ LECTURE COMPLETE" sub="The Dean hands you two items." color={CN.energy} />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <ItemDrop item="school_map" />
              <ItemDrop item="timetable" />
            </div>
            <div style={{
              background: CN.paper, border: `3px solid ${CN.line}`,
              padding: 10, boxShadow: `4px 4px 0 ${CN.line}`,
              fontFamily: 'VT323, monospace', fontSize: 16, color: CN.ink,
            }}>
              <b>Effects:</b><br />
              ⬇ STRESS -1 (map clarity)<br />
              ⬇ STRESS -1 (timetable confidence)<br />
              ⚡ Successful tasks no longer cost energy<br />
              ⏰ You'll be on time for class
            </div>
            <button className="px-btn primary" onClick={onClaim} style={{ width: '100%' }}>
              ◆ TAKE ITEMS & RETURN TO MAP
            </button>
          </div>
        )}

        {step === 'done' && (
          <>
            <DialogBox speaker="DEAN PIXLE">"You're all sorted, freshie. Off to explore the quad!"</DialogBox>
            <QuestBanner title="✓ ORIENTATION COMPLETE" color={CN.prepD} />
            <button className="px-btn" onClick={back} style={{ width: '100%' }}>◀ BACK TO MAP</button>
          </>
        )}
      </div>
    </div>
  );
}

function Typewriter({ text }) {
  const out = useTypewriter(text, 24);
  return <span>{out}<span className="blink">▌</span></span>;
}

// ItemDrop card
function ItemDrop({ item }) {
  return (
    <div style={{
      background: CN.sand100, border: `3px solid ${CN.line}`,
      padding: 8, boxShadow: `3px 3px 0 ${CN.line}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      minWidth: 84,
    }} className="floaty">
      <ItemSprite id={item} scale={4} />
      <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 9, color: CN.ink, textAlign: 'center' }}>
        + {item.replace(/_/g, ' ').toUpperCase()}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STUDENT SERVICE CENTER — drag forms, long-press to activate card
// ═══════════════════════════════════════════════════════════════
function ServiceCenterScreen({ state, back, dispatch, pushToast }) {
  const done = state.completedNodes.includes('service_center');
  // Phases: 'queue' → 'forms' → 'activate' → 'reward' / 'done'
  const [phase, setPhase] = React.useState(done ? 'done' : 'queue');

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${CN.sand100} 0%, ${CN.sand200} 100%)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <NodeHeader title="STUDENT SERVICE CENTER" sub="Fluorescent lights. Numbered queues." back={back} color={CN.sand500} />

      <div style={{ flex: 1, padding: 12, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {phase === 'queue' && <SSCQueue onContinue={() => setPhase('forms')} />}
        {phase === 'forms' && <SSCForms onContinue={() => setPhase('activate')} />}
        {phase === 'activate' && <SSCActivate onContinue={() => setPhase('reward')} />}
        {phase === 'reward' && (
          <div className="popin" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <QuestBanner title="◆ IDENTITY CONFIRMED" sub="Take your items, freshie." color={CN.prepD} />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <ItemDrop item="student_card" />
              <ItemDrop item="certificated_calculator" />
            </div>
            <div className="px-card" style={{ fontFamily: 'VT323, monospace', fontSize: 16 }}>
              <b>Effects:</b><br />
              📈 PREPARATION +1 (student card)<br />
              ⚡ ENERGY +1 (calculator boost)<br />
              ⬇ ENERGY -1 (queue tax)<br />
              ★ Earned: Identity Badge
            </div>
            <button className="px-btn primary" onClick={() => {
              dispatch({ type: 'COMPLETE_SERVICE_CENTER' });
              pushToast('+ student_card  + calculator  ★ Identity Badge');
              setPhase('done');
            }} style={{ width: '100%' }}>◆ HEAD BACK</button>
          </div>
        )}
        {phase === 'done' && (
          <>
            <DialogBox speaker="CLERK PIP">"All sorted. Next!"</DialogBox>
            <QuestBanner title="✓ SERVICE CENTER COMPLETE" color={CN.prepD} />
            <button className="px-btn" onClick={back} style={{ width: '100%' }}>◀ BACK TO MAP</button>
          </>
        )}
      </div>
    </div>
  );
}

function SSCQueue({ onContinue }) {
  return (
    <>
      <DialogBox speaker="CLERK PIP">"Please draw a number. Step up when called."</DialogBox>
      <div style={{
        background: CN.paper, border: `3px solid ${CN.line}`,
        padding: 12, boxShadow: `4px 4px 0 ${CN.line}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 10, color: CN.ink }}>NOW SERVING</div>
        <div style={{
          fontFamily: 'Press Start 2P, monospace', fontSize: 48, color: CN.stress,
        }} className="blink">042</div>
        <div style={{ fontFamily: 'VT323, monospace', fontSize: 18, color: CN.ink }}>You are <b>#043</b>.</div>
        <div style={{
          width: '100%', height: 16,
          background: '#fff', border: `3px solid ${CN.line}`,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `repeating-linear-gradient(90deg, ${CN.jac500} 0 6px, ${CN.jac700} 6px 12px)`,
            animation: 'shimmer 1.2s linear infinite',
            width: '95%',
          }} />
        </div>
      </div>
      <button className="px-btn primary" onClick={onContinue} style={{ width: '100%' }}>
        ◆ STEP UP TO COUNTER
      </button>
    </>
  );
}

// ─── Drag the right form to the right counter ───
function SSCForms({ onContinue }) {
  // Three forms must be matched to three windows.
  const PAIRS = [
    { id: 'enrol',   color: CN.jac500, label: 'ENROLMENT' },
    { id: 'photo',   color: CN.energy, label: 'PHOTO ID' },
    { id: 'finance', color: CN.prep,   label: 'FINANCE' },
  ];

  const [placed, setPlaced] = React.useState({}); // formId -> windowId
  const [drag, setDrag] = React.useState(null);

  const allDone = PAIRS.every(p => placed[p.id] === p.id);

  const onDragStart = (id) => setDrag(id);
  const onDrop = (windowId) => {
    if (!drag) return;
    setPlaced(prev => ({ ...prev, [drag]: windowId }));
    setDrag(null);
  };

  return (
    <>
      <DialogBox speaker="CLERK PIP">"Place each form at the matching counter. Color = window."</DialogBox>
      {/* Counters */}
      <div style={{ display: 'flex', gap: 8 }}>
        {PAIRS.map(p => {
          const placedHere = Object.entries(placed).find(([f, w]) => w === p.id);
          const correct = placedHere && placedHere[0] === p.id;
          return (
            <div
              key={p.id}
              onDragOver={e => e.preventDefault()}
              onDrop={() => onDrop(p.id)}
              style={{
                flex: 1, height: 80,
                background: p.color, color: '#fff',
                border: `3px solid ${CN.line}`,
                boxShadow: `3px 3px 0 ${CN.line}`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Silkscreen, monospace', fontSize: 9, padding: 4,
                position: 'relative',
              }}
            >
              <div>{p.label}</div>
              <div style={{ fontFamily: 'VT323, monospace', fontSize: 14 }}>window</div>
              {placedHere && (
                <div style={{
                  position: 'absolute', top: 4, right: 4,
                  background: correct ? CN.prepD : CN.stress,
                  width: 16, height: 16, color: '#fff',
                  fontFamily: 'Silkscreen, monospace', fontSize: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${CN.line}`,
                }}>{correct ? '✓' : '✗'}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Forms (draggables) */}
      <div className="px-card" style={{ padding: 10 }}>
        <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 10, color: CN.ink, marginBottom: 6 }}>
          ▼ DRAG FORMS TO MATCHING WINDOWS
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {PAIRS.map(p => (
            <div
              key={p.id}
              draggable={!placed[p.id]}
              onDragStart={() => onDragStart(p.id)}
              onDragEnd={() => setDrag(null)}
              style={{
                width: 72, height: 90,
                background: placed[p.id] ? '#dcd0b3' : '#fff',
                border: `3px solid ${CN.line}`,
                boxShadow: `3px 3px 0 ${CN.line}`,
                position: 'relative',
                cursor: placed[p.id] ? 'not-allowed' : 'grab',
                opacity: placed[p.id] ? 0.4 : 1,
              }}
            >
              <div style={{
                background: p.color, height: 16,
                borderBottom: `3px solid ${CN.line}`,
              }} />
              <div style={{
                fontFamily: 'Silkscreen, monospace', fontSize: 8,
                color: CN.ink, padding: 4,
              }}>{p.label}</div>
              <div style={{
                margin: '4px 6px',
                height: 4, background: '#bbb',
              }} />
              <div style={{
                margin: '4px 6px',
                height: 4, background: '#bbb',
              }} />
              <div style={{
                margin: '4px 6px',
                height: 4, background: '#bbb', width: '60%',
              }} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="px-btn primary"
        onClick={onContinue}
        disabled={!allDone}
        style={{ width: '100%' }}
      >
        {allDone ? '◆ SUBMIT FORMS' : '◌ MATCH ALL FORMS'}
      </button>
    </>
  );
}

// ─── Long-press the new student card to activate ───
function SSCActivate({ onContinue }) {
  const [holding, setHolding] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [activated, setActivated] = React.useState(false);
  const rafRef = React.useRef(null);
  const startRef = React.useRef(0);

  const start = () => {
    setHolding(true);
    startRef.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const p = Math.min(1, elapsed / 1500);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setActivated(true);
        setHolding(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };
  const stop = () => {
    setHolding(false);
    if (!activated) setProgress(0);
    cancelAnimationFrame(rafRef.current);
  };

  return (
    <>
      <DialogBox speaker="CLERK PIP">"Press and hold your card on the reader until the chip glows."</DialogBox>

      <div style={{
        background: `linear-gradient(180deg, ${CN.jac100} 0%, ${CN.mint} 100%)`,
        border: `3px solid ${CN.line}`,
        boxShadow: `4px 4px 0 ${CN.line}`,
        padding: 20, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 12,
      }}>
        {/* Reader pad */}
        <div style={{
          width: 200, height: 100,
          background: CN.sand500, border: `3px solid ${CN.line}`,
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* glowing inner pad */}
          <div style={{
            width: 130, height: 60,
            background: activated ? CN.prep : (holding ? CN.energy : '#5a4634'),
            border: `2px solid ${CN.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Silkscreen, monospace', fontSize: 10, color: '#fff',
            transition: 'background 80ms',
          }}>
            {activated ? '✓ ACTIVATED' : 'READER'}
          </div>
          {/* progress fill */}
          <div style={{
            position: 'absolute', left: 0, bottom: 0, height: 6,
            background: CN.energy,
            width: `${progress * 100}%`,
            transition: 'width 60ms linear',
          }} />
        </div>

        {/* Card */}
        <div
          onMouseDown={!activated ? start : undefined}
          onMouseUp={stop}
          onMouseLeave={stop}
          onTouchStart={!activated ? start : undefined}
          onTouchEnd={stop}
          style={{
            cursor: activated ? 'default' : 'pointer',
            transform: holding ? 'translateY(2px)' : 'none',
            userSelect: 'none',
          }}
        >
          <div style={{
            background: CN.sand200, border: `3px solid ${CN.line}`,
            boxShadow: `4px 4px 0 ${CN.line}`,
            width: 200, padding: 8,
            position: 'relative',
          }}>
            <div style={{
              fontFamily: 'Silkscreen, monospace', fontSize: 8, color: CN.ink, marginBottom: 4,
            }}>SANDSTONE U STUDENT</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar id={0} scale={2} />
              <div style={{ flex: 1, fontFamily: 'VT323, monospace', fontSize: 14, color: CN.ink }}>
                ID 24·4242<br/>
                FIRST YEAR
              </div>
            </div>
            <div style={{
              position: 'absolute', top: 4, right: 4,
              width: 14, height: 14,
              background: activated ? CN.prep : CN.energy,
              border: `2px solid ${CN.line}`,
            }} className={activated ? 'shimmer' : 'blink'} />
          </div>
        </div>
        <div style={{
          fontFamily: 'Silkscreen, monospace', fontSize: 9, color: '#fff',
          textAlign: 'center',
        }}>
          {activated ? '★ CHIP GLOWING' : holding ? '◌ HOLD STEADY...' : '▼ PRESS & HOLD CARD ON READER'}
        </div>
      </div>

      <button
        className="px-btn primary"
        onClick={onContinue}
        disabled={!activated}
        style={{ width: '100%' }}
      >
        {activated ? '◆ CARD ACTIVATED — CONTINUE' : '◌ ACTIVATE CARD FIRST'}
      </button>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// CLUB FAIR — pick a path
// ═══════════════════════════════════════════════════════════════
const CLUB_PATHS = [
  {
    id: 'academic',
    name: 'Academic Path',
    sub: 'Debate, Chess, Maths society',
    effect: 'PREPARATION +2',
    color: '#4FB6A3',
    icon: '✦',
  },
  {
    id: 'social',
    name: 'Social Path',
    sub: 'Tea club, Anime cafe, Photo walk',
    effect: 'STRESS -2',
    color: '#E85D5D',
    icon: '♥',
  },
  {
    id: 'sport',
    name: 'Sport Path',
    sub: 'Rowing, Rugby, Climbing club',
    effect: 'ENERGY +2',
    color: '#F4B942',
    icon: '⚑',
  },
];

function ClubFairScreen({ state, back, dispatch, pushToast }) {
  const done = state.completedNodes.includes('club_fair');
  const [picked, setPicked] = React.useState(null);
  const [phase, setPhase] = React.useState(done ? 'done' : 'choose'); // choose / confirm / done

  const onConfirm = () => {
    dispatch({ type: 'COMPLETE_CLUB_FAIR', path: picked.id });
    pushToast(`◆ Joined ${picked.name} — ${picked.effect}`);
    setPhase('done');
  };

  // Recommend based on interests
  const recommended = recommendClubPath(state);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${CN.grass} 0%, ${CN.grassD} 100%)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <NodeHeader title="CLUB FAIR" sub="The quad is alive with banners and free pizza." back={back} color={CN.stress} />

      <div style={{ flex: 1, padding: 12, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Scene */}
        <div style={{
          background: '#3a4d2a', border: `3px solid ${CN.line}`,
          padding: 12, display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end',
          boxShadow: `4px 4px 0 ${CN.line}`,
        }}>
          <ClubFairTent scale={2.4} />
          <ClubFairTent scale={2.4} />
          <ClubFairTent scale={2.4} />
        </div>

        {phase !== 'done' && (
          <DialogBox speaker="O-WEEK REP">
            {`"Hey ${state.player.nickname}! You can only join one path today — choose wisely."`}
          </DialogBox>
        )}

        {phase === 'choose' && (
          <>
            {CLUB_PATHS.map(p => {
              const isRec = recommended === p.id;
              const isPicked = picked && picked.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setPicked(p)}
                  style={{
                    background: isPicked ? p.color : CN.paper,
                    color: isPicked ? '#fff' : CN.ink,
                    border: `3px solid ${CN.line}`,
                    boxShadow: isPicked ? `inset 3px 3px 0 ${CN.line}` : `4px 4px 0 ${CN.line}`,
                    padding: 10,
                    cursor: 'pointer',
                    display: 'flex', gap: 10, alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: 44, height: 44,
                    background: p.color,
                    border: `3px solid ${CN.line}`,
                    color: '#fff', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Press Start 2P, monospace', fontSize: 18,
                  }}>{p.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 11 }}>{p.name.toUpperCase()}</div>
                    <div style={{ fontFamily: 'VT323, monospace', fontSize: 14 }}>{p.sub}</div>
                    <div style={{
                      marginTop: 4, fontFamily: 'Silkscreen, monospace', fontSize: 10,
                      color: isPicked ? '#fff' : p.color,
                    }}>◆ {p.effect}</div>
                  </div>
                  {isRec && (
                    <div style={{
                      position: 'absolute', top: -10, right: -6,
                      background: CN.energy, color: CN.ink,
                      border: `2px solid ${CN.line}`,
                      fontFamily: 'Silkscreen, monospace', fontSize: 8,
                      padding: '2px 4px',
                    }}>FOR YOU</div>
                  )}
                </div>
              );
            })}

            <button
              className="px-btn primary"
              disabled={!picked}
              onClick={() => setPhase('confirm')}
              style={{ width: '100%' }}
            >
              {picked ? `◆ JOIN ${picked.name.toUpperCase()}` : '◌ PICK A PATH'}
            </button>
          </>
        )}

        {phase === 'confirm' && picked && (
          <>
            <QuestBanner
              title={`◆ JOINING ${picked.name.toUpperCase()}`}
              sub="Sign the membership card to confirm."
              color={picked.color}
            />
            <div style={{
              background: CN.paper, border: `3px dashed ${CN.line}`,
              padding: 14, textAlign: 'center',
              boxShadow: `4px 4px 0 ${CN.line}`,
            }}>
              <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 10, color: CN.ink, marginBottom: 8 }}>
                MEMBERSHIP CARD — {picked.name.toUpperCase()}
              </div>
              <div style={{
                fontFamily: 'VT323, monospace', fontSize: 36, color: picked.color,
                borderBottom: `2px solid ${CN.line}`, paddingBottom: 4,
              }}>~ {state.player.nickname} ~</div>
              <div style={{ fontFamily: 'VT323, monospace', fontSize: 14, color: CN.inkSoft, marginTop: 8 }}>
                Effect: {picked.effect}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="px-btn" onClick={() => setPhase('choose')} style={{ flex: 1 }}>◀ CHANGE</button>
              <button className="px-btn primary" onClick={onConfirm} style={{ flex: 2 }}>◆ CONFIRM JOIN</button>
            </div>
          </>
        )}

        {phase === 'done' && (
          <>
            <QuestBanner title="✓ CLUB JOINED" sub="★ Community Badge earned" color={CN.prepD} />
            <DialogBox>"You leave with a free tote bag and your new community calendar."</DialogBox>
            <button className="px-btn" onClick={back} style={{ width: '100%' }}>◀ BACK TO MAP</button>
          </>
        )}
      </div>
    </div>
  );
}

function recommendClubPath(state) {
  const ints = state.player.interests;
  if (ints.includes('academic') || ints.includes('tech')) return 'academic';
  if (ints.includes('sports') || ints.includes('outdoors')) return 'sport';
  return 'social';
}

// ═══════════════════════════════════════════════════════════════
// LIBRARY — borrow + print
// ═══════════════════════════════════════════════════════════════
function LibraryScreen({ state, back, dispatch, pushToast }) {
  const done = state.completedNodes.includes('library');
  const hasCard = state.inventory.includes('student_card');

  // 'gate' (no card) → result; with card: 'lobby' → 'borrow' → 'print' → 'reward' → 'done'
  const [phase, setPhase] = React.useState(() => {
    if (done) return 'done';
    if (!hasCard) return 'denied';
    return 'lobby';
  });

  // borrow phase: pick the right book by filter
  // print phase: queue ordering

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${CN.sand100} 0%, ${CN.sand300} 100%)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <NodeHeader title="FISHER-TIER LIBRARY" sub="Smells like old paper and ambition." back={back} color={CN.prepD} />

      <div style={{ flex: 1, padding: 12, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {phase === 'denied' && <LibraryDenied dispatch={dispatch} pushToast={pushToast} onContinue={() => { setPhase('done-denied'); }} />}
        {phase === 'done-denied' && (
          <>
            <QuestBanner title="✗ LIBRARY LOCKED" sub="Come back with a student_card." color={CN.stress} />
            <button className="px-btn" onClick={back} style={{ width: '100%' }}>◀ BACK TO MAP</button>
          </>
        )}
        {phase === 'lobby' && <LibraryLobby onBorrow={() => setPhase('borrow')} />}
        {phase === 'borrow' && <LibraryBorrow onDone={() => setPhase('print')} />}
        {phase === 'print' && <LibraryPrint onDone={() => setPhase('reward')} />}
        {phase === 'reward' && (
          <div className="popin" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <QuestBanner title="◆ LIBRARY RUN COMPLETE" color={CN.energy} />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <ItemDrop item="course_book" />
              <ItemDrop item="computer" />
              <ItemDrop item="printed_material" />
            </div>
            <div className="px-card" style={{ fontFamily: 'VT323, monospace', fontSize: 16 }}>
              <b>Effects:</b><br />
              📈 PREPARATION +2 (book + printout)<br />
              ⚡ Energy refilled (computer access)<br />
              ★ Earned: Resource Badge
            </div>
            <button className="px-btn primary" onClick={() => {
              dispatch({ type: 'COMPLETE_LIBRARY' });
              pushToast('+ course_book +computer +printed_material  ★ Resource');
              setPhase('done');
            }} style={{ width: '100%' }}>◆ HEAD BACK</button>
          </div>
        )}
        {phase === 'done' && (
          <>
            <DialogBox speaker="LIBRARIAN OWL">"Hoo. Use the book wisely."</DialogBox>
            <QuestBanner title="✓ LIBRARY COMPLETE" color={CN.prepD} />
            <button className="px-btn" onClick={back} style={{ width: '100%' }}>◀ BACK TO MAP</button>
          </>
        )}
      </div>
    </div>
  );
}

function LibraryDenied({ dispatch, pushToast, onContinue }) {
  const fired = React.useRef(false);
  React.useEffect(() => {
    if (!fired.current) {
      fired.current = true;
      dispatch({ type: 'LIBRARY_DENIED' });
      pushToast('✗ Library access denied — STRESS +1');
    }
  }, []);
  return (
    <>
      <div style={{
        background: `linear-gradient(180deg, ${CN.sand200} 0%, ${CN.sand300} 100%)`,
        border: `3px solid ${CN.line}`,
        padding: 14, color: CN.ink, textAlign: 'center',
        boxShadow: `4px 4px 0 ${CN.line}`,
      }}>
        <Library scale={3} />
        <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 11, color: CN.stress, marginTop: 8 }}>
          ✗ ACCESS DENIED
        </div>
        <div style={{ fontFamily: 'VT323, monospace', fontSize: 18, marginTop: 4 }}>
          STUDENT CARD REQUIRED
        </div>
      </div>
      <DialogBox speaker="LIBRARIAN OWL">
        "Hoo there. No card, no books. You now know what is required here — come back when you've visited Student Services."
      </DialogBox>
      <div className="px-card" style={{ fontFamily: 'VT323, monospace', fontSize: 16 }}>
        ⬇ ENERGY -1 (wasted trip)<br />
        ⬆ STRESS +1<br />
        ⚑ Library now Discovered on map
      </div>
      <button className="px-btn" onClick={onContinue} style={{ width: '100%' }}>◀ TURN AROUND</button>
    </>
  );
}

function LibraryLobby({ onBorrow }) {
  return (
    <>
      <DialogBox speaker="LIBRARIAN OWL">
        "Welcome. First borrow your textbook, then print your handout. Card ready, hoo?"
      </DialogBox>
      <div style={{
        background: CN.paper, border: `3px solid ${CN.line}`,
        padding: 12, boxShadow: `4px 4px 0 ${CN.line}`,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
      }}>
        <LobbyStation icon="📖" label="BORROW BOOK" status="next" />
        <LobbyStation icon="🖨" label="PRINT FILE"  status="locked" />
      </div>
      <button className="px-btn primary" onClick={onBorrow} style={{ width: '100%' }}>
        ◆ START AT BORROW DESK
      </button>
    </>
  );
}

function LobbyStation({ icon, label, status }) {
  return (
    <div style={{
      background: status === 'next' ? CN.jac500 : '#bbae90',
      color: '#fff',
      border: `3px solid ${CN.line}`,
      padding: 10, textAlign: 'center',
    }}>
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 9 }}>{label}</div>
      <div style={{ fontFamily: 'VT323, monospace', fontSize: 14, marginTop: 4 }}>
        {status === 'next' ? '▶ NOW' : '◌ NEXT'}
      </div>
    </div>
  );
}

// Borrow Book mini-puzzle: pick the book matching the filter
function LibraryBorrow({ onDone }) {
  const BOOKS = [
    { id: 1, title: 'Pixel Calculus 101', code: 'MATH1001', match: true,  color: CN.jac500 },
    { id: 2, title: 'Tales of Sandstone',  code: 'LIT2002',  match: false, color: CN.stress },
    { id: 3, title: 'Intro to Architecting', code: 'ENG1010', match: false, color: CN.prep },
    { id: 4, title: 'Astro Cooking Basics',  code: 'CHEF1234', match: false, color: CN.energy },
  ];
  const [picked, setPicked] = React.useState(null);
  const [err, setErr] = React.useState('');

  const tryBorrow = () => {
    if (!picked) return;
    if (picked.match) onDone();
    else setErr(`Not your textbook — that's a ${picked.title}.`);
  };

  return (
    <>
      <DialogBox speaker="CATALOGUE">
        "Filter: MATH1001 — Calculus. Find the book on the shelf that matches."
      </DialogBox>
      <div className="px-card">
        <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 10, marginBottom: 8 }}>
          ▼ TODAY'S SHELF
        </div>
        <div style={{ display: 'flex', gap: 4, padding: 6, background: '#5C3F22', border: `3px solid ${CN.line}` }}>
          {BOOKS.map(b => (
            <div
              key={b.id}
              onClick={() => { setPicked(b); setErr(''); }}
              style={{
                background: b.color, color: '#fff',
                width: 36, height: 110,
                border: `3px solid ${CN.line}`,
                boxShadow: picked?.id === b.id ? `inset 2px 2px 0 ${CN.line}` : 'none',
                cursor: 'pointer',
                display: 'flex', alignItems: 'flex-end',
                fontFamily: 'Silkscreen, monospace', fontSize: 8,
                writingMode: 'vertical-rl', textOrientation: 'mixed',
                padding: 4, transform: picked?.id === b.id ? 'translateY(-6px)' : 'none',
                transition: 'transform 80ms',
              }}
            >
              {b.code}
            </div>
          ))}
        </div>
        {picked && (
          <div style={{
            marginTop: 8, padding: 6,
            background: CN.sand100, border: `2px solid ${CN.line}`,
            fontFamily: 'VT323, monospace', fontSize: 16,
          }}>
            ▸ Selected: <b>{picked.title}</b> ({picked.code})
          </div>
        )}
        {err && <div style={{
          marginTop: 6, color: CN.stress, fontFamily: 'VT323, monospace', fontSize: 16,
        }}>{err}</div>}
      </div>
      <button className="px-btn primary" onClick={tryBorrow} disabled={!picked} style={{ width: '100%' }}>
        ◆ BORROW THIS BOOK
      </button>
    </>
  );
}

// Print queue mini-task
function LibraryPrint({ onDone }) {
  const [queued, setQueued] = React.useState(false);
  const [printed, setPrinted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!queued || printed) return;
    let p = 0;
    const id = setInterval(() => {
      p += 0.08;
      setProgress(Math.min(1, p));
      if (p >= 1) {
        clearInterval(id);
        setPrinted(true);
      }
    }, 90);
    return () => clearInterval(id);
  }, [queued]);

  return (
    <>
      <DialogBox speaker="PRINTER 3">"BEEP. Insert job. BEEP."</DialogBox>
      <div className="px-card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 10 }}>FILE QUEUE</div>
        <div style={{
          background: '#1f1233', color: '#9cf',
          fontFamily: 'VT323, monospace', fontSize: 16,
          padding: 8, border: `3px solid ${CN.line}`,
        }}>
          {'>'} week01_lecture_notes.pdf<br />
          {'>'} 12 pages • A4 • B/W<br />
          {'>'} cost: 60c • paid by student_card
        </div>
        <button className="px-btn" disabled={queued} onClick={() => setQueued(true)} style={{ width: '100%' }}>
          {queued ? '◌ QUEUED' : '◆ ADD TO PRINT QUEUE'}
        </button>
        {queued && (
          <div style={{
            background: CN.ink, height: 18, position: 'relative',
            border: `3px solid ${CN.line}`,
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: CN.energy,
              width: `${progress * 100}%`,
            }} />
            <div style={{
              position: 'absolute', inset: 0, textAlign: 'center',
              fontFamily: 'Silkscreen, monospace', fontSize: 10, color: '#fff',
              lineHeight: '14px',
            }}>
              {printed ? '✓ READY FOR PICKUP' : `PRINTING... ${Math.floor(progress * 100)}%`}
            </div>
          </div>
        )}
      </div>
      <button className="px-btn primary" disabled={!printed} onClick={onDone} style={{ width: '100%' }}>
        ◆ COLLECT PRINTOUT
      </button>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// CLASSROOM — preparation
// ═══════════════════════════════════════════════════════════════
function ClassroomScreen({ state, back, dispatch, pushToast }) {
  const done = state.completedNodes.includes('classroom');
  const REQ = ['student_card', 'course_book', 'computer', 'certificated_calculator'];
  const present = REQ.filter(id => state.inventory.includes(id));
  const allPrepared = present.length === REQ.length;
  const hasTimetable = state.inventory.includes('timetable');

  const [placed, setPlaced] = React.useState({}); // slotId -> itemId
  const [phase, setPhase] = React.useState(done ? 'done' : 'prep'); // prep / signin / result

  const dropOnSlot = (slotId, itemId) => {
    if (slotId !== itemId) return; // wrong slot
    setPlaced(prev => ({ ...prev, [slotId]: itemId }));
  };

  const ownedItems = REQ.filter(id => state.inventory.includes(id) && !Object.values(placed).includes(id));
  const allSlotsFilled = REQ.every(s => placed[s] === s) || REQ.filter(s => state.inventory.includes(s)).every(s => placed[s] === s);

  const startClass = () => setPhase('signin');

  const onSignedIn = () => {
    // Calculate effects
    dispatch({ type: 'COMPLETE_CLASSROOM' });
    if (allPrepared) pushToast('★ Perfect preparation! Stress cleared.');
    else if (!hasTimetable) pushToast('✗ Late! STRESS +1');
    else pushToast('★ Class signed. Lecture complete.');
    setPhase('done');
  };

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${CN.sand100} 0%, ${CN.jac100} 100%)`,
      display: 'flex', flexDirection: 'column',
    }}>
      <NodeHeader title="CLASSROOM 3.06" sub="First lecture starts in 5 min." back={back} color={CN.jac500} />

      <div style={{ flex: 1, padding: 12, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {!hasTimetable && phase === 'prep' && (
          <QuestBanner
            title="✗ NO TIMETABLE"
            sub="Without your timetable you'll arrive late — STRESS +1 incoming."
            color={CN.stress}
          />
        )}
        {phase === 'prep' && (
          <>
            <DialogBox speaker="PROF. QUILL">
              "Place each item you brought into the matching slot on your desk. Items you don't own will stay empty."
            </DialogBox>
            {/* Desk with slots */}
            <div style={{
              background: '#5C3F22', border: `3px solid ${CN.line}`,
              padding: 10, boxShadow: `4px 4px 0 ${CN.line}`,
            }}>
              <div style={{
                fontFamily: 'Silkscreen, monospace', fontSize: 10, color: '#fff', marginBottom: 6,
              }}>◆ YOUR DESK</div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6,
                background: '#7B5A35', padding: 8, border: `2px solid ${CN.line}`,
              }}>
                {REQ.map(req => (
                  <DeskSlot
                    key={req}
                    slotId={req}
                    placed={placed[req]}
                    owned={state.inventory.includes(req)}
                    onDrop={dropOnSlot}
                  />
                ))}
              </div>
            </div>

            {/* Inventory drawer */}
            <div className="px-card">
              <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 10, marginBottom: 6 }}>
                ▼ DRAG FROM BACKPACK
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {ownedItems.length === 0 && (
                  <div style={{ fontFamily: 'VT323, monospace', fontSize: 16, color: CN.inkSoft }}>
                    Backpack empty.
                  </div>
                )}
                {ownedItems.map(id => (
                  <div
                    key={id}
                    draggable
                    onDragStart={e => e.dataTransfer.setData('text/plain', id)}
                    style={{
                      background: CN.sand200, border: `3px solid ${CN.line}`,
                      boxShadow: `2px 2px 0 ${CN.line}`,
                      padding: 4, cursor: 'grab',
                    }}
                  >
                    <ItemSprite id={id} scale={3} />
                    <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 7, color: CN.ink, textAlign: 'center', marginTop: 2 }}>
                      {id.replace(/_/g, ' ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="px-btn primary" onClick={startClass} style={{ width: '100%' }}>
              ◆ I'M READY — START CLASS
            </button>
          </>
        )}

        {phase === 'signin' && (
          <ClassroomSignIn allPrepared={allPrepared} hasTimetable={hasTimetable} onDone={onSignedIn} />
        )}

        {phase === 'done' && (
          <ClassroomResult state={state} back={back} />
        )}
      </div>
    </div>
  );
}

function DeskSlot({ slotId, placed, owned, onDrop }) {
  const labels = {
    student_card: 'CARD',
    course_book:  'BOOK',
    computer:     'LAPTOP',
    certificated_calculator: 'CALC',
  };
  return (
    <div
      onDragOver={e => e.preventDefault()}
      onDrop={e => onDrop(slotId, e.dataTransfer.getData('text/plain'))}
      style={{
        background: placed ? 'rgba(79,182,163,0.4)' : (owned ? CN.sand100 : '#3a2b1c'),
        border: `3px dashed ${owned ? CN.line : CN.stress}`,
        height: 60,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Silkscreen, monospace', fontSize: 8, color: owned ? CN.ink : '#fff',
        position: 'relative',
      }}
    >
      {placed ? <ItemSprite id={placed} scale={2.5} /> : labels[slotId]}
      {!owned && (
        <div style={{
          position: 'absolute', bottom: 2, right: 2,
          background: CN.stress, color: '#fff', fontSize: 8,
          padding: '1px 3px', fontFamily: 'Silkscreen, monospace',
        }}>MISS</div>
      )}
    </div>
  );
}

function ClassroomSignIn({ allPrepared, hasTimetable, onDone }) {
  const [holding, setHolding] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const rafRef = React.useRef(null);
  const startRef = React.useRef(0);

  const start = () => {
    setHolding(true);
    startRef.current = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const p = Math.min(1, elapsed / 1400);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else { setDone(true); setHolding(false); }
    };
    rafRef.current = requestAnimationFrame(tick);
  };
  const stop = () => {
    setHolding(false);
    if (!done) setProgress(0);
    cancelAnimationFrame(rafRef.current);
  };

  return (
    <>
      <DialogBox speaker="PROF. QUILL">
        "Press and hold your student card on the desk pad to sign in for attendance."
      </DialogBox>
      <div className="px-card" style={{ textAlign: 'center', padding: 18 }}>
        <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 10, marginBottom: 8, color: CN.ink }}>
          DESK SIGN-IN PAD
        </div>
        <div
          onMouseDown={!done ? start : undefined}
          onMouseUp={stop}
          onMouseLeave={stop}
          onTouchStart={!done ? start : undefined}
          onTouchEnd={stop}
          style={{
            display: 'inline-block',
            width: 140, height: 140,
            background: done ? CN.prep : (holding ? CN.energy : CN.sand300),
            border: `4px solid ${CN.line}`,
            boxShadow: `4px 4px 0 ${CN.line}`,
            position: 'relative', cursor: 'pointer',
            transform: holding ? 'translate(2px, 2px)' : 'none',
            transition: 'background 100ms',
          }}
        >
          <div style={{
            position: 'absolute', inset: 8,
            border: `2px dashed ${CN.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Silkscreen, monospace', fontSize: 10, color: CN.ink,
            textAlign: 'center', lineHeight: 1.2,
          }}>
            {done ? '✓ SIGNED IN' : 'HOLD CARD\nHERE'}
          </div>
          <div style={{
            position: 'absolute', left: 0, bottom: 0,
            height: 6, background: CN.energy,
            width: `${progress * 100}%`,
          }} />
        </div>
        <div style={{ fontFamily: 'VT323, monospace', fontSize: 16, color: CN.inkSoft, marginTop: 8 }}>
          {done ? 'Attendance logged.' : holding ? 'Holding...' : 'Press and hold.'}
        </div>
      </div>
      <button className="px-btn primary" disabled={!done} onClick={onDone} style={{ width: '100%' }}>
        ◆ TAKE YOUR SEAT
      </button>
    </>
  );
}

function ClassroomResult({ state, back }) {
  const REQ = ['student_card', 'course_book', 'computer', 'certificated_calculator'];
  const present = REQ.filter(id => state.inventory.includes(id));
  const isPerfect = present.length === REQ.length;
  const wasLate = !state.inventory.includes('timetable');

  return (
    <>
      <QuestBanner
        title={isPerfect ? '★ PERFECT PREPARATION' : (wasLate ? '✗ LATE TO CLASS' : '✓ ATTENDED LECTURE')}
        sub={isPerfect ? 'PREP +2 · STRESS cleared · Class Badge earned'
                       : (wasLate ? 'STRESS +1 — review your route next time.' : 'Class Badge earned.')}
        color={isPerfect ? CN.energy : (wasLate ? CN.stress : CN.prepD)}
      />
      <DialogBox speaker="PROF. QUILL">
        {isPerfect
          ? '"Brilliant. You came prepared. Take the rest of the day off and breathe."'
          : (wasLate
            ? '"Make sure you check your timetable next week — we started without you."'
            : '"Welcome. Settle in — pop quiz next class."')
        }
      </DialogBox>
      <button className="px-btn primary" onClick={back} style={{ width: '100%' }}>
        ◆ END OF DAY ▶
      </button>
    </>
  );
}

Object.assign(window, {
  GreatHallScreen, ServiceCenterScreen, ClubFairScreen, LibraryScreen, ClassroomScreen,
  CLUB_PATHS, recommendClubPath,
});
