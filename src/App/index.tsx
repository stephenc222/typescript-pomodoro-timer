import React, {
  FunctionComponent,
  useState
} from 'react';
import Button from "./Button";
import './index.css';
import Status from "./Status";
import Timer from './Timer'

const SECOND: number = 1000
const MINUTE: number = 60 * SECOND / 60 
const WORK_TIMER: number = MINUTE * 25 
const BREAK_TIMER: number = MINUTE * 5 
const LONG_BREAK_TIMER: number = MINUTE * 15  

const worker = new Worker('timeWorker.worker.js');

const App:FunctionComponent = () => {
  const [timer, updateTimer] = useState(WORK_TIMER)
  const [isPaused, updatePauseButton] = useState(true)
  const [intervalNum, updateIntervalNum] = useState(1)
  const [intervalType, updateIntevalType] = useState('work')

  const startTimer = () => {
    console.log('startTimer called')
    worker.postMessage({type: 'start', timer}); // Send data to our worker.
  }

  const stopTimer = () => {
    worker.postMessage({type: 'stop'}); // Send data to our worker.
    console.log('stopTimer called')
  }
  worker.onmessage = (e) => {
    console.log('MAIN_THREAD: Message received from worker:', e.data, { timer });
      if (e.data.timer && e.data.timer === 0) {
        updateStatus()
        return
      }
    switch (e.data.type) {
      case 'tick': {
        updateTimer(e.data.timer)
      }
    }
  }

  const onButtonChange = (
    event: React.FormEvent<HTMLDivElement>,
    type: string,
    ) => 
    {
    event.preventDefault() 
    switch(type) {
      case 'pause': {
        updatePauseButton(true)
        stopTimer()
        break
      }
      case 'start': {
        updatePauseButton(false)
        startTimer()
        break
      }
      case 'restart': {
        updateTimer(WORK_TIMER)
        break
      }
      default: {
        break
      }
    }
  }

  const updateStatus = () => {
    if (intervalNum !== 4) {
      if (intervalType === 'work') {
        updateIntevalType('break')
        updateTimer(BREAK_TIMER)
      } else {
        updateIntevalType('work')
        updateTimer(WORK_TIMER)
      }
      updateIntervalNum(intervalNum + 1)
    } else {
      updateIntervalNum(0)
      updateIntevalType('long break')
      updateTimer(LONG_BREAK_TIMER)
    }
  }

  const onPauseButtonDown = (event: React.FormEvent<HTMLDivElement>) => {
    updatePauseButton(!isPaused)
    return onButtonChange(event, isPaused ? 'start': 'pause')
  }

  const onRestartButtonDown = (event: React.FormEvent<HTMLDivElement>) => {
    updatePauseButton(true)
    updateIntervalNum(1)
    updateIntevalType('work')
    updateTimer(WORK_TIMER)
    return onButtonChange(event, 'restart')
  }

  return (
    <div className='App'>
      <div className='button-container'>
        <Button type={isPaused ? 'start': 'pause'} onButtonDown={onPauseButtonDown} />
        <Button type='restart' onButtonDown={onRestartButtonDown} />
      </div>
      <div className='timer-container'>
        <Timer time={timer}/>
        <Status intervalType={intervalType} intervalNum={intervalNum}/>
      </div>
    </div>
  );
}

export default App;
