// Pixel art components — drawn via SVG <rect> grids with crispEdges.
// Color tokens reference CSS variables in index.html.

const C = {
  // Sandstone — brighter
  sand50:  '#FFF8E7',
  sand100: '#FFEDC2',
  sand200: '#FFD78A',
  sand300: '#F2B660',
  sand400: '#D08A3F',
  sand500: '#A56230',
  sand700: '#6E3F1C',
  sand900: '#3A220F',
  // Jacaranda — softer
  jac100:  '#EBD9F4',
  jac300:  '#BFA0DC',
  jac500:  '#9474C7',
  jac700:  '#6646A8',
  jac900:  '#321F5E',
  // Greens / sky
  grass:   '#93D96F',
  grassD:  '#62B447',
  grassDD: '#3D8530',
  sky:     '#A0DBF0',
  skyL:    '#D8F0FA',
  skyD:    '#5BA4CC',
  // Cream / neutrals
  paper:   '#FFF8E7',
  cream:   '#FFF6E2',
  ink:     '#3A2418',
  line:    '#4A2F1D',
  inkSoft: '#846148',
  // Stats
  energy:  '#FFC851',
  energyD: '#D89A2C',
  stress:  '#FF7A7A',
  stressD: '#C04A4A',
  prep:    '#5FCBB4',
  prepD:   '#368F7B',
  // Cute accents
  pink:    '#FFAFD3',
  pinkD:   '#E07AAE',
  mint:    '#BDF2DA',
  coral:   '#FF9684',
  sun:     '#FFE36E',
  // Misc
  white:   '#FFFFFF',
  black:   '#1A0F08',
  red:     '#FF6B6B',
  blue:    '#5C8FE0',
};

// ─────────────────────────────────────────────────────────────
// Pixel matrix helper.
// Takes a string array where each char maps to a color, e.g.
//   ['.0.', '012', '...'] with palette { '0': '#fff', '1':'#000', '2':'#f00' }
// '.' = transparent. Returns an SVG.
// ─────────────────────────────────────────────────────────────
function PixelArt({ rows, palette, scale = 4, style }) {
  const w = rows[0].length;
  const h = rows.length;
  const rects = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const ch = rows[y][x];
      if (ch === '.' || ch === ' ') continue;
      const col = palette[ch];
      if (!col) continue;
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={col} />);
    }
  }
  return (
    <svg
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{ display: 'block', ...style }}
    >
      {rects}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// AVATARS — 8 cute pixel students. Each 16x16.
