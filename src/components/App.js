import React, { useState, useEffect } from 'react';
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
    date: dt.getDay(),
    month: dt.getMonth(),
    monthName: monthNames[dt.getMonth()],
    year: dt.getFullYear(),
  }
};

function AlarmItem({id, time, name, description, status}) {
    return (
    <tr>
      <td>{name}</td>
      <td>{((time.hours < 10) ? '0' + time.hours : time.hours) + ':'
         + ((time.mins < 10) ? '0' + time.mins : time.mins)}</td>
    </tr>
  );
};

function Alarms() {
  const [alarms, setAlarm] = useState(
    alarmsData.map((alarm) => {return {
      id: alarm._id,
      time: splitTime(alarm.alarm_time),
      date: splitDate(alarm.alarm_time),
      name: alarm.name,
      description: alarm.description,
      status: alarm.status,
    }})
  );

  return (
    <>
      <div>
        View alarms on date:
        <select name="date">
          <option value="all">All</option>
          
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Alarm Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {alarms.map((alarm) => (
            <AlarmItem key={alarm.id}
                  id={alarm.id}
                  time={alarm.time}
                  name={alarm.name}
                  description={alarm.description}
                  status={alarm.status}
                  />
          ))}
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
