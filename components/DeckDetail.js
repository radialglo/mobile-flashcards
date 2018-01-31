import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {blue, white} from '../utils/color'

class DeckDetail extends Component {
    static navigationOptions =  ({navigation}) => {
        return {
            title: navigation.state.params.title
        }
    }

    render() {
        const {
            title,
            questionCount,
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.header}>{title}</Text>
                    <Text style={styles.count}>{questionCount} cards</Text>
                </View>

                <View style={{flex: 0.5}}>
                    <TouchableOpacity style={styles["btn--secondary"]}  onPress={() => {}}>
                        <Text style={styles["btnText--secondary"]}>Add Card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}  onPress={() => {}}>
                        <Text style={styles.btnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

function mapStateToProps({decks}, {navigation}) {

    const {
        deckId
    } = navigation.state.params;

    const deck = decks.byIds[deckId];

    return {
        title: deck.title,
        questionCount: deck.questions.length
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 22,
        marginBottom: 15,
    },
    count: {
        color: '#999'
    },
    btn: {
        backgroundColor: blue,
        marginTop: 15,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: blue,
    },
    btnText: {
        fontSize: 22,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        color: white,
    },
    ["btn--secondary"]: {
        backgroundColor: white,
        marginTop: 15,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: blue,
        color: blue,
    },
    ["btnText--secondary"]: {
        color: blue,
        fontSize: 22,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    }
})

export default connect(mapStateToProps)(DeckDetail);