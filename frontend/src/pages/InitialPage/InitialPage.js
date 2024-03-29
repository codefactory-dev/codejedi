import React, { useState, useEffect } from 'react';
import { useLocation, Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js';
import QuestionsList from './QuestionsList/QuestionsList.js';
import { useAuth } from '../../Context/auth';
import QuestionTable from './QuestionTable/QuestionTable.js';

const useStyles = makeStyles((theme) => ({
	questionPage: {
		height: '1020px',
		backgroundColor: theme.palette.common.black,
		color: 'white',
	},
	centralElements: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: theme.palette.common.black,
		flexDirection: 'column',
	},
	centralTextArea: {
		marginTop: 60,
		padding: 0,
		margin: 0,
		width: '100%',
		height: '100%',
		backgroundColor: theme.palette.common.black,
	},
}));

export default function InitialPage(props) {
	const classes = useStyles();

	const [inputs, setInputs] = useState(['nums1', 'nums2', 'nums3']);

	const { authTokens, setAuthTokens } = useAuth();
	if (!authTokens || authTokens === 'undefined') {
		return <Redirect to="/login" />;
	}
	return (
		<div className={classes.questionPage}>
			<Navbar />
			<div className={classes.centralElements}>
				<div className={classes.centralTextArea}>
					<QuestionTable
						title="Initial Page"
						inputs={inputs}
						setInputs={setInputs}
					/>
				</div>
			</div>
		</div>
	);
}
