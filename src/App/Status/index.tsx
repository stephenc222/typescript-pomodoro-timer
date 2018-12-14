import React, { FunctionComponent} from 'react';


const Status:FunctionComponent<{status: string}> = ({ status }) => {
  
  return (
    <div>{status}</div>
  )
}

export default Status