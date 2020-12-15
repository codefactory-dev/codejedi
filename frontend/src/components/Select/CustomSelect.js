import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomSelectCss from './CustomSelect.scss'
import PropTypes from 'prop-types';
var $ = require( "jquery" );

const useStyles = makeStyles((theme) => ({
    root: {
		
    },
}));

export default function CustomSelect(props){
    const classes = useStyles();

	const generateOptions = () => {
		if (!props.options) { return undefined; }

		const checkedIndex = props.checkedOptionIndex || -1;

		return (
			props.options.map((val, idx) => (
				<label key={`option-${idx}-${val}`} className="option">
					<input type="radio" name={`option-test`} onChange={() => onChangeHandler(idx, val)} checked={idx === checkedIndex}/>
					<span className="title">{val}</span>
				</label>
			))
		);
	}

	// --------------------------------------------------------------------
	// HANDLERS
	// --------------------------------------------------------------------

	const onChangeHandler = (idx, value) => props.onChange(value);
	

    return (
		<div className={classes.root}>
			<span className="wrapper-label">{props.label}</span>
			<div className="select" style={{"margin": "0"}}>
				<input type="radio" name={"option-test"} checked={false}/>
				<i className="toggle icon icon-arrow-down"></i>
				<i className="toggle icon icon-arrow-up"></i>
				<span className="placeholder">Select an option</span>
				{generateOptions()}
			</div>
		</div>
    )
}

CustomSelect.propTypes = {
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	checkedOptionIndex: PropTypes.number
}