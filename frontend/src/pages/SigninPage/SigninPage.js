import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from 'services/api';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import { useAuth } from '../../Context/auth';
import Illustration from '../../imgs/CompleteLogo.svg';
import RegularButton from '../../components/Buttons/RegularButton';

const useStyles = makeStyles((theme) => ({
	centered: {
		display: 'flex',
		justifyContent: 'center',
	},
	white: {
		color: theme.palette.common.white,
	},
	green: {
		color: theme.palette.common.codejediGreen,
	},
	checkbox: {
		...theme.checkbox,
	},
	formControlLabel: {
		...theme.formControlLabel,
	},
	textField: {
		...theme.inputTextField,
	},
	adornedFormTextfield: {
		...theme.adornedFormTextfield,
	},
	margin: {
		// margin: theme.spacing(1),
	},
	container: {
		height: '100vh',
	},
	image: {
		backgroundImage: `url(${Illustration})`,
		backgroundRepeat: 'no-repeat',
		backgroundColor: '#1B1C1D',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	initialPage: {
		display: 'flex',
		backgroundColor: '#1B1C1D',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '0px 21px 0px 21px',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#1B1C1D',
		color: 'white',
		margin: theme.spacing(8, 4),
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	codejediLogo: {
		backgroundColor: '#1B1C1D',
		color: 'white',
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
		color: theme.palette.common.greyLight,
	},
	green: {
		cursor: 'pointer',
		color: '#00B5AD',
	},
}));

function SigninPage(props) {
	const history = useHistory();
	const classes = useStyles();
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isError, setIsError] = useState(false);
	const [values, setValues] = React.useState({
		password: '',
		showPassword: false,
	});
	const { setAuthTokens } = useAuth();
	const referer = (props.location.state && props.location.state.referer) || '/';

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleLogin = (e) => {
		e.preventDefault();
		setIsError(false);
		async function login() {
			console.log('handling login');
			try {
				const login = document.querySelector('#mylogin').value;
				const password = document.querySelector('#field1').value;
				const result = await api({
					method: 'post',
					url: '/auth/signin',
					data: {
						email: login,
						password,
					},
				});
				console.log(
					`this is the result status: ${JSON.stringify(result.status)}`
				);
				if (result.status === 200) {
					setAuthTokens(result.data);
					setLoggedIn(true);
				} else {
					setIsError(true);
					console.log('Error logging in.');
				}
			} catch (error) {
				console.log(`Error logging in. ${error}`);
				setIsError(true);
			}
		}
		login();
	};
	const navigateToSignup = () => {
		history.push('/signup');
	};

	if (isLoggedIn) {
		return <Redirect to={referer} />;
	}

	return (
		<Grid container className={classes.container}>
			<CssBaseline />
			<Grid item xs={false} sm={3} md={7} className={classes.image} />
			<Grid
				container
				item
				xs={12}
				sm={9}
				md={5}
				component={Paper}
				elevation={6}
				className={classes.initialPage}
				square
			>
				<Grid item>
					<div className={classes.paper}>
						<Typography variant="caption">SIGN IN</Typography>
						<Typography variant="h4" style={{ marginTop: '30px' }}>
							Welcome back ! Please login to your account.
						</Typography>

						<form className={classes.form} noValidate autoComplete="off">
							<TextField
								id="mylogin"
								classes={{ root: classes.textField }}
								label="Username"
								fullWidth
							/>
							<FormControl
								className={clsx(classes.margin, classes.adornedFormTextfield)}
								autoComplete={false}
								fullWidth
							>
								<InputLabel htmlFor="field1">Password</InputLabel>
								<Input
									id="field1"
									label="Password"
									fullWidth
									type={values.showPassword ? 'text' : 'password'}
									value={values.password}
									autoComplete="new-password"
									onChange={handleChange('password')}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{values.showPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									}
								/>
							</FormControl>
							<FormControlLabel
								classes={{ label: classes.formControlLabel }}
								control={
									<Checkbox
										classes={{ root: classes.checkbox }}
										value="remember"
										color="primary"
									/>
								}
								label="Remember me"
							/>

							<Container className={classes.centered}>
								<RegularButton
									className={classes.submit}
									label="Login"
									onClick={(e) => handleLogin(e)}
								/>
							</Container>

							<Typography variant="h4">
								<Grid container className={classes.extraInfo}>
									<div className={classes.white} style={{ marginTop: '30px' }}>
										Forgot your password?{' '}
										<span className={classes.green}>Reset</span>
									</div>
									<div className={classes.white} style={{ marginTop: '10px' }}>
										Don't have an account?{' '}
										<span className={classes.green} onClick={navigateToSignup}>
											Sign Up
										</span>
									</div>
								</Grid>
							</Typography>
							{isError && (
								<div>The username or password provided were incorrect!</div>
							)}
						</form>
					</div>
				</Grid>
				<Grid item>
					<Box>
						<Typography variant="h5" className={classes.privacyPolicy}>
							Term of use. Privacy policy
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default SigninPage;
