import React from 'react'
import './Alarm.css'

const Alarm = ({name, description, status, changeStatus, id, alarmTime, toggleDialog, confirm, skip}) => {

    return (
            <div className={status + " cards mb-3"} >
                <div className="card-header" onClick={() => {toggleDialog(id)}}>{alarmTime}
                    <div className="card-body text-dark">
                    <h5 className="card-title">{name}</h5>
                    </div>
                    
                </div>
                <div className="buttons d-flex justify-content-center">
                        <button className="btn btn-primary" onClick={() => confirm(id)}>Confirm</button>
                        <button className="btn btn-primary" onClick={() => skip(id)}>Skip</button>
                    </div>
            </div>
    )
}

export default Alarm