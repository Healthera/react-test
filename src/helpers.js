import moment from 'moment';

export const transformAlarmsForDisplay = (alarms) => {
	return alarms.map((item) => {
		const time = convertFromUnixToDate(item.alarm_time);
		item.start = time;
		item.end = time;
		item.title = `${getTime(item.alarm_time)} ${item.name}`;
		return item;
	});
};
export const convertFromUnixToDate = (unix) =>
	moment.unix(unix).toDate();

export const formatSelectedDate = (date) => moment(date).format('MM-DD-YYYY');

export const checkDateByDay = (selectedDate, alarm_time) => (
	moment(selectedDate).startOf('day').unix() <= alarm_time &&
	moment(selectedDate).endOf('day').unix() >= alarm_time
);

export const getTime = (date) => {
	return moment.unix(Number(date)).format('HH:mm');
};
