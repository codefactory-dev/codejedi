import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles, withStyles } from 'tss-react/mui';
import IconButton from '../../Buttons/IconButton';

import { ReactComponent as HashIcon } from '../../../icons/hashtag.svg';
import { ReactComponent as AddIcon } from '../../../icons/add.svg';

import { ReactComponent as CrossIcon } from '../../../icons/cross.svg';
import { ReactComponent as YesIcon } from '../../../icons/yes.svg';

import './TestcasesInputList.scss';

const { usePrevious } = require('../../../utils/useful.js');

const useStyles =
	makeStyles <
	{ color: 'red' | 'blue' } >
	((theme, { color }) => ({
		root: {
			fontFamily: 'Lato',
			fontWeight: '700',
			height: 280,
			boxSizing: 'border-box',
			padding: '30px 10px',
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.greyLight,
			flexShrink: 1,
			marginRight: 'auto',
			marginLeft: 'auto',
			width: '60%',
			minWidth: 96,
			marginTop: 60,
		},
		titleContainer: {
			display: 'flex',
			alignItems: 'center',
			padding: '15px 0',
		},
		title: {
			marginRight: '15px',
			fontSize: '1.4rem',
		},
		tag: {
			padding: '5px 10px',
			backgroundColor: theme.palette.primary.main,
			borderRadius: '15px',
			fontSize: '.65rem',
			fontWeight: 700,
		},
		subtitleContainer: {
			display: 'flex',
			alignItems: 'center',
			marginLeft: '5px',
			padding: '10px',
			fill: theme.palette.common.grey3,

			'& p': {
				...theme.listSubtitle,
				marginLeft: '5px',
			},
		},
		contentContainer: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
		},
		input: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			color: theme.palette.common.white,
			backgroundColor: theme.palette.common.black,
			fontSize: '1rem',
			height: 37,
			borderStyle: 'none',
			cursor: (props) => (props.disabled === false ? 'pointer' : 'default'),
			'& > span': {
				margin: '0',
				marginLeft: '40px',
				display: 'inline',
			},
		},
		selectedInput: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			color: theme.palette.common.white,
			backgroundColor: theme.palette.common.black,
			fontSize: '1rem',
			width: '100%',
			height: 28,
			// border
			borderStyle: 'none',
			cursor: (props) => (props.disabled === false ? 'pointer' : 'default'),
			backgroundColor: theme.palette.common.black2,
			borderRadius: '5px',
			'& > span': {
				margin: '0',
				marginLeft: '15.5px',
				display: 'inline',
			},
		},
		focusedInput: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			color: theme.palette.common.white,
			backgroundColor: theme.palette.common.black,
			fontSize: '1rem',
			width: '100%',
			height: 28,
			// border
			borderStyle: 'none',
			cursor: (props) => (props.disabled === false ? 'pointer' : 'default'),
			backgroundColor: theme.palette.common.black2,
			borderRadius: '5px',
			'& > input': {
				color: theme.palette.common.white,
				backgroundColor: theme.palette.common.black2,
				fontFamily: 'Lato',
				fontSize: '1rem',
				width: '100%',
				border: 0,
				borderTop: `.1px solid rgba(0,0,0,0)`,
				borderBottom: `.1px solid ${theme.palette.common.grey}`,
				cursor: (props) => (props.disabled === false ? 'pointer' : 'default'),
				fontWeight: '700',
				marginLeft: '15.5px',
				padding: 0,
			},
		},
		divider: {
			...theme.divider,
			zIndex: 0,
			position: 'relative',
			minWidth: '225.297px',
		},
		addContainer: {
			display: 'inline-flex',
			alignItems: 'center',
			marginLeft: '25px',
			fill: theme.palette.common.grey3,
			padding: '5px',
			borderRadius: '5px',
			margin: '5px 0',
			'&:hover': {
				cursor: (props) => (props.disabled === false ? 'pointer' : 'default'),
				backgroundColor: (props) =>
					props.disabled === false
						? theme.palette.common.black2
						: theme.palette.common.black,
			},
		},
		newButton: {
			...theme.listSubtitle,
			marginLeft: '5px',
		},
		saveButton: {
			...theme.btnPrimaryOutline,
			margin: '40px 0',
		},
		inactiveRow: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			borderBottom: 'solid #333333 1px',
		},
		activeRow: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			borderBottom: 'solid #333333 1px',
			borderColor: theme.palette.common.grey,
			fill: theme.palette.common.grey3,
			padding: '0',
			height: 37,
			cursor: (props) => (props.disabled === false ? 'pointer' : 'default'),
		},
		confirmingDeleteText: {
			color: theme.palette.secondary.main,
			fontWeight: 100,
		},
		confirmingDeleteIcon: {
			backgroundColor: theme.palette.secondary.main,
		},
		error: {
			color: 'red',
			fontWeight: 100,
		},
	}));
