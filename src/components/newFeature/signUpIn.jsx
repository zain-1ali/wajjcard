import React from 'react'
import './signUpIn.css';
import logo from '../../img/logo.png';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


function SignUpIn() {
  // /LiveView/:tagnumber
  let { state } = useLocation();

  let userTag = state.tag
  console.log(userTag)
  // const params=useParams()
  // console.log("params",params.tagnumber)
  // let name=params.tagnumber;
  return (
    <div>
      <div className=' mycontainer' >
        <img src={logo} alt="logo" className=' img' />
        <div className=' inner-container'>
          <div className=' inner-container2'><h2 className=' h2'>Activate Your Bussiness Card</h2></div>
          <div className="btns">
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-around', textAlign: 'center', marginLeft: '14px' }}>
              <NavLink to="/Register" state={userTag}> <button className='btn' style={{ textDecoration: 'none', width: '120px' }}>Activate</button></NavLink>
              New to Wajj?
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-around', textAlign: 'center' }}>
              <Link to={'/'} state={userTag}> <button className='btn btn2' style={{ width: '120px' }} >Login</button></Link>
              Already a Member?
            </div>
          </div>
          {/* <NavLink to="/Register" state={userTag}> <button className='btn'>Signup</button></NavLink>
      <Link to={'/'} state={userTag}> <button className='btn btn2' >Login</button></Link> */}
          {/* state={name} */}
        </div>
      </div>
    </div>
  )
}

export default SignUpIn
