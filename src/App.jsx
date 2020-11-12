import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import AlarmsCalendar from './components/AlarmsCalendar';
import SelectedDayList from './components/SelectedDayList';

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import data from "./alarms.json";
import { checkDateByDay, convertFromUnixToDate, transformAlarmsForDisplay } from './helpers';

const useStyles = makeStyles({
	root: {
		backgroundColor: "#f1f1f1",
		height: "200vh",
	},
});

function App() {
	const classes = useStyles();

	const [alarms, setAlarms] = useState(() => transformAlarmsForDisplay(data));
	const [selectedDate, setSelectedDate] = useState(() => convertFromUnixToDate(data[0].alarm_time));
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		const filtered = alarms.filter((item) => checkDateByDay(selectedDate, item.alarm_time));
		setFilteredData(filtered);
	}, [alarms, selectedDate, checkDateByDay]);

	const handleDateChange = ({start}) => {
		setSelectedDate(start);
	};

	const handleChangeStatus = (_id, status) => {
		const updatedAlarms = alarms.map(
			(item) => item._id === _id
				? { ...item, status }
				: item,
		);
		setAlarms(updatedAlarms);
	};

	return (
		<div className={classes.root}>
			<AlarmsCalendar
				alarms={alarms}
				onSelectEvent={handleDateChange}
			/>
			<SelectedDayList
				selectedDate={selectedDate}
				onChangeStatus={handleChangeStatus}
				items={filteredData}
			/>
		</div>
	);
}

export default App;
