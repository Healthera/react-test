import React from 'react';
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Item from './item';
import { formatSelectedDate } from '../helpers';

const useStyles = makeStyles({
	list: {
		height: "100%",
		overflowY: "scroll",
	},
	heading: {
		textAlign: 'center',
		margin: '20px 0',

	},
});

const SelectedDayList = ({ items, onChangeStatus, selectedDate }) => {
	const classes = useStyles();
	const formattedDate = formatSelectedDate(selectedDate);
	return (
		<Container>
			<Typography className={classes.heading} variant="h4" component="h4">
				{formattedDate}
			</Typography>
			{items.length === 0 && (
				<Typography variant="h6" component="h6">
					Nothing to display for the day
				</Typography>
			)}
			{items.length > 0 && (
				<List
					className={classes.list}
				>
					{items.map((item) => (
						<Item
							item={item}
							onChangeStatus={onChangeStatus}
							key={item._id}
						/>
					))}
				</List>
			)}
		</Container>
	);
};

export default SelectedDayList;
