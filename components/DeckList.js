import React, { Component } from 'react'
import {FlatList, View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'


class DeckList extends Component {
    renderDeckInfo = ({item}) => {
        const {
            title,
            questionCount
        } = item;

        return (
            <View style={styles.container}>
                <Text style={styles.header}>{title}</Text>
                <Text style={styles.count}>{questionCount} cards</Text>
            </View>
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

export default connect(mapStateToProps)(DeckList)