const rowStates = {
	DESELECTED: 0,
	EDITING_ROW: 1,
	CONFIRMING_DELETE: 2,
};
export default function TestcasesInputList({ testcaseFormat, ...props }) {
	const classes = useStyles(props);
	const matches = useMediaQuery('(min-width:798px)');
	const [inputs, setInputs] = useState(props.inputs);
	const [activeRowItem, setActiveRowItem] = useState();
	const [editingState, setEditingState] = useState(rowStates.DESELECTED);
	const [maxInputTag, setMaxInputTag] = useState('20 max');
	const [errors, setErrors] = useState();
	// const prevInputs = usePrevious(inputs);

	// -----------------------------------------
	// HOOKS
	// -----------------------------------------

	useEffect(() => {
		props.onChange(inputs);
	}, [inputs]);

	useEffect(() => {
		if (editingState === rowStates.EDITING_ROW) {
			const elmt = document.querySelector(`#input-${activeRowItem}`);
			elmt.value = inputs[activeRowItem];
			elmt.focus();
		}
	}, [editingState]);

	// ------------------------------------------
	//
	// ------------------------------------------

	const deleteCurrentRow = () => {
		const newInputs = [...inputs];
		newInputs.splice(activeRowItem, 1);
		setInputs(newInputs);
		setEditingState(rowStates.DESELECTED);
		setActiveRowItem(-1);
	};
	const askForDelete = (e, idx) => {
		e.preventDefault();
		setEditingState(rowStates.CONFIRMING_DELETE);
	};

	const editRow = (e, idx) => {
		setEditingState(rowStates.EDITING_ROW);
	};

	const onClickHandler = (e) => {
		const newInputs = [...inputs, ''];
		if (newInputs.length > 0) {
			onClickRowItem(null, newInputs.length - 1);
			editRow();
		}
		setInputs(newInputs);
	};
	const onClickRowItem = (event, idx) => {
		// console.log("clicked row item "+idx);
		setEditingState(rowStates.DESELECTED);
		setActiveRowItem(idx);
	};
	// when pressing enter after typing a new input, onFormSubmit is called
	const onFormSubmit = (e) => {
		e.preventDefault();
		const newInputs = [...inputs];
		const activeRowValue = document.querySelector(
			`#input-${activeRowItem}`
		).value;
		if (!validateSingleInput(activeRowValue, activeRowItem, newInputs)) {
			// if input is not valid, make it red colored.
			if (activeRowValue.trim()) {
				newInputs[activeRowItem] = document.querySelector(
					`#input-${activeRowItem}`
				).value;
			}
			console.log(`new inputs: ${JSON.stringify(newInputs)}`);
			setInputs(newInputs);
			setActiveRowItem(-1);
			return;
		}
		// if string contains only whitespaces, don't change anything
		if (activeRowValue.trim()) {
			newInputs[activeRowItem] = document.querySelector(
				`#input-${activeRowItem}`
			).value;
		}
		console.log(`new inputs: ${JSON.stringify(newInputs)}`);
		setInputs(newInputs);
		setActiveRowItem(-1);
	};

	function handleYes() {
		deleteCurrentRow();
	}

	function deselectCurrentItem(event) {
		console.log('deselecting current item');
		const activeRowElement = document.querySelectorAll(
			'div[class^="makeStyles-activeRow"]'
		);
		setActiveRowItem(-1);
		setEditingState(rowStates.DESELECTED);
	}
	const getDeletionState = (input, idx) => ({
		[rowStates.DESELECTED]: (
			<div className={classes.selectedInput}>
				<IconButton
					className={classes.deleteIcon}
					width={19.5}
					height={20}
					padding={3}
					marginLeft={5}
					fill={`${theme.palette.primary.main}`}
					stroke="none"
					fillHover="white"
					strokeHover="none"
					borderRadius="3px"
					icon={<CrossIcon />}
					onClick={(e) => {
						askForDelete(e, idx);
					}}
				/>
				<span
					onClick={() => {
						editRow();
					}}
				>
					{input}
				</span>
			</div>
		),
		[rowStates.EDITING_ROW]: (
			<div className={classes.focusedInput}>
				<IconButton
					className={classes.deleteIcon}
					width={19.5}
					height={20}
					padding={3}
					marginLeft={5}
					fill={`${theme.palette.primary.main}`}
					stroke="none"
					fillHover="white"
					strokeHover="none"
					borderRadius="3px"
					icon={<CrossIcon />}
					onClick={(e) => {
						askForDelete(e, idx);
					}}
				/>
				<input id={`input-${idx}`} maxLength="300" />
			</div>
		),
		[rowStates.CONFIRMING_DELETE]: (
			<div className={classes.selectedInput}>
				<IconButton
					className={classes.confirmingDeleteIcon}
					width={19.5}
					height={20}
					padding={3}
					marginLeft={5}
					fill={`${theme.palette.secondary.main}`}
					stroke="none"
					fillHover="white"
					strokeHover="none"
					borderRadius="3px"
					icon={<YesIcon />}
					onClick={(e) => {
						handleYes();
					}}
				/>
				<span className={classes.confirmingDeleteText}>
					{matches
						? 'Are you sure to delete this row ?'
						: 'Remove selected item ?'}
				</span>
				{/* onClick={()=>{handleYes()}} */}
			</div>
		),
	});

	function generateRow(input, idx) {
		// if i'm generating an active row
		if (idx === activeRowItem) {
			return (
				<div
					className={classes.activeRow}
					onMouseLeave={(event) => {
						if (!props.disabled) {
							if (editingState !== rowStates.EDITING_ROW) {
								deselectCurrentItem(event);
							}
						}
					}}
					key={`input-${idx}`}
				>
					{getDeletionState(input, idx)[editingState]}
				</div>
			);
		}
		// if the row i'm generating is inactive
		return (
			<div
				className={classes.inactiveRow}
				onMouseEnter={(event) => {
					if (!props.disabled) onClickRowItem(event, idx);
				}}
			>
				{/* <input className={classes.input} placeholder={input} /> */}
				<div
					className={classes.input}
					onClick={(event) => {
						if (!props.disabled) onClickRowItem(event, idx);
					}}
				>
					<span>{input}</span>
				</div>
				<div className={classes.error}>
					{errors && errors[idx] && `  -  ${errors[idx]}`}
				</div>
			</div>
		);
	}

	function validateSingleInput(input, idx, allInputs) {
		const errorMsg = `wrong format. should be ${JSON.stringify(
			testcaseFormat
		)}`;
		const errorsArray = [];
		allInputs[idx] = input;
		allInputs.forEach((input, idx) => {
			let everythingPassed = true;

			// is it multiple parameters ?
			if (testcaseFormat.length > 1) {
				const enclosedInArray = `[${input}]`;
				try {
					const converted = JSON.parse(enclosedInArray);
					for (let i = 0; i < converted.length; i++) {
						if (Array.isArray(converted[i])) {
							if (testcaseFormat[i].type !== 'array') {
								everythingPassed = false;
							}
						} else if (typeof converted[i] !== testcaseFormat[i].type) {
							everythingPassed = false;
						}
					}
				} catch (error) {
					everythingPassed = false;
				}
			} else {
				// is it a single parameter ?
				try {
					const converted = JSON.parse(input);
					if (typeof converted !== testcaseFormat[0].type) {
						everythingPassed = false;
					}
				} catch (error) {
					// let's see if it's a string
					try {
						const enclosedInQuotes = `"${input}"`;
						const secondTryConvert = JSON.parse(enclosedInQuotes);
						if (typeof secondTryConvert !== testcaseFormat[0].type) {
							everythingPassed = false;
						}
					} catch (error) {
						everythingPassed = false;
					}
				}
			}
			if (everythingPassed) {
				errorsArray.push('');
			} else {
				errorsArray.push(errorMsg);
			}
		});
		setErrors(errorsArray);
		return false;
	}

	return (
		<div className={classes.root}>
			<div className={classes.titleContainer}>
				<span className={classes.title}>Input</span>
				<a className={classes.tag}>{maxInputTag}</a>
			</div>
			<hr className={classes.divider} />
			<div className={classes.subtitleContainer}>
				<HashIcon style={{ height: '12px', width: '12px' }} />
				<p>Value</p>
			</div>
			<hr className={classes.divider} />
			<div className={classes.wrapper}>
				<div className={classes.contentContainer}>
					<form
						// onBlur in React is used instead of onFocusOut
						/* onBlur={(e) => {onFormSubmit(e)}} */
						onSubmit={(e) => {
							if (!props.disabled) onFormSubmit(e);
						}}
					>
						{inputs.map((input, idx) => generateRow(input, idx))}
					</form>
					<div
						className={classes.addContainer}
						onClick={(event) => {
							if (!props.disabled) onClickHandler(event);
						}}
					>
						<AddIcon style={{ height: '12px', width: '12px' }} />
						<a className={classes.newButton}>New</a>
					</div>
				</div>
			</div>
		</div>
	);
}

TestcasesInputList.propTypes = {
	inputs: PropTypes.array,
	// callbacks
	onChange: PropTypes.func.isRequired,
};

TestcasesInputList.defaultProps = {
	inputs: [],
};
