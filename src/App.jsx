import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AlarmsCalendar from './components/AlarmsCalendar';
import SelectedDayList from './components/SelectedDayList';

import './App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import data from './alarms.json';
import { checkTimeInDate, transformAlarmsForDisplay } from './helpers';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f1f1f1',
    height: '100vh',
  },
});

function App() {
  const classes = useStyles();

  const [alarms, setAlarms] = useState(() => transformAlarmsForDisplay(data));
  const [selectedDate, setSelectedDate] = useState(() =>
    Date().toLocaleString()
  );
  const [alarmsOfSelectedDate, setFilteredAlarms] = useState([]);

  useEffect(() => {
		const filteredAlarms = alarms.filter(item =>
      checkTimeInDate(selectedDate, item.alarm_time)
    );
    filteredAlarms.sort((a, b) => {
      return a.alarm_time - b.alarm_time;
    });

    setFilteredAlarms(filteredAlarms);
  }, [alarms, selectedDate]);

  const handleDateChange = ({ start }) => {
    setSelectedDate(start);
  };

  const handleChangeStatus = (_id, status) => {
    const updatedAlarms = alarms.map(item =>
      item._id === _id ? { ...item, status } : item
    );
    setAlarms(updatedAlarms);
  };

  return (
    <div className={classes.root}>
      <AlarmsCalendar alarms={alarms} onSelectEvent={handleDateChange} />
      <SelectedDayList
        selectedDate={selectedDate}
        onChangeStatus={handleChangeStatus}
        items={alarmsOfSelectedDate}
      />
    </div>
  );
}

export default App;
