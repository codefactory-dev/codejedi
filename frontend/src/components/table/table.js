import React from 'react'
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';

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
          <MaterialTable
            title="Action Overriding Preview"
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Surname', field: 'surname' },
              { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
              {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
              },
            ]}
            data={[
              { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
              { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
            ]}
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              }
            ]}
            components={{
              Action: props => (
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
              ),
            }}
          />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.primary.paper,
      maxWidth: "100%"
    },
}));
  