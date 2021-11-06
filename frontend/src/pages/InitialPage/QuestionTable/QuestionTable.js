import React from 'react';
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

	tdOrTh: {
		border: '1px solid #dddddd',
		textAlign: 'left',
		padding: '8px',
	},

	//   tr:nth-child(even) {
	//     background-color: #dddddd;
	//   }
}));
export default function () {
	const classes = useStyles();
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
					<tr className={classes.tdOrTh}>
						<td className={classes.tdOrTh}>Alfreds Futterkiste</td>
						<td className={classes.tdOrTh}>Maria Anders</td>
						<td className={classes.tdOrTh}>Germany</td>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
					</tr>
					<tr className={classes.tdOrTh}>
						<td className={classes.tdOrTh}>Centro comercial Moctezuma</td>
						<td className={classes.tdOrTh}>Francisco Chang</td>
						<td className={classes.tdOrTh}>Mexico</td>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
					</tr>
					<tr className={classes.tdOrTh}>
						<td className={classes.tdOrTh}>Ernst Handel</td>
						<td className={classes.tdOrTh}>Roland Mendel</td>
						<td className={classes.tdOrTh}>Austria</td>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
					</tr>
					<tr className={classes.tdOrTh}>
						<td className={classes.tdOrTh}>Island Trading</td>
						<td className={classes.tdOrTh}>Helen Bennett</td>
						<td className={classes.tdOrTh}>UK</td>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
					</tr>
					<tr className={classes.tdOrTh}>
						<td className={classes.tdOrTh}>Laughing Bacchus Winecellars</td>
						<td className={classes.tdOrTh}>Yoshi Tannamuri</td>
						<td className={classes.tdOrTh}>Canada</td>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
					</tr>
					<tr className={classes.tdOrTh}>
						<td className={classes.tdOrTh}>Magazzini Alimentari Riuniti</td>
						<td className={classes.tdOrTh}>Giovanni Rovelli</td>
						<td className={classes.tdOrTh}>Italy</td>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
						<th className={classes.tdOrTh}>-</th>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
