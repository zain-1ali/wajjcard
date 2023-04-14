import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './social.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import AddSocial from './AddSocial';
import Zoom from '@mui/material/Zoom';
function Social({ location, setnavcolor }) {
  const baseurl = "https://wajjcard.app/apis"
  const [screenChange, setscreenChange] = useState(true);
  const [zoomInAnimation, setzoomInAnimation] = useState(true);
  let navigate = useNavigate()
  const [social, setsocial] = useState([]);
  const [usersocial, setusersocial] = useState([]);
  const [showModal, setshowModal] = useState(false)
  const [modalData, setmodalData] = useState({})
  const [prevValue, setprevValue] = useState(null)
  const [loaderShow, setloaderShow] = useState(true);
  //----------------getting all socials
  const getAllSocials = async () => {




    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get(`${baseurl}/api/links/getAllsocials`, config)
    const data = await res.data
    console.log(res)
    setsocial(data.links);
  }

  //----------------getting all user socials
  const getUserAllSocials = async () => {
    console.log('inside get user socials')
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get(`${baseurl}/api/links/getUserAllSocials`, config)
    const data = await res.data
    console.log('usersocial : ', res.data.userSocials)
    setusersocial(data.userSocials);
  }

  //---------------get link url of clicked social
  const getLinkUrl = async (id) => {
    for (let index = 0; index < usersocial.length; index++) {
      if (usersocial[index].link_id == id) {
        setprevValue(usersocial[index].linkUrl)
        break
      }
      setprevValue(null)
    }
  }

  //-------------------------------------show modal with data
  const sendDataToModal = (s) => {
    getLinkUrl(s.id);
    setshowModal(true)
    setmodalData(s)
  }

  //------------------------------setting modal close
  const modalOpen = () => {
    setshowModal(false)
  }


  //-----------------------deleting social from front side

  const deleteSocial = (id) => {
    const newSocials = usersocial.filter((e) => e.link_id !== id)
    setusersocial(newSocials);
    setshowModal(false)
    deleteUserSocial(id);
  }

  //-----------------------deleting social from backend 

  const deleteUserSocial = async (id) => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const attrs = {
      link_id: id,
    }
    const res = await axios.post(`${baseurl}/api/social/deleteSocial`, attrs, config)
    const data = await res.data
    console.log('Link deleted', data);
    window.location.reload(true)
  }


  //------------------------Update user social from front end
  const updateSocial = (id, value) => {

    //-----------deleting icon if it is empty
    if (value === null) {
      deleteSocial(id)
    } else {
      const newSocials = usersocial.map((s) => {
        return s.id === id ? {
          ...s,
          linkUrl: value
        }
          : {
            ...s
          }
      })
      setusersocial(newSocials);
      setshowModal(false)
      updateUserSocial(id, value)
    }
  }

  //---------------------Update user social on backend
  const updateUserSocial = async (id, value) => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const attrs = {
      link_id: id,
      linkUrl: value
    }
    setusersocial((prev) => {
      return [
        ...prev,
        {
          link_id: id,
          linkUrl: value,
        }
      ]
    })
    const res = await axios.post(`${baseurl}/api/social/updateSocial`, attrs, config)
    const data = await res.data
    console.log('Link updated', data);
    getUserAllSocials();
  }

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate('/')
    }
    location(true)
    const timeoutforzoom = setTimeout(() => {
      setzoomInAnimation(false)
    }, 2500)
    const timeout = setTimeout(() => {
      setloaderShow(false)

      setscreenChange(false)
    }, 3000)
    getAllSocials()
    getUserAllSocials()
    return () => {
      clearTimeout(timeout)
      clearTimeout(timeoutforzoom)
    }
  }, [])


  useEffect(() => {
    const getData = async () => {
      var token = localStorage.getItem("token");
      var config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      var res = await axios.get(`${baseurl}/api/User/Info`, config);
      // setUserInformation(res.data.user);
      setnavcolor(res.data.user.colorCode)

    };
    getData()
  }, [])


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
        <>
          <div className='main--container'>
            <div className='profile--container'>
              {loaderShow ? (<div className="edit-loader">
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                </Box>
              </div>)
                :
                null}
              <h2>Add social links</h2>
              <div className='icons--container'>
                {social.map((s) => {
                  return (
                    <div onClick={() => sendDataToModal(s)} className='single--icon--container'>
                      <div className='image--icon'>
                        <img src={`https://wajjcard.app/social/${s.linkName}.png`} />
                        <div className='tick--icon'>
                          {usersocial?.map((u) => {
                            if (u.link_id == s.id) {
                              return (
                                <CheckCircleIcon />
                              )
                            }
                          })}
                        </div>
                      </div>
                      <p>{s.linkName.charAt(0).toUpperCase() + s.linkName.slice(1)}</p>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>
          {showModal ?
            <>
              <div className='overlay'></div>
              <AddSocial
                social={modalData}
                prevValue={prevValue}
                modalOpen={modalOpen}
                deleteSocial={deleteSocial}
                updateSocial={updateSocial}
              />
            </>
            : null}
        </>
      }

    </>
  )
}

export default Social