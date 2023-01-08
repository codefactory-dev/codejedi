import React, { useState, useEffect } from 'react';
import { useLocation, Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@mui/material/styles';
import Navbar from '../../components/Navbar/Navbar.js';
import BrowseList from './BrowseList/BrowseList.js';
import { useAuth } from '../../Context/auth';
import QuestionTable from './QuestionTable/QuestionTable.js';
import api from 'services/api';

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

export default function BrowsePage(props) {
	const classes = useStyles();
	const { authTokens, setAuthTokens } = useAuth();
	if (!authTokens || authTokens === 'undefined') {
		return <Redirect to="/login" />;
	}
	return (
		<div className={classes.questionPage}>
			<Navbar setAuthTokens={setAuthTokens} />
			<div className={classes.centralElements}>
				<div className={classes.centralTextArea}>
					{/* <BrowseList /> */}
					<QuestionTable title="Browse Page" />
				</div>
			</div>
		</div>
	);
}
