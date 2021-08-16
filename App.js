import React from 'react';
import {View, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from './src/redux/reducers';
// import rootSaga from './redux/middleware/saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
import App from './src/containers/App';

class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}
export default Root;
