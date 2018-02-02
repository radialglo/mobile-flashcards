export const UPDATE_DECK = 'UPDATE_DECK';
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
        return API.saveDeckTitle(deckTitle).then(deck => {
            dispatch({
                type: ADD_DECK,
                deck: deck
            })

            return deck
        })
    }
}

export function addCard(deckId, question, answer) {

    return function (dispatch) {
        const card = {
            question,
            answer,
        }

        API.addCardToDeck(deckId, card).then((deck) => {
            dispatch({
                type: UPDATE_DECK,
                deck
            });

        });
    }

}