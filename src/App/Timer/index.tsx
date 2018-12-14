import React, { FunctionComponent} from 'react';

const MINUTE: number = 1000 * 60

const getMinutes = (time: number): string => `${Math.floor(time/ MINUTE)}` 

const getSeconds = (time: number): string => `${time % (MINUTE) / MINUTE * 60}` 
  
const Timer:FunctionComponent<{time: number}> = ({ time }) => {
  
  return (
    <div>
      <div>{getMinutes(time)}</div>
      <div>:</div>
      <div>{getSeconds(time)}</div>
    </div>
  )
}

export default Timer