import React, {useState} from 'react'

const DateSelector = ({selectDate, date}) => {
    
    const onChange = (e) => {
        selectDate(e.target.value);
    }

    return (
        <div className="d-flex justify-content-center">
            <input className="form-control" type="date" onChange={onChange} value={date}></input>
        </div>
    )
    
}

export default DateSelector

