import React from 'react';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import TheHeader from './components/Header';
import TheFooter from './components/Footer';
import NotFound from './components/NotFound';
import Player from './components/Player';
import Hot from './components/Hot';
import Login from './components/Login';
import SearchResult from "./components/SearchResult";

const App = () => {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          <TheHeader/>
        </header>
        <main className="App-content">
          <div className="container">
            <Switch>
              <Route exact path="/" component={Hot}/>
              <Route path="/search" render={SearchResult}/>
              <Route path="/login" component={Login} />
              <Route path="/*" render={NotFound}/>
            </Switch>
          </div>
        </main>
        <footer className="App-footer">
          <TheFooter />
        </footer>
        <Player />
      </div>
      <Switch>
      </Switch>
    </HashRouter>
  
  );
}

export default App;
