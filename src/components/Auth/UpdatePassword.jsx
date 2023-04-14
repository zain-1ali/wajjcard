import './ForgotPassword.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { BrowserNotSupported } from '@mui/icons-material';
function UpdatePassword({ location }) {

  const baseurl = "https://wajjcard.app/apis"
  const [open, setOpen] = useState(false);
  const [type, settype] = useState('error')
  const [alertmessage, setalertmessage] = useState("");
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  let navigate = useNavigate()
  const [showMessage, setshowMessage] = useState(false)
  const [inputs, setinputs] = useState({
    email: null,
    vcode: null,
    newpassword: null
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
        newpassword: e.target.value
      }
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if ((!/\d/.test(inputs.newpassword)) || (!/[a-zA-Z]/.test(inputs.newpassword)) || inputs.newpassword.length < 7) {
      // setalertData("Password should contain special characters , numbers and letters .! ")  
      // setOpen(true)
      setshowMessage(true)
      seterror(true)
    } else {
      const res = await axios.post(`${baseurl}/api/updateUserPassword`, inputs)
        .then(response => {
          if (response.status == 200) {
            console.log(response)
            settype('success')
            setalertmessage(response.data.message)
            setOpen(true)
          } else {
            settype('error')
            setalertmessage(response.data.message)
            setOpen(true)
            console.log(response)
          }
        })
        .catch(error => {
          settype('error')
          setalertmessage(error)
          setOpen(true)
          console.log(error)
        })
    }
  }


  useEffect(() => {
    location(false)
  }, [])
  return (
    <div className='container'>
      <div className='profile--container' style={{ marginTop: "100px" }}>

        {loading ?
          <div className='forgotLoader'>
            <CircularProgress />
          </div>

          :


          <>


            {/* -----------------error------------------------ */}




            <div className='logo--container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', width: '350px' }}>
              <Collapse style={{ maxWidth: '80%' }} in={open}>
                <Alert

                  severity={type}
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
                  sx={{ mb: 2, mt: 5 }}
                >
                  {alertmessage}
                </Alert>
              </Collapse>
              <img src="social/new icons/Layer 6.png" />
            </div>
            <div className='header'>
              {/* <h3>Update Password</h3> */}
              <h3>Enter details to reset password</h3>
            </div>
            <form className='form' onSubmit={handleFormSubmit}>
              <div className='inputs--container'>
                <TextField
                  id="outlined-basic"
                  sx={{ mt: 5, marginBottom: 1 }}
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
                  variant="outlined"
                  required
                />

                <TextField
                  id="outlined-basic"
                  sx={{ mt: 2, marginBottom: 1 }}
                  fullWidth={true}
                  type="text"
                  name='vcode'
                  value={inputs.vcode}
                  onChange={(e) => setinputs((prev) => {
                    return {
                      ...prev,
                      vcode: e.target.value
                    }
                  })}
                  label="Verification Code"
                  variant="outlined"
                  required
                />


                <FormControl fullWidth variant="outlined" error={error} sx={{ mt: 2 }} required >
                  <InputLabel required htmlFor="outlined-adornment-password">New Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    //id="outlined-error-helper-text"
                    sx={{ marginBottom: 3 }}
                    fullWidth={true}

                    type={showPassword ? "text" : "password"}
                    name='password'
                    value={inputs.newpassword}
                    onChange={(e) => changePassword(e)}

                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"

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
                    label="New Password"
                  />
                </FormControl>
                {showMessage ?
                  <p style={{ "width": "100%", "fontSize": "12px", "color": "red", "marginBottom": "10px", "marginLeft": "5px" }}>Password must be minimum 7 characters long and must have letter and a number</p>
                  :
                  null
                }




              </div>


              <div className='login-button--container'>


                <Button
                  fullWidth={true}
                  style={{ maxHeight: '40px', minHeight: '40px', backgroundColor: '#010243' }}
                  variant="contained"
                  color="info"
                  type='submit'>Update Password</Button>

                <div className='loginforgotPasswordlink' style={{ display: "flex", marginBottom: "10px", width: "80%", justifyContent: "flex-end" }}>
                  <Link to={'/'} style={{ textDecoration: 'none' }}>Go back to Login?</Link>
                </div>

              </div>
            </form>


          </>



        }


      </div>
    </div>
  )
}

export default UpdatePassword

