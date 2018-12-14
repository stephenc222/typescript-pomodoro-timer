import React, { FunctionComponent} from 'react';

const Button:FunctionComponent<{
  type: string,
  onButtonDown: (event: React.FormEvent<HTMLDivElement>) => void}> = ({ type, onButtonDown}) => {
  
  
  return (
    <div onMouseDown={onButtonDown}>{type}</div>
  )
}

export default Button