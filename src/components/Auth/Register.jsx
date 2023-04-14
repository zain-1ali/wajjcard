
// 411694513670-af9r88j6qk1jil66oa56a0gn4pcu58gb.apps.googleusercontent.com
// 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
import React, { useEffect, useState } from 'react'
import './signup.css'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useLocation } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
function Register({ location }) {
  const baseurl = "https://wajjcard.app/apis"
  let navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [error, seterror] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [alertData, setalertData] = useState("");
  const [showMessage, setshowMessage] = useState(false)
  let { state } = useLocation();
  console.log(state)
  let tagid = state;
  if (!state) {
    tagid = 'empty'
  }
  const [inputs, setinputs] = useState({
    name: -(Date.now()),
    email: null,
    password: null,
    tag: tagid
  });
  const changePassword = (e) => {
    if (e.target.value) {
      // const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if ((!/\d/.test(e.target.value)) || (!/[a-zA-Z]/.test(e.target.value)) || e.target.value.length < 7) {
        //setalertData("Password should contain special characters , numbers and letters .! ")  
        //setOpen(true)
        seterror(true);
      } else {
        seterror(false)
      }
    }
    setinputs((prev) => {
      return {
        ...prev,
        password: e.target.value
      }
    })
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if ((!/\d/.test(inputs.password)) || (!/[a-zA-Z]/.test(inputs.password)) || inputs.password.length < 7) {
      // setalertData("Password should contain special characters , numbers and letters .! ")  
      // setOpen(true)
      setshowMessage(true)
      seterror(true)
    } else {
      setinputs((prev) => {
        return {
          ...prev,
          name: -(Date.now()),
        }
      })
      const res = await axios.post(`${baseurl}/api/signup`, inputs)
        .then(response => {
          localStorage.setItem("token", response.data.token)
          navigate('/Edit')
        })
        .catch(error => {
          setalertData("Email Already Exists !")
          setOpen(true)
          console.log(error)
        })
      console.log(res);
    }
  }
  useEffect(() => {
    location(false)
  }, [])



  return (
    <div className='container'>
      <div className='profile--container'>


        {/* //----------------alert---------------------------- */}

        <Collapse in={open} style={{ position: 'fixed' }}>
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
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mt: 6 }}
          >
            {alertData}

          </Alert>
        </Collapse>



        <div className='logo--container'>
          <img src="social/new icons/Layer 6.png" />
        </div>
        <div className='header'>
          {/* <h3>Let's get connected!</h3> */}
          <h3 style={{ "textAlign": "center" }}>Create your account to join the network!</h3>
          {/* <h3>Welcome back</h3>
              <h3>Sign in to your account</h3> */}

        </div>
        <form className='form' onSubmit={handleFormSubmit}>
          <div className='inputs--container'>
            {/* <TextField 
            id="outlined-basic" 
            sx={{ mt:5,marginBottom: 3 }} 
            fullWidth={true} 
            type="text"
            name='name' 
            value={inputs.name} 
            onChange={(e)=>setinputs((prev)=>{
                return{
                    ...prev,
                    name:e.target.value
                }
            })} 
            label="User name" 
            variant="outlined" />     */}
            <TextField
              id="outlined-basic"

              sx={{ marginBottom: 3, mt: 5 }}
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
              label="Email"
              variant="outlined" />
            {/* <TextField 
            id="outlined-basic" 
            sx={{ marginBottom: 3 }} 
            fullWidth={true} 
            type="password" 
            name='password'
            value={inputs.password} 
            onChange={(e)=>setinputs((prev)=>{
                return {
                    ...prev,
                    password:e.target.value
                }
            })}
            label="Password" 
            variant="outlined" /> */}


            <FormControl fullWidth variant="outlined" error={error}  >
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                //id="outlined-error-helper-text"
                sx={{ marginBottom: 3 }}
                fullWidth={true}

                type={showPassword ? "text" : "password"}
                name='password'
                value={inputs.password}
                onChange={(e) => changePassword(e)}

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
              />
            </FormControl>
            {/* {showMessage?  */}
            <p style={showMessage ? { "width": "100%", "fontSize": "12px", "color": "red", "marginBottom": "10px", "marginLeft": "5px" } : { "width": "100%", "fontSize": "12px", "color": "#010243", "marginBottom": "10px", "marginLeft": "5px" }}>Password must be a minimum of 7 characters long and must contain at least one letter and a number</p>
            {/* : 
             null
             } */}

          </div>
          <div className='button--container'>
            <Button
              style={{ maxHeight: '40px', minHeight: '40px', backgroundColor: '#010243' }}
              // sx={{ marginBottom: 5 }} 
              fullWidth={true}
              variant="contained"
              color="info"
              type='submit'>Sign Up</Button>
          </div>
          <div className='register-to-loginLink'>
            Already have an account? <a href="/" style={{ color: '#010243' }}> &nbsp;Login</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register