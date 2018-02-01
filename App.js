import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckDetail from './components/DeckDetail'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import AddCardToDeck from './components/AddCardToDeck'
import { blue, white } from './utils/color'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'


function FlashCardsStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

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

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue,
            }
        }
    },
    AddCardToDeck: {
        screen: AddCardToDeck,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: blue,
            }
        }
    }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(
          reducer,
          composeEnhancers(
              applyMiddleware(createLogger({})),
              applyMiddleware(thunk)
          )
      )}>
          <View style={styles.container}>
            <FlashCardsStatusBar backgroundColor={blue} barStyle='light-content'/>
            <MainNavigator/>
          </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
