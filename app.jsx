// Main app — state, reducer, router, mount.

const CA = window.PIXEL_COLORS;

// ─────────────────────────────────────────────────────────────
// Initial state
// ─────────────────────────────────────────────────────────────
function initialState() {
  return {
    screen: 'splash',
    overlay: null, // 'badges' | 'stats' | null
    player: {
      avatar: 0,
      nickname: '',
      interests: [],
    },
    inventory: [],
    stats: { energy: 4, stress: 3, preparation: 0 },
    visitedNodes: [],
    completedNodes: [],
    badges: [],
    activityLog: [], // { time, message }
    clubPath: null,
    libraryFailures: 0,
  };
}

function nowStamp() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }

function reducer(state, action) {
  switch (action.type) {
    case 'RESET': return initialState();

    case 'SET_SCREEN':
      return { ...state, screen: action.screen, overlay: null };

    case 'SET_OVERLAY':
      return { ...state, overlay: action.overlay };

    case 'COMPLETE_SETUP':
      return {
        ...state,
        player: action.player,
        screen: 'map',
        activityLog: [...state.activityLog, { time: nowStamp(), message: `Player ${action.player.nickname} created.` }],
      };

    case 'VISIT_NODE': {
      if (state.visitedNodes.includes(action.id)) return state;
      return {
        ...state,
        visitedNodes: [...state.visitedNodes, action.id],
      };
    }

    case 'COMPLETE_GREAT_HALL': {
      const inv = [...new Set([...state.inventory, 'school_map', 'timetable'])];
      return {
        ...state,
        inventory: inv,
        stats: { ...state.stats, stress: clamp(state.stats.stress - 2, 0, 6) },
        completedNodes: [...new Set([...state.completedNodes, 'great_hall'])],
        visitedNodes:   [...new Set([...state.visitedNodes,   'great_hall'])],
        badges:         [...new Set([...state.badges, 'orientation'])],
        activityLog: [...state.activityLog,
          { time: nowStamp(), message: 'Great Hall — orientation lecture complete.' },
          { time: nowStamp(), message: '+ school_map, + timetable' },
        ],
      };
    }

    case 'COMPLETE_SERVICE_CENTER': {
      const inv = [...new Set([...state.inventory, 'student_card', 'certificated_calculator'])];
      return {
        ...state,
        inventory: inv,
        stats: {
          ...state.stats,
          energy: clamp(state.stats.energy - 1 + 1, 0, 6), // -1 queue, +1 calc
          preparation: clamp(state.stats.preparation + 1, 0, 6),
        },
        completedNodes: [...new Set([...state.completedNodes, 'service_center'])],
        visitedNodes:   [...new Set([...state.visitedNodes,   'service_center'])],
        badges:         [...new Set([...state.badges, 'identity'])],
        activityLog: [...state.activityLog,
          { time: nowStamp(), message: 'Service Center — identity confirmed.' },
          { time: nowStamp(), message: '+ student_card, + certificated_calculator, ★ Identity' },
        ],
      };
    }

    case 'COMPLETE_CLUB_FAIR': {
      let { energy, stress, preparation } = state.stats;
      if (action.path === 'academic') preparation = clamp(preparation + 2, 0, 6);
      if (action.path === 'social')   stress = clamp(stress - 2, 0, 6);
      if (action.path === 'sport')    energy = clamp(energy + 2, 0, 6);
      return {
        ...state,
        clubPath: action.path,
        stats: { energy, stress, preparation },
        completedNodes: [...new Set([...state.completedNodes, 'club_fair'])],
        visitedNodes:   [...new Set([...state.visitedNodes,   'club_fair'])],
        badges:         [...new Set([...state.badges, 'community'])],
        activityLog: [...state.activityLog,
          { time: nowStamp(), message: `Club Fair — joined ${action.path} path.` },
          { time: nowStamp(), message: '★ Community badge' },
        ],
      };
    }

    case 'LIBRARY_DENIED': {
      return {
        ...state,
        libraryFailures: state.libraryFailures + 1,
        stats: {
          ...state.stats,
          energy: clamp(state.stats.energy - 1, 0, 6),
          stress: clamp(state.stats.stress + 1, 0, 6),
        },
        visitedNodes: [...new Set([...state.visitedNodes, 'library'])],
        activityLog: [...state.activityLog,
          { time: nowStamp(), message: 'Library — access denied (no student card).' },
        ],
      };
    }

    case 'COMPLETE_LIBRARY': {
      const inv = [...new Set([...state.inventory, 'course_book', 'computer', 'printed_material'])];
      return {
        ...state,
        inventory: inv,
        stats: {
          ...state.stats,
          energy: clamp(state.stats.energy - 1 + 1, 0, 6), // -1 fatigue +1 computer net 0
          preparation: clamp(state.stats.preparation + 2, 0, 6),
        },
        completedNodes: [...new Set([...state.completedNodes, 'library'])],
        visitedNodes:   [...new Set([...state.visitedNodes,   'library'])],
        badges:         [...new Set([...state.badges, 'resource'])],
        activityLog: [...state.activityLog,
          { time: nowStamp(), message: 'Library — book + print + computer access.' },
          { time: nowStamp(), message: '+ course_book, + computer, + printed_material, ★ Resource' },
        ],
      };
    }

    case 'COMPLETE_CLASSROOM': {
      const REQ = ['student_card', 'course_book', 'computer', 'certificated_calculator'];
      const present = REQ.filter(id => state.inventory.includes(id));
      const isPerfect = present.length === REQ.length;
      const wasLate = !state.inventory.includes('timetable');
      let { energy, stress, preparation } = state.stats;
      if (isPerfect) {
        preparation = clamp(preparation + 2, 0, 6);
        stress = 0;
      } else {
        if (wasLate) stress = clamp(stress + 1, 0, 6);
        if (!state.inventory.includes('certificated_calculator')) stress = clamp(stress + 1, 0, 6);
        if (!state.inventory.includes('computer')) stress = clamp(stress + 1, 0, 6);
      }
      return {
        ...state,
        stats: { energy, stress, preparation },
        completedNodes: [...new Set([...state.completedNodes, 'classroom'])],
        visitedNodes:   [...new Set([...state.visitedNodes,   'classroom'])],
        badges:         [...new Set([...state.badges, 'class'])],
        screen: 'ending',
        activityLog: [...state.activityLog,
          { time: nowStamp(), message: `Classroom — ${isPerfect ? 'perfect prep!' : (wasLate ? 'arrived late.' : 'attended.')}` },
          { time: nowStamp(), message: '★ Class badge — day complete.' },
        ],
      };
    }

    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────
// Root App
// ─────────────────────────────────────────────────────────────
function App() {
  const [state, dispatch] = React.useReducer(reducer, undefined, initialState);
  const [toast, setToast] = React.useState(null);

  const pushToast = React.useCallback((m) => setToast(m), []);

  const goMap = () => dispatch({ type: 'SET_SCREEN', screen: 'map' });
  const restart = () => dispatch({ type: 'RESET' });

  const enterNode = (id) => {
    dispatch({ type: 'VISIT_NODE', id });
    dispatch({ type: 'SET_SCREEN', screen: id });
  };

  // Pick the screen
  let screen;
  if (state.screen === 'splash') {
    screen = <SplashScreen onContinue={() => dispatch({ type: 'SET_SCREEN', screen: 'welcome' })} />;
  } else if (state.screen === 'welcome') {
    screen = <WelcomeScreen onContinue={() => dispatch({ type: 'SET_SCREEN', screen: 'setup' })} />;
  } else if (state.screen === 'setup') {
    screen = <PlayerSetupScreen onContinue={(player) => dispatch({ type: 'COMPLETE_SETUP', player })} />;
  } else if (state.screen === 'map') {
    screen = (
      <CampusMapHub
        state={state}
        onEnter={enterNode}
        onOpen={(overlay) => dispatch({ type: 'SET_OVERLAY', overlay })}
      />
    );
  } else if (state.screen === 'great_hall') {
    screen = <GreatHallScreen state={state} back={goMap} dispatch={dispatch} pushToast={pushToast} />;
  } else if (state.screen === 'service_center') {
    screen = <ServiceCenterScreen state={state} back={goMap} dispatch={dispatch} pushToast={pushToast} />;
  } else if (state.screen === 'club_fair') {
    screen = <ClubFairScreen state={state} back={goMap} dispatch={dispatch} pushToast={pushToast} />;
  } else if (state.screen === 'library') {
    screen = <LibraryScreen state={state} back={goMap} dispatch={dispatch} pushToast={pushToast} />;
  } else if (state.screen === 'classroom') {
    screen = <ClassroomScreen state={state} back={goMap} dispatch={dispatch} pushToast={pushToast} />;
  } else if (state.screen === 'ending') {
    screen = <EndingScreen state={state} restart={restart} />;
  } else {
    screen = <div>Unknown screen: {state.screen}</div>;
  }

  // Overlay
  let overlay = null;
  if (state.overlay === 'badges') {
    overlay = <BadgesScreen state={state} back={() => dispatch({ type: 'SET_OVERLAY', overlay: null })} />;
  } else if (state.overlay === 'stats') {
    overlay = <StatsScreen state={state} back={() => dispatch({ type: 'SET_OVERLAY', overlay: null })} />;
  }

  return (
    <div style={{
      width: 412, height: 892,
      position: 'relative', overflow: 'hidden',
      background: CA.paper,
      border: `3px solid ${CA.line}`,
      boxShadow: `6px 6px 0 rgba(0,0,0,0.25)`,
    }}>
      <div data-screen-label={`${state.overlay || state.screen}`} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        <div className="scanlines" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: CA.paper }}>
          {overlay || screen}
          {toast && (
            <RewardToast
              message={toast}
              onDone={() => setToast(null)}
              kind={toast.includes('★') ? 'badge' : (toast.includes('-1') || toast.includes('denied') ? 'fail' : 'item')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Side debug / dev panel — quick jump for design review
// ─────────────────────────────────────────────────────────────
function DebugPanel({ state, dispatch }) {
  const jump = (screen) => dispatch({ type: 'SET_SCREEN', screen });
  const overlay = (o) => dispatch({ type: 'SET_OVERLAY', overlay: o });

  const seedFull = () => {
    dispatch({ type: 'COMPLETE_SETUP', player: { avatar: 3, nickname: 'PIXIE', interests: ['academic', 'social'] } });
    dispatch({ type: 'COMPLETE_GREAT_HALL' });
    dispatch({ type: 'COMPLETE_SERVICE_CENTER' });
    dispatch({ type: 'COMPLETE_CLUB_FAIR', path: 'academic' });
    dispatch({ type: 'COMPLETE_LIBRARY' });
  };

  return (
    <div style={{
      width: 240, color: CA.paper,
      fontFamily: 'Silkscreen, monospace', fontSize: 10,
      display: 'flex', flexDirection: 'column', gap: 8,
      maxHeight: 880, overflow: 'auto',
    }}>
      <div style={{
        background: CA.jac700, padding: '6px 8px',
        border: `3px solid ${CA.line}`, boxShadow: `3px 3px 0 ${CA.line}`,
      }}>
        <div style={{ fontSize: 12, color: CA.energy }}>◆ ARCANE WEEK</div>
        <div style={{ fontFamily: 'VT323, monospace', fontSize: 14, marginTop: 2 }}>
          USyd pixel onboarding prototype
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.08)', padding: 8,
        border: `2px solid ${CA.jac500}`,
      }}>
        <div style={{ marginBottom: 6 }}>QUICK JUMP</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {[
            ['splash', 'Splash'],
            ['welcome', 'Welcome'],
            ['setup', 'Setup'],
            ['map', 'Map'],
            ['great_hall', 'Great Hall'],
            ['service_center', 'Service'],
            ['club_fair', 'Club Fair'],
            ['library', 'Library'],
            ['classroom', 'Classroom'],
            ['ending', 'Ending'],
          ].map(([k, l]) => (
            <button
              key={k}
              onClick={() => jump(k)}
              style={{
                background: state.screen === k ? CA.energy : CA.paper,
                color: CA.ink,
                border: `2px solid ${CA.line}`,
                fontFamily: 'Silkscreen, monospace', fontSize: 9,
                padding: '4px 0', cursor: 'pointer',
              }}
            >{l}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
          <button onClick={() => overlay('badges')} style={dbgBtn(CA.energy)}>★ Badges</button>
          <button onClick={() => overlay('stats')}  style={dbgBtn(CA.prep)}>▤ Stats</button>
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.08)', padding: 8,
        border: `2px solid ${CA.jac500}`,
      }}>
        <div style={{ marginBottom: 6 }}>SEED / RESET</div>
        <button onClick={seedFull} style={{ ...dbgBtn(CA.jac500), width: '100%', marginBottom: 4, color: '#fff' }}>
          ▶ Skip to classroom-ready
        </button>
        <button onClick={() => dispatch({ type: 'RESET' })} style={{ ...dbgBtn(CA.stress), width: '100%', color: '#fff' }}>
          ↻ Reset run
        </button>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.05)', padding: 8,
        border: `2px solid ${CA.jac700}`,
        fontFamily: 'VT323, monospace', fontSize: 14, color: '#ddd', lineHeight: 1.2,
      }}>
        <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 10, color: CA.energy, marginBottom: 4 }}>STATE</div>
        screen: <b>{state.screen}</b><br />
        nick: <b>{state.player.nickname || '—'}</b><br />
        nodes: {state.completedNodes.length}/5 done<br />
        items: {state.inventory.length}/7<br />
        badges: {state.badges.length}/5<br />
        E:{state.stats.energy} · S:{state.stats.stress} · P:{state.stats.preparation}
      </div>

      <div style={{
        fontFamily: 'VT323, monospace', fontSize: 13, color: '#aaa',
        padding: 6, lineHeight: 1.2,
      }}>
        ◆ All "scan QR" actions replaced with tap-to-confirm or press-and-hold card on reader.
        <br /><br />
        ◆ USyd-inspired only — original pixel art, no real branding.
      </div>
    </div>
  );
}

function dbgBtn(bg) {
  return {
    background: bg, color: CA.ink,
    border: `2px solid ${CA.line}`,
    fontFamily: 'Silkscreen, monospace', fontSize: 9,
    padding: '4px 8px', cursor: 'pointer', flex: 1,
  };
}

const root = ReactDOM.createRoot(document.getElementById('stage'));
root.render(<App />);
