import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';
import api from 'services/api';
import questionTypes from '../../utils/questionTypes.js';
import SimpleTabs from '../../components/tabpanel/SimpleTabs';
import Navbar from '../../components/Navbar/Navbar.js';

export default function QuestionPage() {
	const classes = useStyles();
	const [shouldSubmit, setShouldSubmit] = useState(false);
	const [shouldSave, setShouldSave] = useState(false);
	const [answer, setAnswer] = useState('');
	const [questionLoaded, setQuestionLoaded] = useState(false);
	const [questionDescription, setQuestionDescription] = useState('');
	const [questionSolution, setQuestionSolution] = useState('');
	const [questionTestcases, setQuestionTestcases] = useState('');
	const [questionTestcasesType, setQuestionTestcasesType] = useState();
	const [languageType, setLanguageType] = useState();
	const [solutionName, setSolutionName] = useState();

	async function loadQuestion() {
		const allUsers = await api({
			method: 'get',
			url: `/users`,
		});
		const userId = allUsers.data[0]._id;
		const allQuestions = await api({
			method: 'get',
			url: `/users/${userId}/questions`,
		});
		const question = allQuestions.data.questions[0];
		const defaultQuestion = {
			solution: '',
			testcases: '',
			testcasesType: '',
			languageType: '',
			solutionName: '',
			description: '',
		};
		const chosenQuestion = question || defaultQuestion;
		setQuestionSolution(chosenQuestion.solution);
		setQuestionTestcases(chosenQuestion.testcases);
		setQuestionTestcasesType(chosenQuestion.testcasesType);
		setLanguageType(chosenQuestion.languageType);
		setSolutionName(chosenQuestion.solutionName);
		setQuestionDescription(chosenQuestion.description);
	}

	function triggerSubmitAll() {
		setShouldSubmit(true);
	}

	function triggerLoad() {
		async function performQuestionLoading() {
			await loadQuestion();
			setQuestionLoaded(true);
		}
		performQuestionLoading();
		console.log('finished loading questions');
	}

	function triggerSave() {
		console.log('triggered save');
		setShouldSave(true);
	}
	useEffect(() => {
		if (answer.length > 0) {
			Swal.fire(answer);
		}
		setAnswer('');
	}, [answer]);

	return (
		<div className={classes.questionPage}>
			<Navbar />
			<Container maxWidth="sm">
				<SimpleTabs
					shouldSubmit={shouldSubmit}
					setShouldSubmit={setShouldSubmit}
					shouldSave={shouldSave}
					setShouldSave={setShouldSave}
					questionDescription={questionDescription}
					questionSolution={questionSolution}
					questionTestcases={questionTestcases}
					questionTestcasesType={questionTestcasesType}
					languageType={languageType}
					solutionName={solutionName}
					answer={answer}
					setAnswer={setAnswer}
				/>
				<Box>
					<div className={classes.grow} />
					<Button
						className={classes.submitBtn}
						variant="contained"
						color="primary"
						onClick={triggerSubmitAll}
					>
						Submit Question
					</Button>
					<Button
						className={classes.saveBtn}
						variant="contained"
						color="primary"
						onClick={triggerSave}
					>
						Save
					</Button>
					<Button
						className={classes.loadBtn}
						variant="contained"
						color="primary"
						onClick={triggerLoad}
					>
						Load
					</Button>
				</Box>
			</Container>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	questionPage: {
		height: '900px',
		backgroundColor: '#1B1C1D',
		color: 'white',
	},
	answer: {
		color: 'green',
	},
	grow: {
		flexGrow: 1,
	},
	submitBtn: {
		marginTop: '20px',
		float: 'right',
		textTransform: 'none',
		fontWeight: theme.typography.fontWeightRegular,
	},
	saveBtn: {
		marginTop: '20px',
		marginRight: '20px',
		float: 'right',
		textTransform: 'none',
		fontWeight: theme.typography.fontWeightRegular,
	},
	loadBtn: {
		marginTop: '20px',
		marginRight: '20px',
		float: 'right',
		textTransform: 'none',
		fontWeight: theme.typography.fontWeightRegular,
	},
}));
