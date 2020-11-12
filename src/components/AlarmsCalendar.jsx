import React from 'react';
import moment from "moment";

import { Calendar, momentLocalizer } from "react-big-calendar";
import { makeStyles } from '@material-ui/core/styles';
import { convertFromUnixToDate } from '../helpers';

const localizer = momentLocalizer(moment);

const useStyles = makeStyles({
	calendar: {
		height: "70vh",
	},
	active: {
		backgroundColor: "transparent",
	},
	skipped: {
		backgroundColor: "rgb(150 150 150 / 53%)",
	},
	confirmed: {
		backgroundColor: "rgb(0 255 102 / 63%)",
	},
});

const AlarmsCalendar = ({ alarms, onSelectEvent }) => {
	const classes = useStyles();
	return (
		<Calendar
			localizer={localizer}
			defaultDate={convertFromUnixToDate(alarms[0].alarm_time)}
			views={['month']}
			events={alarms}
			selectable
			onSelectSlot={onSelectEvent}
			onSelectEvent={onSelectEvent}
			titleAccessor={(item) => {
				return (
					<span
						className={
							item.status === "active" ? classes.active :
								item.status === "skipped" ? classes.skipped :
									classes.confirmed
						}
					>
              {item.title}
            </span>
				);
			}}
			className={classes.calendar}
		/>
	);
};

export default AlarmsCalendar;
