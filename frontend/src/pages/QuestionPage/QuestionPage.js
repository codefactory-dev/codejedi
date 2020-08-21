import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar.js'
import SimpleTabs from '../../components/tabpanel/SimpleTabs.js'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import './QuestionPage.scss';

export default function QuestionPage() { 
    const classes = useStyles();

    return (
        <div id="question-page">
            <Navbar />
            <Container maxWidth="sm">
                <SimpleTabs />
                <Box>
                    <div className={classes.grow} />
                    <Button className={classes.button} variant="contained" color="primary">
                        Primary
                    </Button>
                </Box>
            </Container>
            
        </div> 
    );

}

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    button: {
      marginTop: '20px',
      float: 'right'
    }
}));