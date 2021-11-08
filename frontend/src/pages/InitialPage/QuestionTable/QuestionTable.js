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
		fontFamily: 'arial, sans-serif',
		borderCollapse: 'collapse',
		width: '80%',
	},
	tdOrTh: (props) => ({
		border: '1px solid #dddddd',
		textAlign: 'left',
		padding: '8px',
		backgroundColor: props.questionColor,
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
					<tr className={classes.tdOrTh}>
						<th className={classes.tdOrTh}>Title</th>
						<th className={classes.tdOrTh}>Type</th>
						<th className={classes.tdOrTh}>Solution</th>
						<th className={classes.tdOrTh}>Rating</th>
						<th className={classes.tdOrTh}>Difficulty</th>
						<th className={classes.tdOrTh}>Creator</th>
						<th className={classes.tdOrTh}>Last Update</th>
					</tr>
				</thead>
				<tbody>
					{rowStates.map((row) => {
						let rowColor = '';
						switch (row.submissionState) {
							case SubmissionStates.ACCEPTED:
								rowColor = '#183B3A';
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
						const props = { questionColor: rowColor };
						const theClass = useStyles(props);
						return (
							<tr
								onClick={(e) => {
									handleClickRow(e);
								}}
								className={classes.tdOrTh}
							>
								<td className={theClass.tdOrTh}>
									<span>{row.title}</span>
								</td>
								<td className={theClass.tdOrTh}>{row.type}</td>
								<td className={theClass.tdOrTh}>
									{getHasSolution(row.submissionState)}
								</td>
								<td className={theClass.tdOrTh}>
									<Rating />
								</td>
								<td className={theClass.tdOrTh}>
									{getDifficultyIcon(row.difficulty)}
								</td>
								<td className={theClass.tdOrTh}>{row.profilePic}</td>
								<td className={theClass.tdOrTh}>{row.lastUpdate}</td>
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
