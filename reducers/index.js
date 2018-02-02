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
                            timeCreated: deck.timeCreated,
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
                    // sort decks by newest first
                    allIds: Object.values(action.decks).sort(
                        (deckA, deckB) => {
                            return new Date(deckA.timeCreated) - new Date(deckB.timeCreated)
                        }
                    ).map((deck) => deck.id)
                }
            }
        default:
            return state;
    }
}

export default decks;