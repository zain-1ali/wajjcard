import React, { useState } from 'react'
import { ImCross } from 'react-icons/im'
import './bussinessInfo.css'
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button';

function EditBussinessInfo({ property, closeModal, propertyValue, bussinessInfoUpdate }) {
  const [prevValue, setprevValue] = useState(propertyValue);
  const [fade, setfade] = useState(true);
  const saveInfoController = (prevValue) => {
    bussinessInfoUpdate(prevValue)
    closeModal()
  }
  return (
    <Slide in={true} direction="up" timeout={{ appear: 500, enter: 500, exit: 500 }} >
      <div className='bs-edit--data-box'>
        <div className='bs-cross--icon--form'><ImCross onClick={closeModal} /></div>
        <h3>{property.toUpperCase()}</h3>
        <div className='bs-input--row'>
          <textarea type="text" rows={6} value={prevValue} onChange={(e) => setprevValue(e.target.value)} >{propertyValue}</textarea>
        </div>
        <div className='bs-button--container'>
          <Button variant='contained' onClick={() => saveInfoController(prevValue)} style={{ backgroundColor: '#010243' }} >Submit changes</Button>
        </div>
      </div>
    </Slide>
  )
}

export default EditBussinessInfo