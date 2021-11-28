import React from 'react';
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
import clsx from 'clsx';

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
const QuestionTableRow = ({ materialUiProps, rowData }) => {
	const theClass = useStyles(materialUiProps);
	const handleClickRow = (event) => {
		event.preventDefault();
	};
	return (
		<tr
			onClick={(e) => {
				handleClickRow(e);
			}}
			className={theClass.tr}
		>
			<td className={clsx(theClass.td, theClass.firstElement)}>
				<div className={theClass.dummy} />
				<div>{rowData.title}</div>
			</td>
			<td className={theClass.td}>
				<span>{rowData.type}</span>
			</td>
			<td className={theClass.td}>
				<span>{getHasSolution(rowData.submissionState)}</span>
			</td>
			<td className={theClass.td}>
				<span>
					<Rating />
				</span>
			</td>
			<td className={theClass.td}>
				<span>{getDifficultyIcon(rowData.difficulty)}</span>
			</td>
			<td className={theClass.td}>
				<span>{rowData.profilePic}</span>
			</td>
			<td className={clsx(theClass.td, theClass.lastUpdate)}>
				<div>{rowData.lastUpdate}</div>
			</td>
			<td className={clsx(theClass.td, theClass.lastUpdateDate)}>
				<span>{rowData.lastUpdateDate}</span>
			</td>
		</tr>
	);
};

export default QuestionTableRow;

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
