import 'date-fns';
import React, { useState } from 'react'
import MaterialTable from "material-table";
import CustomRow from "../CustomRow/CustomRow.js";
import { makeStyles } from '@material-ui/core/styles';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

export default function Table(){
    const classes = useStyles();
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
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
              { title: 'Creator Join Date', field: 'creatorJoinDate',render: row => <span>{ row["creatorJoinDate"] /*formatting code here*/ }</span> },
              { title: 'Solution', field: 'solution'},
              { title: 'Rating', field: 'rating'},
              { title: 'Difficulty', field: 'difficulty', render: rowData => {
                return <p style={ {...difficultyStyle, backgroundColor: colorsMap[rowData.difficulty]} }>{rowData.difficulty}</p>;
              } },
              { title: 'Last Comment', field: 'lastComment'},
              { title: 'Last Updated', field: 'lastUpdated'},
              

            ]}
            data={[
              { title: 'Two Sum', creator: 'grrbm2', creatorJoinDate: 1987, solution: 'Yes', rating:'4.54  85 votes', difficulty: 'Medium', lastComment:'At vero eos et accusamus et iusto odio digníssimos ...', lastUpdated:'2020' },
              { title: 'Numberr of Islands', creator: 'roberta.cmota', creatorJoinDate: 1987, solution: 'No', rating:'4.54  85 votes', difficulty: 'Hard', lastComment:'ducimus qui blanditiis praesentium voluptatum ...', lastUpdated:'2020' },
              { title: 'Two Sum', creator: 'grrbm2', creatorJoinDate: 1987, solution: 'Yes', rating:'4.54  85 votes', difficulty: 'Easy', lastComment:'deleniti atque corrupti quos dolores et quas moléstia ...', lastUpdated:'2020' },
              
            ]}
            options={{
              filtering: true,
              rowStyle: rowData => ({
                backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
              })
            }}
            components={{
              Row: props => {
                return <CustomRow {...props} />
              }
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
  