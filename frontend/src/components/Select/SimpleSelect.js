import React from 'react';
import { makeStyles } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SimpleSelectCss from './SimpleSelect.scss';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 140,
		width: 180,
		'& > label': {
			color: theme.palette.common.white,
			fontWeight: 550,
		},
		'& > div': {
			'& > svg': {
				marginTop: 4,
				color: theme.palette.common.white,
			},
		},
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
		color: theme.palette.common.white,
		fontSize: 11,
		backgroundColor: theme.palette.common.black3,
		paddingTop: 0,
		paddingBottom: 0,
		marginTop: 10,
	},
	placeholder: {
		marginLeft: 5,
		fontStyle: 'normal',
		fontSize: 12,
	},
	menuitem: {
		marginLeft: 5,
		fontStyle: 'normal',
		fontSize: 12,
	},
}));

export default function SimpleSelect(props) {
	const classes = useStyles();
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<FormControl className={classes.formControl}>
			<InputLabel
				className={classes.label}
				shrink
				id="demo-simple-select-placeholder-label-label"
			>
				{props.label || 'Default Label'}
			</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={age}
				onChange={handleChange}
				displayEmpty
				classes={{
					root: classes.selectEmpty,
					focus: classes.focus,
				}}
				// className={classes.selectEmpty}
				inputProps={{ 'aria-label': 'Without label' }}
			>
				<MenuItem value="">
					<em className={classes.placeholder}>Select an option</em>
				</MenuItem>
				<MenuItem value={10}>
					<em className={classes.menuitem}>Ten</em>
				</MenuItem>
				<MenuItem value={20}>
					<em className={classes.menuitem}>Twenty</em>
				</MenuItem>
				<MenuItem value={30}>
					<em className={classes.menuitem}>Thirty</em>
				</MenuItem>
			</Select>
		</FormControl>
	);
}
