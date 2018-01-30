import { ADD_DECK, ADD_CARD_TO_DECK} from '../actions';

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
                deck: {
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
        default:
            return state;
    }
}

export default decks;