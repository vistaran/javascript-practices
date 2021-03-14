import logo from './logo.svg';
import './App.css';
import EventBinding from './component/abc'
import ButtonClickIncerment from './component/ButtonClickIncerment';
import TextHoverIncerment from './component/TextHoverIncerment';
import Counter from './component/Counter';
import HookCounter from './component/HookCounter';
import MouseContainer from './component/MouseContainer';
///import { Board,Game } from './component/hello';

function app() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <HookCounter /> */}
          <MouseContainer />
        {/* <Counter render={(count, incrementCount) => (
          <ButtonClickIncerment count={count} incrementCount={incrementCount} />
        )} />

        <Counter render={(count, incrementCount) => (
          <TextHoverIncerment count={count} incrementCount={incrementCount} />
        )} /> */}
        {/* <ButtonClickIncerment />
        <TextHoverIncerment /> */}
      </header>
    </div>
  );
}

export default app;