// ─────────────────────────────────────────────────────────────
const AVATAR_DEFS = [
  { // 0 — Brown hair, beanie
    name: 'Riley',
    palette: { '0': C.line, '1': '#D8A179', '2': '#7B3F1A', '3': C.jac500, '4': C.white, '5': '#3C2818', '6': C.jac700 },
    rows: [
      '................',
      '....06666660....',
      '...033333330...',
      '..03333333330..',
      '..02222222220..',
      '..02111111120..',
      '..02101101120..',
      '..02111111120..',
      '..02115551120..',
      '..02211111220..',
      '..00211112200..',
      '...0044440000..',
      '...0344443300..',
      '...0344443300..',
      '...0034440300..',
      '....00..00.....',
    ],
  },
  { // 1 — Pink hair, glasses
    name: 'Sam',
    palette: { '0': C.line, '1': '#F2C49B', '2': '#E89BB8', '3': '#3C2818', '4': C.grass, '5': '#4E8C3A' },
    rows: [
      '................',
      '....022220......',
      '...02222220.....',
      '..0222222220....',
      '..0211111120....',
      '..0211111120....',
      '.020110110200...',
      '.020111111200...',
      '.020113311200...',
      '..0211111120....',
      '..00211112200...',
      '...0044440000...',
      '...0344443300...',
      '...0344443300...',
      '...0034440300...',
      '....00..00......',
    ],
  },
  { // 2 — Black hair, friendly
    name: 'Min',
    palette: { '0': C.line, '1': '#E5BF8E', '2': '#241A14', '3': C.energy, '4': '#B68228' },
    rows: [
      '................',
      '....02222220....',
      '...0222222220...',
      '..022222222220..',
      '..02111111120...',
      '..02111111120...',
      '..02101101120...',
      '..02111111120...',
      '..02115511120...',
      '..02211112200...',
      '..00211112200...',
      '...0044440000...',
      '...0344443300...',
      '...0344443300...',
      '...0034440300...',
      '....00..00......',
    ],
  },
  { // 3 — Curly orange, freckles
    name: 'Bex',
    palette: { '0': C.line, '1': '#F0C29B', '2': '#D86A2E', '3': '#8B4012', '4': C.sky, '5': C.skyD },
    rows: [
      '................',
      '...0220220220...',
      '..022222222220..',
      '.02222222222220.',
      '.02211111112220.',
      '..0211111111200.',
      '..0210110110200.',
      '..0211111111200.',
      '..0211131311200.',
      '..0021111112000.',
      '..00211111122000',
      '...0044444400..',
      '...0344444300..',
      '...0344444300..',
      '...0034444300..',
      '....00..00.....',
    ],
  },
  { // 4 — Blue hoodie hat
    name: 'Kai',
    palette: { '0': C.line, '1': '#C8916A', '2': C.skyD, '3': '#2D5B7A', '4': C.energy, '5': '#B68228' },
    rows: [
      '................',
      '....02222220....',
      '...0233333320...',
      '..023333333320..',
      '..0211111120...',
      '..0211111120...',
      '..0210110120...',
      '..0211111120...',
      '..0211551120...',
      '..0211111120...',
      '..0023233200...',
      '..02223333220..',
      '..02233333220..',
      '..02233223220..',
      '..02233.23220..',
      '...000..00000..',
    ],
  },
  { // 5 — Green hair, hoop earrings
    name: 'Jules',
    palette: { '0': C.line, '1': '#D69A7A', '2': '#5BAD58', '3': '#2F6B2B', '4': C.energy, '5': '#FFD840' },
    rows: [
      '................',
      '...022220220....',
      '..02222222220...',
      '.0222222222220..',
      '.02211111122220.',
      '..0211111112200.',
      '.502101101125...',
      '.502111111125...',
      '..0211551120....',
      '..0211111120....',
      '..0021111200....',
      '...0444444000...',
      '...0344443300...',
      '...0344443300...',
      '...0034440300...',
      '....00..00......',
    ],
  },
  { // 6 — Purple jacket, ponytail
    name: 'Theo',
    palette: { '0': C.line, '1': '#D49773', '2': '#3C2818', '3': C.jac500, '4': C.jac700, '5': C.white },
    rows: [
      '................',
      '....02222220....',
      '...0222222220...',
      '..02222222200...',
      '..0222111122200.',
      '..0211111122200.',
      '..0210110122220.',
      '..0211111122200.',
      '..0211551112000.',
      '..0211111120....',
      '..0023333200....',
      '..033333333000..',
      '..043333333300..',
      '..043333333300..',
      '..043300003300..',
      '....00..00......',
    ],
  },
  { // 7 — Sunglasses cool
    name: 'Eli',
    palette: { '0': C.line, '1': '#C68B5E', '2': '#3C2818', '3': C.energy, '4': '#B68228', '5': '#1A1108' },
    rows: [
      '................',
      '....02222220....',
      '...0222222220...',
      '..022222222220..',
      '..0211111111200.',
      '..0255555555200.',
      '..0255555555200.',
      '..0211111111200.',
      '..0211155511200.',
      '..0021111200....',
      '..00211112000...',
      '...0033330000...',
      '...0344443300...',
      '...0344443300...',
      '...0034440300...',
      '....00..00......',
    ],
  },
];

function Avatar({ id = 0, scale = 4, style }) {
  const def = AVATAR_DEFS[id % AVATAR_DEFS.length];
  return <PixelArt rows={def.rows} palette={def.palette} scale={scale} style={style} />;
}
function avatarName(id) { return AVATAR_DEFS[id % AVATAR_DEFS.length].name; }

// ─────────────────────────────────────────────────────────────
// Heart pixel — for energy bar
// ─────────────────────────────────────────────────────────────
function Heart({ filled = true, scale = 3 }) {
  const p = filled
    ? { '0': C.line, '1': C.energy, '2': '#FFE89A', '3': C.energyD }
    : { '0': C.line, '1': '#9C8568', '2': '#7c6a51', '3': '#5e4d38' };
  return (
    <PixelArt
      scale={scale}
      palette={p}
      rows={[
        '.00.00.',
        '0210120',
        '0111110',
        '0113110',
        '.01310.',
        '..010..',
        '...0...',
      ]}
    />
  );
}

