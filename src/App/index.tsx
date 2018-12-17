import React, {
  FunctionComponent,
  useEffect,
  useState
} from 'react';
import Button from "./Button";
import './index.css';
import Status from "./Status";
import Timer from './Timer'

const SECOND: number = 1000
const MINUTE: number = 60 * SECOND
const WORK_TIMER: number = MINUTE * 25 
const BREAK_TIMER: number = MINUTE * 5 
const LONG_BREAK_TIMER: number = MINUTE * 15  
let intervalRef: number | NodeJS.Timeout = 0;

const App:FunctionComponent = () => {
  const [timer, updateTimer] = useState(WORK_TIMER)
  const [isPaused, updatePauseButton] = useState(true)
  const [intervalNum, updateIntervalNum] = useState(1)
  const [intervalType, updateIntevalType] = useState('work')
  
  const onButtonChange = (
    event: React.FormEvent<HTMLDivElement>,
    type: string,
    ) => 
    {
    event.preventDefault() 
    switch(type) {
      case 'pause': {
        updatePauseButton(true)
        break
      }
      case 'start': {
        updatePauseButton(false)
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

  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused) {
        const nextTime: number = timer - SECOND
        if (nextTime === 0) {
          updateStatus()
          return
        }
        updateTimer(nextTime)
      }
    }, SECOND);
    intervalRef = id;
    return () => {
      clearInterval(intervalRef as NodeJS.Timeout);
    };
  });

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
