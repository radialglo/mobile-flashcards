export const ADD_CARD_TO_DECK = 'ADD_SLIDE_TO_DECK';
export const ADD_DECK = 'DECK'
import uuidv1 from 'uuid/v1';

export function addDeck(deckTitle) {
    return {
        type: ADD_DECK,
        id: uuidv1(),
        title: deckTitle,
    };
}

export function addCard(deckId) {
    return {
        type: ADD_CARD_TO_DECK
    };
}