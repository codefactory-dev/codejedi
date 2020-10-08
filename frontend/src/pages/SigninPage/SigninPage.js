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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import SvgIcon from '@material-ui/core/SvgIcon';
import Illustration from '../../imgs/CompleteLogo.svg'
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
        display: 'flex',
        backgroundColor:'#1B1C1D',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor:'#1B1C1D',
        color:'white',
        margin: theme.spacing(8, 4),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    extraInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    privacyPolicy: {
        display: 'flex',
        alignSelf: 'center'
    }
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
            <Grid container xs={12} sm={8} md={5} component={Paper} elevation={6} className={classes.initialPage} square>
                <Grid item>
                    <div className={classes.paper}>
                        <Typography variant="DisplayHeader" component="h1">
                                SIGN IN
                        </Typography>
                        <Typography component="subtitle1">
                            Welcome back ! Please login to your account.
                        </Typography>

                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField 
                                label="Username"
                                fullWidth
                            />
                            <TextField 
                                label="Password" 
                                fullWidth
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button 
                                variant="contained" 
                                color="primary"
                                fullWidth
                                className={classes.submit}
                            >
                                Login
                            </Button>

                            <Grid container className={classes.extraInfo}>
                                <Typography variant="subtitle">Forgot your password? Reset</Typography>
                                <Typography variant="subtitle">Don't have an account? Sign Up</Typography>
                            </Grid>
                            
                        </form>
                    </div>
                </Grid> 
                <Grid item>
                    <Box className={classes.privacyPolicy}>
                        <Typography variant="subtitle">Term of use. Privacy policy</Typography>
                    </Box>  
                </Grid>
            </Grid>
             
        </Grid>
    )

}

export default SigninPage;