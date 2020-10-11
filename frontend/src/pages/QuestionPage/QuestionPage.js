import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js'
import SimpleTabs from '../../components/Tabpanel/SimpleTabs.js'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Swal from 'sweetalert2'

export default function QuestionPage() { 
    const classes = useStyles();
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const [answer,setAnswer] = useState("");

    function triggerSubmitAll(){
        setShouldSubmit(true);
    }
    function triggerSave(){
        console.log("triggered save");
    }
    useEffect(()=>{
        if(answer.length > 0)
        {
            Swal.fire(answer);
        }
        setAnswer("");
    },[answer])

    return (
        <div className={classes.questionPage}>
            <Navbar />
            <Container maxWidth="sm">
                <SimpleTabs 
                    shouldSubmit={shouldSubmit} 
                    setShouldSubmit={setShouldSubmit}
                    answer={answer}
                    setAnswer={setAnswer}
                    />
                <Box>
                    <div className={classes.grow} />
                    <Button 
                        className={classes.submitBtn} 
                        variant="contained" 
                        color="primary"
                        onClick={triggerSubmitAll}
                    >
                        Submit Question
                    </Button>
                    <Button 
                        className={classes.saveBtn} 
                        variant="contained" 
                        color="primary"
                        onClick={triggerSave}
                    >
                        Save
                    </Button>
                </Box>
            </Container>
            
        </div> 
    );

}

const useStyles = makeStyles((theme) => ({
    questionPage: {
        height:'900px',
        backgroundColor:'#1B1C1D',
        color:'white'
    },    
    answer: {
        color:'green',
    },
    grow: {
      flexGrow: 1,
    },
    submitBtn: {
      marginTop: '20px',
      float: 'right',
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
    },
    saveBtn: {
        marginTop: '20px',
        marginRight: '20px',
        float: 'right',
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
    }

}));