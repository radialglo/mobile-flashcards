import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { blue, white } from '../utils/color'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

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

        this.setState((prevState) => {
            this.props.addDeck(prevState.title);
            return {
                title: ''
            }
        })
        this.props.navigation.navigate('Decks');
    }
    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.header}> What is the title of your new deck?</Text>
                <TextInput placeholder={'Deck Title'} style={styles.textInput} value={this.state.title} onChangeText={this.handleInput}/>
                <TouchableOpacity style={styles.btn}  onPress={this.handlePress}>
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

function mapDispatchToProps (dispatch) {
    return {
        addDeck: (deckTitle) => dispatch(addDeck(deckTitle))
    }
}

export default connect(null, mapDispatchToProps)(AddDeck)