
// import type { BoardType, MoveInfo, PieceColor, PieceType, Position } from "@/lib/types";
// import { King } from "./pieces/king";
// import { Pawn } from "./pieces/pawn";
// import { Rook } from "./pieces/rook";
// import { Piece } from "./pieces/piece";
// import { Queen } from "./pieces/queen";
// import { Knight } from "./pieces/knight";
// import { Bishop } from "./pieces/bishop";


// export class Game {
//   board: BoardType;
//   turn: PieceColor;
//   private lastMoveInfo: MoveInfo | null = null;
//   private legalMovesCache: Map<string, Position[]> = new Map();
//   private checkCache: { check: boolean; checkmate: boolean } | null = null;



//   constructor(board: BoardType, turn: PieceColor = "white") {
//     this.board = board;
//     this.turn = turn;
//   }

//   // ===================== HELPERS =====================

//   // factory that creates an instance of the correct piece subclass
//   private createPiece(type: PieceType, color: PieceColor, hasMoved = false): Piece {
//     let p: Piece;
//     switch (type) {
//       case "pawn":   p = new Pawn(color); break;
//       case "rook":   p = new Rook(color); break;
//       case "knight": p = new Knight(color); break;
//       case "bishop": p = new Bishop(color); break;
//       case "queen":  p = new Queen(color); break;
//       case "king":   p = new King(color); break;
//       default: throw new Error("Unknown piece type: " + type);
//     }
//     p.hasMoved = hasMoved;
//     return p;
//   }

//   // deep clone board but preserve Piece prototypes (so methods like getValidMoves remain)
//   cloneBoard(): BoardType {
//     return this.board.map(row =>
//       row.map(cell => {
//         if (!cell) return null;
//         return this.createPiece(cell.type, cell.color, cell.hasMoved);
//       })
//     );
//   }

//   private moveAnalyzer(from: Position, to: Position, board: BoardType = this.board) : MoveInfo | null{
//     const [fr, fc] = from;
//     const [tr, tc] = to;
//     const piece = board[fr][fc];
//     const targetPiece = board[tr][tc];

//     if (!piece) return null;

//     const wasCapture = !!targetPiece;

//     const wasCastling =
//       this.isCastlingMove(piece, from, to) ? (tc > fc ? "kingside" : "queenside") : null;

//     const simulatedBoard = this.simulateMove(from, to);
//     const opponent = piece.color === "white" ? "black" : "white";
//     const isCheck = this.isKingInCheck(opponent, simulatedBoard);
//     // const isCheckmate =
//     //   isCheck && this.getAllLegalMoves(opponent, simulatedBoard).length === 0;

//     return {
//       piece: piece.type,
//       color: piece.color,
//       from,
//       to,
//       captured: wasCapture,
//       isCastling: wasCastling,
//       isCheck,
//       isCheckmate: false,
//     };
//   }
//   // ✅ public getter (read-only accessor)
//   getMoveInfo(): MoveInfo | null {
//     return this.lastMoveInfo ? { ...this.lastMoveInfo } : null;
//   }

//   // ===================== MOVE HANDLING =====================

//   // mutate board (in-place) to move a piece (no legality checks here)
//   private movePieceOnBoard(board: BoardType, from: Position, to: Position) {
//     const [fr, fc] = from;
//     const [tr, tc] = to;
//     const piece = board[fr][fc];
//     if (!piece) return;

//     // ------------- Normal Move -------------
//     board[tr][tc] = piece;
//     board[fr][fc] = null;
//     piece.hasMoved = true;
//     // NOTE TO SELF: handle pawn-promotion/castling/en-passant here
//     this.handleSpecialMoves(piece, from, to, board);

//   }
//   private handleSpecialMoves(piece: Piece, from: Position, to: Position, board: BoardType) {
//     if (this.isCastlingMove(piece, from, to)) this.handleCastling(from, to, board);
//     if (this.isPawnPromotion(piece, to[0])) this.handlePromotion(to, piece, board);
//   }
  
//   // ===================== CASTLING =====================

//   private isCastlingMove(piece: Piece, [, fc]: Position, [, tc]: Position): boolean {
//     return piece.type === "king" && Math.abs(tc - fc) === 2;
//   }

//   private handleCastling(from: Position, to: Position, board: BoardType) {
//     const [fr, fc] = from;
//     const [, tc] = to;
//     const row = fr;
//     const isKingSide = tc > fc;

//     const rookFromCol = isKingSide ? 7 : 0;
//     const rookToCol = isKingSide ? 5 : 3;

//     const rook = board[row][rookFromCol];
//     board[row][rookToCol] = rook;
//     board[row][rookFromCol] = null;
//     if (rook) rook.hasMoved = true;
//   }

//   // ===================== PROMOTION =====================

