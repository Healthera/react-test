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

function AlarmItem({id, date, time, name, description, status, dateFilter}) {
    return (
    <tr>
      <td>{name}</td>
      {dateFilter === "all" && <td>{date.fullDate}</td>}
      <td>{((time.hours < 10) ? '0' + time.hours : time.hours) + ':'
         + ((time.mins < 10) ? '0' + time.mins : time.mins)}</td>
    </tr>
  );
};

function Alarms() {
  const [alarms, setAlarm] = useState(
    alarmsData.map((alarm) => {
      return {
        id: alarm._id,
        time: splitTime(alarm.alarm_time),
        date: splitDate(alarm.alarm_time),
        name: alarm.name,
        description: alarm.description,
        status: alarm.status,
      }
    })
  );
  const [dates, setDates] = useState(() => {
    let sortedUniqueDates = alarms.map((alarm) => alarm.date);
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

  return (
    <>
      <div>
        View alarms on date:
        <select name="date" onChange={(e) => {
          setDateFilter(e.target.value);
        }}>
          <option value="all">All</option>
          {dates.map((date) => 
            <option key={date.fullDate} value={date.fullDate}>{date.fullDate}</option>
          )}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Alarm Name</th>
            {dateFilter === "all" && <th>Date</th>}
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {alarms.filter(alarm => alarm.date.fullDate === dateFilter || dateFilter === "all")
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
                         />
            )}
        </tbody>
      </table>
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
