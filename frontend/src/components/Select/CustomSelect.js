import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CustomSelectCss from './CustomSelect.scss'
var $ = require( "jquery" );

const useStyles = makeStyles((theme) => ({
    select: {
        width: 100
    },
}));

export default function CustomSelect(){
    //const classes = useStyles();

    return (
        <div class="select">
			<input type="radio" name="option" />
			<i class="toggle icon icon-arrow-down"></i>
			<i class="toggle icon icon-arrow-up"></i>
			<span class="placeholder">Choose...</span>
			<label class="option">
				<input type="radio" name="option" />
				<span class="title"><i class="icon icon-speedometer"></i>Speedometer</span>
			</label>
			<label class="option">
				<input type="radio" name="option" />
				<span class="title"><i class="icon icon-fire"></i>Fire</span>
			</label>
			<label class="option">
				<input type="radio" name="option" disabled />
				<span class="title"><i class="icon icon-handbag"></i>Handbag</span>
			</label>
			<label class="option">
				<input type="radio" name="option" />
				<span class="title"><i class="icon icon-badge"></i>Badge</span>
			</label>
		</div>
    )
}