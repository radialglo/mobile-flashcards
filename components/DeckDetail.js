import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {blue, white} from '../utils/color'
import TextButton from './TextButton'

class DeckDetail extends Component {
    static navigationOptions =  ({navigation}) => {
        return {
            title: navigation.state.params.title
        }
    }

    navigateToAddCard = () => {
        this.props.navigation.navigate(
            'AddCardToDeck',
            {deckId: this.props.deckId}
        )
    }

    navigateQuiz = () => {
        if (this.props.questionCount > 0) {
            this.props.navigation.navigate(
                'Quiz',
                {deckId: this.props.deckId}
            )
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
                    <TextButton
                        btnStyle={styles.whiteBtn}
                        btnTextStyle={styles.whiteBtnText}
                        onPress={this.navigateToAddCard}
                    >
                        Add Card
                    </TextButton>

                    <TextButton btnStyle={styles.btn} onPress={this.navigateQuiz}>
                        Start Quiz
                    </TextButton>
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
        deckId: deckId,
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
        marginTop: 15,
    },
    whiteBtn: {
        backgroundColor: white,
        marginTop: 15,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: blue,
    },
    whiteBtnText: {
        color: blue,

    }
})

export default connect(mapStateToProps)(DeckDetail);