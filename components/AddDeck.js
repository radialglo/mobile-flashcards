import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import TextButton from './TextButton'

class AddDeck extends Component {
    state = {
        title: '',
    }

    handleInput = (text) => {
        this.setState({
            title: text,
        })

    }
    handlePress = () => {
        if (this.state.title.length) {
            this.setState((prevState) => {
                this.props.addDeck(prevState.title, (deck) => {
                    this.props.navigation.navigate(
                        'DeckDetail', {
                            deckId: deck.id,
                            title: deck.title,
                            questionCount: deck.questions.length,
                        }
                    );
                });

                return {
                    title: ''
                }
            })
        }
    }
    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.header}> What is the title of your new deck?</Text>
                <TextInput placeholder={'Deck Title'} style={styles.textInput} value={this.state.title} onChangeText={this.handleInput}/>
                <TextButton  onPress={this.handlePress}>Submit</TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 22,
        marginBottom: 15,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: "100%",
        padding: 5,
        marginBottom: 15,
    }
})

function mapStateToProps ({ decks }) {
    return {
        newlyAddedDeck: decks.allIds.length ? decks.byIds[decks.allIds[decks.allIds.length - 1]]: null
    }

}

function mapDispatchToProps (dispatch) {
    return {
        addDeck: (deckTitle, cb) => dispatch(addDeck(deckTitle)).then((deck) => cb(deck))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck)