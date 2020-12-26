import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TestcasesInputList from '../../../../components/List/TestcasesInputList/TestcasesInputList.js'

const useStyles = makeStyles( theme => ({
   
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0px'
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  verticalContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  contentList: {
    width: '60%',
    paddingLeft: '20px'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start'
  },
  format: {
    justifyContent: 'flex-start',
    color: theme.palette.common.grey,
    marginTop: 15,
    fontFamily: 'OpenSans-Regular, sans-serif'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  tabs: {
    width: '11%',
    minWidth: 140,
    backgroundColor: theme.palette.common.black
  },
  tab: {
    color: theme.palette.common.grey,
    fontSize: 16,
    '&$selected': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.black3
    },
    '&$scroller': {
      position: 'none'
    },
  },
  selected: {},
  scroller: {},
  separator: {
    position: 'relative',
    width: '9%',
  },
  thirdElement: {
    flexGrow: 1,
    width: '11%',
  },
}));

export default function TestcasesSubpage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.verticalContainer}>
      <div className={classes.titleContainer}>
          <Typography variant="h6">
              <div className={classes.title}>Type your inputs below. Each input line is a separate test case in this format:</div>
              <div className={classes.format}>1</div>
          </Typography>
      </div>
      <div className={classes.bodyContainer}>
          <TestcasesInputList />
      </div>
      
    </div>
  );
}