// Lightning bolt — energy
function Bolt({ scale = 3 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{ '0': C.line, '1': C.energy, '2': '#FFE89A' }}
      rows={[
        '....00.',
        '...02120',
        '..02110.',
        '.021100.',
        '02111100',
        '.011200.',
        '..0210..',
        '..020...',
        '..00....',
      ]}
    />
  );
}
function StressIcon({ scale = 3 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{ '0': C.line, '1': C.stress, '2': '#FFB9B9' }}
      rows={[
        '..000....',
        '.02110...',
        '021111000',
        '021111100',
        '02110210.',
        '0210.0210',
        '.00..0210',
        '......00.',
      ]}
    />
  );
}
function BookIcon({ scale = 3 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{ '0': C.line, '1': C.prep, '2': '#A8E0D2', '3': C.prepD }}
      rows={[
        '0000000000',
        '0211211230',
        '0211211230',
        '0211211230',
        '0211211230',
        '0211211230',
        '0331333330',
        '0000000000',
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// BUILDING SPRITES — landmark icons for the map.
// Each ~24-32 wide, drawn in a single style.
// ─────────────────────────────────────────────────────────────

function GreatHall({ scale = 4 }) {
  // Sandstone clock tower silhouette (original — not USyd's actual tower)
  return (
    <PixelArt
      scale={scale}
      palette={{
        '0': C.line, '1': C.sand300, '2': C.sand400, '3': C.sand500,
        '4': C.sand200, '5': C.energy, '6': C.jac500, '7': C.white,
      }}
      rows={[
        '........0........',
        '.......060.......',
        '......06660......',
        '.....0666660.....',
        '.....0666660.....',
        '....060006060....',
        '....021111120....',
        '...02144441220...',
        '...02175571220...',
        '...02144441220...',
        '...02111111220...',
        '..0212121121220..',
        '..0212121121220..',
        '..0211221112120..',
        '..0211221112120..',
        '..0211111111120..',
        '..0233333333330..',
        '..0322222322230..',
        '..0322242322230..',
        '..0322242322230..',
        '..0000000000000..',
      ]}
    />
  );
}

function ServiceCenter({ scale = 4 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{
        '0': C.line, '1': C.sand200, '2': C.sand400, '3': C.sand500,
        '4': C.jac500, '5': C.sky, '6': C.white,
      }}
      rows={[
        '...0000000000....',
        '..014444444440...',
        '.01122221222210..',
        '.01122222222210..',
        '0111111111111110.',
        '01155115511551110',
        '01155115511551110',
        '01155115511551110',
        '01111111111111110',
        '01155566655511110',
        '01155666665511110',
        '01155606605511110',
        '01155606605511110',
        '02233333333332330',
        '02233323333332330',
        '00000000000000000',
      ]}
    />
  );
}

function ClubFairTent({ scale = 4 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{
        '0': C.line, '1': C.stress, '2': C.white, '3': C.jac500,
        '4': C.energy, '5': C.grass, '6': C.sand400,
      }}
      rows={[
        '........4........',
        '.......040.......',
        '......04040......',
        '.....0411140.....',
        '....041212210....',
        '...04121212210...',
        '..0412121212210..',
        '.041212121212210.',
        '04121212121212210',
        '03333333333333330',
        '03222222222222230',
        '03253222222252230',
        '03255322222255230',
        '03255333333355230',
        '03255600000655230',
        '00000000000000000',
      ]}
    />
  );
}

function Library({ scale = 4 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{
        '0': C.line, '1': C.sand200, '2': C.sand400, '3': C.sand500,
        '4': C.jac500, '5': C.sky, '6': C.prep,
      }}
      rows={[
        '......0000.......',
        '.....011110......',
        '....01111110.....',
        '...0111111110....',
        '..011111111110...',
        '.01111111111110..',
        '0111111111111110.',
        '01111114444411110',
        '01156611144411550',
        '01156611144411550',
        '01156611144411550',
        '01156611144411550',
        '01156611144411550',
        '01156611144411550',
        '01111111111111110',
        '02233333333333230',
        '00000000000000000',
      ]}
    />
  );
}

