import React from 'react';
import { render } from 'react-dom';

const appState = {
  start: 1,
  work: 2,
  rest: 3,
};

class App extends React.Component {
  currentState = appState.start;

  changeState = state => this.currentState = state;

  closeApp = () => window.close();

  render() {
    return (
      <div>
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
        <h1>Protect your eyes</h1>
        {
          this.currentState === appState.start && (<div>
            
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
            <button className="btn" onClick={this.changeState(appState.work)}>Start</button>
          </div>)
        }
        {
          this.currentState === appState.work && (<div>
            <img src="./images/work.png" />
          </div>)
        }
        {
          this.currentState === appState.rest && (<div>
            <img src="./images/rest.png" />
          </div>)
        }
        {
          this.currentState === appState.work || this.currentState === appState.rest && (<div>
            <div className="timer">
              18:23
            </div>
            <button className="btn" onClick={this.changeState(appState.start)}>Stop</button>
          </div>)
        }
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
