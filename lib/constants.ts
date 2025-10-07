

// directions
export const ROOK_DIRS = [
  [1, 0], [-1, 0], [0, 1], [0, -1],
];
export const KNIGHT_MOVES = [
  [-2, -1], // up 2, left 1
  [-2,  1], // up 2, right 1
  [-1, -2], // up 1, left 2
  [-1,  2], // up 1, right 2
  [ 1, -2], // down 1, left 2
  [ 1,  2], // down 1, right 2
  [ 2, -1], // down 2, left 1
  [ 2,  1], // down 2, right 1
];

export const BISHOP_DIRS = [
  [1, 1], [1, -1], [-1, 1], [-1, -1],
];

export const QUEEN_DIRS = [...ROOK_DIRS, ...BISHOP_DIRS];
export const KING_DIRS = [...QUEEN_DIRS];

export type Theme = "neo" | "classic" | "standard";


export const pieceThemes = {
  classic: {
    "pawn-white": "/pieces/classic/pawn-white.svg",
    "pawn-black": "/pieces/classic/pawn-black.svg",
    "rook-white": "/pieces/classic/rook-white.svg",
    "rook-black": "/pieces/classic/rook-black.svg",
    "knight-white": "/pieces/classic/knight-white.svg",
    "knight-black": "/pieces/classic/knight-black.svg",
    "bishop-white": "/pieces/classic/bishop-white.svg",
    "bishop-black": "/pieces/classic/bishop-black.svg",
    "queen-white": "/pieces/classic/queen-white.svg",
    "queen-black": "/pieces/classic/queen-black.svg",
    "king-white": "/pieces/classic/king-white.svg",
    "king-black": "/pieces/classic/king-black.svg",
  },

  neo: {
    "pawn-white": "/pieces/neo/pawn-white.png",
    "pawn-black": "/pieces/neo/pawn-black.png",
    "rook-white": "/pieces/neo/rook-white.png",
    "rook-black": "/pieces/neo/rook-black.png",
    "knight-white": "/pieces/neo/knight-white.png",
    "knight-black": "/pieces/neo/knight-black.png",
    "bishop-white": "/pieces/neo/bishop-white.png",
    "bishop-black": "/pieces/neo/bishop-black.png",
    "queen-white": "/pieces/neo/queen-white.png",
    "queen-black": "/pieces/neo/queen-black.png",
    "king-white": "/pieces/neo/king-white.png",
    "king-black": "/pieces/neo/king-black.png",
  },

  standard: {
    "pawn-white": "/pieces/neo/pawn-white.png",
    "pawn-black": "/pieces/neo/pawn-black.png",
    "rook-white": "/pieces/neo/rook-white.png",
    "rook-black": "/pieces/neo/rook-black.png",
    "knight-white": "/pieces/neo/knight-white.png",
    "knight-black": "/pieces/neo/knight-black.png",
    "bishop-white": "/pieces/neo/bishop-white.png",
    "bishop-black": "/pieces/neo/bishop-black.png",
    "queen-white": "/pieces/neo/queen-white.png",
    "queen-black": "/pieces/neo/queen-black.png",
    "king-white": "/pieces/neo/king-white.png",
    "king-black": "/pieces/neo/king-black.png",
  }
} as const;
