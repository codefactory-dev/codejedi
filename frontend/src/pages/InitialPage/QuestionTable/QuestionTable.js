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
		'&>:nth-child(1)': {
			textAlign: 'left',
			paddingLeft: 8,
		},
		'&>:nth-child(7)': {
			textAlign: 'left',
			width: 200,
		},
		'&>:nth-child(8)': {
			textAlign: 'right',
		},
	}),
	tr: (props) => ({
		'&>:nth-child(1)': {
			textAlign: 'left',
			'& span': {
				paddingLeft: 15,
			},
		},
		'&>:nth-child(7)': {
			textAlign: 'left',
			'& div': {
				display: 'inline-block',
				whiteSpace: 'wrap',
				width: 200,
				height: 35,
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			},
		},
		'&>:nth-child(8)': {
			textAlign: 'right',
			'& span': {
				paddingRight: 15,
			},
		},
		boxSizing: 'border-box',
	}),
	td: (props) => ({
		borderBottom: '1px solid #dddddd',
		textAlign: 'center',
		padding: '4px 0',
		height: '65px',
		overflow: 'hidden',
		boxSizing: 'border-box',
		backgroundColor: props.questionColor,
		backgroundClip: 'content-box',
		position: 'relative',
	}),
	dummy: (props) => ({
		borderLeft: props.leftBorderColor
			? `3px solid ${props.leftBorderColor}`
			: '',
		marginRight: 15,
		position: 'absolute',
		top: '3px',
		bottom: '5px',
		left: '0px',
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
			lastUpdate:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam.',
			lastUpdateDate: '03.05.2012 - 17:35',
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
			lastUpdate:
				'Vitae suscipit tellus mauris a diam maecenas sed enim. Sapien pellentesque habitant morbi tristique senectus et netus et. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. ',
			lastUpdateDate: '03.05.2012 - 17:35',
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
			lastUpdate:
				'Malesuada bibendum arcu vitae elementum curabitur. Nisi scelerisque eu ultrices vitae auctor eu augue. Massa tincidunt dui ut ornare lectus',
			lastUpdateDate: '03.05.2012 - 17:35',
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
			lastUpdate:
				'Nunc scelerisque viverra mauris in aliquam sem. Suspendisse ultrices gravida dictum fusce ut placerat orci. Tincidunt vitae semper quis lectus nulla at. Consequat id porta nibh venenatis cras sed. Malesuada fames ac turpis egestas.',
			lastUpdateDate: '03.05.2012 - 17:35',
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
			lastUpdate:
				'Quis lectus nulla at volutpat. Pellentesque elit ullamcorper dignissim cras.',
			lastUpdateDate: '03.05.2012 - 17:35',
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
			lastUpdate:
				'Dui vivamus arcu felis bibendum ut tristique et egestas. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Vitae tortor condimentum lacinia quis vel. Viverra nibh cras pulvinar mattis nunc.',
			lastUpdateDate: '03.05.2012 - 17:35',
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
						<th className={classes.td}> </th>
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
									<div className={theClass.dummy} />
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
									<div>{row.lastUpdate}</div>
								</td>
								<td className={theClass.td}>
									<span>{row.lastUpdateDate}</span>
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
