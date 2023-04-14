import React, { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import VCard from "vcard-creator";
import ReadmoreLess from "../ReadmoreReadLess/readmoreLess";
import { MdEventAvailable } from 'react-icons/md'
import { CgUnavailable } from 'react-icons/cg'
import { BsFillGrid3X2GapFill, BsListUl } from 'react-icons/bs'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {
  DownOutlined,
  UpOutlined,
  PhoneOutlined,
  RightOutlined,
  LaptopOutlined,
  WechatOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import ReactCardFlip from "react-card-flip";
import Zoom from '@mui/material/Zoom';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import { QRCode } from 'react-qrcode-logo';
import { blue, green, pink } from "@mui/material/colors";
import { orange } from "@material-ui/core/colors";
function Profile({ location, setnavcolor }) {

  const baseurl = "https://wajjcard.app/apis"

  const [screenChange, setscreenChange] = useState(true);
  const [zoomInAnimation, setzoomInAnimation] = useState(true);


  const [contactOpen, setContactOpen] = useState(0);
  const [socialLinksOpen, setsocialLinksOpen] = useState(0);
  const [customLinksOpen, setcustomLinksOpen] = useState(0);
  const [bussinesshoursOpen, setbussinesshoursOpen] = useState(0);
  const [flip, setflip] = useState(0);
  const [isgridsocial, setisgridsocial] = useState(0);
  const [isgridcustom, setisgridcustom] = useState(0);
  const [loaderShow, setloaderShow] = useState(true);


  //------------------------------------time slots state------------

  const [Times, setTimes] = useState({
    MonStart: "",
    MonEnd: "",
    isMon: 0,
    TuesStart: "",
    TuesEnd: "",
    isTues: 0,
    WedStart: "",
    WedEnd: "",
    isWed: 0,
    ThursStart: "",
    ThursEnd: "",
    isThurs: 0,
    FriStart: "",
    FriEnd: "",
    isFri: 0,
    SatStart: "",
    SatEnd: "",
    isSat: 0,
    SunStart: "",
    SunEnd: "",
    isSun: 0,
  });


  //--------------------------fuctions for time picker-------
  // const onTimesSubmit=async()=>{
  //   var token = localStorage.getItem("token");
  //   var config = {
  //     headers: { Authorization: `Bearer ${token}` }
  //   };
  //   const res= await axios.post("http://127.0.0.1:8000/api/createTimeslots",Times,config)
  //   const data= await res.data
  //   console.log(data)
  // }
  // console.log(Times)
  //----------get time slots--------------------

  const getTimeSlots = async () => {
    var token = localStorage.getItem("token");
    console.log(token)
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const res = await axios.get(`${baseurl}/api/getTimeslots`, config)
    const data = await res.data
    console.log(data);

    setTimes(data.timeslots)

  }

  const convert24hourTo12HourFormat = (time) => {
    const time_part_array = time.split(":");
    let ampm = 'AM';
    if (time_part_array[0] >= 12) {
      ampm = 'PM';
    }
    if (time_part_array[0] > 12) {
      time_part_array[0] = time_part_array[0] - 12;
    }
    const formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;
    return formatted_time;
  }




  const [UserInformation, setUserInformation] = useState({});
  const getData = async () => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    var res = await axios.get(`${baseurl}/api/User/Info`, config);
    setUserInformation(res.data.user);
    setnavcolor(res.data.user.colorCode)

  };

  const downloadVcard = async () => {
    // Define a new vCard
    const myVCard = new VCard()

    // Some variables
    const lastname = UserInformation.lastName
    const firstname = UserInformation.firstName
    const additional = ''
    const prefix = ''
    const suffix = ''

    myVCard
      // Add personal data
      .addName(lastname, firstname, additional, prefix, suffix)
      // Add work data
      .addCompany(UserInformation.companyName)
      .addJobtitle(UserInformation.jobTitle)
      // .addRole('Data Protection Officer')
      .addEmail(UserInformation.email)
      .addPhoneNumber(UserInformation.phone, 'PREF;WORK')
      // .addPhoneNumber(123456789, 'WORK')
      .addAddress(null, null, 'street', 'worktown', UserInformation.location, 'workpostcode', null)
      .addURL(UserInformation.personalWebsite)



    const url = window.URL.createObjectURL(new Blob([myVCard.toString()]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.vcf'); //or any other extension
    document.body.appendChild(link);
    link.click();
  };


  //-----------------------------user customs

  const [userCustoms, setuserCustoms] = useState([]);
  const getUserCustoms = async () => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get(`${baseurl}/api/custom/getUserCustoms`, config)
    const data = await res.data
    setuserCustoms(data.userCustoms);

  }

  //------------------------color codes

  var color;

  if (UserInformation.colorCode === "#1EAFEB") {
    color = { color: blue[500] }
  }
  if (UserInformation.colorCode === "#FF69B4") {
    color = { color: pink[400] }
  }
  if (UserInformation.colorCode === "#FFA500") {
    color = { color: orange[500] }
  }
  if (UserInformation.colorCode === "#50B281") {
    color = { color: green[600] }
  }
  const baseUrls = [
    {
      "name": "snapchat",
      "baseUrl": "https://www.snapchat.com/add/"
    },
    {
      "name": "twitter",
      "baseUrl": "https://www.Twitter.com/"
    },
    {
      "name": "email",
      "baseUrl": "mailto:"
    },
    {
      "name": "phone",
      "baseUrl": "tel:"
    },
    {
      "name": "zoom",
      "baseUrl": "https://zoom.us/j/"
    },
    {
      "name": "whatsapp",
      "baseUrl": "https://wa.me/"
    },
    {
      "name": "instagram",
      "baseUrl": "https://www.Instagram.com/"
    },
    {
      "name": "messenger",
      "baseUrl": "https://www.messenger.com/"
    },
    {
      "name": "tiktok",
      "baseUrl": "https://tiktok.com/@"
    },
    {
      "name": "tumblr",
      "baseUrl": "https://www.tumblr.com/"
    },
    {
      "name": "facebook",
      "baseUrl": "https://www.facebook.com/"
    },
    {
      "name": "linkedin",
      "baseUrl": "https://www.linkedin.com/in/"
    },
    {
      "name": "youtube",
      "baseUrl": "https://www.youtube.com/"
    },
    {
      "name": "indeed",
      "baseUrl": "https://www.indeed.com/"
    },
    {
      "name": "pinterest",
      "baseUrl": "https://www.pinterest.com/"
    },
    {
      "name": "vimeo",
      "baseUrl": "https://vimeo.com/"
    },

  ]

  let openUrl = (url, name) => {
    if (url) {
      if (name === "whatsapp") {
        return `https://wa.me/${url}`
      }
      else if (name === "phone") {
        return `tel:${url}`
      }
      else if (name === "email") {
        return `mailto:${url}`
      }
      else if (name === "tiktok") {
        return `https://tiktok.com/@${url}`
      }
      else if (name === "instagram") {
        return `https://www.Instagram.com/${url}`
      }
      else if (name === "Twitter") {
        return `https://www.twitter.com/${url}`
      }
      else if (name === "snapchat") {
        return `https://www.snapchat.com/add/${url}`
      }
      else {
        return url
      }
    }

    // social.linkName === "whatsapp" ? `https://wa.me/${inputUrl}` : social.linkName === "phone" ? `tel:${inputUrl}` : social.linkName === "email" ? `mailto:${inputUrl}` : inputUrl
  }



  useEffect(() => {
    const timeoutforzoom = setTimeout(() => {
      setzoomInAnimation(false)
    }, 2500)
    const timeout = setTimeout(() => {
      setloaderShow(false)

      setscreenChange(false)
    }, 3000)
    location(true)
    getData();
    getTimeSlots()
    getUserCustoms()
    return () => {
      clearTimeout(timeout)
      clearTimeout(timeoutforzoom)
    }
  }, []);

  let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


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
        <div className="p-profile--container">
          {loaderShow ? (<div className="edit-loader">
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          </div>)
            :
            null}
          <div className="p-profile--header">
            <img src="social/new icons/Layer 6.png" alt="" />
            <a href="http://www.wajjcard.com/">Get your card</a>
          </div>
          <div className="p-profile--upper" style={{ "backgroundColor": UserInformation.colorCode, "borderTop": `3px solid ${UserInformation.colorCode}` }}   ></div>

          {/* //--------------------------Flip container----------------------------// */}
          <ReactCardFlip isFlipped={flip} flipDirection="vertical">
            <div className="p-profile--main--data">
              <div className="p-profile--picture--section">
                <img src={UserInformation.profilePicture} alt="" style={{ objectFit: 'cover' }} />
              </div>
              <div className="p-profile--details--section">
                <div className="p-profile--firstName" style={{ "color": `${UserInformation.colorCode}` }}>{UserInformation.firstName}</div>
                <div className="p-profile--lastName"  >{UserInformation.lastName}</div>
                <div className="p-profile--jobtitle">{UserInformation.jobTitle}</div>
                <div className="p-profile--companyName">
                  {UserInformation.companyName}
                </div>
                <img
                  src="social/new icons/qr.png"
                  alt=""
                  onClick={() => setflip((prev) => !prev)}
                />
              </div>
            </div>
            <div
              className="p-qr--code--container"
              onClick={() => setflip((prev) => !prev)}
            >
              {/* <img src="social/new icons/qr.png" alt="" /> */}
              <QRCode
                value={`https://wajjcard.app/${UserInformation.name}`}
                //  logoImage="social/new icons/Layer 6.png" 
                bgColor="#484848"
                eyeColor="#FFFFFF"

                fgColor="#FFFFFF"
                eyeRadius="5"
                logoWidth="50"
                qrStyle="squares"
                logoOpacity="0.8"
              />
            </div>
          </ReactCardFlip>

          <div className="p-profile--lower"
            style={{ "marginBottom": "10px", "borderTop": `12px solid ${UserInformation.colorCode}` }}
          >
            <div className="container-edge" style={{ "borderRight": `24px solid ${UserInformation.colorCode}` }} ></div>
            <a style={{ "backgroundColor": `${UserInformation.colorCode}` }} onClick={downloadVcard} href="#">
              <div style={{ "backgroundColor": `${UserInformation.colorCode}`, "borderLeft": `2px solid ${UserInformation.colorCode}`, "borderRight": "none" }} >save contact</div>
            </a>
          </div>
          <div className="p-profile--bussiness-info">
            <div className="p-bussiness--info--heading"> Bussiness Info</div>
            <div className="p-bussiness--info--description">
              <ReadmoreLess info={UserInformation.bussinessInfo} />
            </div>

          </div>

          {/* //-------------------contact info-------------------// */}
          <div className="p-contact--info--container">
            <div className="p-contact--info--heading--line">
              <div className="p-contact--info--heading">Contact Info</div>
              <div
                className="p-contact--info--opener--button"
                onClick={() => setContactOpen((prev) => !prev)}
              >
                {contactOpen ? <UpOutlined /> : <DownOutlined />}
              </div>
            </div>
            {contactOpen ? (
              <SlideDown className={"my-dropdown-slidedown"}>
                <div className="p-contact--info--details">
                  {UserInformation.phone ? <a href={`tel:${UserInformation.phone}`}>
                    {/* <img src="http://wajj.kameti.pk/social/new icons/wp.png"  /> */}
                    <PhoneIcon sx={{ color: UserInformation?.colorCode }} fontSize="medium" style={{ border: "1px solid black", borderRadius: "50%", padding: "1.2px" }} />
                    <div>{UserInformation.phone}</div>
                  </a> : null}
                  {UserInformation.personalWebsite ? <a href={UserInformation.personalWebsite.includes("http") ? UserInformation.personalWebsite : "http://" + UserInformation.personalWebsite}>
                    {/* <img src="http://wajj.kameti.pk/social/new icons/web.png"  /> */}
                    <LanguageIcon sx={{ color: UserInformation?.colorCode }} fontSize="medium" style={{ border: "1px solid black", borderRadius: "50%", padding: "1px" }} />
                    <div>{UserInformation.personalWebsite}</div>
                  </a> : null}

                  <a href={`mailto:${UserInformation.email}`} >
                    {/* <img src="http://wajj.kameti.pk/social/new icons/email.png"  /> */}
                    <EmailIcon sx={{ color: UserInformation?.colorCode }} fontSize="medium" style={{ border: "1px solid black", borderRadius: "50%", padding: "1px" }} />
                    <div>{UserInformation.email}</div>
                  </a>
                  {UserInformation.location ? <a href={`http://maps.google.com/?q=${UserInformation.location}`}>
                    {/* <img src="http://wajj.kameti.pk/social/new icons/location.png" alt="" srcset="" /> */}
                    <PlaceIcon sx={{ color: UserInformation?.colorCode }} fontSize="medium" style={{ border: "1px solid black", borderRadius: "50%", padding: "1px" }} />
                    <div>{UserInformation.location}</div>
                  </a> : null}

                </div>
              </SlideDown>
            ) : null}
          </div>

          {/* //-------------------social links-------------------// */}

          <div className="p-contact--info--container">
            <div className="p-contact--info--heading--line">
              <div className="p-contact--info--heading">Social Media
                {isgridsocial ? <BsListUl onClick={() => { setisgridsocial((prev) => !prev) }} className="p-grid--icon" /> : <BsFillGrid3X2GapFill onClick={() => { setisgridsocial((prev) => !prev) }} className="p-grid--icon" />}

              </div>
              <div
                className="p-contact--info--opener--button"
                onClick={() => setsocialLinksOpen((prev) => !prev)}
              >

                {socialLinksOpen ? <UpOutlined /> : <DownOutlined />}

              </div>
            </div>
            {socialLinksOpen ? (
              <SlideDown className={"my-dropdown-slidedown"}>

                {!isgridsocial ?

                  (
                    <div className="p-social--info--details">
                      {UserInformation.userSocials.map((s) => (
                        typeof (baseUrls.find((e) => e.name === s.linkName)) === "undefined"
                          ?
                          (<a target="_blank" href={openUrl(s.linkUrl, s.linkName)}>
                            {/* s.linkUrl.includes("http") ? s.linkUrl : "http://" + s.linkUrl */}
                            <div>
                              <img src={`social/${s.linkName}.png`} />
                              <p>{capitalizeFirstLetter(s.linkName)}</p>
                            </div>
                            <RightOutlined />
                          </a>
                          )
                          :
                          (<a target="_blank" href={openUrl(s.linkUrl, s.linkName)}>
                            {/* baseUrls.find((e) => e.name === s.linkName).baseUrl + s.linkUrl */}
                            <div>
                              <img src={`social/${s.linkName}.png`} />
                              <p>{capitalizeFirstLetter(s.linkName)}</p>
                            </div>
                            <RightOutlined />
                          </a>
                          )
                      )
                      )}
                    </div>
                  )

                  :
                  (
                    <div className="p-social--info--details--grid">
                      {UserInformation.userSocials.map((s) => (
                        typeof (baseUrls.find((e) => e.name === s.linkName)) === "undefined" ?
                          (
                            <a target="_blank" href={s.linkUrl.includes("http") ? s.linkUrl : "http://" + s.linkUrl}>
                              <div>
                                <img src={`social/${s.linkName}.png`} />
                                <p>{s.linkName}</p>
                              </div>
                            </a>
                          ) :
                          (
                            <a target="_blank" href={baseUrls.find((e) => e.name === s.linkName).baseUrl + s.linkUrl}>
                              <div>
                                <img src={`social/${s.linkName}.png`} />
                                <p>{s.linkName}</p>
                              </div>
                            </a>
                          )

                      ))}

                    </div>
                  )

                }

              </SlideDown>
            ) : null}
          </div>

          {/* //-------------------custom links-------------------// */}

          <div className="p-contact--info--container" style={userCustoms.length === 0 ? { display: 'none' } : { display: 'block' }}>
            <div className="p-contact--info--heading--line">
              <div className="p-contact--info--heading">Custom Links
                {isgridcustom ? <BsListUl onClick={() => { setisgridcustom((prev) => !prev) }} className="p-grid--icon" /> : <BsFillGrid3X2GapFill onClick={() => { setisgridcustom((prev) => !prev) }} className="p-grid--icon" />}
              </div>
              <div
                className="p-contact--info--opener--button"
                onClick={() => setcustomLinksOpen((prev) => !prev)}
              >
                {customLinksOpen ? <UpOutlined /> : <DownOutlined />}
              </div>
            </div>
            {customLinksOpen ? (
              <SlideDown className={"my-dropdown-slidedown"}>
                {!isgridcustom ?
                  <div className="p-social--info--details">
                    {userCustoms.map((s) => (

                      <a href={s.linkUrl.includes("http") ? s.linkUrl : "http://" + s.linkUrl}>
                        <div>
                          <img src={s.linkImage} />
                          <p>{s.linkName}</p>
                        </div>
                        <RightOutlined />
                      </a>
                    )
                    )}
                  </div>
                  :
                  <div className="p-social--info--details--grid">
                    {userCustoms.map((s) => (
                      <a href={s.linkUrl.includes("http") ? s.linkUrl : "http://" + s.linkUrl}>
                        <div>
                          <img src={s.linkImage} />
                          <p>{s.linkName}</p>
                        </div>

                      </a>
                    )
                    )}
                  </div>
                }


              </SlideDown>
            ) : null}
          </div>

          {/* //-------------------Bussiness hours-------------------// */}
          <div className="p-contact--info--container  p-contact--bussiness--container">
            <div className="p-contact--info--heading--line">
              <div className="p-contact--info--heading">Bussiness hours</div>
              <div
                className="p-contact--info--opener--button"
                onClick={() => setbussinesshoursOpen((prev) => !prev)}
              >
                {bussinesshoursOpen ? <UpOutlined /> : <DownOutlined />}
              </div>
            </div>
            {bussinesshoursOpen ? (
              <SlideDown className={"my-dropdown-slidedown"}>
                <div className="p-bussiness--hours--details">
                  <div>
                    {Times.MonStart !== null && typeof (Times.MonStart) !== "undefined" ?
                      <MdEventAvailable className="p-week_icons" color="green" size='1.5em' />
                      :
                      <CgUnavailable className="p-week_icons" color="red" size='1.5em' />
                    }

                    <h3>Monday</h3>
                    {

                      (Times.MonStart !== null && typeof (Times.MonStart) !== "undefined") || (Times.MonEnd !== null && typeof (Times.MonEnd) !== "undefined") ?

                        (
                          <p>{(Times.MonStart !== null && typeof (Times.MonStart) !== "undefined") ? convert24hourTo12HourFormat(Times.MonStart) : "  "}
                            &nbsp;--&nbsp;
                            {(Times.MonEnd !== null && typeof (Times.MonEnd) !== "undefined") ? convert24hourTo12HourFormat(Times.MonEnd) : "  "}</p>
                        )
                        :
                        (
                          <p>{"--"}</p>
                        )

                      // :
                      // <p>{'--'}</p>
                    }

                  </div>
                  <div>
                    {Times.TuesStart !== null && typeof (Times.TuesStart) !== "undefined" ?
                      <MdEventAvailable className="p-week_icons" color="green" size='1.5em' />
                      :
                      <CgUnavailable className="p-week_icons" color="red" size='1.5em' />
                    }
                    <h3>Tuesday</h3>
                    {
                      (Times.TuesStart !== null && typeof (Times.TuesStart) !== "undefined") || (Times.TuesEnd !== null && typeof (Times.TuesEnd) !== "undefined") ?
                        (<p>{(Times.TuesStart !== null && typeof (Times.TuesStart) !== "undefined") ? convert24hourTo12HourFormat(Times.TuesStart) : "  "}
                          &nbsp;--&nbsp;
                          {(Times.TuesEnd !== null && typeof (Times.TuesEnd) !== "undefined") ? convert24hourTo12HourFormat(Times.TuesEnd) : "  "}</p>)
                        :
                        (<p>{"--"}</p>)

                      // :
                      // <p>{'--'}</p>
                    }


                  </div>
                  <div>
                    {Times.WedStart !== null && typeof (Times.WedStart) !== "undefined" ?
                      <MdEventAvailable className="p-week_icons" color="green" size='1.5em' />
                      :
                      <CgUnavailable className="p-week_icons" color="red" size='1.5em' />
                    }
                    <h3>Wednesday</h3>
                    {
                      (Times.WedStart !== null && typeof (Times.WedStart) !== "undefined") || (Times.WedEnd !== null && typeof (Times.WedEnd) !== "undefined") ?
                        (<p>{(Times.WedStart !== null && typeof (Times.WedStart) !== "undefined") ? convert24hourTo12HourFormat(Times.WedStart) : "  "}
                          &nbsp;--&nbsp;
                          {(Times.WedEnd !== null && typeof (Times.WedEnd) !== "undefined") ? convert24hourTo12HourFormat(Times.WedEnd) : "  "}</p>)
                        :
                        (<p>{"--"}</p>)

                      // :
                      // <p>{'--'}</p>
                    }


                  </div>
                  <div>
                    {Times.ThursStart !== null && typeof (Times.ThursStart) !== "undefined" ?
                      <MdEventAvailable className="p-week_icons" color="green" size='1.5em' />
                      :
                      <CgUnavailable className="p-week_icons" color="red" size='1.5em' />
                    }
                    <h3>Thursday</h3>
                    {
                      (Times.ThursStart !== null && typeof (Times.ThursStart) !== "undefined") || (Times.ThursEnd !== null && typeof (Times.ThursEnd) !== "undefined") ?
                        (
                          <p>{(Times.ThursStart !== null && typeof (Times.ThursStart) !== "undefined") ? convert24hourTo12HourFormat(Times.ThursStart) : "  "}
                            &nbsp;--&nbsp;
                            {(Times.ThursEnd !== null && typeof (Times.ThursEnd) !== "undefined") ? convert24hourTo12HourFormat(Times.ThursEnd) : "  "}</p>
                        )
                        :
                        (<p>{"--"}</p>)
                      // :
                      // <p>{'--'}</p>
                    }


                  </div>
                  <div>
                    {Times.FriStart !== null && typeof (Times.FriStart) !== "undefined" ?
                      <MdEventAvailable className="p-week_icons" color="green" size='1.5em' />
                      :
                      <CgUnavailable className="p-week_icons" color="red" size='1.5em' />
                    }
                    <h3>Friday</h3>
                    {
                      (Times.FriStart !== null && typeof (Times.FriStart) !== "undefined") || (Times.FriEnd !== null && typeof (Times.FriEnd) !== "undefined") ?
                        (
                          <p>{(Times.FriStart !== null && typeof (Times.FriStart) !== "undefined") ? convert24hourTo12HourFormat(Times.FriStart) : "  "}
                            &nbsp;--&nbsp;
                            {(Times.FriEnd !== null && typeof (Times.FriEnd) !== "undefined") ? convert24hourTo12HourFormat(Times.FriEnd) : "  "}</p>
                        )
                        :
                        (<p>{"--"}</p>)

                      // :
                      // <p>{'--'}</p>
                    }


                  </div>
                  <div>
                    {Times.SatStart !== null && typeof (Times.SatStart) !== "undefined" ?
                      <MdEventAvailable className="p-week_icons" color="green" size='1.5em' />
                      :
                      <CgUnavailable className="p-week_icons" color="red" size='1.5em' />
                    }
                    <h3>Saturday</h3>
                    {
                      (Times.SatStart !== null && typeof (Times.SatStart) !== "undefined") || (Times.SatEnd !== null && typeof (Times.SatEnd) !== "undefined") ?
                        (
                          <p>{(Times.SatStart !== null && typeof (Times.SatStart) !== "undefined") ? convert24hourTo12HourFormat(Times.SatStart) : "  "}
                            &nbsp;--&nbsp;
                            {(Times.SatEnd !== null && typeof (Times.SatEnd) !== "undefined") ? convert24hourTo12HourFormat(Times.SatEnd) : "  "}</p>
                        )
                        :
                        (<p>{"--"}</p>)

                      // :
                      // <p>{'--'}</p>
                    }


                  </div>
                  <div>
                    {Times.SunStart !== null && typeof (Times.SunStart) !== "undefined" ?
                      <MdEventAvailable className="p-week_icons" color="green" size='1.5em' />
                      :
                      <CgUnavailable className="p-week_icons" color="red" size='1.5em' />
                    }
                    <h3>Sunday</h3>
                    {
                      (Times.SunStart !== null && typeof (Times.SunStart) !== "undefined") || (Times.SunEnd !== null && typeof (Times.SunEnd) !== "undefined") ?
                        (
                          <p>{(Times.SunStart !== null && typeof (Times.SunStart) !== "undefined") ? convert24hourTo12HourFormat(Times.SunStart) : "  "}
                            &nbsp;--&nbsp;
                            {(Times.SunEnd !== null && typeof (Times.SunEnd) !== "undefined") ? convert24hourTo12HourFormat(Times.SunEnd) : "  "}</p>
                        )
                        :
                        (
                          <p>{"--"}</p>
                        )

                      // :
                      // <p>{'--'}</p>
                    }


                  </div>
                </div>
              </SlideDown>
            ) : null}
          </div>


        </div>
      }
    </>
  );
}

export default Profile;
