import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { blue, white } from '../utils/color';
import { connect } from 'react-redux';
import { addCard } from '../actions'

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



    render () {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'Question'} style={styles.textInput} value={this.state.input.question} onChangeText={this.handleQuestionInput}/>
                <TextInput placeholder={'Answer'} style={styles.textInput} value={this.state.input.answer} onChangeText={this.handleAnswerInput}/>
                <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
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
        backgroundColor: blue,
        marginTop: 15,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: blue,
    },
    btnText: {
        color: white,
        fontSize: 22,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    }
})

function mapDispatchToProps(dispatch) {
    return {
        addCard(deckId, question, answer) { return dispatch(addCard(deckId, question, answer)) }
    }
}

export default connect(null, mapDispatchToProps)(AddCardToDeck)