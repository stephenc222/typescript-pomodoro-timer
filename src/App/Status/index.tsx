import React, { FunctionComponent} from 'react';
import './index.css'

const Status:FunctionComponent<{intervalType: string, intervalNum: number}> = ({ intervalNum, intervalType}) => {
  return (
    <div className='status'>
      <div>Interval: {intervalNum} of 4</div>
      <div>{intervalType}</div>
    </div>
  )
}

export default Status