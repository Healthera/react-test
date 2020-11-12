import React, { useCallback, useState } from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { getTime } from '../helpers';

const useStyles = makeStyles({
	collapse: {
		padding: 16,
	},
	active: {
		backgroundColor: "#fff",
		marginBottom: 3,
	},
	skipped: {
		backgroundColor: "rgb(150 150 150 / 53%)",
		marginBottom: 3,
	},
	confirmed: {
		backgroundColor: "rgb(0 255 102 / 63%)",
		marginBottom: 3,
	},
});

const Item = ({ item, onChangeStatus }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleChangeOpen = useCallback(() => {
		setOpen(!open);
	}, [open]);

	const isDisabled = item.status !== "active";
	return (
		<div
			className={
				item.status === "active" ? classes.active :
					item.status === "skipped" ? classes.skipped :
						classes.confirmed
			}
		>
			<ListItem>
				<ListItemIcon>
					<IconButton onClick={handleChangeOpen}>
						{open ? <ExpandLess /> : <ExpandMore />}
					</IconButton>
				</ListItemIcon>
				<ListItemText
					primary={item.name}
					secondary={getTime(item.alarm_time)}
				/>
				<ListItemSecondaryAction>
					<Button
						color="primary"
						disabled={isDisabled}
						onClick={() => onChangeStatus(item._id, "confirmed")}
					>
						Confirm
					</Button>
					<Button
						color="secondary"
						disabled={isDisabled}
						onClick={() => onChangeStatus(item._id, "skipped")}
					>
						Skip
					</Button>
				</ListItemSecondaryAction>
			</ListItem>
			<Collapse
				in={open}
				timeout="auto"
				unmountOnExit
				className={classes.collapse}
			>
				{item.description}
			</Collapse>
		</div>
	);
};

export default Item;
