// 棋子名稱對照
export const PIECE_NAMES: Record<string, { zh: string; en: string; symbol: string }> = {
  k: { zh: '國王', en: 'King', symbol: '♔' },
  q: { zh: '皇后', en: 'Queen', symbol: '♕' },
  r: { zh: '城堡', en: 'Rook', symbol: '♖' },
  b: { zh: '主教', en: 'Bishop', symbol: '♗' },
  n: { zh: '騎士', en: 'Knight', symbol: '♘' },
  p: { zh: '兵', en: 'Pawn', symbol: '♙' },
};

// 教學頁面的棋子 slug 對照
export const PIECE_SLUGS: Record<string, string> = {
  king: 'k',
  queen: 'q',
  rook: 'r',
  bishop: 'b',
  knight: 'n',
  pawn: 'p',
};

// 棋盤顏色 - Wooden Theme
export const BOARD_COLORS = {
  light: '#f0d9b5', // Light maple wood
  dark: '#b58863',  // Dark oak wood
  highlight: 'rgba(201, 166, 107, 0.6)', // Warm gold
  lastMove: 'rgba(201, 166, 107, 0.4)', // Warm gold
  legalMove: 'radial-gradient(circle, rgba(0,0,0,.2) 25%, transparent 25%)',
  legalCapture: 'radial-gradient(circle, transparent 0%, transparent 79%, rgba(139, 32, 32, 0.5) 80%)', // Red tint for capture
};

// 導航連結
export const NAV_LINKS = [
  { href: '/', label: '首頁' },
  { href: '/play', label: '對弈' },
  { href: '/learn', label: '教學' },
];
