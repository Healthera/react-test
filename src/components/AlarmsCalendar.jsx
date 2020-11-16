import React from 'react';
import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import { makeStyles } from '@material-ui/core/styles';

const localizer = momentLocalizer(moment);
const useStyles = makeStyles({
  calendar: {
    height: '70vh',
    padding: '16px 8px',
  },
  active: {
    backgroundColor: 'transparent',
  },
  skipped: {
    backgroundColor: 'grey',
  },
  confirmed: {
    backgroundColor: 'rgb(0 255 102 / 63%)',
  },
});

const AlarmsCalendar = ({ alarms, onSelectEvent }) => {
  const classes = useStyles();
  return (
    <Calendar
      localizer={localizer}
      views={['month']}
      events={alarms}
      selectable
      onSelectSlot={onSelectEvent}
      onSelectEvent={onSelectEvent}
      onNavigate={(newDate, view, action) => {
        if (action === 'TODAY') {
          onSelectEvent(newDate);
        }
      }}
      titleAccessor={item => {
        return (
          <div
            className={
              item.status === 'active'
                ? classes.active
                : item.status === 'skipped'
                ? classes.skipped
                : classes.confirmed
            }
          >
            {item.title}
          </div>
        );
      }}
      className={classes.calendar}
    />
  );
};

export default AlarmsCalendar;
