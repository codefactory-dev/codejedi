import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ReactComponent as CrossIcon } from 'icons/cross.svg';
import { ReactComponent as YesIcon } from 'icons/yes.svg';
import { ReactComponent as DotsIcon } from 'icons/dots.svg';
import { ReactComponent as EasyIcon } from 'icons/Easy Component.svg';
import { ReactComponent as MediumIcon } from 'icons/Medium Component.svg';
import { ReactComponent as HardIcon } from 'icons/Hard Component.svg';
import { ReactComponent as GrrbmProfileIcon } from 'icons/grrbm profile pic.svg';
import { ReactComponent as Rcm4ProfileIcon } from 'icons/rcm4 profile pic.svg';
import { ReactComponent as SolutionIcon } from 'icons/Solution Component.svg';
import Rating from 'components/Rating/Rating';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	table: {
		display: 'inline-table',
		fontFamily: 'arial, sans-serif',
		// borderCollapse: 'separate',
		borderCollapse: 'collapse',
		borderSpacing: '0 5px',
		width: '80%',
		boxSizing: 'border-box',
	},
	trTitle: (props) => ({
		borderBottom: '1px solid #dddddd',
		textAlign: 'left',
		padding: '8px',
	}),
	tr: (props) => ({
		borderLeft: props.leftBorderColor
			? `3px solid ${props.leftBorderColor}`
			: '',

		boxSizing: 'border-box',
	}),
	td: (props) => ({
		borderBottom: '1px solid #dddddd',
		textAlign: 'left',
		padding: '4px 0',
		height: '65px',
		boxSizing: 'border-box',
		backgroundColor: props.questionColor,
		backgroundClip: 'content-box',
	}),

	//   tr:nth-child(even) {
	//     background-color: #dddddd;
	//   }
}));
const SubmissionStates = {
	ACCEPTED: 0,
	FAILED: 1,
	NOT_TRIED: 2,
};
export default function () {
	// const props = { backgroundColor: 'black', color: 'white' };
	const [rowStates, setRowStates] = useState([
		{
			title: 'Two Sum',
			type: '-',
			solution: 'Yes',
			rating: '3/5',
			difficulty: 'Medium',
			creator: 'grrbm',
			profilePic: <GrrbmProfileIcon />,
			lastUpdate: '03.05.2012 - 17:35',
			submissionState: SubmissionStates.NOT_TRIED,
		},
		{
			title: 'Number of Islands',
			type: '',
			solution: '',
			rating: '',
			difficulty: 'Medium',
			creator: 'rcm4',
			profilePic: <Rcm4ProfileIcon />,
			lastUpdate: '',
			submissionState: SubmissionStates.ACCEPTED,
		},
		{
			title: 'Add Two Numbers',
			type: '',
			solution: '',
			rating: '',
			difficulty: 'Easy',
			creator: 'rcm4',
			profilePic: <Rcm4ProfileIcon />,
			lastUpdate: '',
			submissionState: SubmissionStates.ACCEPTED,
		},
		{
			title: 'Two Sum',
			type: '',
			solution: '',
			rating: '',
			difficulty: 'Easy',
			creator: 'rcm4',
			profilePic: <Rcm4ProfileIcon />,
			lastUpdate: '',
			submissionState: SubmissionStates.NOT_TRIED,
		},
		{
			title: 'Number of Islands',
			type: '',
			solution: '',
			rating: '',
			difficulty: 'Hard',
			creator: 'grrbm',
			profilePic: <GrrbmProfileIcon />,
			lastUpdate: '',
			submissionState: SubmissionStates.FAILED,
		},
		{
			title: 'Add Two Numbers',
			type: '',
			solution: '',
			rating: '',
			difficulty: 'Hard',
			creator: 'grrbm',
			profilePic: <GrrbmProfileIcon />,
			lastUpdate: '',
			submissionState: SubmissionStates.FAILED,
		},
	]);
	const classes = useStyles(rowStates);
	const handleClickRow = (event) => {
		event.preventDefault();
	};
	useEffect(() => {}, [rowStates]);
	return (
		<div className={classes.root}>
			<table className={classes.table}>
				<thead>
					<tr className={classes.trTitle}>
						<th className={classes.td}>Title</th>
						<th className={classes.td}>Type</th>
						<th className={classes.td}>Solution</th>
						<th className={classes.td}>Rating</th>
						<th className={classes.td}>Difficulty</th>
						<th className={classes.td}>Creator</th>
						<th className={classes.td}>Last Update</th>
					</tr>
				</thead>
				<tbody>
					{rowStates.map((row) => {
						let rowColor = '';
						let leftBorderColor = '';
						switch (row.submissionState) {
							case SubmissionStates.ACCEPTED:
								rowColor = '#183B3A';
								leftBorderColor = '#00B5AD';
								break;
							case SubmissionStates.FAILED:
								rowColor = '#1B1C1D';
								break;
							case SubmissionStates.NOT_TRIED:
								rowColor = '#313233';
								break;
							default:
								rowColor = '#313233';
								break;
						}
						const props = {
							questionColor: rowColor,
							leftBorderColor,
						};
						const theClass = useStyles(props);
						return (
							<tr
								onClick={(e) => {
									handleClickRow(e);
								}}
								className={theClass.tr}
							>
								<td className={theClass.td}>
									<span>{row.title}</span>
								</td>
								<td className={theClass.td}>
									<span>{row.type}</span>
								</td>
								<td className={theClass.td}>
									<span>{getHasSolution(row.submissionState)}</span>
								</td>
								<td className={theClass.td}>
									<span>
										<Rating />
									</span>
								</td>
								<td className={theClass.td}>
									<span>{getDifficultyIcon(row.difficulty)}</span>
								</td>
								<td className={theClass.td}>
									<span>{row.profilePic}</span>
								</td>
								<td className={theClass.td}>
									<span>{row.lastUpdate}</span>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
const getDifficultyIcon = (difficulty) => {
	switch (difficulty) {
		case 'Medium':
			return <MediumIcon />;
		case 'Easy':
			return <EasyIcon />;
		case 'Hard':
			return <HardIcon />;
		default:
			return <EasyIcon />;
	}
};

const getProfilePic = (username) => {
	switch (username) {
		case 'grrbm':
			return <GrrbmProfileIcon />;
		case 'rcm4':
			return <Rcm4ProfileIcon />;
		default:
			return <Rcm4ProfileIcon />;
	}
};

const getHasSolution = (submissionState) => {
	switch (submissionState) {
		case SubmissionStates.ACCEPTED:
			return <SolutionIcon />;
		default:
			return '';
	}
};
