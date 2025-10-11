import { Game } from "./game";
import type { Position } from "@/lib/types";
import { evaluateBoard } from "./evalution";

export class GameEngine {
  private game: Game;
  private depth: number;

  constructor(initialGame: Game, depth: number = 4) {
    // clone the initial game so engine can modify safely
    this.game = new Game(initialGame.cloneBoard(), initialGame.turn);
    this.depth = depth;
  }

  setDepth(depth: number) {
    this.depth = depth;
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
    if (depth === 0) {
      return evaluateBoard(this.game.board, this.game.turn);
    }

    const moves = this.getAllLegalMoves();
    if (moves.length === 0) return evaluateBoard(this.game.board, this.game.turn);

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

    return maxEval;
  }

  /** Basic minimax with alpha-beta pruning */
  private minimax(depth: number, alpha: number, beta: number, isMaximizing: boolean): number {
    if (depth === 0) {
      return evaluateBoard(this.game.board, this.game.turn);
    }

    const moves = this.getAllLegalMoves();
    if (moves.length === 0) return evaluateBoard(this.game.board, this.game.turn);

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const [from, to] of moves) {
        const moveInfo = this.game.makeMove(from, to);
        if(!moveInfo) continue;
        const evalScore = -this.minimax(depth - 1, -beta, -alpha, false);
        this.game.undoMove();
        maxEval = Math.max(maxEval, evalScore);
        alpha = Math.max(alpha, evalScore);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const [from, to] of moves) {
        const moveInfo = this.game.makeMove(from, to);
        if(!moveInfo) continue;
        const evalScore = -this.minimax(depth - 1, -beta, -alpha, true);
        this.game.undoMove();
        minEval = Math.min(minEval, evalScore);
        beta = Math.min(beta, evalScore);
        if (beta <= alpha) break;
      }
      return minEval;
    }
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
