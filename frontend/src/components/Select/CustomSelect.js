import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomSelectCss from './CustomSelect.scss'
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({

}));

export default function CustomSelect(props){
    const classes = useStyles();

	// --------------------------------------------------------------------
	// HOOKS
	// --------------------------------------------------------------------



	// --------------------------------------------------------------------
	// 
	// --------------------------------------------------------------------

	const generateOptions = () => {
		if (!props.options) { return undefined; }

		return (
			props.options.map((val, idx) => (
				<label key={`option-${idx}-${val}`} className="option">
					<input type="radio" 
						   name={`option-test`} 
						   value={val}
						   />
					<span className="title">{val}</span>
				</label>
			))
		);
	}

	// --------------------------------------------------------------------
	// HANDLERS
	// --------------------------------------------------------------------

	const onChangeHandler = (evt) => {
		const val = evt.target.value;
		if(val) {
			props.onChange(val); 
		}	
	}
	

    return (
		<div className={classes.root}>
			<span className="wrapper-label">{props.label}</span>
			<div className="select" style={{"margin": "0"}}
				onChange={ evt => onChangeHandler(evt)}>
				<input type="radio" 
					   name={"option-test"} 
					   value={'default'}
					   />
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