React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ConnectedSignIn from '../SignIn/SignIn';
import Router from '../Router/Router';
import './App.css';
import store from '../../store/ChrisStore';


// import the patternfly CSS globally
import '../../../node_modules/patternfly/dist/css/patternfly.min.css';
import '../../../node_modules/patternfly/dist/css/patternfly-additions.min.css';


const App = () => (
  <Provider store={store}>
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={ConnectedSignIn} />
          <Route path="/" component={Router} />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>
);

export default App;
