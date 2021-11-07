import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
	}),

	//   tr:nth-child(even) {
	//     background-color: #dddddd;
	//   }
}));
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
			lastUpdate: '03.05.2012 - 17:35',
			selected: false,
		},
		{
			title: 'Number of Islands',
			type: '',
			solution: '',
			rating: '',
			difficulty: '',
			creator: 'rcm4',
			lastUpdate: '',
			selected: true,
		},
		{
			title: 'Add Two Numbers',
			type: '',
			solution: '',
			rating: '',
			difficulty: '',
			creator: 'grrbm',
			lastUpdate: '',
			selected: false,
		},
		{
			title: 'Two Sum',
			type: '',
			solution: '',
			rating: '',
			difficulty: '',
			creator: 'grrbm',
			lastUpdate: '',
			selected: false,
		},
		{
			title: 'Number of Islands',
			type: '',
			solution: '',
			rating: '',
			difficulty: '',
			creator: 'grrbm',
			lastUpdate: '',
			selected: false,
		},
		{
			title: 'Add Two Numbers',
			type: '',
			solution: '',
			rating: '',
			difficulty: '',
			creator: 'grrbm',
			lastUpdate: '',
			selected: false,
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
					{rowStates.map((row) => (
						<tr
							onClick={(e) => {
								handleClickRow(e);
							}}
							className={classes.tdOrTh}
						>
							<td className={classes.tdOrTh}>{row.title}</td>
							<td className={classes.tdOrTh}>{row.type}</td>
							<td className={classes.tdOrTh}>{row.solution}</td>
							<td className={classes.tdOrTh}>{row.rating}</td>
							<td className={classes.tdOrTh}>{row.difficulty}</td>
							<td className={classes.tdOrTh}>{row.creator}</td>
							<td className={classes.tdOrTh}>{row.lastUpdate}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
