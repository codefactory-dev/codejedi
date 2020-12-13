import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CustomSelectCss from './CustomSelect.scss'
var $ = require( "jquery" );

const useStyles = makeStyles((theme) => ({
    root: {
		
    },
}));

export default function CustomSelect(props){
    const classes = useStyles();

    return (
		<div className={classes.root}>
			<span className="wrapper-label">{props.label}</span>
			<div className="select" style={{"margin": "0"}}>
				<input type="radio" name={"option-"+props.label}/>
				<i className="toggle icon icon-arrow-down"></i>
				<i className="toggle icon icon-arrow-up"></i>
				<span className="placeholder">Select an option</span>
				<label className="option">
					<input type="radio" name={"option-"+props.label} onChange={() => console.log("oeoeoeoe")}/>
					<span className="title">Option 1</span>
				</label>
				<label className="option">
					<input type="radio" name={"option-"+props.label} />
					<span className="title">Option 2</span>
				</label>
				<label className="option">
					<input type="radio" name={"option-"+props.label} />
					<span className="title">Option 3</span>
				</label>
				<label className="option">
					<input type="radio" name={"option-"+props.label} />
					<span className="title">Option 4</span>
				</label>
			</div>
		</div>
    )
}