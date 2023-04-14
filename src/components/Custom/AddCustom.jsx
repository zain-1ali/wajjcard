import React, { useRef } from 'react'
import './custom.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import axios from 'axios';

function AddCustom({ custom, modalOpen, deleteCustom, updateCustom }) {
  const baseurl = "https://wajjcard.app/apis"
  //---------------------state for the input value
  const [inputUrl, setinputUrl] = useState(custom.linkUrl);
  const [inputName, setinputName] = useState(custom.linkName);
  const [profileImagePath, setprofileImagePath] = useState(custom.linkImage || "social/custom.png")
  const uploadProfileImage = async () => {
    var formData = new FormData();
    var token = localStorage.getItem("token");
    var config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };
    formData.append("profileImage", profileImage.current.files[0])
    const res = await axios.post(`${baseurl}/api/User/UploadProfile`, formData, config)
    const data = await res.data
    console.log(data)

    setprofileImagePath(data.imagePath)
  }
  let profileImage = useRef();
  return (
    <div className='addCustom-container'>
      <Slide in={true} direction="up" timeout={{ appear: 500, enter: 500, exit: 500 }} >
        <div className='addCustom-card--container'>
          <div className='addCustom-header'>
            <input
              onChange={(e) => setinputName(e.target.value)}
              className='addCustom-linkName-field'
              placeholder='Link Name goes here'
              value={inputName} />
            <div className='addCustom-close--icon'><KeyboardArrowDownIcon onClick={() => modalOpen()} /></div>
          </div>
          <div className='image-icon-container' component='label'>

            <img src={profileImagePath} />
            <div className='icon-conatiner'>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" ref={profileImage} onChange={uploadProfileImage} type="file" />
                <AddCircleIcon color='primary' />
              </IconButton>
            </div>
          </div>

          <div className='addCustom-input--container'>
            {custom.linkUrl === null ?
              <TextField sx={{ marginBottom: 3 }} fullWidth={true} id="outlined-basic" label={custom.linkName} value={inputUrl} onChange={(e) => setinputUrl(e.target.value)} variant="outlined" />
              :
              <TextField sx={{ marginBottom: 3 }} fullWidth={true} id="outlined-basic" label={custom.linkName} value={inputUrl} onChange={(e) => setinputUrl(e.target.value)} variant="outlined" />
            }
            <div className='addCustom-save--open'>
              <a target="_blank" href={inputUrl?.includes("http") ? inputUrl : "http://" + inputUrl} style={{ textDecoration: 'none', width: '131px' }}><Button variant="outlined" fullWidth={true} sx={{ marginBottom: 3 }} color="info" >Open</Button></a>
              <div><Button onClick={() => deleteCustom(custom.id)} variant="outlined" fullWidth={true} sx={{ marginBottom: 3 }} color="error" >Delete</Button></div>
            </div>
            <Button onClick={() => updateCustom(custom.id, inputUrl, inputName, profileImagePath)} fullWidth={true} sx={{ marginBottom: 5 }} variant="contained" color="info" style={{ backgroundColor: '#010243' }}>SAVE</Button>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default AddCustom