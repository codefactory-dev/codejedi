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
			<span class="wrapper-label">{props.label}</span>
			<div class="select">
				<input type="radio" name="option" />
				<i class="toggle icon icon-arrow-down"></i>
				<i class="toggle icon icon-arrow-up"></i>
				<span class="placeholder">Select an option</span>
				<label class="option">
					<input type="radio" name="option" />
					<span class="title">Option 1</span>
				</label>
				<label class="option">
					<input type="radio" name="option" />
					<span class="title">Option 2</span>
				</label>
				<label class="option">
					<input type="radio" name="option"/>
					<span class="title">Option 3</span>
				</label>
				<label class="option">
					<input type="radio" name="option" />
					<span class="title">Option 4</span>
				</label>
			</div>
		</div>
    )
}