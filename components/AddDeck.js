import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { blue, white } from '../utils/color'
class AddDeck extends Component {
    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.header}> What is the title of your new deck?</Text>
                <TextInput placeholder={'Deck Title'} style={styles.textInput}/>
                <TouchableOpacity style={styles.btn} onPress={() => {}}>
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
    },
    btnText: {
        color: white,
        fontSize: 22,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    }
})

export default AddDeck