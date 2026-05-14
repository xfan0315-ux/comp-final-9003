// Intro screens — Splash, Welcome, Player Setup.

const C2 = window.PIXEL_COLORS;

// ─────────────────────────────────────────────────────────────
// SPLASH SCREEN — USyd jacaranda quadrangle background
// ─────────────────────────────────────────────────────────────
function SplashScreen({ onContinue }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#A0DBF0',
    }}>
      {/* Background photo — pixel USyd quad with jacaranda */}
      <img
        src="assets/splash-bg.png"
        alt="Sandstone U quadrangle"
        draggable={false}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center bottom',
          imageRendering: 'pixelated',
          userSelect: 'none',
        }}
      />

      {/* Subtle vignette so the title stays readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.35) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Big logotype over the sky */}
      <div style={{
        position: 'absolute', top: 64, left: 0, right: 0,
        textAlign: 'center', zIndex: 5,
      }}>
        <div style={{
          fontFamily: 'Press Start 2P, monospace',
          fontSize: 46, color: C2.coral,
          letterSpacing: 2, lineHeight: 1,
          textShadow: `4px 4px 0 ${C2.white}, 6px 6px 0 ${C2.jac700}, 10px 10px 0 rgba(50,31,94,0.55)`,
        }}>
          ARCANE
        </div>
        <div style={{
          fontFamily: 'Press Start 2P, monospace',
          fontSize: 54, color: '#FFD86E',
          letterSpacing: 2, marginTop: 14, lineHeight: 1,
          textShadow: `4px 4px 0 ${C2.white}, 6px 6px 0 ${C2.coral}, 10px 10px 0 rgba(50,31,94,0.55)`,
        }}>
          WEEK
        </div>
        <div style={{
          marginTop: 16,
          display: 'inline-block',
          background: C2.white,
          padding: '5px 12px',
          border: `3px solid ${C2.line}`,
          boxShadow: `3px 3px 0 ${C2.line}`,
          fontFamily: 'Silkscreen, monospace', fontSize: 11, color: C2.jac700,
          letterSpacing: 0.5,
        }}>
          ✿ FIRST DAY AT SANDSTONE U ✿
        </div>
      </div>

      {/* Walking students with backpacks along the path */}
      <WalkingStudents />

      {/* CTA at the bottom */}
      <div style={{
        position: 'absolute', bottom: 14, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center',
        zIndex: 10,
      }}>
        <button
          className="px-btn"
          onClick={onContinue}
          style={{
            fontSize: 14, padding: '12px 26px',
            background: C2.coral, color: '#fff',
            border: `3px solid ${C2.line}`,
            boxShadow: `4px 4px 0 ${C2.line}`,
          }}
        >
          ▶ PRESS START
        </button>
        <div className="blink" style={{
          fontFamily: 'Silkscreen, monospace',
          fontSize: 10, color: '#fff', marginTop: 4,
          textShadow: `1px 1px 0 ${C2.line}`,
        }}>♥ TAP TO BEGIN ♥</div>
      </div>
    </div>
  );
}