//   private isPawnPromotion(piece: Piece, row: number): boolean {
//     if (piece.type !== "pawn") return false;
//     const lastRank = piece.color === "white" ? 0 : 7;
//     return row === lastRank;
//   }
//   private handlePromotion(to: Position, piece: Piece, board: BoardType) {
//     const [tr, tc] = to;
//     board[tr][tc] = new Queen(piece.color);

//   }

//   // ===================== ATTACK / CHECK =====================

//   private findKing(color: PieceColor, board: BoardType): Position | null {
//     for (let r = 0; r < 8; r++) {
//       for (let c = 0; c < 8; c++) {
//         const p = board[r][c];
//         if (p && p.type === "king" && p.color === color) return [r, c];
//       }
//     }
//     return null;
//   }

//   // is a square attacked by `attackerColor` on the given board?
//   // If `board` not provided, we use current game board.
//   private isSquareAttacked(target: Position, attackerColor: PieceColor, boardParam?: BoardType): boolean {
//     const boardToCheck = boardParam ?? this.board;
//     const [tr, tc] = target;

//     for (let r = 0; r < 8; r++) {
//       for (let c = 0; c < 8; c++) {
//         const p = boardToCheck[r][c];
//         if (!p || p.color !== attackerColor) continue;

//         // call the piece's pseudo-legal move generator (it must NOT depend on Game)
//         const moves = p.getValidMoves(r, c, boardToCheck);
//         // If any pseudo-legal move lands on target square => it's attacked
//         if (moves.some(([mr, mc]) => mr === tr && mc === tc)) return true;
//       }
//     }

//     return false;
//   }

//   // -------------------- FOR CHECKMATE DETECTION-------------------
//   private computeIsKingInCheck(color: PieceColor, boardParam?: BoardType): boolean {
//     const boardToCheck = boardParam ?? this.board;
//     const kingPos = this.findKing(color, boardToCheck);
//     if (!kingPos) return false;   // should not happen in valid states
//     const opponent: PieceColor = color === "white" ? "black" : "white";
//     return this.isSquareAttacked(kingPos, opponent, boardToCheck);
//   }

//   private isKingInCheck(color: PieceColor, boardParam?: BoardType): boolean {
//     if (this.checkCache?.check !== undefined) {
//       return this.checkCache.check;
//     }
//     const result = this.computeIsKingInCheck(color, boardParam);
//     if (!boardParam) this.checkCache = { check: result, checkmate: this.checkCache?.checkmate ?? false };
//     return result;
//   }

  
//   private computeIsCheckmate(color: PieceColor): boolean {
//     const inCheck = this.isKingInCheck(color);
//     const hasMoves = this.hasLegalMoves(color);
//     return inCheck && !hasMoves;
//   }

//   private hasLegalMoves(color: PieceColor): boolean {
//     for (let r = 0; r < 8; r++) {
//       for (let c = 0; c < 8; c++) {
//         const piece = this.board[r][c];
//         if (!piece || piece.color !== color) continue;
//         if (this.getLegalMoves(r, c).length > 0) return true;
//       }
//     }
//     return false;
//   }

//   private isCheckmate(color: PieceColor): boolean {
//     if (this.checkCache?.checkmate !== undefined) {
//       return this.checkCache.checkmate;
//     }
//     const result = this.computeIsCheckmate(color);
//     if (!this.checkCache) this.checkCache = { check: false, checkmate: result };
//     else this.checkCache.checkmate = result;
//     return result;
//   }

//   detectCheckMate() {
//     return this.isCheckmate(this.turn);
//   }
//   // ----------------------------------------------------------------

//   private checkCastling([row, col]: Position, [, tc]: Position, color: PieceColor) : boolean {
//     const dir = tc > col ? 1 : -1;
//     const pathCols = [col, col + dir, tc];
    
//     for(const c of pathCols) {
//       const opponent: PieceColor = color === "white" ? "black" : "white";
//       if(this.isSquareAttacked([row, c], opponent)) {
//         return false;
//       }
//     }
//     return true;
//   }

//   // ===================== MOVE GENERATION =====================

//   // return a new board that is the result of applying a move
//   private simulateMove(from: Position, to: Position): BoardType {
//     const b = this.cloneBoard();

//     // Clear caches so simulations do fresh computation
//     this.legalMovesCache.clear();
//     this.checkCache = null;

//     this.movePieceOnBoard(b, from, to);
//     return b;
//   }

//   private computeLegalMoves(row: number, col: number) : Position[] {
//     const piece = this.board[row][col];
//     if (!piece) return [];
//     if (piece.color !== this.turn) return [];

//     // pseudo-legal moves from the piece itself
//     const pseudoMoves = piece.getValidMoves(row, col, this.board);

//     // filter out moves that leave king in check
//     const legal: Position[] = [];
//     for(const [tr, tc] of pseudoMoves) {
//       const simulated = this.simulateMove([row, col], [tr, tc]);

