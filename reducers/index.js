import { ADD_DECK, ADD_CARD_TO_DECK, DECKS_LOADED } from '../actions';

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
        case ADD_CARD_TO_DECK:
            const { deckId, question, answer } = action.card;
            deck = state.decks.byIds[deckId];
            return {
                ...state.decks,
                decks: {
                    byIds: {
                        ...state.decks.byIds,
                        [deckId]: {
                            ...deck,
                            questions: [
                                ...deck.questions, {
                                    question: question,
                                    answer: answer,
                                }

                            ]
                        }

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