// ─── Walking pixel students with backpacks ─────────────────────
function WalkingStudents() {
  const students = [
    { color: 'pink',   delay: 0,    dir: 'r', y: 0,  speed: 11 },
    { color: 'blue',   delay: 2.4,  dir: 'r', y: 12, speed: 13 },
    { color: 'yellow', delay: 5.1,  dir: 'r', y: -2, speed: 10 },
    { color: 'purple', delay: 1.2,  dir: 'l', y: 6,  speed: 12 },
    { color: 'green',  delay: 4.0,  dir: 'l', y: 14, speed: 14 },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0,
      bottom: 92, height: 56,
      zIndex: 6, overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      <style>{`
        @keyframes walkR { from { left: -50px; } to { left: 460px; } }
        @keyframes walkL { from { left: 460px; } to { left: -50px; } }
        @keyframes bobUp { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      `}</style>
      {students.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: s.y, left: -50,
          animation: `${s.dir === 'r' ? 'walkR' : 'walkL'} ${s.speed}s linear ${s.delay}s infinite`,
        }}>
          <div style={{ animation: 'bobUp 0.5s ease-in-out infinite' }}>
            <AnimatedWalker color={s.color} scale={2.6} flip={s.dir === 'l'} speed={300 + i * 40} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PixelStars() {
  const stars = [];
  for (let i = 0; i < 30; i++) {
    const x = (i * 137) % 100;
    const y = (i * 53) % 50;
    const size = (i % 3 === 0) ? 3 : 2;
    stars.push(
      <div key={i} className={i % 4 === 0 ? 'blink' : ''} style={{
        position: 'absolute', left: `${x}%`, top: `${y}%`,
        width: size, height: size, background: '#fff',
        opacity: 0.85,
      }} />
    );
  }
  return <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>{stars}</div>;
}

// ─────────────────────────────────────────────────────────────
// WELCOME / INTRO
// ─────────────────────────────────────────────────────────────
function WelcomeScreen({ onContinue }) {
  const [page, setPage] = React.useState(0);
  const pages = [
    {
      title: 'WELCOME, FIRST-YEAR',
      body: "It's O-Week and you're standing at the gates of Sandstone U. Today is your first real day on campus, and the quad is teeming with quests.",
      art: <GreatHall scale={4} />,
    },
    {
      title: 'BOUNDED ADVENTURE',
      body: "You have free roam between five key locations. But your ENERGY, STRESS and PREPARATION will react to every choice you make.",
      art: <StatsPreview />,
    },
    {
      title: 'ORDER MATTERS',
      body: "Need a library book? Get your student card first. Worried about being late? Don't skip Orientation. Choose your route — the day is yours.",
      art: <Jacaranda scale={5} />,
    },
  ];
  const p = pages[page];

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${C2.skyL} 0%, ${C2.sky} 40%, ${C2.sand200} 100%)`,
      display: 'flex', flexDirection: 'column', padding: 18, position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        {p.art}
      </div>

      <div className="px-card" style={{ marginTop: 22, background: C2.paper }}>
        <div style={{
          fontFamily: 'Silkscreen, monospace',
          fontSize: 12, color: C2.jac700, letterSpacing: 1, marginBottom: 8,
        }}>{p.title}</div>
        <div style={{
          fontFamily: 'VT323, monospace', fontSize: 20, color: C2.ink, lineHeight: 1.15,
        }}>{p.body}</div>
      </div>

      <div style={{ flex: 1 }} />

      {/* page dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 14 }}>
        {pages.map((_, i) => (
          <div key={i} style={{
            width: 14, height: 14,
            background: i === page ? C2.jac500 : '#fff',
            border: `3px solid ${C2.line}`,
          }} />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        {page > 0 && (
          <button className="px-btn" onClick={() => setPage(page - 1)}>◀ BACK</button>
        )}
        {page < pages.length - 1 ? (
          <button className="px-btn primary" onClick={() => setPage(page + 1)}>NEXT ▶</button>
        ) : (
          <button className="px-btn primary" onClick={onContinue}>I'M READY ▶</button>
        )}
      </div>
    </div>
  );
}

function StatsPreview() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 8,
      padding: 12,
      background: C2.paper, border: `3px solid ${C2.line}`,
      boxShadow: `4px 4px 0 ${C2.line}`,
      width: 220,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Bolt scale={3} />
        <span style={{ fontFamily: 'Silkscreen, monospace', fontSize: 11, color: C2.ink, width: 64 }}>ENERGY</span>
        <StatBarSimple value={4} color={C2.energy} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <StressIcon scale={3} />
        <span style={{ fontFamily: 'Silkscreen, monospace', fontSize: 11, color: C2.ink, width: 64 }}>STRESS</span>
        <StatBarSimple value={3} color={C2.stress} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <BookIcon scale={3} />
        <span style={{ fontFamily: 'Silkscreen, monospace', fontSize: 11, color: C2.ink, width: 64 }}>PREP</span>
        <StatBarSimple value={0} color={C2.prep} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PLAYER SETUP — avatar / nickname / interests
// ─────────────────────────────────────────────────────────────
const INTERESTS = [
  { id: 'academic', label: 'Academic', icon: '✦' },
  { id: 'arts',     label: 'Arts',     icon: '♪' },
  { id: 'sports',   label: 'Sports',   icon: '⚑' },
  { id: 'tech',     label: 'Tech',     icon: '◆' },
  { id: 'social',   label: 'Social',   icon: '♥' },
  { id: 'food',     label: 'Food',     icon: '◉' },
  { id: 'culture',  label: 'Culture',  icon: '☆' },
  { id: 'outdoors', label: 'Outdoor',  icon: '▲' },
];

function PlayerSetupScreen({ onContinue }) {
  const [step, setStep] = React.useState(0); // 0 avatar, 1 name, 2 interests
  const [avatar, setAvatar] = React.useState(0);
  const [nickname, setNick] = React.useState('');
  const [interests, setInterests] = React.useState([]);

  const toggleInterest = (id) => {
    setInterests(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const steps = ['CHOOSE FACE', 'YOUR NAME', 'YOUR INTERESTS'];

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(180deg, ${C2.jac300} 0%, ${C2.jac100} 100%)`,
      display: 'flex', flexDirection: 'column', padding: 16,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Top header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div style={{
          fontFamily: 'Silkscreen, monospace', fontSize: 12, color: C2.jac900,
        }}>STEP {step + 1}/3 — {steps[step]}</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: 14, height: 14,
              background: i <= step ? C2.jac700 : '#fff',
              border: `3px solid ${C2.line}`,
            }} />
          ))}
        </div>
      </div>

      <div className="px-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {step === 0 && <AvatarStep avatar={avatar} setAvatar={setAvatar} />}
        {step === 1 && <NameStep nickname={nickname} setNick={setNick} avatar={avatar} />}
        {step === 2 && <InterestStep interests={interests} toggle={toggleInterest} avatar={avatar} />}
      </div>

      {/* nav */}
      <div style={{ display: 'flex', gap: 10, marginTop: 14, justifyContent: 'space-between' }}>
        <button className="px-btn" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>◀ BACK</button>
        {step < 2 ? (
          <button
            className="px-btn primary"
            disabled={step === 1 && nickname.trim().length === 0}
            onClick={() => setStep(s => s + 1)}
          >NEXT ▶</button>
        ) : (
          <button
            className="px-btn primary"
            disabled={interests.length === 0}
            onClick={() => onContinue({ avatar, nickname: nickname.trim() || avatarName(avatar), interests })}
          >START ▶</button>
        )}
      </div>
    </div>
  );
}

