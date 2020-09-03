import React from 'react';

function AlarmItem({id, date, time, name, status, dateFilter, updateAlarm, viewAlarm}) {
    return (
        <div className={`alarmsRow ${status}`}>
            <div className="alarmsCell">{name}</div>
            {dateFilter === "all" && <div className="alarmsCell">{date.fullDate}</div>}
            <div className="alarmsCell">{((time.hours < 10) ? '0' + time.hours : time.hours) + ':'
                                        + ((time.mins < 10) ? '0' + time.mins : time.mins)}</div>
            <div className="alarmsCell button"><button className="view" onClick={() => viewAlarm(id)}>View</button></div>
            <div className="alarmsCell button">{status === "active" && <button className="confirm" onClick={() => updateAlarm(id, "confirm")}>Confirm</button>}</div>
            <div className="alarmsCell button">{status === "active" && <button className="skip" onClick={() => updateAlarm(id, "skip")}>Skip</button>}</div>
        </div>
    );
};

export default AlarmItem;