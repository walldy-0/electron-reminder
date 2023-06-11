import React from 'react';
import { render } from 'react-dom';

const workTime = 1000 * 60 * 20;
const restTime = 1000 * 20;
const timerInterval = 100;

const appState = {
  start: 1,
  work: 2,
  rest: 3,
};

class App extends React.Component {
  constructor() {
    super();

    this.timer = undefined;
    this.prevTime = 0;

    this.state = {
      appState: appState.start,
      countdownTime: 0,
      timeElapsed: 0,
    };
  }

  getCurrentTime = () => (new Date()).getTime();

  setTimer = () => {
    this.clearTimer();
    this.prevTime = this.getCurrentTime();

    this.timer = setInterval(() => {
      const currTime = this.getCurrentTime();
      const diff = currTime - this.prevTime;
      this.prevTime = currTime;

      this.setState(prevState => ({
        timeElapsed: prevState.timeElapsed + diff,
      }));

      if (this.state.timeElapsed >= this.state.countdownTime
        && (this.state.appState === appState.work || this.state.appState === appState.rest)) {
        this.toggleAppState();
      }

    }, timerInterval);
  };

  playSound = () => {
    const audio = new Audio('./sounds/bell.wav');
    audio.play();
  };

  toggleAppState = () => {
    if (this.state.appState === appState.work) {
      this.setState({appState: appState.rest, timeElapsed: 0, countdownTime: restTime});
    } else {
      this.setState({appState: appState.work, timeElapsed: 0, countdownTime: workTime});
    }

    this.playSound();
  };

  clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  };

  getFormatedTimeString = () => {
    const totalMiliseconds = this.state.countdownTime - this.state.timeElapsed;
    const seconds = Math.floor((totalMiliseconds / 1000) % 60);
    const minutes = Math.floor((totalMiliseconds / 1000 / 60) % 60);

    return [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  changeAppState = newState => {
    this.setState({ appState: newState });

    switch (newState) {
      case appState.start:
        this.clearTimer();
        this.setState({countdownTime: 0, timeElapsed: 0});
        break;
      case appState.work:
        this.setState({countdownTime: workTime});
        this.setTimer();
        break;
      case appState.rest:
        this.setState({countdownTime: restTime});
        this.setTimer();
        break;
        default:
          break;
    }
  };

  closeApp = () => window.close();

  render() {
    return (
      <div>
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
        <h1>Protect your eyes</h1>
        {
          this.state.appState === appState.start && (<div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
            <button className="btn" onClick={() => this.changeAppState(appState.work)}>Start</button>
          </div>)
        }
        {
          this.state.appState === appState.work && (<img src="./images/work.png" />)
        }
        {
          this.state.appState === appState.rest && (<img src="./images/rest.png" />)
        }
        {
          (this.state.appState === appState.work || this.state.appState === appState.rest) && (<div>
            <div className="timer">
              {this.getFormatedTimeString()}
            </div>
            <button className="btn" onClick={() => this.changeAppState(appState.start)}>Stop</button>
          </div>)
        }
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
