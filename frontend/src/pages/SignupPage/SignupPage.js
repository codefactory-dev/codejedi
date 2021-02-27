import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Illustration from '../../imgs/CompleteLogo.svg'
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { 
    TextField,
    Container,
    Paper,
    FormControlLabel,
    Box,
    Checkbox,
    Button,
    Typography,
    CssBaseline,
    Grid,
    makeStyles
} from '@material-ui/core';

import RegularButton from '../../components/Buttons/RegularButton';


const useStyles = makeStyles((theme) => ({
    centered: {
        display: 'flex',
        justifyContent: 'center'
    },
    white: {
        color: theme.palette.common.white
    },
    green: {
        color: theme.palette.common.codejediGreen
    },
    checkbox: {
        ... theme.checkbox
    },
    formControlLabel: {
        ... theme.formControlLabel
    },
    textField: {
        ... theme.inputTextField
    },
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
        justifyContent: 'center',
        padding: '0px 21px 0px 21px'
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
        '& > *': {
            margin: theme.spacing(1),
            //width: '15ch',
        },
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
        alignSelf: 'center',
        color: theme.palette.common.greyLight
    }
}));


function SignupPage(props) {
    const classes = useStyles();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const { setAuthTokens } = useAuth();
    const referer = (props.location.state && props.location.state.referer) || '/';
 
    function handleSignup(e){
        e.preventDefault();
        setIsError(false);
        async function login() {
            console.log("handling signup")
            try{
                const username = document.querySelector('#mylogin').value;
                const password = document.querySelector('#mypassword').value;
                const firstname = document.querySelector('#firstname').value;
                const lastname = document.querySelector('#lastname').value;
                const email = document.querySelector('#myemail').value;
                const validated = false;
                const result = await axios({
                    method: 'post',
                    url: '/users',
                    data: {
                        username,
                        password,
                        firstname,
                        lastname,
                        email,
                        validated
                    }
                });  
                console.log("this is the result status: "+JSON.stringify(result.status));
                if (result.status === 200){
                    setAuthTokens(result.data);
                    setLoggedIn(true);
                }
                else {
                    setIsError(true);
                    console.log("Error logging in.");
                }
            } catch (error) {
                console.log("Error logging in. "+error)
                setIsError(true);
            }
        }
        login();        
    }

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <Grid container className={classes.container}>
            <CssBaseline />
            <Grid item xs={false} sm={3} md={7} className={classes.image}/>
            <Grid container item xs={12} sm={9} md={5} component={Paper} elevation={6} className={classes.initialPage} square>
                <Grid item>
                    <div className={classes.paper}>
                        <Typography variant="caption">
                                SIGN UP
                        </Typography>
                        <Typography variant="h4" style={{marginTop: '30px'}}>
                            Please complete to create your account.
                        </Typography>

                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField 
                                id="firstname"
                                classes={{ root: classes.textField }}
                                label="First name"
                            />
                            <TextField 
                                id="lastname"
                                classes={{ root: classes.textField }}
                                label="Last name"
                            />
                            <TextField 
                                id="mylogin"
                                classes={{ root: classes.textField }}
                                label="Username"
                                fullWidth
                            />
                            <TextField 
                                id="myemail"
                                classes={{ root: classes.textField }}
                                label="Email"
                                fullWidth
                            />
                            <TextField 
                                id="mypassword"
                                classes={{ root: classes.textField }}
                                label="Password" 
                                fullWidth
                                type="password"
                                autoComplete="current-password"
                            />
                            <TextField 
                                id="confirmpassword"
                                classes={{ root: classes.textField }}
                                label="Confirm Password" 
                                fullWidth
                                type="password"
                                autoComplete="confirm-password"
                            />
                            <FormControlLabel
                                classes={{label:classes.formControlLabel}} 
                                control={<Checkbox 
                                            classes={{root:classes.checkbox}} 
                                            value="remember" 
                                            color="primary"/>}
                                label="I agree with terms and conditions"
                            />
                            
                            <Container className={classes.centered}>
                                <RegularButton className={classes.submit}
                                               label={"Sign up"}
                                               onClick={(e)=>handleSignup(e)}

                                />
                            </Container>
                            
                            <Typography variant="h4">
                                <Grid container className={classes.extraInfo}>
                                    <div className={classes.white} style={{marginTop: '10px'}}>Already have an account? <span className={classes.green}>Sign In</span></div>
                                </Grid>
                            </Typography>
                            { isError && <div>The username or password provided were incorrect!</div> }
                            
                        </form>
                    </div>
                </Grid> 
                <Grid item>
                    <Box>
                        <Typography variant="h5" className={classes.privacyPolicy}>Term of use. Privacy policy</Typography>
                    </Box>  
                </Grid>
            </Grid>
             
        </Grid>
    )

}

export default SignupPage;