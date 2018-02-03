import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import DeckDetail from './components/DeckDetail'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import AddCardToDeck from './components/AddCardToDeck'
import Quiz from './components/Quiz'
import { blue, white } from './utils/color'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { setLocalNotification} from './utils/helpers';
import MainNavigator from './components/MainNavigator'

function FlashCardsStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification()
    }

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
  },
});
