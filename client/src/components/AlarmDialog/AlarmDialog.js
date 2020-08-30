import React from 'react'
import './AlarmDialog.css'

const AlarmDialog  = ({dialogStatus, toggleDialog, alarm, confirm, skip}) => {

    if (!dialogStatus) {
        return null
    }

    return (
        <div className="card box d-flex justify-content-center">

            <div className="card-header">{alarm.alarm_time}</div>
                <div className="card-body text-dark">
                <h5 className="card-title">{alarm.name}</h5> 
                <p className="card-text">{alarm.description}</p>
                <div className="buttons d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={() => confirm(alarm._id)}>Confirm</button>
                    <button className="btn btn-primary" onClick={() => skip(alarm._id)}>Skip</button>
                    <button className="btn btn-primary" onClick={toggleDialog}>Close</button>
                </div>
            </div>

        </div>
    )
}

export default AlarmDialog