import { Card, DealtCards } from "../models/cards";
import { compareCards } from "./card.utils";

export const getColumnIndexForCard = (board: DealtCards, card: Card | undefined): number =>
    board.findIndex((column) => columnContainsCard(column, card));

export const getCardIndexInColumn = (column: Array<Card>, card: Card | undefined): number =>
    column.findIndex((columnCard) => compareCards(columnCard, card));

export const columnContainsCard = (column: Card[], card: Card | undefined): boolean =>
    getCardIndexInColumn(column, card) !== -1;