function AvatarStep({ avatar, setAvatar }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
      <div style={{ fontFamily: 'VT323, monospace', fontSize: 18, color: C2.ink }}>
        Pick the freshman who looks most like you:
      </div>
      <div className="popin" style={{
        background: C2.sand100,
        border: `3px solid ${C2.line}`,
        boxShadow: `4px 4px 0 ${C2.line}`,
        padding: 18, marginTop: 6,
      }}>
        <Avatar id={avatar} scale={7} />
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
        marginTop: 12, width: '100%',
      }}>
        {AVATAR_DEFS.map((_, i) => (
          <button
            key={i}
            onClick={() => setAvatar(i)}
            style={{
              background: avatar === i ? C2.jac300 : '#fff',
              border: `3px solid ${C2.line}`,
              boxShadow: avatar === i ? `inset 2px 2px 0 ${C2.jac700}` : `2px 2px 0 ${C2.line}`,
              padding: 4,
              display: 'flex', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Avatar id={i} scale={3} />
          </button>
        ))}
      </div>
    </div>
  );
}

function NameStep({ nickname, setNick, avatar }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, flex: 1 }}>
      <div style={{ fontFamily: 'VT323, monospace', fontSize: 18, color: C2.ink, textAlign: 'center' }}>
        What should we call you?
      </div>
      <div style={{ position: 'relative' }}>
        <Avatar id={avatar} scale={6} />
        <div style={{
          position: 'absolute', top: -22, left: '110%',
          background: '#fff', border: `3px solid ${C2.line}`,
          padding: '4px 8px', fontFamily: 'VT323, monospace', fontSize: 16,
          whiteSpace: 'nowrap',
        }}>
          hi! ◕‿◕
        </div>
      </div>
      <div style={{ width: '100%', marginTop: 8 }}>
        <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 10, color: C2.ink, marginBottom: 6 }}>
          NICKNAME (1-16 chars)
        </div>
        <input
          className="pxinput"
          maxLength={16}
          autoFocus
          value={nickname}
          onChange={e => setNick(e.target.value)}
          placeholder={avatarName(avatar)}
        />
        <div style={{ fontFamily: 'VT323, monospace', fontSize: 14, color: C2.inkSoft, marginTop: 6 }}>
          ▸ This appears on your student card and stats.
        </div>
      </div>
    </div>
  );
}

function InterestStep({ interests, toggle, avatar }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ fontFamily: 'VT323, monospace', fontSize: 18, color: C2.ink, marginBottom: 8 }}>
        Pick at least one. Affects Club Fair recommendations.
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
        flex: 1,
      }}>
        {INTERESTS.map(intr => {
          const on = interests.includes(intr.id);
          return (
            <button
              key={intr.id}
              onClick={() => toggle(intr.id)}
              style={{
                background: on ? C2.jac500 : '#fff',
                color: on ? '#fff' : C2.ink,
                border: `3px solid ${C2.line}`,
                boxShadow: on ? `inset 2px 2px 0 ${C2.jac900}` : `2px 2px 0 ${C2.line}`,
                padding: 8,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 4, cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: 22 }}>{intr.icon}</div>
              <div style={{ fontFamily: 'Silkscreen, monospace', fontSize: 9 }}>{intr.label.toUpperCase()}</div>
            </button>
          );
        })}
      </div>
      <div style={{
        marginTop: 8, padding: 8,
        background: C2.sand100, border: `2px dashed ${C2.line}`,
        fontFamily: 'VT323, monospace', fontSize: 16, color: C2.ink,
      }}>
        ⌂ Picked {interests.length} / {INTERESTS.length}
      </div>
    </div>
  );
}

Object.assign(window, {
  SplashScreen, WelcomeScreen, PlayerSetupScreen, INTERESTS,
});