function Classroom({ scale = 4 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{
        '0': C.line, '1': C.sand200, '2': C.sand400, '3': C.sand500,
        '4': C.jac500, '5': C.sky, '6': C.white, '7': C.energy,
      }}
      rows={[
        '...000000000.....',
        '..014444444410...',
        '.0144444444410...',
        '0144444444444410.',
        '0111111111111110.',
        '01155661156611110',
        '01155661156611110',
        '01155661156611110',
        '01155661156611110',
        '01111111111111110',
        '01177117711771110',
        '01177117711771110',
        '01111111111111110',
        '02233333333332330',
        '02333333233333330',
        '00000000000000000',
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// JACARANDA TREE (USyd's iconic October bloom — original art)
// ─────────────────────────────────────────────────────────────
function Jacaranda({ scale = 3 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{
        '0': C.line, '1': C.jac300, '2': C.jac500, '3': C.jac700,
        '4': '#5C3F22', '5': '#3E2A1A',
      }}
      rows={[
        '...01210....',
        '..0122210...',
        '.012333210..',
        '012322232210',
        '012333332210',
        '0122322322210',
        '.012333210..',
        '..0123210...',
        '....040.....',
        '....040.....',
        '....050.....',
      ]}
    />
  );
}

// Simple ground tiles
function GrassPatch({ scale = 3, w = 12 }) {
  const rows = [];
  const r1 = []; const r2 = [];
  for (let i = 0; i < w; i++) {
    r1.push((i % 3 === 0) ? '2' : '1');
    r2.push((i % 4 === 1) ? '3' : '1');
  }
  return (
    <PixelArt
      scale={scale}
      palette={{ '1': C.grass, '2': '#5BA346', '3': C.grassD }}
      rows={[r1.join(''), r2.join('')]}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// ITEM ICONS — inventory items
// ─────────────────────────────────────────────────────────────
const ITEM_SPRITES = {
  school_map: {
    palette: { '0': C.line, '1': '#F5E6C0', '2': C.sand500, '3': C.jac500, '4': C.grass, '5': C.red },
    rows: [
      '0000000000',
      '0111111110',
      '0124441110',
      '0114411510',
      '0144411410',
      '0114444110',
      '0144114410',
      '0111111110',
      '0000000000',
    ],
  },
  timetable: {
    palette: { '0': C.line, '1': C.white, '2': C.jac500, '3': C.sand500 },
    rows: [
      '0000000000',
      '0222222220',
      '0111111110',
      '0131313130',
      '0113113130',
      '0131313130',
      '0113113130',
      '0111111110',
      '0000000000',
    ],
  },
  student_card: {
    palette: { '0': C.line, '1': '#E8D097', '2': C.jac500, '3': C.sand500, '4': C.energy },
    rows: [
      '0000000000',
      '0222222220',
      '0111111110',
      '0144311310',
      '0144311310',
      '0111311310',
      '0111111110',
      '0111111110',
      '0000000000',
    ],
  },
  certificated_calculator: {
    palette: { '0': C.line, '1': '#5e5e5e', '2': '#bdbdbd', '3': C.energy, '4': C.line },
    rows: [
      '0000000000',
      '0222222220',
      '0233333320',
      '0233333320',
      '0222222220',
      '0212121210',
      '0212121210',
      '0212121210',
      '0000000000',
    ],
  },
  course_book: {
    palette: { '0': C.line, '1': C.jac500, '2': C.jac700, '3': C.white, '4': C.energy },
    rows: [
      '0000000000',
      '0111111110',
      '0133333310',
      '0144114410',
      '0133333310',
      '0144114410',
      '0133333310',
      '0222222220',
      '0000000000',
    ],
  },
  computer: {
    palette: { '0': C.line, '1': '#888', '2': '#ccc', '3': C.sky, '4': C.white },
    rows: [
      '0000000000',
      '0222222220',
      '0233333320',
      '0233443320',
      '0233333320',
      '0222222220',
      '0011111100',
      '0001111000',
      '0000000000',
    ],
  },
  printed_material: {
    palette: { '0': C.line, '1': C.white, '2': C.sand400, '3': C.ink },
    rows: [
      '0000000000',
      '0111111110',
      '0133133130',
      '0131311310',
      '0133333110',
      '0131133310',
      '0133133130',
      '0111111110',
      '0000000000',
    ],
  },
};

function ItemSprite({ id, scale = 4 }) {
  const def = ITEM_SPRITES[id];
  if (!def) return <div style={{ width: 40, height: 36, background: '#ddd' }} />;
  return <PixelArt rows={def.rows} palette={def.palette} scale={scale} />;
}

// ─────────────────────────────────────────────────────────────
// BADGE ICON — pixel medal
// ─────────────────────────────────────────────────────────────
function BadgeIcon({ kind, earned = true, scale = 3 }) {
  const palettes = {
    orientation: { '0': C.line, '1': C.energy, '2': '#FFE89A', '3': '#B6822A', '4': C.jac500 },
    identity:    { '0': C.line, '1': C.sky, '2': C.skyL, '3': C.skyD, '4': C.jac500 },
    community:   { '0': C.line, '1': C.stress, '2': '#FFB9B9', '3': C.stressD, '4': C.jac500 },
    resource:    { '0': C.line, '1': C.prep, '2': '#A8E0D2', '3': C.prepD, '4': C.jac500 },
    class:       { '0': C.line, '1': C.jac500, '2': C.jac100, '3': C.jac700, '4': C.energy },
  };
  let pal = palettes[kind] || palettes.orientation;
  if (!earned) {
    pal = { '0': C.line, '1': '#9c9080', '2': '#bbb0a0', '3': '#6a6050', '4': '#888' };
  }
  return (
    <PixelArt
      scale={scale}
      palette={pal}
      rows={[
        '..00000..',
        '.0122210.',
        '012212210',
        '012242210',
        '012224210',
        '012222210',
        '012222110',
        '.0133310.',
        '..0040.0.',
        '...040...',
        '...000...',
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// PIXEL UI PIECES
// ─────────────────────────────────────────────────────────────

// Stat bar segment-based
function StatBar({ value, max = 6, color = C.energy, label, icon }) {
  const cells = [];
  for (let i = 0; i < max; i++) {
    cells.push(
      <div key={i} style={{
        width: 10, height: 14,
        background: i < value ? color : 'rgba(255,255,255,0.25)',
        border: `2px solid ${C.line}`,
        marginRight: 2,
      }} />
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {icon}
      <div style={{ display: 'flex' }}>{cells}</div>
    </div>
  );
}

// Heads-up display showing energy / stress / prep
function StatsHUD({ stats, compact = false }) {
  return (
    <div style={{
      display: 'flex', flexDirection: compact ? 'row' : 'column', gap: 6,
      padding: '8px 10px',
      background: 'rgba(42, 30, 18, 0.85)',
      border: `3px solid ${C.line}`,
      boxShadow: `3px 3px 0 ${C.jac700}`,
      color: C.paper,
      fontFamily: 'Silkscreen, monospace',
      fontSize: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Bolt scale={2} />
        <span style={{ minWidth: 24 }}>ENERGY</span>
        <StatBarSimple value={stats.energy} max={6} color={C.energy} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <StressIcon scale={2} />
        <span style={{ minWidth: 24 }}>STRESS</span>
        <StatBarSimple value={stats.stress} max={6} color={C.stress} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <BookIcon scale={2} />
        <span style={{ minWidth: 24 }}>PREP</span>
        <StatBarSimple value={stats.preparation} max={6} color={C.prep} />
      </div>
    </div>
  );
}

function StatBarSimple({ value, max = 6, color = C.energy }) {
  const cells = [];
  for (let i = 0; i < max; i++) {
    cells.push(
      <div key={i} style={{
        width: 8, height: 10,
        background: i < value ? color : 'rgba(255,255,255,0.18)',
        border: '1px solid #1a0f08',
        marginRight: 1,
      }} />
    );
  }
  return <div style={{ display: 'flex' }}>{cells}</div>;
}

// Pixel speech / dialog box
function DialogBox({ children, speaker, style }) {
  return (
    <div style={{
      background: C.paper,
      border: `3px solid ${C.line}`,
      boxShadow: `4px 4px 0 ${C.line}`,
      padding: 12,
      color: C.ink,
      fontFamily: 'VT323, monospace',
      fontSize: 18,
      lineHeight: 1.15,
      position: 'relative',
      ...style,
    }}>
      {speaker && (
        <div style={{
          position: 'absolute', top: -14, left: 10,
          background: C.jac500, color: '#fff',
          fontFamily: 'Silkscreen, monospace',
          fontSize: 10, padding: '3px 8px',
          border: `3px solid ${C.line}`,
        }}>{speaker}</div>
      )}
      {children}
    </div>
  );
}

// "QUEST" style alert banner
function QuestBanner({ title, sub, color = C.jac500 }) {
  return (
    <div style={{
      background: color, color: '#fff',
      border: `3px solid ${C.line}`,
      boxShadow: `4px 4px 0 ${C.line}`,
      padding: '10px 12px',
      fontFamily: 'Silkscreen, monospace',
    }}>
      <div style={{ fontSize: 11, letterSpacing: 0.5 }}>{title}</div>
      {sub && <div style={{ fontSize: 14, marginTop: 4, fontFamily: 'VT323, monospace' }}>{sub}</div>}
    </div>
  );
}

// Floating pixel reward toast
function RewardToast({ message, onDone, kind = 'item' }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []);
  const colors = { item: C.jac500, stat: C.prep, badge: C.energy, fail: C.stress };
  return (
    <div className="px-toast popin" style={{
      background: colors[kind] || C.jac500,
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'VT323, monospace',
      fontSize: 18,
    }}>
      {message}
    </div>
  );
}

// Hooks  — small reusable
function useTypewriter(text, speed = 30) {
  const [out, setOut] = React.useState('');
  React.useEffect(() => {
    setOut('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

// ─────────────────────────────────────────────────────────────
// WAVING MASCOT — cute student waving for "GO HERE" map pin
// ─────────────────────────────────────────────────────────────
function WavingMascot({ scale = 4 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{
        '0': C.line, '1': '#FFD8B0', '2': C.jac500, '3': C.coral,
        '4': C.energy, '5': '#FFEBC2', '6': C.white, '7': C.jac700,
      }}
      rows={[
        '................',
        '....022220......',
        '...0222222200...',
        '..022222222200..',
        '..02111111120...',
        '..02101101120...',
        '..02111551120...',
        '00021555512000..',
        '01020111110200..',
        '01030333310200..',
        '01030333310200..',
        '..0033003330....',
        '..0333003330....',
        '..0044404440....',
        '..0440404400....',
        '...00...00......',
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// STAR SPRITE — chunky pixel star
// ─────────────────────────────────────────────────────────────
function StarSprite({ scale = 4, color = C.energy, dark = C.energyD }) {
  return (
    <PixelArt
      scale={scale}
      palette={{ '0': C.line, '1': color, '2': dark, '3': C.cream }}
      rows={[
        '.......0.......',
        '......010......',
        '......010......',
        '.....01310.....',
        '0000013113000.0',
        '0111133133111.0',
        '.011331113110..',
        '..0133333310...',
        '..0123333310...',
        '.011331133110..',
        '0113310013311.0',
        '0220000000022.0',
        '.....0...0.....',
        '.....0...0.....',
        '.....00.00.....',
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// CHECK FLAG SPRITE — completed pin
// ─────────────────────────────────────────────────────────────
function CheckFlag({ scale = 4 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{ '0': C.line, '1': C.prep, '2': C.prepD, '3': C.white, '4': C.sand500 }}
      rows={[
        '0000000000......',
        '011111111200....',
        '011113311200....',
        '011131111200....',
        '011131113200....',
        '011113113200....',
        '011111113200....',
        '011111111200....',
        '022222222200....',
        '0..............',
        '0..............',
        '0..............',
        '0..............',
        '0..............',
        '04.............',
        '04.............',
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// LOCK CLOUD — locked pin
// ─────────────────────────────────────────────────────────────
function LockCloud({ scale = 4 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{ '0': C.line, '1': '#DCD0BD', '2': '#B5A78F', '3': C.line, '4': C.energy }}
      rows={[
        '...0000.....',
        '..011110....',
        '.0111111000.',
        '011111111110',
        '011144441110',
        '011143341110',
        '011143341110',
        '011144441110',
        '022222222220',
        '.0000000000.',
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// BACKPACK WALKER — pixel character walking with backpack
// Used in the splash scene.
// ─────────────────────────────────────────────────────────────
function BackpackWalker({ scale = 3, color = 'pink', frame = 0 }) {
  const palettes = {
    pink:   { hair: C.coral,  bag: C.pink,   pants: C.jac500 },
    blue:   { hair: '#5D8FD0', bag: C.skyD,  pants: C.prepD },
    green:  { hair: '#7A4F26', bag: C.grass, pants: '#3D8530' },
    purple: { hair: '#3D2855', bag: C.jac500,pants: C.jac700 },
    yellow: { hair: '#A66A30', bag: C.energy,pants: C.sand500 },
  };
  const p = palettes[color] || palettes.pink;
  const pal = {
    '0': C.line, '1': '#FFD8B0', '2': p.hair, '3': p.bag,
    '4': p.pants, '5': C.white, '6': C.energyD,
  };
  // Two frames for a tiny walking cycle
  if (frame === 0) {
    return (
      <PixelArt
        scale={scale}
        palette={pal}
        rows={[
          '..022220.',
          '.02222220',
          '.02111120',
          '.02101120',
          '.02111120',
          '.0211112033',
          '003311110333',
          '0333333330',
          '0433333340',
          '04443344.0',
          '.04400440',
          '.04...04.',
          '.04...040',
          '.040..040',
          '.00....00',
        ]}
      />
    );
  }
  return (
    <PixelArt
      scale={scale}
      palette={pal}
      rows={[
        '..022220.',
        '.02222220',
        '.02111120',
        '.02101120',
        '.02111120',
        '.0211112033',
        '003311110333',
        '0333333330',
        '0433333340',
        '04443344.0',
        '.04400440',
        '..04.04..',
        '..04.040.',
        '.040..040',
        '.00....00',
      ]}
    />
  );
}

// Animated walker that alternates two frames
function AnimatedWalker({ color = 'pink', scale = 3, flip = false, speed = 360 }) {
  const [f, setF] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setF(x => (x + 1) % 2), speed);
    return () => clearInterval(id);
  }, [speed]);
  return (
    <div style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <BackpackWalker color={color} scale={scale} frame={f} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CLOUD — fluffy pixel cloud
// ─────────────────────────────────────────────────────────────
function CloudSprite({ scale = 3 }) {
  return (
    <PixelArt
      scale={scale}
      palette={{ '0': '#C8D8E8', '1': C.white, '2': '#EDF4F8' }}
      rows={[
        '....0000....',
        '...012210...',
        '..01122110.',
        '.0111122110',
        '0112222211100',
        '012222222110',
        '0111122211100',
        '.00000000000',
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// FLOWER — small pixel flower for grass
// ─────────────────────────────────────────────────────────────
function FlowerSprite({ scale = 3, color = 'pink' }) {
  const palettes = {
    pink:   { '0': C.line, '1': C.pink, '2': C.sun, '3': C.grassD },
    yellow: { '0': C.line, '1': C.sun,  '2': C.coral, '3': C.grassD },
    white:  { '0': C.line, '1': C.white,'2': C.sun, '3': C.grassD },
  };
  return (
    <PixelArt
      scale={scale}
      palette={palettes[color] || palettes.pink}
      rows={[
        '.010.',
        '01210',
        '.010.',
        '..3..',
        '..3..',
      ]}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// SPARKLE — small twinkle for emphasis
// ─────────────────────────────────────────────────────────────
function Sparkle({ scale = 2, color = C.energy }) {
  return (
    <PixelArt
      scale={scale}
      palette={{ '0': C.line, '1': color, '2': C.white }}
      rows={[
        '..0..',
        '.010.',
        '01210',
        '.010.',
        '..0..',
      ]}
    />
  );
}

Object.assign(window, {
  WavingMascot, StarSprite, CheckFlag, LockCloud,
  BackpackWalker, AnimatedWalker, CloudSprite, FlowerSprite, Sparkle,
});

// ─────────────────────────────────────────────────────────────
// END NEW SPRITES
// ─────────────────────────────────────────────────────────────

Object.assign(window, {
  PixelArt, Avatar, avatarName, AVATAR_DEFS,
  Heart, Bolt, StressIcon, BookIcon,
  GreatHall, ServiceCenter, ClubFairTent, Library, Classroom,
  Jacaranda, GrassPatch,
  ItemSprite, ITEM_SPRITES, BadgeIcon,
  StatBar, StatBarSimple, StatsHUD,
  DialogBox, QuestBanner, RewardToast,
  useTypewriter, PIXEL_COLORS: C,
});
