import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button';




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
  DEFAULT: "default",
  ERROR: "error",
  DISABLED: "disabled"
}

export default function RegularButton(props) {
  const classes = useStyles();

  return (
    <button className={classes.root} 
            onClick={props.onClick}>
              {props.label}
    </button>
  );
}

RegularButton.propTypes = {
  variant: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
}

RegularButton.defaultProps = {
  variant: BTN_VARIANTS.DEFAULT,
  label: "Default text",
  onClick: () => {}
}