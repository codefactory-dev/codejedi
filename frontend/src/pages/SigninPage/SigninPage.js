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
import { ReactComponent as Illustration } from '../../imgs/illustration.svg'
import Hidden from '@material-ui/core/Hidden';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';

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
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid 
                className={classes.sectionDesktop}
                item
                >
                <SvgIcon 
                    component={Illustration}
                    style={{ fontSize: 500, verticalAlign: 'middle' }} 
                    viewBox="0 0 960 1080" 
                    className={classes.initialPage}
                />
            </Grid>
            <Grid 
                item
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.initialPage}
            >
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

                    <h2>Forgot your password? Reset</h2>
                    <h2>Don't have an account? Sign Up</h2>


                    <h3>Term of use. Privacy policy</h3>
            </Grid>
        </Grid>
    )

}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch'
        },
    },
    initialPage: {
        height: '900px',
        backgroundColor:'#1B1C1D',
        color:'white'
    },
    sectionDesktop: {
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
    },
}));

export default SigninPage;