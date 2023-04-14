import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import "./editform.css";
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide'
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { blue, pink, orange } from '@mui/material/colors';
function EditForm({ property, closeModal, propertyValue, saveInfo, color }) {


  const [prevValue, setprevValue] = useState(propertyValue);
  console.log(propertyValue)
  const [fade, setfade] = useState(true);
  const saveInfoController = (property, prevValue) => {
    if (property === "company") {
      saveInfo("companyName", prevValue)
    } else {
      saveInfo(property, prevValue)
    }

    closeModal()
  }
  console.log(prevValue)
  return (
    <Slide in={true} direction="up" timeout={{ appear: 500, enter: 500, exit: 500 }} >
      <div className='ef-edit--data-box'>
        <div className='ef-cross--icon--form'><ImCross onClick={closeModal} /></div>
        <h3>{property.toUpperCase()}</h3>
        <div className='ef-input--row'>
          <TextField sx={{ marginBottom: 3, mt: 3 }} fullWidth={true} id="outlined-basic" label={property.toUpperCase()} value={prevValue} onChange={(e) => setprevValue(e.target.value)} variant="outlined" />
          {/* <input type="text" value={}   required /> */}
        </div>
        <div className='ef-button--container'>
          <Button variant='contained' onClick={() => saveInfoController(property, prevValue)} style={{ backgroundColor: '#010243' }}>Submit changes</Button>
        </div>
      </div>
    </Slide>
  )
}

export default EditForm