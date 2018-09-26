import React from 'react'

const DateRangeSelector = ({ startTime, endTime, setDateRange }) => {
  return (
    <div>
      <div>
        <label>Start:</label>
        <input type="date" value={startTime} id="startTime" onChange={setDateRange}></input>
      </div>
      <div>
        <label>End:</label>
        <input type="date" value={endTime} id="endTime" onChange={setDateRange}></input>
      </div>
    </div>
  )
}

export default DateRangeSelector