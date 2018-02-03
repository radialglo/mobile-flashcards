import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckDetail from './DeckDetail'
import DeckList from './DeckList'
import AddDeck from './AddDeck'
import AddCardToDeck from './AddCardToDeck'
import Quiz from './Quiz'
import { blue, white } from '../utils/color'
import { Ionicons } from '@expo/vector-icons'

const Tabs = TabNavigator({
    Decks: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-paper' size={30} color={tintColor}/>
        }
    },
    NewDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) => <Ionicons name={'ios-add'} size={30} color={tintColor}/>
        }
    }

}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? blue : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : blue,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
});

const stackNavigationOptions =  {
    headerTintColor: white,
        headerStyle: {
        backgroundColor: blue,
    }
};

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            ...stackNavigationOptions
        }
    },
    AddCardToDeck: {
        screen: AddCardToDeck,
        navigationOptions: {
            ...stackNavigationOptions
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            ...stackNavigationOptions
        }

    }
});

export default MainNavigator