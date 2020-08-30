import React, { Component } from 'react'

const DateSelector = ({selectDate}) => {

    const onChange = (e) => {
        selectDate(e.target.value)
    }

    return (
        <div className="d-flex justify-content-center">
            <input type="date" onChange={onChange}></input>
        </div>
    )
    
}

export default DateSelector
