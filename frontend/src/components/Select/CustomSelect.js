import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomSelectCss from './CustomSelect.scss'
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
	root: {
		width: 200
	},
	box: {
		position: 'absolute',
	}

}));

export default function CustomSelect(props){
    const classes = useStyles();

	// --------------------------------------------------------------------
	// HOOKS
	// --------------------------------------------------------------------
	useEffect(()=>{
		if (props.checkedOptionIndex){
			const searchId = `${props.label}-${Number(props.checkedOptionIndex)-1}`;
			const x = document.getElementById(searchId);
			x.querySelector('input').checked = true;
			console.log("selecting "+searchId)
		}
		//checkedOptionIndex
	},[])


	// --------------------------------------------------------------------
	// 
	// --------------------------------------------------------------------

	const generateOptions = () => {
		if (!props.options) { return undefined; }

		return (
			props.options.map((val, idx) => (
				<label id={`${props.label}-${idx}`} key={`option-${idx}-${val}`} className="option">
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
			if (props.onChange){
				props.onChange(val); 
			}
		}	
	}
	

    return (
		<div className={classes.root}>
			<div className={classes.box}>
				<span className="wrapper-label">{props.label}</span>
				<div className="select" style={{"margin": "0"}}
					onChange={ evt => onChangeHandler(evt)}>
					<form>
						<input type="radio" 
							name={"option-test"} 
							value={'default'}
							/>
						<i className="toggle icon icon-arrow-down"></i>
						<i className="toggle icon icon-arrow-up"></i>
						<span className="placeholder">Select an option</span>
						{generateOptions()}
					</form>
				</div>
			</div>
		</div>
    )
}

CustomSelect.propTypes = {
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func,
	checkedOptionIndex: PropTypes.number,
	label: PropTypes.string.isRequired
}