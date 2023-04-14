import React from 'react'
import './Notfound.css'
import {AiOutlineUser} from 'react-icons/ai'
import {AiOutlineLock} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png';

const Notfound = () => {
    let navigate=useNavigate();
  return (
    <div className='myconatainer'>
      <div className="myinnercontainer">
      <AiOutlineUser className='usericon'/>
      <AiOutlineLock className='lockicon'/>
      <div className='p1'>This profile is not activatied in our system</div>
      <button onClick={()=>{navigate('/')}} className='mybutton'>Go Back</button>
      </div>
      <div className="last-container">
        <img src={logo} alt="Wajj"  className='myimg'/>
        <p className='p2'>Powerd by WAJJ</p>
        <p className='p3'>Get yours now at <a href="http://wajjcard.app/" className='link'>wajjcard.app</a></p>
      </div>
    </div>
  )
}

export default Notfound












































































// import React from 'react'
// // import './Notfound.css'
// import './Notfound.css';
// import { useNavigate } from 'react-router-dom';
// // import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// import {FaUserSlash} from 'react-icons/fa'

// const Notfound = () => {
//   let navigate=useNavigate();
//   return (
//     <div className='mycontainer'>
//    <div className='myinner-container'>  
//      <FaUserSlash className='myicon'/>
//       <h2>User not Found</h2>
//       <button onClick={()=>{navigate(-2)}}>Go Back</button>
//       </div>
      
//     </div>
//   )
// }

// export default Notfound
