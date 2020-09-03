import React, { useState } from 'react';
import './App.css';
import alarmsData from '../data/alarms.json';

function splitTime(time) {
  const dt = new Date(time * 1000);
  return {
    hours: dt.getHours(),
    mins: dt.getMinutes(),
    secs: dt.getSeconds(),
  }
};

function splitDate(time) {
  const monthNames = ["January", "February", "March", "April",
                      "May", "June", "July", "August","September",
                      "October", "November", "December"];
  const dt = new Date(time * 1000);
  return {
    fullDate: dt.getDate() + " " + monthNames[dt.getMonth()] + " " + dt.getFullYear(),
    date: dt.getDate(),
    month: dt.getMonth(),
    year: dt.getFullYear(),
  }
};

function AlarmItem({id, date, time, name, description, status, dateFilter, updateAlarm}) {
  return (
    <div className={`alarmsRow ${status}`}>
      <div className="alarmsCell">{name}</div>
      {dateFilter === "all" && <div className="alarmsCell">{date.fullDate}</div>}
      <div className="alarmsCell">{((time.hours < 10) ? '0' + time.hours : time.hours) + ':'
         + ((time.mins < 10) ? '0' + time.mins : time.mins)}</div>
      <div className="alarmsCell button">{status === "active" && <button onClick={() => updateAlarm(id, "confirm")}>Confirm</button>}</div>
      <div className="alarmsCell button">{status === "active" && <button onClick={() => updateAlarm(id, "skip")}>Skip</button>}</div>
    </div>
  );
};

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
  const [dates, setDates] = useState(() => {
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

  function updateAlarm (id, status) {
    setAlarms((prevAlarms) => {
      let newAlarms = {...prevAlarms};
      newAlarms[id].status = status;
      return newAlarms;
    });
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
      <section className="alarms">
        <header className="alarmsHeader">
          <div className="alarmsCell">Alarm Name</div>
          {dateFilter === "all" && <div className="alarmsCell">Date</div>}
          <div className="alarmsCell">Time</div>
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
                        description={alarm.description}
                        status={alarm.status}
                        dateFilter={dateFilter}
                        updateAlarm={updateAlarm}
                        />
          )}
      </section>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Daily Alarms</h1>
      <Alarms />
    </div>
  );
};

export default App;
