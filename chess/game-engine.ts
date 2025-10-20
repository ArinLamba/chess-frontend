import { Game } from "./game";
import type { Position } from "@/lib/types";
import { evaluateBoard } from "./evalution";


type TTEntry = {
  depth: number;
  score: number;
};
export class GameEngine {
  private game: Game;
  private depth: number;
  private transpositionTable: Map<string, TTEntry> = new Map(); // ✅ TT cache

  constructor(initialGame: Game, depth: number = 4) {
    // clone the initial game so engine can modify safely
    this.game = new Game(initialGame.cloneBoard(), initialGame.turn);
    this.depth = depth;
  }

  setDepth(depth: number) {
    this.depth = depth;
  }

  /** ✅ Generate a unique key for this position */
  private getPositionKey(): string {
    let key = "";
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.game.board[r][c];
        key += piece ? `${piece.type}${piece.color[0]}` : ".";
      }
    }
    key += this.game.turn;
    return key;
  }

  /** Get best move using simple minimax (placeholder for now) */
  getBestMove(): [Position, Position] | null {
    const allMoves = this.getAllLegalMoves();
    if (allMoves.length === 0) return null;

    let bestMove: [Position, Position] | null = null;
    let bestScore = -Infinity;

    for (const [from, to] of allMoves) {
      // Make the move
      const moveInfo = this.game.makeMove(from, to);
      if(!moveInfo) continue;

      // const score = -this.minimax(this.depth - 1, -Infinity, Infinity, false);
      const score = -this.negamax(this.depth - 1, -Infinity, Infinity);


      // Undo the move
      this.game.undoMove();

      if (score > bestScore) {
        bestScore = score;
        bestMove = [from, to];
      }
    }

    return bestMove;
  }

  private negamax(depth: number, alpha: number, beta: number): number {
    const key = this.getPositionKey();
    
    // check if this position is cached
    const cached = this.transpositionTable.get(key);
    if(cached && cached.depth >= depth) {
      return cached.score;
    }

    // best case or terminal
    if (depth === 0) {
      const evalScore = evaluateBoard(this.game.board, this.game.turn);
      this.transpositionTable.set(key, { depth, score: evalScore });
      return evalScore;
    }

    if(this.game.detectCheckMate()) {
      const mateScore = -9999 + (this.depth - depth);
      this.transpositionTable.set(key, { depth, score: mateScore });
      return mateScore;
    }
    
    const moves = this.getAllLegalMoves();
    if (moves.length === 0) {
      const evalScore = evaluateBoard(this.game.board, this.game.turn);
      this.transpositionTable.set(key, { depth, score: evalScore });
      return evalScore;
    }

    // normal negamax search
    let maxEval = -Infinity;

    for (const [from, to] of moves) {
      const moveInfo = this.game.makeMove(from, to);
      if(!moveInfo) continue;

      const evalScore = -this.negamax(depth - 1, -beta, -alpha);
      this.game.undoMove();

      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (alpha >= beta) break;
    }

    // store result
    this.transpositionTable.set(key, { depth, score: maxEval });
    return maxEval;
  }


  /** Return all legal moves for current turn */
  private getAllLegalMoves(): [Position, Position][] {
    const moves: [Position, Position][] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.game.board[row][col];
        if (piece && piece.color === this.game.turn) {
          const legal = this.game.getLegalMoves(row, col);
          for (const move of legal) {
            moves.push([[row, col], move]);
          }
        }
      }
    }
    return moves;
  }
}
