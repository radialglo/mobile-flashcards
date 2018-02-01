import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { green, red, blue } from '../utils/color'


class Quiz extends Component {
    static navigationOptions =  () => {
        return {
            title: 'Quiz',
        }
    }

    state = {
        cardIndex: 0,
        showAnswer: false,
        numCorrect: 0,
    }

    toggleAnswer = () => {
        this.setState((prevState) => {
            return {
                showAnswer: !prevState.showAnswer,
            }
        })
    }

    getPositionString = () => {
        return `${this.state.cardIndex + 1} / ${this.props.cards.length}`
    }

    getCurrentQuestion = () => {
        return this.props.cards[this.state.cardIndex].question
    }

    getCurrentAnswer = () => {
        return this.props.cards[this.state.cardIndex].answer
    }

    transitionToNextCard = () => {
        this.setState((prevState) => {
            return {
                cardIndex: prevState.cardIndex + 1,
            }
        })
    }

    handleCorrect = () => {
        this.setState((prevState) => {
            return {
                numCorrect: prevState.numCorrect + 1
            }
        })
        this.transitionToNextCard();
    }

    handleIncorrect = () => {
        this.transitionToNextCard();
    }

    isFinished = () => {
        return this.state.cardIndex >= this.props.cards.length;
    }

    render() {

        if (this.isFinished()) {
            return (
                <View><Text>Done</Text></View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <View style={{ flex: 1}}>
                            <Text>{this.getPositionString()}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1}}>
                        <Text style={styles.content}>{this.state.showAnswer ? this.getCurrentAnswer() : this.getCurrentQuestion()}</Text>
                        <TouchableOpacity onPress={this.toggleAnswer}>
                            <Text style={styles.toggleText}>{this.state.showAnswer ? 'Question' : 'Answer'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1}}>
                        <TextButton
                            btnStyle={[styles.btnShared, styles.correctButton]}
                            btnTextStyle={styles.btnTextShared}
                            onPress={this.handleCorrect}
                        >
                            Correct
                        </TextButton>
                        <TextButton
                            btnStyle={[styles.btnShared, styles.incorrectButton]}
                            btnTextStyle={styles.btnTextShared}
                            onPress={this.handleIncorrect}
                        >
                            Incorrect
                        </TextButton>
                    </View>
                </View>
            )
        }
    }

}

function mapStateToProps({decks}, {navigation}) {
    const deckId = navigation.state.params.deckId;
    return {
        cards: decks.byIds[deckId].questions,
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    content: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center'
    },
    btnShared: {
        width: 150,
    },
    btnTextShared: {
        textAlign: 'center'
    },
    correctButton: {
        backgroundColor: green,
        borderColor: green,
        marginBottom: 10
    },
    incorrectButton: {
        backgroundColor: red,
        borderColor: red,
    },
    toggleText: {
        color: blue,
        textAlign: 'center',
    }
});

export default connect(mapStateToProps)(Quiz)