import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { loadDecks } from '../actions';


class DeckList extends Component {
    componentDidMount ()  {
        this.props.loadDecks()
    }

    renderDeckInfo = ({item}) => {
        const {
            title,
            questionCount,
            key
        } = item;

        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                    'DeckDetail',
                    {
                        deckId: key,
                        title: title,
                    }
                )}
            >
                <View style={styles.container}>
                    <Text style={styles.header}>{title}</Text>
                    <Text style={styles.count}>{questionCount} cards</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderSeparator = () => {
        return (
            <View style={styles.separator}/>
        );
    };

    render () {
        return (
            <View>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={this.props.decks}
                    renderItem={this.renderDeckInfo}
                />
            </View>
        )
    }

}

function mapStateToProps ({decks}) {
    return {
        decks: decks.allIds.map((id) => {
            let deck = decks.byIds[id]

            return {
                key: id,
                title: deck.title,
                questionCount: deck.questions.length
            };
        })
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadDecks: () =>  dispatch(loadDecks())
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 22,
        marginBottom: 15,
    },
    count: {
        color: '#999'
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)