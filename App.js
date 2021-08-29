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
import Auth from './src/redux/store/auth'
class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Auth>
          <Provider store={store}>
        <App/>
      </Provider>
      </Auth>
    
    );
  }
}
export default Root;
