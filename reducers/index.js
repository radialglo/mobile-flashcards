import {ADD_DECK, DECKS_LOADED, UPDATE_DECK} from '../actions';

function decks (state = { decks: { byIds: {}, allIds: []} }, action) {
    let deck;
    switch (action.type) {
        case ADD_DECK:
            deck = action.deck;

            return {
                decks: {
                    byIds: {
                        ...state.decks.byIds,
                        [deck.id]: {
                            id: deck.id,
                            title: deck.title,
                            questions: [],
                        }
                    },
                    allIds: [... state.decks.allIds, deck.id]
                }
            }
        case UPDATE_DECK:
            const { id } = action.deck;
            deck = state.decks.byIds[id];
            return {
                decks: {
                    ...state.decks,
                    byIds: {
                        ...state.decks.byIds,
                        [id]: action.deck
                    }
                }
            }
        case DECKS_LOADED:
            return {
                decks: {
                    byIds: action.decks,
                    allIds: Object.keys(action.decks)
                }
            }
        default:
            return state;
    }
}

export default decks;