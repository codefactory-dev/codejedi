import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import React from 'react';
import PropTypes from 'prop-types';
import SwipeProvider from '../SwipeableList/SwipeProvider';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.common.black,
		boxSizing: 'border-box',
		width: '100%',
		padding: '20px 0',
		margin: '0',
		'&:hover': {
			backgroundColor: theme.palette.common.black3,
		},
	},
	contentContainer: {
		...theme.typography.body2,
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
	},
	headerContainer: {
		display: 'flex',
	},
	avatarContainer: {
		marginTop: '0px',
	},
	avatar: {
		border: `1.5px solid ${theme.palette.common.greyLight}`,
	},
	header: {
		display: 'flex',
		color: theme.palette.common.greyLight,
		fontSize: '.75rem',
		fontWeight: 'bold',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			margin: '0 10px',
		},
	},
	date: {
		marginLeft: 'auto',
		fontSize: '.75rem',
		fontWeight: 'bold',
		lineHeight: '1.5',
	},
	text: {
		color: theme.palette.common.greyLight,
		fontSize: '.9rem',
		marginTop: '10px',
	},
	readButton: {
		...theme.btnPrimaryText,
		display: 'block',
		margin: 'auto',
		marginTop: '20px',
	},
	replyButton: {
		...theme.btnPrimaryOutline,
		position: 'absolute',
		bottom: '15px',
		right: '15px',
	},
	nested: {
		padding: '0 0 20px 30px',
	},
}));

const maxTextLength = 100;

export default function ListRow(props) {
	const classes = useStyles();
	const theme = useTheme();
	const matchesSM = useMediaQuery(theme.breakpoints.down('xs'));

	const avatar = (
		<Avatar
			className={classes.avatar}
			alt="user avatar"
			src={props.userAvatarURL}
		/>
	);
	const header = (
		<div className={classes.header}>
			<div>{props.username}</div>
			<div className={classes.date}>{props.date}</div>
		</div>
	);

	const classesReply = props.isReply ? classes.nested : undefined;

	return (
		<ListItem
			component="div"
			alignItems="flex-start"
			disableGutters
			className={`${classes.root} ${classesReply}`}
		>
			{matchesSM ? undefined : (
				<ListItemAvatar className={classes.avatarContainer}>
					{avatar}
				</ListItemAvatar>
			)}
			<div className={classes.contentContainer}>
				<div className={classes.headerContainer}>
					{matchesSM ? avatar : undefined}
					{header}
				</div>
				<div>
					<div className={classes.text}>
						{props.text.length > maxTextLength
							? `${props.text.substring(0, maxTextLength)}[...]`
							: props.text}
					</div>
					<Button
						className={classes.readButton}
						variant={props.text.length > maxTextLength ? undefined : 'disabled'}
						disableElevation
					>
						Read more
					</Button>

					{props.isOwner && !props.hasReply && !props.isReply ? (
						<Button
							className={classes.replyButton}
							disableElevation
							variant="outlined"
						>
							Reply
						</Button>
					) : undefined}
				</div>
			</div>
		</ListItem>
	);
}

ListRow.propTypes = {
	username: PropTypes.string.isRequired,
	userAvatarURL: PropTypes.string.isRequired,
	isOwner: PropTypes.bool.isRequired,
	date: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	hasReply: PropTypes.bool.isRequired,
	isReply: PropTypes.bool.isRequired,
};
