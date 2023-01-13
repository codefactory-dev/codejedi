import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useAuth } from 'Context/auth';
import api from 'services/api';
import clsx from 'clsx';
import { ReactComponent as GrrbmProfileIcon } from 'icons/grrbm profile pic.svg';
import { ReactComponent as Rcm4ProfileIcon } from 'icons/rcm4 profile pic.svg';
import QuestionTableRow from './QuestionTableRow/QuestionTableRow';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	table: {
		display: 'block',
		overflowX: 'auto',
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
	th: (props) => ({
		minWidth: 85,
	}),
	firstTitle: (props) => ({
		textAlign: 'left',
		paddingLeft: 8,
	}),
	lastUpdateTitle: (props) => ({
		textAlign: 'left',
		width: 200,
	}),
	lastUpdateDateTitle: (props) => ({
		textAlign: 'right',
	}),
	firstElement: (props) => ({
		textAlign: 'left',
		'& div': {
			paddingLeft: 15,
		},
	}),
	lastUpdate: (props) => ({
		textAlign: 'left',
		'& div': {
			display: 'inline-block',
			whiteSpace: 'wrap',
			width: 200,
			height: 35,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
	}),
	lastUpdateDate: (props) => ({
		textAlign: 'right',
		minWidth: 180,
		'& span': {
			paddingRight: 15,
		},
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
	const { authTokens } = useAuth();
	const [inputs, setInputs] = useState([]);
	useEffect(() => {
		async function getQuestionsList() {
			// const fetchedQuestions = await api.get(`/questions`)
			const fetchedQuestions = await api.get(`/questions`);
			// console.log("fetched questions from backend: "+JSON.stringify(fetchedQuestions))
			const data = fetchedQuestions.data.map((question) => ({
				_id: question._id,
				title: question.title,
				type: question.type,
				description: question.description,
				solution:
					question.submissionIds.length > 0
						? question.submissionIds[0].submissionCode
						: 'NotTried',
				testcases: question.testcases,
				difficulty: question.difficulty,
				creator: question.creator.username,
				updatedAt: question.updatedAt,
			}));
			setInputs(data);
		}
		if (authTokens) {
			console.log(`this is the user id: ${JSON.parse(authTokens).user._id}`);
			getQuestionsList();
		}
	}, []);
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
	useEffect(() => {}, [rowStates]);
	return (
		<div className={classes.root}>
			<table className={classes.table}>
				<thead>
					<tr className={classes.trTitle}>
						<th className={clsx(classes.td, classes.th, classes.firstTitle)}>
							Title
						</th>
						<th className={clsx(classes.td, classes.th)}>Type</th>
						<th className={clsx(classes.td, classes.th)}>Solution</th>
						<th className={clsx(classes.td, classes.th)}>Rating</th>
						<th className={clsx(classes.td, classes.th)}>Difficulty</th>
						<th className={clsx(classes.td, classes.th)}>Creator</th>
						<th
							className={clsx([
								classes.td,
								classes.th,
								true && classes.lastUpdateTitle,
							])}
						>
							Last Update
						</th>
						<th
							className={clsx(
								classes.td,
								classes.th,
								classes.lastUpdateDateTitle
							)}
						>
							{' '}
						</th>
					</tr>
				</thead>
				<tbody>
					{inputs.map((row) => {
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
						return <QuestionTableRow materialUiProps={props} rowData={row} />;
					})}
				</tbody>
			</table>
		</div>
	);
}
