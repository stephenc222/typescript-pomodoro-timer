import React, { FunctionComponent} from 'react';
import './index.css'

const Button:FunctionComponent<{
  type: string,
  onButtonDown: (event: React.FormEvent<HTMLDivElement>) => void}> = ({ type, onButtonDown}) => {
  
  
  return (
    <div className='button' onMouseDown={onButtonDown}>
      <div className='button--text'>{type}</div>
    </div>
  )
}

export default Button