import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import './login.css'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import InputLabel from '@mui/material/InputLabel';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { BrowserNotSupported } from '@mui/icons-material';

function Login({ location }) {
  const clientId = '411694513670-af9r88j6qk1jil66oa56a0gn4pcu58gb.apps.googleusercontent.com'
  const onFailure = (err) => {
    console.log('failed:', err)
  };
  let { state } = useLocation();
  console.log(state)
  const baseurl = "https://wajjcard.app/apis"
  let navigate = useNavigate()
  const [open, setOpen] = useState(false);
  // let [tagid , settagid]=useState(state);
  let tagid = state;
  if (!state) {
    tagid = 'empty'
  }

  console.log(tagid);
  const [inputs, setinputs] = useState({
    email: null,
    password: null,
    tag: tagid
  });
  const [showPassword, setshowPassword] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${baseurl}/api/login`, inputs)

      .then(response => {
        localStorage.setItem("token", response.data.token)
        console.log(response)
        navigate('/Edit')
      })
      .catch(error => {
        console.log(error);
        setOpen(true)
      })
    console.log(res);
  }
  const handleGoogleSubmit = async (input) => {

    const res = await axios.post(`${baseurl}/api/login`, input)
      .then(response => {
        localStorage.setItem("token", response.data.token)
        console.log(response)
        localStorage.setItem("loginWith", "Google")
        navigate('/Edit')
      })
      .catch(error => {
        console.log(error)
        setinputs((prev) => {
          return {
            email: null,
            password: null
          }
        })
        setOpen(true)
      })
    console.log(res.status);
  }
  const onSuccess = (res) => {
    const input = {
      name: -(Date.now()),
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      loginWith: "google",
      tag: tagid
    }
    console.log(res.profileObj.email)
    handleGoogleSubmit(input);
    // const resp= await axios.post(`${baseurl}/api/login`,inputs)
    // .then(response=>{
    //     localStorage.setItem("token",response.data.token)
    //     navigate('/Edit')
    // })
    // .catch(error=>{
    //   console.log(error)
    //     setOpen(true)
    // })
    // // console.log(res.status);
    // // console.log('success:', res);
  };
  useEffect(() => {
    location(false)
  }, [])








  // const CssTextField = withStyles({
  //   root: {
  //     '& label.Mui-focused': {
  //       color: 'white',
  //     },
  //     '& .MuiInput-underline:after': {
  //       borderBottomColor: 'yellow',
  //     },
  //     '& .MuiOutlinedInput-root': {
  //       '& fieldset': {
  //         borderColor: 'white',
  //       },
  //       '&:hover fieldset': {
  //         borderColor: 'white',
  //       },
  //       '&.Mui-focused fieldset': {
  //         borderColor: 'yellow',
  //       },
  //     },
  //   },
  // })(TextField);







  return (
    <div className='container'>
      <div className='profile--container'>


        {/* -----------------error------------------------ */}


        <Collapse in={open} style={{ position: 'fixed', width: '350px' }}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
                style={{ width: '30px' }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mt: 6 }}

          >
            Invalid Credentials try again !
          </Alert>
        </Collapse>


        <div className='logo--container'>
          <img src="social/new icons/Layer 6.png" />
        </div>
        <div className='header'>
          <h3>Welcome back</h3>
          <h3>Sign in to your account</h3>
        </div>
        <form className='form' onSubmit={handleFormSubmit}>
          <div className='inputs--container'>
            <TextField
              id="outlined-basic"
              sx={{ mt: 5, marginBottom: 3 }}
              fullWidth={true}
              type="email"
              name='email'
              value={inputs.email}
              onChange={(e) => setinputs((prev) => {
                return {
                  ...prev,
                  email: e.target.value
                }
              })}
              label="Email *"
              variant="outlined" />



            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                sx={{ marginBottom: 2 }}
                fullWidth={true}
                style={{ borderColor: 'red' }}
                type={showPassword ? "text" : "password"}
                name='password'
                value={inputs.password}
                onChange={(e) => setinputs((prev) => {
                  return {
                    ...prev,
                    password: e.target.value
                  }
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      style={{ width: '40px' }}

                    >
                      <>
                        {showPassword ?
                          <VisibilityOff onClick={() => setshowPassword((prev) => !prev)} />
                          :

                          <Visibility onClick={() => setshowPassword((prev) => !prev)} />
                        }
                      </>
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                variant="outlined" />
            </FormControl>
          </div>
          <div className='loginforgotPasswordlink' style={{ display: "flex", marginBottom: "10px", width: "80%", justifyContent: "flex-end" }}>
            <Link to={'/ForgotPassword'} style={{ textDecoration: 'none', color: '#010243' }}>Forgot Password?</Link>
          </div>

          <div className='login-button--container'>

            <Button
              fullWidth={true}
              style={{ maxHeight: '40px', minHeight: '40px', backgroundColor: '#010243' }}
              variant="contained"
              color="info"
              type='submit'>Login</Button>
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
            <div className='login-to-registerLink'>
              Create a new account? <a href="register" style={{ color: '#010243' }}> &nbsp;Register</a>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login