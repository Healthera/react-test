import React, { Component } from 'react'

const DateSelector = ({selectDate}) => {
    let value = ''

    const onChange = (e) => {
        selectDate(e.target.value)
        value = e.target.value
    }

    return (
        <div className="d-flex justify-content-center">
            <input className="form-control" type="date" onChange={onChange}></input>
        </div>
    )
    
}

export default DateSelector
