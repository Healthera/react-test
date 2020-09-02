import React, { useState } from 'react';
import './App.css';
import alarmsData from '../data/alarms.json';

function AlarmItem({id, time, name, description, status}) {
  return (
    <tr>
      <td>{name}</td>
      <td>{time}</td>
    </tr>
  );
}

function Alarms() {
  const [alarms, setAlarm] = useState(alarmsData);

  return (
    <table>
      <tr>
        <th>Alarm Name</th>
        <th>Time</th>
      </tr>
      {alarms.map((alarm) => (
        <AlarmItem key={alarm._id}
               id={alarm._id}
               time={alarm.alarm_time}
               name={alarm.name}
               description={alarm.description}
               status={alarm.status}
               />
      ))}
    </table>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Daily Alarms</h1>
      <Alarms />
    </div>
  );
}

export default App;
