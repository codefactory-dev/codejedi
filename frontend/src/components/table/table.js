import React, { useState } from 'react'
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';

export default function Table(){
    const classes = useStyles();
    const [selectedRow, setSelectedRow] = useState(null);
    const colorsMap = {
      Easy: '#21BA45',
      Medium: '#FBBD08',
      Hard: '#DB2828'
    }
    const difficultyStyle = {
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
    return (
        <div className={classes.root}>
          <MaterialTable
            title="Action Overriding Preview"
            columns={[
              { title: 'Title', field: 'title' },
              { title: 'Creator', field: 'creator' },
              { title: 'Creator Join Date', field: 'creatorJoinDate', type: 'numeric' },
              { title: 'Difficulty', field: 'difficulty', render: rowData => {
                return <p style={ {...difficultyStyle, backgroundColor: colorsMap[rowData.difficulty]} }>{rowData.difficulty}</p>;
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
  