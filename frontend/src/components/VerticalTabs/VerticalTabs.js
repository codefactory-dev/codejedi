import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
   
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  tabs: {
    flexGrow: 1,
    width: '11%',
  },
  textArea: {
    flexShrink: 1,
    marginRight: 'auto',
    marginLeft: 'auto',
    height: 200,
    width: '60%',
  }, 
  separator: {
    width: '9%'
  },
  thirdElement: {
    flexGrow: 1,
    width: '11%',
  }
});

export default function IconTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
          <Tab label="Question" {...a11yProps(0)}  />
          <Tab label="Solution" {...a11yProps(1)} />
          <Tab label="Test Cases" {...a11yProps(2)} />

        </Tabs>
      </Paper>
      <div className={classes.separator}></div>
      <Paper className={classes.textArea}>

        <TabPanel value={value} index={0}>
            Question Description
        </TabPanel>
        <TabPanel value={value} index={1}>
            Solution Description
        </TabPanel>
        <TabPanel value={value} index={2}>
            Testcases Description
        </TabPanel>
      </Paper>
      <div className={classes.separator}></div>
      <div className={classes.thirdElement}>

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
