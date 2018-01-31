import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

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
            <View>
                <Text>{title}</Text>
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

export default connect(mapStateToProps)(DeckDetail);