export const ADD_CARD_TO_DECK = 'ADD_SLIDE_TO_DECK';
export const ADD_DECK = 'ADD_DECK'
export const DECKS_LOADED = 'DECKS_LOADED'
import * as API  from '../utils/api';


export function loadDecks() {
    return function (dispatch) {
        API.getDecks().then((decks) => {
            dispatch({
                type: DECKS_LOADED,
                decks: decks,
            })
        })
    }
}

export function addDeck(deckTitle) {
    return function(dispatch) {
        API.saveDeckTitle(deckTitle).then(deck => {
            dispatch({
                type: ADD_DECK,
                deck: deck
            })
        })
    }
}

export function addCard(deckId) {
    return {
        type: ADD_CARD_TO_DECK
    };

}