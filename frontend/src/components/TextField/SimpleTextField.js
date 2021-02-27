import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    margin: 8,
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
  const [value, SetValue] = useState(props.value);

  const onChange = (evt) => {
    SetValue(evt.target.value);
    props.onChange(evt);
  }

  return (
        <TextField
          id="standard-full-width"
          className={classes.root}
          fullWidth
          InputLabelProps={ {shrink: true, disableAnimation: false} }
          inputProps={{ autoComplete: "off" }}

          label={props.label}
          value={value}
          onChange={onChange}
        />
  );
}

SimpleTextField.propTypes = {
  label: PropTypes.string,
  // state variables
  value: PropTypes.string,
  // callbacks
  onChange: PropTypes.func
}

SimpleTextField.defaultProps = {
  label: "Default Title",
  value: ''
}