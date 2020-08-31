import React from 'react'
import './Alarm.css'

const Alarm = ({name, description, status, changeStatus, id, alarmTime, toggleDialog, confirm, skip}) => {

    return (
            <div className={"box " + status}>
                <div className="content d-flex justify-content-between align-items-center">
                    <h4>{alarmTime}</h4>
                    <h4 className="name" onClick={status !== 'confirmed' && status !== 'skipped' ? () => toggleDialog(id) : null}>{name}</h4>
                    <div className="buttons d-flex flex-column">
                        <button className="btn btn-primary btn-sm" onClick={status !== 'confirmed' && status !== 'skipped' ? () => confirm(id) : null}>Confirm</button>
                        <button className="btn btn-primary btn-sm" onClick={status !== 'confirmed' && status !== 'skipped' ? () => skip(id) : null}>Skip</button>
                    </div>
                </div>          
            </div>
    )
}

export default Alarm