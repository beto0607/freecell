import { CardsStacks, CardSuit } from "../models/cards";

export const initStacks = (): CardsStacks => ({
    [CardSuit.Heart]: [],
    [CardSuit.Club]: [],
    [CardSuit.Spade]: [],
    [CardSuit.Diamond]: [],
});
