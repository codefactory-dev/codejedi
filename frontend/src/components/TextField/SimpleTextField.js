import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    '& > label': {
      color: theme.palette.common.white,
      fontWeight: 550
    },
    '& > div': {
      caretColor: theme.palette.common.grey,
      color: theme.palette.common.white,
      '&::before': {
        borderBottom: `1px solid ${theme.palette.common.grey}`
      }
    }
  }
}));

export default function SimpleTextField(props) {
  const classes = useStyles();

  return (
        <TextField
          id="standard-full-width"
          className={classes.root}
          label={props.label}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}

          onChange={evt => props.onChange(evt)}
        />
  );
}

SimpleTextField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func
}

SimpleTextField.defaultProps = {
  label: "Default Title"
}