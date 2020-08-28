import React, { useState } from 'react'
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';

export default function Table(){
    const classes = useStyles();
    const [selectedRow, setSelectedRow] = useState(null);
    const hardStyle = {
      display: 'flex',
      color:'white', 
      backgroundColor:'#DB2828', 
      width:'80px', 
      justifyContent:'center',
      borderRadius: '12px',
      fontFamily: 'Roboto',
      fontSize:'14px',
      padding: '2px 6px 2px 6px'
    
      
    };
    const mediumStyle = {
      display: 'flex',
      color:'white', 
      backgroundColor:'#FBBD08', 
      width:'80px', 
      justifyContent:'center',
      borderRadius: '12px',
      fontFamily: 'Roboto',
      fontSize:'14px',
      padding: '2px 6px 2px 6px'
      
    };
    const easyStyle = {
      display: 'flex',
      color:'white', 
      backgroundColor:'#21BA45', 
      width:'80px', 
      justifyContent:'center',
      borderRadius: '12px',
      fontFamily: 'Roboto',
      fontSize:'14px',
      padding: '2px 6px 2px 6px'
      
    };
    return (
        <div className={classes.root}>
          <MaterialTable
            title="Action Overriding Preview"
            columns={[
              { title: 'Title', field: 'title' },
              { title: 'Creator', field: 'creator' },
              { title: 'Creator Join Date', field: 'creatorJoinDate', type: 'numeric' },
              { title: 'Difficulty', field: 'difficulty', render: rowData => {
                switch(rowData.difficulty){
                  case "Easy":
                    return <p style={easyStyle}>{rowData.difficulty}</p>;
                  case "Medium":
                    return <p style={mediumStyle}>{rowData.difficulty}</p>;
                  case "Hard":
                    return <p style={hardStyle}>{rowData.difficulty}</p>;
                }
              } }
            ]}
            data={[
              { title: 'Mehmet', creator: 'Baran', creatorJoinDate: 1987, difficulty: 'Medium' },
              { title: 'Zerya Betül', creator: 'Baran', creatorJoinDate: 2017, difficulty: 'Easy' },
              { title: 'Maria do Carmo', creator: 'Baran', creatorJoinDate: 2017, difficulty: 'Hard' },
            ]}
            onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            options={{
              rowStyle: rowData => ({
                backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
              })
            }}
            actions={[
              {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
              }
            ]}
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
  