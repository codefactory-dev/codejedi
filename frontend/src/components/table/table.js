import React from 'react'
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Table(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <p style={{
                    display: 'flex',
                    color:'white', 
                    backgroundColor:'#FBBD08', 
                    width:'80px', 
                    justifyContent:'center',
                    borderRadius: '12px',
                    fontFamily: 'Roboto',
                    fontSize:'14px',
                    padding: '2px 6px 2px 6px'
                    
                    }}>Medium</p>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.primary.paper,
      maxWidth: "100%"
    },
}));
  