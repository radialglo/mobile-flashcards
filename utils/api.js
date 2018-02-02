import { AsyncStorage } from 'react-native';
import uuidv1 from 'uuid/v1';


const FLASHCARDS_STORAGE_KEY = 'Radialglo:flashcards'

/**
 * @desc return all of the decks along with their titles, questions, and answers.
 */
export const getDecks = () => {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((results) => {
        return results === null ? {} : JSON.parse(results);
    })
}

/**
 * @param deckId
 * @desc take in a single id argument and return the deck associated with that id
 */
export const getDeck = (deckId) => {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((results) => JSON.parse(results)[deckId])
}

/**
 * @param title
 * @desc take in a single title argument and add it to the decks.
 */
export const saveDeckTitle = (deckTitle) => {
    const deckId = uuidv1()
    const deck = {
        id: deckId,
        title: deckTitle,
        timeCreated: Date.now(),
        questions: [],
    }

    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [deckId]: deck
    })).then(() => deck)
}

/**
 * @param deckId
 * @param card
 * @desc Take in two arguments, deckId and card, and will add the card to the list of questions for the deck with the associated deckId
 */
export const addCardToDeck = (deckId, {question, answer}) => {
    return getDeck(deckId).then((deck) => {
        const newDeck = {
            ...deck,
            questions: [
                ...deck.questions,
                {
                    question: question,
                    answer: answer,
                }
            ]

        }
        return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
            [deckId]: newDeck
        })).then(() => newDeck);
    })
}
