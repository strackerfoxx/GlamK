import React from 'react'

export default function Alert({alert}) {
  return (
    <div className='alert' style={{backgroundColor: `${alert.type === "error" ? "rgb(255, 112, 112)" : "greenyellow"}`}}>
        {alert.prompt}
    </div>
  )
}
