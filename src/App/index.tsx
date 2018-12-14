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
// const BREAK_TIMER: number = MINUTE * 5 
// const LONG_BREAK_TIMER: number = MINUTE * 15  
// let shouldStartInterval: boolean = true 
// let didClearInterval: boolean = false
// let timerRef: TimerHandler
let intervalRef: number | NodeJS.Timeout = 0;
const App:FunctionComponent = () => {
  const [timer, updateTimer] = useState(WORK_TIMER)
  const [isPaused, updatePauseButton] = useState(true)
  // const [intervalType, updateIntevalType] = useState('work')
  
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
  

  // const timerInterval = () => updateTimer(timer - SECOND)
  const onRestartButtonDown = (event: React.FormEvent<HTMLDivElement>) => {
    updatePauseButton(true)
    return onButtonChange(event, 'restart')
  }
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPaused) {
        updateTimer(timer - SECOND)
      }
      console.log('balls', timer)
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

  return (
    <div className="App">
      <Button type={isPaused ? 'start': 'pause'} onButtonDown={onPauseButtonDown} />
      <Button type='restart' onButtonDown={onRestartButtonDown} />
      <Timer time={timer}/>
      <Status status={'Some Status'}/>
    </div>
  );
}

export default App;
