import React from 'react'

const MagnitudeSelector = ({ setMagnitude }) => {
  return (
    <div>
      <label>
        Magnitude:
          </label>
      <select onChange={(e) => setMagnitude(e.target.value)}>
        {Array.from({ length: 10 }, (_, i) => i).map(number => {
          return <option value={number}>{number}</option>
        })}
      </select>
    </div>
  )
}

export default MagnitudeSelector
