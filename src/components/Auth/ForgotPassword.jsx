import './ForgotPassword.css'


import React, { useEffect, useState } from 'react'
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
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { BrowserNotSupported } from '@mui/icons-material';
function ForgotPassword({location}) {
  
  const baseurl="https://wajjcard.app/apis"
  const [loading,setloading]=useState(false)
  const [open,setOpen]=useState(false);
  const [type,settype]=useState('error')
  const [alertmessage,setalertmessage]=useState("");
  let navigate=useNavigate() 
  const [inputs,setinputs]=useState({
    email:null,
  });
  const handleFormSubmit=async(e)=>{
    e.preventDefault();
    setloading(true)
    const res= await axios.post(`${baseurl}/api/sendverificationcode`,inputs)
    .then(response=>{
        if(response.status==200){
          navigate('/UpdatePassword')  
          console.log(response)
        }
        setloading(false)
        console.log(response)
    })
    .catch(error=>{
        console.log(error)
        settype('error')
        setalertmessage("Email not found in our system")
        setOpen(true)
        setloading(false)
    })
    
  }
  useEffect(()=>{
    const displayTimeout=setTimeout(() => {
      setOpen(false)
    }, 2500);
    // clearTimeout(displayTimeout)
  },[open])

  useEffect(()=>{
     location(false)
  },[])
  return (
    <div className='container'>
      {/* -----------------error------------------------ */}


      
        <div className='profile--container'>


        <Collapse  style={{maxWidth:'80%'}}  in={open}>
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
          sx={{ mb: 2,mt:5 }}
        >
          {alertmessage} 
        </Alert>
      </Collapse>



        {loading?
        <div className='forgotLoader'>
<CircularProgress/>
        </div>
        
        :


        <>


        {/* -----------------error------------------------ */}


        {/* <Collapse  in={open}>
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
          sx={{ mb: 2,mt:5 }}
        >
          Invalid Credentials try again !
        </Alert>
      </Collapse> */}

      <div className='logo--container'>
      <img src="social/new icons/Layer 6.png"/>
      </div>
      <div className='header'>
          <h3>Forgot Password</h3>
          <h3>Enter email to get code</h3>
      </div>
      <form className='form' onSubmit={handleFormSubmit}>
      <div className='inputs--container'>
      <TextField 
      id="outlined-basic" 
      sx={{ mt:5,marginBottom: 3 }} 
      fullWidth={true} 
      type="email"
      name='email' 
      value={inputs.email} 
      onChange={(e)=>setinputs((prev)=>{
          return{
              ...prev,
              email:e.target.value
          }
      })} 
      label="Email" 
      variant="outlined"
      required
      />




      </div>
      
      
      <div className='login-button--container'>

      
      <Button   
      fullWidth={true}
      style={{maxHeight: '40px', minHeight: '40px' ,backgroundColor:'#010243'}}
      variant="contained" 
      // color="info" 
      type='submit'>Get Code</Button>

      
      </div>
      </form>


        </>
          


        }

            
        </div>
    </div>
  )
}

export default ForgotPassword




