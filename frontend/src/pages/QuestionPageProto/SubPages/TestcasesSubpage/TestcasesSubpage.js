import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import CustomSelect from '../../../../components/Select/CustomSelect.js'
import SimpleTextField from '../../../../components/TextField/SimpleTextField.js'
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TestInputList from '../../../../components/List/TestInputList.js'

import RegularButton from '../../../../components/Buttons/RegularButton.js'

const useStyles = makeStyles( theme => ({
   

  verticalContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    marginTop: 20,
    height: 60,
    minWidth: 503,
    paddingLeft: 0,
    paddingRIght: 0
  },
  questionPageSeparator: {
    width: '20%'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '51px'
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
    width: '9%'
  },
  secondSeparator: {
    width: '9%'
  },
  thirdElement: {
    flexGrow: 1,
    width: '11%',
    minWidth: 140,
  },
  regularButton: {
    width: '60%',
  },
  separatorRegButton: {
    width: '20%'
  }
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
          <div className={classes.questionPageSeparator} />
          <div className={classes.title}>
              <SimpleTextField label="Title" />
              <div className={classes.grow}></div>
              <CustomSelect label="Difficulty" />
              <div className={classes.grow2}></div>
              <CustomSelect label="Type" />
              {/*<CustomSelect label="Type" />*/}
          </div>
          <div className={classes.questionPageSeparator} />
      </div>
      <div className={classes.container}>
        <Paper square className={classes.tabs}>

          <Tabs
            value={value}
            onChange={handleChange}
            orientation="vertical"
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
          >
            <Tab classes={{ root: classes.tab, selected: classes.selected }} label="DESCRIPTION" {...a11yProps(0)}  />
            <Tab classes={{ root: classes.tab, selected: classes.selected }} label="SOLUTION" {...a11yProps(1)} />
            <Tab classes={{ root: classes.tab, selected: classes.selected }} label="TEST CASES" {...a11yProps(2)} />

          </Tabs>
        </Paper>
        <div className={classes.separator}></div>
        <TestInputList />
        <div className={classes.separator} />
        <div className={classes.thirdElement} />
      </div>
      
    </div>
  );
}



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
