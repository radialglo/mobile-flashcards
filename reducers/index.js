import { ADD_DECK, ADD_CARD_TO_DECK} from '../actions';

function decks (state = { deck: { byIds: {}, allIds: []} }, action) {
    let deck;
    switch (action.type) {
        case ADD_DECK:
            deck = action.deck;

            return {
                deck: {
                    byIds: {
                        ...state.deck.byIds,
                        [deck.id]: {
                            id: deck.id,
                            title: deck.title,
                            questions: [],
                        }
                    },
                    allIds: [... state.deck.allIds, deck.id]
                }
            }
        case ADD_CARD_TO_DECK:
            const { deckId, question, answer } = action.card;
            deck = state.deck.byIds[deckId];
            return {
                ...state.deck,
                deck: {
                    byIds: {
                        ...state.deck.byIds,
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