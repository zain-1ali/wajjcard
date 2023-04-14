import { Alert, Button, Collapse, IconButton, LinearProgress, TextField, Zoom } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { blue, pink, orange, green } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import './Activatetag.css'
import { useEffect } from 'react';
import axios from 'axios';
function ActivateTag({ buttoncolor }) {
  const baseurl = "https://wajjcard.app/apis"


  const [tagNumber, settagnumber] = useState('');
  const [zoomInAnimation, setzoomInAnimation] = useState(true);
  const [screenChange, setscreenChange] = useState(true);
  const [successMessage, setsuccessMessage] = useState("")
  const [openImageUploadAlert, setopenImageUploadAlert] = useState()

  useEffect(() => {
    const timeoutforzoom = setTimeout(() => {
      setzoomInAnimation(false)
    }, 2500)
    const timeout = setTimeout(() => {
      setscreenChange(false)
    }, 3000)
    return () => {
      clearTimeout(timeoutforzoom)
      clearTimeout(timeout)
    }

  }, []);


  //--------------------------fuctions for time picker-------
  const onsubmittag = async () => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.post(`${baseurl}/api/activateTag`, { 'tag_id': tagNumber }, config)
    const data = await res.data
    console.log(res)
    setsuccessMessage(res.data.message)
    setopenImageUploadAlert(true)
  }

  useEffect(() => {
    const displayTimeout = setTimeout(() => {
      setopenImageUploadAlert(false)
    }, 2500);
    // clearTimeout(displayTimeout)
  }, [openImageUploadAlert])

  return (
    <>
      {screenChange ?
        <Zoom in={zoomInAnimation} style={{ transitionDelay: zoomInAnimation ? '500ms' : '0ms' }}>
          <div className="screen--change">
            <img src="social/new icons/Layer 6.png" alt="" />
            <LinearProgress />
          </div>
        </Zoom>
        :
        <div className='activateTagContainer'>
          <div className='activateCardCollapse'>
            <Collapse in={openImageUploadAlert}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setopenImageUploadAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {successMessage}
              </Alert>
            </Collapse>
          </div>
          <div className='activateheader'>

            <img src="social/new icons/Layer 6.png" alt="" />
            <h3>Activate Your Bussiness</h3>
          </div>
          <div className='activateform'>
            <TextField
              id="outlined-basic"
              sx={{ mt: 5, marginBottom: 3 }}
              fullWidth={true}
              type="text"
              name='tagNumber'
              value={tagNumber}
              onChange={(e) => settagnumber((prev) => e.target.value)}
              label="TAG Number"
              variant="outlined" />
            <Button
              style={{ maxHeight: '50px', minHeight: '50px', backgroundColor: buttoncolor }}
              // sx={{ marginBottom: 5 }} 
              onClick={onsubmittag}
              fullWidth={true}
              variant="contained"
              color="info"
              type='submit'>Activate Now</Button>
          </div>
        </div>
      }
    </>

  )
}

export default ActivateTag