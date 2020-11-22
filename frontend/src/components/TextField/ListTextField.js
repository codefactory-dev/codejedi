import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > label': {
      color: theme.palette.common.white,
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

export default function ListTextField(props) {
  const classes = useStyles();

  return (
        <TextField
          className={classes.root}
          fullWidth
          defaultValue={props.defaultValue}
          onKeyUp={props.onKeyUp}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        />
  );
}

ListTextField.propTypes = {
    defaultValue: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyUp: PropTypes.func,
};


ListTextField.defaultProps = {
    defaultValue: '',
    onFocus: undefined,
    onBlur: undefined,
    onKeyUp: undefined,
}