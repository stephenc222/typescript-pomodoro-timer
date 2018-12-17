import React, { FunctionComponent} from 'react';
import './index.css'

const MINUTE: number = 1000 * 60

const getMinutes = (time: number): string => `${Math.floor(time/ MINUTE)}` 

const getSeconds = (time: number): string => `${Math.floor(time % (MINUTE) / MINUTE * 60)}` 

const formatZero = (timeStr: string) => timeStr.length < 2 ? '0' + timeStr : timeStr 
  
const Timer:FunctionComponent<{time: number}> = ({ time }) => {
  const minutes: string = formatZero(getMinutes(time))
  const seconds: string = formatZero(getSeconds(time))

  return (
    <div className='timer'>
      <div>{minutes}</div>
      <div>:</div>
      <div>{seconds}</div>
    </div>
  )
}

export default Timer