//       if(piece.type === "king" && Math.abs(tc - col) === 2) {
//         if(!this.checkCastling([row, col], [tr, tc], piece.color)) continue;
//       }

//       // After the move, is own king in check?
//       if(!this.isKingInCheck(piece.color, simulated)) {
//         legal.push([tr, tc]);
//       }
//     }

//     return legal;
//   }

//   // returns legal moves for piece at (row,col) considering pins/checks
//   getLegalMoves(row: number, col: number): Position[] {

//     const key = `${row}${col}${this.turn}`;
//     if(this.legalMovesCache.has(key)) return this.legalMovesCache.get(key)!;

//     const moves = this.computeLegalMoves(row, col);
//     this.legalMovesCache.set(key, moves);
//     return moves;
//   }

//   // ===================== MAKE MOVE =====================

//   // make a *legal* move (should be verified before calling)
//   makeMove(from: Position, to: Position) {
//     this.legalMovesCache.clear(); // clear move cache after move because board is change
//     this.lastMoveInfo = this.moveAnalyzer(from,to);
//     this.movePieceOnBoard(this.board, from, to);
//     // switch turn
//     this.turn = this.turn === "white" ? "black" : "white";
//   }
// }




// Game.ts
import type { BoardType, PieceColor, Position, MoveInfo } from "@/lib/types";
import { MoveHandler } from "@/chess/handlers/move-handler";
import { CheckHandler } from "@/chess/handlers/check-handler";
import { PieceFactory } from "@/chess/handlers/piece-factory";

export class Game {
  board: BoardType;
  turn: PieceColor;
  private lastMoveInfo: MoveInfo | null = null;
  private legalMovesCache: Map<string, Position[]> = new Map();
  private moveHistory: MoveInfo[] = [];


  constructor(board: BoardType, turn: PieceColor = "white") {
    this.board = board;
    this.turn = turn;
  }

  getMoveInfo(): MoveInfo | null {
    return this.lastMoveInfo ? { ...this.lastMoveInfo } : null;
  }

  cloneBoard(): BoardType {
    return PieceFactory.cloneBoard(this.board);
  }
  
  getLegalMoves(row: number, col: number): Position[] {
    const key = `${row}${col}${this.turn}`;
    if (this.legalMovesCache.has(key)) return this.legalMovesCache.get(key)!;

    const moves = MoveHandler.computeLegalMoves(this, row, col);
    this.legalMovesCache.set(key, moves);
    return moves;
  }

  makeMove(from: Position, to: Position) {
    this.legalMovesCache.clear();
    // CheckHandler.attackMapCache = {};
    
    // Generate move metadata including captured piece, promotion info, etc.
    const moveInfo = MoveHandler.moveMetadata(this, from, to);
    if(!moveInfo) return;

    this.moveHistory.push(moveInfo);       // push onto history stack
    this.lastMoveInfo = moveInfo;
    
    MoveHandler.movePieceOnBoard(this.board, from, to);
    
    //handle promotion (update the last move's promotedPiece)
    if(moveInfo.isPromotion) {
      const promoted = this.board[to[0]][to[1]];
      moveInfo.promotedPiece = promoted!;
    }
    
    this.turn = this.turn === "white" ? "black" : "white";
    return moveInfo;
    
  }

  detectCheckMate() {
    return CheckHandler.isCheckmate(this, this.turn);
  }

  undoMove() {
    this.legalMovesCache.clear();
    // CheckHandler.attackMapCache = {};
    
    const moveInfo = this.moveHistory.pop();
    if (!moveInfo) return;

    const [fr, fc] = moveInfo.from;
    const [tr, tc] = moveInfo.to;

    // Restore moved piece to original square
    const piece = this.board[tr][tc];
    if (!piece) return;

    // Undo promotion
    if (moveInfo.isPromotion && moveInfo.promotedPiece) {
      this.board[fr][fc] = moveInfo.promotedPiece;
    } else {
      this.board[fr][fc] = piece;
    }

    this.board[fr][fc]!.hasMoved = moveInfo.prevHasMoved;

    // Restore captured piece if any
    if (moveInfo.captured && moveInfo.capturedPiece) {
      this.board[tr][tc] = moveInfo.capturedPiece;
    } else {
      this.board[tr][tc] = null;
    }

    // Undo castling
    if (moveInfo.isCastling) {
      const row = fr;
      const isKingSide = moveInfo.isCastling === "kingside";
      const rookFromCol = isKingSide ? 7 : 0;
      const rookToCol = isKingSide ? 5 : 3;

      const rook = this.board[row][rookToCol];
      if (rook) {
        this.board[row][rookFromCol] = rook;
        this.board[row][rookToCol] = null;
        rook.hasMoved = false;
      }
    }

    // Switch turn back
    this.turn = this.turn === "white" ? "black" : "white";
  }

}
