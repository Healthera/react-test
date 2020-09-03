import React, { useState } from 'react';
import alarmsData from '../data/alarms.json';
import { splitDate, splitTime } from './Helper';
import AlarmItem from './AlarmItem';
import AlarmDetails from './AlarmDetails';

function Alarms() {
    const [alarms, setAlarms] = useState(
        alarmsData.reduce((map, alarm) => {
            map[alarm._id] = {
            id: alarm._id,
            time: splitTime(alarm.alarm_time),
            date: splitDate(alarm.alarm_time),
            name: alarm.name,
            description: alarm.description,
            status: alarm.status,
            };
            return map;
        }, {})
    );
    const [dates] = useState(() => {
        let sortedUniqueDates = Object.values(alarms).map((alarm) => alarm.date);
        sortedUniqueDates = sortedUniqueDates.reduce((unique, o) => {
            if (!unique.some(obj => obj.fullDate === o.fullDate)) {
            unique.push(o);
            }
            return unique;
        }, []);
        sortedUniqueDates.sort((a, b) => {
            if (a.year < b.year) return -1;
            if (a.year > b.year) return 1;
            if (a.month < b.month) return -1;
            if (a.month > b.month) return 1;
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
        });
        return sortedUniqueDates;
    });
  
    const [dateFilter, setDateFilter] = useState("all");
  
    function updateAlarm(id, status) {
        setAlarms((prevAlarms) => {
            let newAlarms = {...prevAlarms};
            newAlarms[id].status = status;
            return newAlarms;
        });
    }

    const [detailView, setDetailView] = useState(false);
    const [detailedAlarm, setDetailedAlarm] = useState();

    function viewAlarm(id) {
        setDetailView(true);
        setDetailedAlarm(alarms[id]);
    }

    function closeDetails() {
        setDetailView(false);
        setDetailedAlarm();
    }
  
    return (
        <>
            <div>
            View alarms on date:
            <select name="date" onChange={(e) => {
                setDateFilter(e.target.value);
            }}>
                <option value="all">All</option>
                {dates.map((date) => 
                <option key={date.fullDate} value={date.fullDate}>
                    {date.fullDate}
                </option>
                )}
            </select>
            </div>
            <section className="alarmsTable">
                <header className="alarmsRow alarmsHeader">
                    <div className="alarmsCell">Alarm Name</div>
                    {dateFilter === "all" && <div className="alarmsCell">Date</div>}
                    <div className="alarmsCell">Time</div>
                    <div className="alarmsCell" />
                    <div className="alarmsCell" />
                    <div className="alarmsCell" />
                </header>
                {Object.values(alarms).filter(alarm => alarm.date.fullDate === dateFilter || dateFilter === "all")
                    .sort((a, b) => {
                    if (a.date.year < b.date.year) return -1;
                    if (a.date.year > b.date.year) return 1;
                    if (a.date.month < b.date.month) return -1;
                    if (a.date.month > b.date.month) return 1;
                    if (a.date.date < b.date.date) return -1;
                    if (a.date.date > b.date.date) return 1;
                    if (a.time.hours < b.time.hours) return -1;
                    if (a.time.hours > b.time.hours) return 1;
                    if (a.time.mins < b.time.mins) return -1;
                    if (a.time.mins > b.time.mins) return 1;
                    if (a.time.secs < b.time.secs) return -1;
                    if (a.time.secs > b.time.secs) return 1;
                    return 0;
                    })
                    .map((alarm) =>
                    <AlarmItem key={alarm.id}
                            id={alarm.id}
                            date={alarm.date}
                            time={alarm.time}
                            name={alarm.name}
                            status={alarm.status}
                            dateFilter={dateFilter}
                            updateAlarm={updateAlarm}
                            viewAlarm={viewAlarm}
                            />
                    )}
            </section>
            {detailView && <AlarmDetails key={detailedAlarm.id}
                           id={detailedAlarm.id}
                           date={detailedAlarm.date}
                           time={detailedAlarm.time}
                           name={detailedAlarm.name}
                           description={detailedAlarm.description}
                           status={detailedAlarm.status}
                           updateAlarm={updateAlarm}
                           closeDetails={closeDetails}
                           />}
        </>
    );
};
  
export default Alarms;