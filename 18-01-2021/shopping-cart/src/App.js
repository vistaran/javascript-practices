import logo from './logo.svg';
import './App.css';
import EventBinding from './component/abc'
///import { Board,Game } from './component/hello';

function app() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <EventBinding />
      </header>
    </div>
  );
}

export default app;
