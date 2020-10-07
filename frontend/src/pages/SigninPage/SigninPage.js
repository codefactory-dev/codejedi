import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Navbar from '../../components/Navbar/Navbar.js'
import CodeTable from '../../components/CodeTable/CodeTable.js'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import SvgIcon from '@material-ui/core/SvgIcon';
import Illustration from '../../imgs/illustration.svg'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh'        
    },
    image: {
        backgroundImage: `url(${Illustration})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:'#1B1C1D',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    initialPage: {
        backgroundColor:'#1B1C1D',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'#1B1C1D',
        color:'white'
    },
    codejediLogo: {
        backgroundColor:'#1B1C1D',
        color:'white',
        backgroundSize: 'cover',
    },
    sectionDesktop: {
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
    },
}));


function SigninPage() {
    const classes = useStyles();
    const [fetchedQuestions,setFetchedQuestions] = useState(false);
    useEffect(()=>{
        async function fetchQuestions() {
            if (!fetchedQuestions)
            {
                const result = await axios({
                    method: 'get',
                    url: '/questions'
                });  
                console.log("fetched questions: "+JSON.stringify(result.data));
            }
            setFetchedQuestions(false);
        }
        fetchQuestions();

    },[])
    return (
        <Grid container className={classes.container}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item item xs={12} sm={8} md={5} component={Paper} elevation={6} className={classes.initialPage} square>
                <div className={classes.paper}>
                    <Typography variant="h3">SIGN IN</Typography>
                    <Typography variant="subtitle2" gutterBottom>Welcome back ! Please login to your account.</Typography>

                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid>
                            <TextField id="standard-basic" label="Username" />
                            <TextField id="standard-basic-2" label="Password" />
                        </Grid>
                    </form>

                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <Button variant="contained" color="primary">
                        Login
                    </Button>


                    <Typography variant="subtitle">Forgot your password? Reset</Typography>
                    <Typography variant="subtitle">Don't have an account? Sign Up</Typography>
                    <Typography variant="subtitle">Term of use. Privacy policy</Typography>
                </div>
            </Grid>
        </Grid>
    )

}

export default SigninPage;