import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		...theme.typography.button,
		...theme.btnPrimaryOutline,
	},
}));

// -------------------------------------------------------------------------
// GLOBAL VARIABLES
// -------------------------------------------------------------------------
const BTN_VARIANTS = {
	DEFAULT: 'default',
	ERROR: 'error',
	DISABLED: 'disabled',
};

export default function RegularButton(props) {
	const classes = useStyles();

	return (
		<button className={classes.root} onClick={props.onClick}>
			{props.label}
		</button>
	);
}

RegularButton.propTypes = {
	variant: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func,
};

RegularButton.defaultProps = {
	variant: BTN_VARIANTS.DEFAULT,
	label: 'Default text',
	onClick: () => {},
};
