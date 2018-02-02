import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import TextButton from './TextButton'

class AddCardToDeck extends Component {
    static navigationOptions() {
        return {
            title: 'Add Card'
        }
    }

    state = {
        input: {
            question: '',
            answer: '',
        }
    }

    handleQuestionInput = (text) => {
        this.handleInput({
            question: text
        })
    }

    handleAnswerInput = (text) => {
        this.handleInput({
            answer: text
        })
    }

    handleInput = (update) => {
        this.setState((prevState) => {
            return {
              input: {
                ...prevState.input,
                ...update
              }
            }
        });
    }

    handleSubmit = () => {
        if (this.state.input.question.length && this.state.input.answer.length) {
            this.setState((prevState) => {
                this.props.addCard(
                    this.props.navigation.state.params.deckId,
                    prevState.input.question,
                    prevState.input.answer,
                )
                return {
                    input: {
                        question: '',
                        answer: '',
                    }
                }
            });

            // navigate back to deck detail
            this.props.navigation.goBack()
        }
    }



    render () {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'Question'} style={styles.textInput} value={this.state.input.question} onChangeText={this.handleQuestionInput}/>
                <TextInput placeholder={'Answer'} style={styles.textInput} value={this.state.input.answer} onChangeText={this.handleAnswerInput}/>
                <TextButton btnStyle={styles.btn} onPress={this.handleSubmit}>
                    Submit
                </TextButton>
            </View>
        )

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
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: "100%",
        padding: 5,
        marginTop: 15,
    },
    btn: {
        marginTop: 15,
    }
})

export default connect(null, { addCard })(AddCardToDeck)