import { CellCoord } from '../cell-coord';
import { ChessColor } from '../chess-color';
import { COMMON } from '../common';
import { Figure } from '../figure';
import { FigureType } from '../figure-type';
import { IField } from '../ifield';
import { Move } from '../move';
import { Moves } from '../moves';
import { Vector } from '../vector';

export class Bishop extends Figure {
  constructor(color: ChessColor) {
    super(FigureType.bishop, color);
  }
  getMoves(position: CellCoord, field: IField, checkDanger: boolean = true): Moves {
    const result = new Moves();
    if (!field.isFreeCell(position) && field.getFigure(position).toString() == this.toString() && field.playerColor == this.color) {
      for (let vector of COMMON.DIAGONAL_MOVES) {
        let resultPosition = vector.resultPosition(position);
        let currentVector = vector.copy();
        while (resultPosition.isCorrect() && (field.isFreeCell(resultPosition) || field.getFigure(resultPosition)?.color !== this.color)) {
          const move = new Move(position, currentVector);
          if (!checkDanger || !this.isDangerousMove(move, field)) result.add(move);
          if (!field.isFreeCell(resultPosition)) {
            currentVector = new Vector(COMMON.BOARD_SIZE, COMMON.BOARD_SIZE); //exit from While
          } else {
            currentVector = currentVector.sum(vector);
          }
          resultPosition = currentVector.resultPosition(position);
        }
      }
    }
    return result;
  }
}
