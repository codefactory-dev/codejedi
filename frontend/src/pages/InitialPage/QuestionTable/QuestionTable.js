import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ReactComponent as CrossIcon } from 'icons/cross.svg';
import { ReactComponent as YesIcon } from 'icons/yes.svg';
import { ReactComponent as DotsIcon } from 'icons/dots.svg';

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
export default function () {
	// const props = { backgroundColor: 'black', color: 'white' };
	const SubmissionStates = {
		ACCEPTED: 0,
		FAILED: 1,
		NOT_TRIED: 2,
	};
	const [rowStates, setRowStates] = useState([
		{
			title: 'Two Sum',
			type: '-',
			solution: 'Yes',
			rating: '3/5',
			difficulty: 'Medium',
			creator: 'grrbm',
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
			lastUpdate: '',
			submissionState: SubmissionStates.ACCEPTED,
		},
		{
			title: 'Add Two Numbers',
			type: '',
			solution: '',
			rating: '',
			difficulty: 'Easy',
			creator: 'grrbm',
			lastUpdate: '',
			submissionState: SubmissionStates.ACCEPTED,
		},
		{
			title: 'Two Sum',
			type: '',
			solution: '',
			rating: '',
			difficulty: 'Easy',
			creator: 'grrbm',
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
								<td className={theClass.tdOrTh}>{row.solution}</td>
								<td className={theClass.tdOrTh}>{row.rating}</td>
								<td className={theClass.tdOrTh}>
									{getDifficultyIcon(row.difficulty)}
								</td>
								<td className={theClass.tdOrTh}>{row.creator}</td>
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
			return <CrossIcon />;
		case 'Easy':
			return <YesIcon />;
		case 'Hard':
			return <DotsIcon />;
		default:
			return <DotsIcon />;
	}
};
