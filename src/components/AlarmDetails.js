import React from 'react';

function AlarmDetails({id, date, time, name, description, status, updateAlarm, closeDetails}) {
    return (
        <div className="modalLayer">
            <div className="alarmDetails">
                <span className="alarmDetailsClose" onClick={closeDetails}>
                    &times;
                </span>
                <h3>Alarm Details</h3>
                <section className="alarmsTable">
                    <div className="alarmsRow">
                        <div className="alarmsCell bold">Alarm:</div>
                        <div className="alarmsCell">{name}</div>
                    </div>
                    <div className="alarmsRow">
                        <div className="alarmsCell bold">Date:</div>
                        <div className="alarmsCell">{date.fullDate}</div>
                    </div>
                    <div className="alarmsRow">
                        <div className="alarmsCell bold">Time:</div>
                        <div className="alarmsCell">{((time.hours < 10) ? '0' + time.hours : time.hours) + ':'
                                                    + ((time.mins < 10) ? '0' + time.mins : time.mins)}</div>
                    </div>
                    <div className="alarmsRow">
                        <div className="alarmsCell bold">Status:</div>
                        <div className="alarmsCell">{status}</div>
                    </div>
                    <div className="alarmsRow">
                        <div className="alarmsCell bold">Description:</div>
                        <div className="alarmsCell">{description}</div>
                    </div>
                </section>
                <div className="alarmDetailsButtons">
                    {status === "active" && <button className="confirm" onClick={() => updateAlarm(id, "confirm")}>Confirm</button>}
                    {status === "active" && <button className="skip" onClick={() => updateAlarm(id, "skip")}>Skip</button>}
                </div>
            </div>
        </div>
    );
};

export default AlarmDetails;