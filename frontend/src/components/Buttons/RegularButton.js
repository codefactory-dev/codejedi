import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginTop: 0,
      marginBottom: 0
    },
  },
}));

export default function RegularButton(props) {
  const classes = useStyles();

  return (
    <Button className={classes.root} variant="outlined" color="primary">
    {props.label || "Default Text"}
    </Button>
  );
}