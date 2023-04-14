import React, { useState, useEffect } from "react";
import "./edit.css";
import Compressor from 'compressorjs';
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { SlideDown } from "react-slidedown";
import SaveIcon from '@mui/icons-material/Save';
import "react-slidedown/lib/slidedown.css";
import VCard from "vcard-creator";
import Resizer from "react-image-file-resizer";
import ReadmoreLess from "../ReadmoreReadLess/readmoreLess";
import { MdEventAvailable } from 'react-icons/md'
import { CgUnavailable } from 'react-icons/cg'
import { BsFillGrid3X2GapFill, BsListUl } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import EditForm from "./EditForm";
import EditBussinessInfo from "./EditBussinessInfo";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';







import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { blue, pink, orange, green } from '@mui/material/colors';
import Zoom from '@mui/material/Zoom';
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
import AddSocial from "../Social/AddSocial";
import { useNavigate, useNavigationType } from "react-router-dom";
import { useRef } from "react";
import AddCustom from "../Custom/AddCustom";
import { QRCode } from 'react-qrcode-logo';
import FormControl from '@mui/material/FormControl';
import { v4 as uuidv4 } from 'uuid';
import { GoogleLogout } from "react-google-login";
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ChromePicker } from 'react-color';
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

function Edit({ location, setnavcolor }) {


  //------------------menu functionality

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };






  const clientId = '411694513670-af9r88j6qk1jil66oa56a0gn4pcu58gb.apps.googleusercontent.com'
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
  const [EditModal, setEditModal] = useState(0);
  const [BussinessInfoEditModal, setBussinessInfoEditModal] = useState(0);
  const [EditModalProp, setEditModalProp] = useState("");
  const [prevValueInfo, setprevValueInfo] = useState("");
  const [loaderShow, setloaderShow] = useState(true);

  //-------------------states for time  picker------------

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
  const onTimesSubmit = async () => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.post(`${baseurl}/api/createTimeslots`, Times, config)
    const data = await res.data
    setsuccessMessage("Time slots updated..")
    setopenImageUploadAlert(true)
  }
  //----------get time slots--------------------

  const getTimeSlots = async () => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const res = await axios.get(`${baseurl}/api/getTimeslots`, config)
    const data = await res.data
    setTimes(data.timeslots)

  }


  const [UserInformation, setUserInformation] = useState({});
  const getData = async () => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    var res = await axios.get(`${baseurl}/api/User/Info`, config);
    setUserInformation(res.data.user);
    // console.log(res.data.user)
    setprofileImagePath(res.data.user.profilePicture)
    setnavcolor(res.data.user.colorCode);
  };

  useEffect(() => {
    getData()
  }, [])

  //-----------------------declaring constant for usenavigate

  let navigate = useNavigate()

  const downloadVcard = async () => {
    // Define a new vCard
    const myVCard = new VCard()

    // Some variables
    const lastname = 'Sheikh'
    const firstname = 'Abdullah'
    const additional = ''
    const prefix = ''
    const suffix = ''

    myVCard
      // Add personal data
      .addName(lastname, firstname, additional, prefix, suffix)
      // Add work data
      .addCompany('Avicenna')
      .addJobtitle('Web Developer || application developer')
      .addRole('Data Protection Officer')
      .addEmail('info@jeroendesloovere.be')
      .addPhoneNumber(1234121212, 'PREF;WORK')
      .addPhoneNumber(123456789, 'WORK')
      .addAddress(null, null, 'street', 'worktown', null, 'workpostcode', 'Belgium')
      .addURL('http://avicennaenterprise.com')

    const url = window.URL.createObjectURL(new Blob([myVCard.toString()]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.vcf'); //or any other extension
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate('/')
    }
    const timeoutforzoom = setTimeout(() => {
      setzoomInAnimation(false)
    }, 2500)
    const timeout = setTimeout(() => {
      setloaderShow(false)

      setscreenChange(false)
    }, 3000)
    getTimeSlots();
    location(true)
    getData();
    getAllAppSocials()
    getUserCustoms();
    return () => {
      clearTimeout(timeout)
      clearTimeout(timeoutforzoom)
    }

  }, []);
  const closeModal = () => {
    setEditModal(0);
    setBussinessInfoEditModal(0);
  }
  const showEditModal = (string, propValue) => {
    setprevValueInfo(propValue);
    setEditModalProp(string);
    setEditModal((prev) => !prev);
  }

  const showBussinessEdit = (propValue) => {
    setprevValueInfo(propValue);
    setBussinessInfoEditModal((prev) => !prev)
    setEditModal(false)
  }

  const saveUpperInfo = async (key, prevValue) => {
    let thekey;
    if (key === "first Name") {
      thekey = "firstName"
    }
    else if (key === "last Name") {
      thekey = "lastName"
    }
    else if (key === "job Title") {
      thekey = "jobTitle"
    }
    else if (key === "Website") {
      thekey = "personalWebsite"
    }
    else {
      thekey = key
    }
    console.log(prevValue)
    setUserInformation((prev) => {
      return {
        ...prev,
        [thekey]: prevValue
      }
    })
    const data = {
      [thekey]: prevValue
    };
    // console.log(data)
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    let res = await axios.post(`${baseurl}/api/User/updateUser`, data, config)
      .then(response => console.log(response))
      .catch(error => console.log(error.message))

  }

  const bussinessInfoUpdate = async (prevValue) => {
    setUserInformation((prev) => {
      return {
        ...prev,
        bussinessInfo: prevValue
      }
    })

    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    var res = await axios.post(`${baseurl}/api/User/updateUser`, {
      "bussinessInfo": prevValue
    }, config)
      .then(response => console.log(response))
      .catch(error => console.log(error.message))
  }


  //-------------------------social icons update and delete functionalities
  const [social, setsocial] = useState([]);
  const [showModal, setshowModal] = useState(false)
  const [modalData, setmodalData] = useState({})
  const [prevValue, setprevValue] = useState(null)


  const getAllAppSocials = async () => {
    console.log('inside get all socials function')
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get(`${baseurl}/api/links/getAllsocials`, config)
    const data = await res.data
    // console.log(res.data.links)
    setsocial(data.links);
  }
  //------------------------------setting modal close
  const modalOpen = () => {
    setshowModal(false)
  }


  //---------------get link url of clicked social
  const getLinkUrl = async (id) => {
    for (let index = 0; index < UserInformation.userSocials.length; index++) {
      if (UserInformation.userSocials[index].link_id == id) {
        setprevValue(UserInformation.userSocials[index].linkUrl)
        break
      }
      setprevValue(null)
    }
  }
  //-------------------------------------show modal with data
  const sendDataToModal = (s) => {
    const socialmain = social.find((x) => x.id == s.link_id)
    console.log("socialmain ", socialmain)
    console.log("Inside Modal Function")
    getLinkUrl(s.link_id)
    setshowModal(true)
    setmodalData(socialmain)
  }


  //-----------------------deleting social from front side

  const deleteSocial = (id) => {
    const newSocials = UserInformation.userSocials.filter((e) => e.link_id !== id)
    setUserInformation((prev) => {
      return {
        ...prev,
        userSocials: newSocials
      }
    });
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
    window.location.reload(true);

  }


  //------------------------Update user social from front end
  const updateSocial = (id, value) => {
    //-----------deleting icon if it is empty
    if (value === null) {
      deleteSocial(id)
    } else {
      const newSocials = UserInformation.userSocials.map((s) => {
        return s.id === id ? {
          ...s,
          linkUrl: value
        }
          : {
            ...s
          }
      })
      setUserInformation((prev) => {
        return {
          ...prev,
          userSocials: newSocials
        }
      });
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
    const res = await axios.post(`${baseurl}/api/social/updateSocial`, attrs, config)
    const data = await res.data

    getData();
  }


  //------------------------------logout functionality

  const handleLogout = () => {
    localStorage.clear()
    navigate('/');
  }



  //-----------------------------user customs code


  const [userCustoms, setuserCustoms] = useState([]);
  const [customModal, setcustomModal] = useState(false)
  const [customModalData, setcustomModalData] = useState({})
  const getUserCustoms = async () => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const res = await axios.get(`${baseurl}/api/custom/getUserCustoms`, config)
    const data = await res.data
    setuserCustoms(data.userCustoms);

  }

  const sendDataToCustomModal = (s) => {
    setcustomModal(true)
    setcustomModalData(s)


  }
  const addNewCustom = () => {
    setcustomModal(true)
    setcustomModalData(
      {
        "linkName": "Custom Link",
        "linkUrl": null
      }
    )
  }


  const deleteCustom = (id) => {
    const newCustoms = userCustoms.filter((e) => e.id !== id)
    setuserCustoms(newCustoms);
    setcustomModal(false)
    deleteUserCustom(id);
  }

  const deleteUserCustom = async (id) => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const attrs = {
      id: id,
    }
    const res = await axios.post(`${baseurl}/api/custom/deleteCustom`, attrs, config)
    const data = await res.data
    window.location.reload(true)

  }

  const updateCustom = (id, value, Name, linkImage) => {
    //-----------deleting icon if it is empty

    if (value === null) {
      deleteCustom(id)
    } else {
      const newCustoms = userCustoms.filter((e) => e.id === id)
      if (newCustoms.length === 0) {
        //---------------add custom to db
        addCustomToDb(value, Name, linkImage);
      } else {
        setuserCustoms((prev) =>
          prev.map((p) => {
            return p.id === newCustoms[0].id ?
              {
                ...p,
                linkUrl: value,
                linkName: Name,
                linkImage: linkImage
              }
              :
              {
                ...p
              }
          })
        )
        updateCustomInDb(newCustoms[0].id, value, Name, linkImage)
      }
      setcustomModal(false)

    }
  }


  const addCustomToDb = async (value, Name, linkImage) => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const attrs = {
      value: value,
      Name: Name,
      linkImage: linkImage
    }
    const res = await axios.post(`${baseurl}/api/custom/AddCustom`, attrs, config)
    const data = await res.data
    setuserCustoms(data.userCustoms);
  }

  const updateCustomInDb = async (id, value, Name, linkImage) => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const attrs = {
      id: id,
      linkUrl: value,
      linkName: Name,
      linkImage: linkImage
    }
    const res = await axios.post(`${baseurl}/api/custom/updateCustom`, attrs, config)
    const data = await res.data

  }




  //---------------------profile image code goes here-----------------------
  let navigation = useNavigate()
  let profileImage = useRef();
  const [saveImageIcon, setsaveImageIcon] = useState(false)
  const [profileImagePath, setprofileImagePath] = useState("profile_logo.jpg")
  const [openImageUploadAlert, setopenImageUploadAlert] = useState()
  const [successMessage, setsuccessMessage] = useState("")
  const [showCircularloader, setshowCircularloader] = useState(false)

  //---------------------IMAGE COMPRESSION


  // const [compressedFile, setCompressedFile] = useState(null);
  // const handleCompressedUpload = (e) => {
  //   const image = e.target.files[0];
  //   new Compressor(image, {
  //     quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
  // success: (compressedResult) => {
  // compressedResult has the compressed file.
  // Use the compressed file to upload the images to your server.        
  //       setCompressedFile(res)
  //     },
  //   });
  // };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        450,
        450,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });


  const uploadProfileImage = async () => {
    var formData = new FormData();
    const image = await resizeFile(profileImage.current.files[0]);
    formData.append("profileImage", image)
    var token = localStorage.getItem("token");
    var config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'
      }
    };
    setshowCircularloader(true)
    const res = await axios.post(`${baseurl}/api/User/UploadProfile`, formData, config)
    const data = await res.data
    setsaveImageIcon(true)
    setshowCircularloader(false)
    setprofileImagePath(data.imagePath)

  }



  const saveImageInDb = async () => {

    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const data = {
      "profilePicture": profileImagePath
    }


    // profileImagePath
    var res = await axios.post(`${baseurl}/api/User/updateProfileImage`, data, config).then(
      (response) => {
        console.log(response)
        setsaveImageIcon(false)
      }

    )
    console.log(res)
    setsuccessMessage("Image uploaded successfully.")
    setopenImageUploadAlert(true)
    // }
  }

  useEffect(() => {
    console.log("image upoad changes here")
    const displayTimeout = setTimeout(() => {
      setopenImageUploadAlert(false)
    }, 2500);
    // clearTimeout(displayTimeout)
  }, [openImageUploadAlert])



  //----------------------------color change
  const changeColorInDb = async (value) => {
    setUserInformation((prev) => {
      return {
        ...prev,
        colorCode: value
      }
    })

    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    var res = await axios.post(`${baseurl}/api/User/updateUser`, {
      "colorCode": value
    }, config)
      .then(response => console.log(response))
      .catch(error => console.log(error.message))
  }
  // setnavIconsColor(UserInformation.colorCode);

  const changeselectedColor = (color) => {
    setUserInformation((prev) => {
      return {
        ...prev,
        colorCode: color
      }
    })
    // setselectedColor(e.target.value)
    // setnavIconsColor(color);
    changeColorInDb(color);
    setnavcolor(color)
    handleclose()
    setshowcolorpicker(false)
    // window.location.reload(true);
  }
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
  let [colorpick, setcolorpick] = useState('#fff')
  const [modelopen, setopen] = useState(false);
  let [theColor, settheColor] = useState(UserInformation.colorCode)
  let [showcolorpicker, setshowcolorpicker] = useState(false)
  const handleOpen = () => {
    setopen(true)
    settheColor(UserInformation.colorCode)
  };
  const handleclose = () => {
    setopen(false)
    setshowcolorpicker(false)
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 170,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    // height: 'max',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 2,
  };

  const stylebox = {
    position: 'absolute',
    top: '58%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 270,
    height: 50,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 2,
    p: 2,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  };

  const stylelogout = {
    position: 'absolute',
    top: '76%',
    left: '30%',
  }


  let [theimg, settheimg] = useState(null)
  let [cropModal, setcropModal] = useState(false)
  let [myimg, setmyimg] = useState(null)
  let [crop, setcrop] = useState({
    unit: '%',
    x: 25,
    y: 25,
    width: 9,
    height: 16
  })
  let [output, setOutput] = useState('')
  let [completedcrop, setcompletedcrop] = useState(null)
  const [key, setKey] = useState(0);
  let handleclosecropper = () => {
    setcropModal(false)
    // settheimg(null)
  }
  let handleImageChange = (event) => {
    // profileImage
    settheimg('')
    const { files } = event.target

    setKey(key + 1);
    if (files && files?.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.addEventListener('load', () => {
        settheimg(reader.result)

        setcropModal(true)
      })
    }
  }



  const getProfileCropImage = async () => {
    const canvas = document.createElement('canvas');
    const scaleX = myimg.naturalWidth / myimg.width;
    const scaleY = myimg.naturalHeight / myimg.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      myimg,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    // Converting to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    setprofileImagePath(base64Image)

    // setOutput(base64Image);
    setsaveImageIcon(true)
    handleclosecropper()

  }
  // console.log(profileImagePath)
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

        <div className="edit-profile--container">
          {loaderShow ? (<div className="edit-loader">
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          </div>)
            :
            null}
          <div className="edit-profile--header">
            <img src="social/new icons/Layer 6.png" alt="" />
            <div className="color-picker">


              <React.Fragment>
                <BsThreeDotsVertical style={{ height: '30px', width: '30px', color: `${UserInformation.colorCode}` }} onClick={handleOpen} />




                <Modal
                  open={modelopen}
                  onClose={handleclose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>

                    <MenuItem>
                      <Avatar src={profileImagePath} />
                      <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ ml: 2 }}>
                        Change Theme
                      </Typography>
                    </MenuItem>

                    <Box sx={stylebox} >
                      {/* <div style={{ height: '35px', width: '35px', borderRadius: '50%', border: UserInformation.colorCode === '#1EAFEB' ? '2px solid #1EAFEB' : '', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <div style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundColor: '#1EAFEB', cursor: 'pointer' }} onClick={() => { return changeselectedColor('#1EAFEB'), handleclose() }}></div></div>
                      <div style={{ height: '35px', width: '35px', borderRadius: '50%', border: UserInformation.colorCode === '#FFA500' ? '2px solid #FFA500' : '', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <div style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundColor: '#FFA500', cursor: 'pointer' }} onClick={() => { return changeselectedColor('#FFA500'), handleclose() }}></div></div>
                      <div style={{ height: '35px', width: '35px', borderRadius: '50%', border: UserInformation.colorCode === '#FF69B4' ? '2px solid #FF69B4' : '', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <div style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundColor: '#FF69B4', cursor: 'pointer' }} onClick={() => { return changeselectedColor('#FF69B4'), handleclose() }}></div></div>
                      <div style={{ height: '35px', width: '35px', borderRadius: '50%', border: UserInformation.colorCode === '#50B281' ? '2px solid #50B281' : '', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <div style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundColor: '#50B281', cursor: 'pointer' }} onClick={() => { return changeselectedColor('#50B281'), handleclose() }}></div></div> */}
                      {/* <input type="color" className='colorselector' value={theColor} onChange={(e) => settheColor(e.target.value)} /> */}
                      {/* showcolorpicker,setshowcolorpicker */}
                      <div className='colorselector' style={{ backgroundColor: theColor }} onClick={() => { showcolorpicker ? setshowcolorpicker(false) : setshowcolorpicker(true) }}></div>
                      <button onClick={() => changeselectedColor(theColor)} style={{ outline: 'none', border: 'none', color: 'white', backgroundColor: `${theColor}`, height: '30px', width: '30%', borderRadius: '5px' }}>Change</button>
                    </Box>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}
                    <Box sx={stylelogout}>
                      {localStorage.getItem('loginWith') ?
                        <div className="google-button-div" >
                          <GoogleLogout
                            clientId={clientId} buttonText="Log out" onLogoutSuccess={handleLogout}
                          />
                        </div>
                        :
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon >
                            <Logout fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      }

                    </Box>
                    {/* colorpick,setcolorpick */}
                    {showcolorpicker && <ChromePicker className="colorPicker" color={theColor} onChange={updatedColor => settheColor(updatedColor.hex)} disableAlpha={true} />}
                  </Box>

                </Modal>


                {/* ----------------------------------image-croper------------------------------------ */}





                <Modal
                  open={cropModal}
                  onClose={handleclosecropper}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style2}>
                    <ReactCrop crop={crop} onChange={(c) => { setcrop(c) }} onComplete={(c) => { setcompletedcrop(c) }} aspect={9 / 12} >
                      <img src={theimg} alt="img" onLoad={(e) => setmyimg(e.target)} />
                    </ReactCrop>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>


                      <button onClick={() => getProfileCropImage()} style={{ backgroundColor: UserInformation.colorCode, outline: "none", marginRight: '10px', border: 'none', color: 'white', height: '35px', width: '70px', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                      {/* saveImageInDb */}
                      <button onClick={() => handleclosecropper()} style={{ backgroundColor: UserInformation.colorCode, outline: "none", marginLeft: '10px', border: 'none', color: 'white', height: '35px', width: '70px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </Box>
                </Modal >




              </React.Fragment>


            </div>


          </div>
          <div className="edit-success-msg">
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
          <div className="edit-profile--upper" style={{ "backgroundColor": UserInformation.colorCode, "borderTop": `3px solid ${UserInformation.colorCode}` }}></div>

          {/* //--------------------------Flip container----------------------------// */}
          <ReactCardFlip isFlipped={flip} flipDirection="vertical">
            <div className="edit-profile--main--data">
              <div className="edit-profile--picture--section">
                <div className="imageIconUpload">
                  <IconButton
                    sx={color}
                    aria-label="upload picture" component="label">
                    <input hidden accept="image/*" onChange={handleImageChange} type="file" key={key} />
                    {/* ref={profileImage} */}
                    {/* uploadProfileImage */}
                    <PhotoCamera />
                  </IconButton>
                  {showCircularloader ?
                    <div className="circular--loader">
                      <CircularProgress color="primary" />
                    </div>
                    :
                    null
                  }

                </div>
                {saveImageIcon ?
                  <div onClick={saveImageInDb} className="saveImageIcon">
                    <button style={{ backgroundColor: UserInformation.colorCode }}>Save</button>
                  </div>
                  : null}
                <img src={profileImagePath ? profileImagePath : output} alt="" style={{ objectFit: 'cover' }} />
                {/* profileImagePath */}
              </div>
              <div className="edit-profile--details--section">
                <div className="edit-profile--firstName">
                  <MdEdit onClick={() => showEditModal("first Name", UserInformation.firstName)} color="white" style={{ "marginTop": "5px" }} size={"1.1rem"} />
                  <div style={{ "color": `${UserInformation.colorCode}` }} >
                    {UserInformation.firstName || "First Name"}
                  </div>
                </div>
                <div className="edit-profile--lastName">
                  <MdEdit onClick={() => showEditModal("last Name", UserInformation.lastName)} color="white" style={{ "marginTop": "5px" }} size={"1.1rem"} />
                  <div >
                    {UserInformation.lastName || "Last Name"}
                  </div>
                </div>
                <div className="edit-profile--jobtitle">
                  <MdEdit onClick={() => showEditModal("job Title", UserInformation.jobTitle)} color="white" size={"1.1rem"} />
                  <div>
                    {UserInformation.jobTitle || "Job Title"}
                  </div>
                </div>

                <div className="edit-profile--companyName">
                  <MdEdit onClick={() => showEditModal("company", UserInformation.companyName)} color="white" size={"1.1rem"} /><div>
                    {UserInformation.companyName || "Company Name"}
                  </div>
                </div>
                <img
                  src="social/new icons/qr.png"
                  alt=""
                  onClick={() => setflip((prev) => !prev)}
                />
              </div>
              {/* <div className="edit-edit--main--data">
            
            </div> */}
            </div>
            <div
              className="edit-qr--code--container"
              onClick={() => setflip((prev) => !prev)}
            >
              <QRCode
                value={`http://wajjcard.app/${UserInformation.name}`}
                // logoImage="social/new icons/Layer 6.png"
                bgColor="#484848"
                eyeColor="#FFFFFF"
                eyeRadius="5"
                fgColor="#FFFFFF"
                logoWidth="50"
                qrStyle="squares"
                logoOpacity="0.8"
              />
            </div>
          </ReactCardFlip>

          <div className="edit-profile--lower"

            style={{ "marginBottom": "10px", "borderTop": `12px solid ${UserInformation.colorCode}` }}>
            {/* <div></div> */}
            {/* <a  onClick={downloadVcard} href="#">
          <div>save contact</div>
        </a> */}
          </div>
          <div className="edit-profile--bussiness-info">
            <div className="edit-bussiness--info--heading"> Bussiness Info &nbsp; <MdEdit onClick={() => showBussinessEdit(UserInformation.bussinessInfo)} style={{ color: UserInformation.colorCode }} color="#484848" size={"1.2rem"} /></div>
            <div className="edit-bussiness--info--description">
              {console.log(UserInformation.bussinessInfo)}
              <ReadmoreLess info={UserInformation.bussinessInfo || "Bussiness Information"} />

            </div>

          </div>

          {/* //-------------------contact info-------------------// */}
          <div className="edit-contact--info--container">
            <div className="edit-contact--info--heading--line">
              <div className="edit-contact--info--heading">Contact Info</div>
              <div
                className="edit-contact--info--opener--button"
                onClick={() => setContactOpen((prev) => !prev)}
              >
                {contactOpen ? <UpOutlined /> : <DownOutlined />}
              </div>
            </div>
            {contactOpen ? (
              <SlideDown className={"my-dropdown-slidedown"}>
                <div className="edit-contact--info--details">
                  <a>
                    {/* <img src="http://wajj.kameti.pk/social/new icons/wp.png"  /> */}
                    <PhoneIcon sx={{ color: UserInformation?.colorCode }} fontSize="medium" style={{ border: "1px solid black", borderRadius: "50%", padding: "1.2px" }} />
                    <div>{UserInformation.phone || "Phone number"}&nbsp;<MdEdit onClick={() => showEditModal("phone", UserInformation.phone)} color={`${UserInformation?.colorCode}`} size={"1rem"} /></div>
                  </a>
                  <a>
                    <LanguageIcon sx={{ color: UserInformation?.colorCode }} fontSize="medium" style={{ border: "1px solid black", borderRadius: "50%", padding: "1px" }} />
                    <div>{UserInformation.personalWebsite || "Website"}&nbsp;<MdEdit onClick={() => showEditModal("Website", UserInformation.personalWebsite)} color={`${UserInformation?.colorCode}`} size={"1rem"} /></div>
                  </a>
                  <a>
                    <EmailIcon sx={{ color: UserInformation?.colorCode }} fontSize="medium" style={{ border: "1px solid black", borderRadius: "50%", padding: "1px" }} />
                    <div>{UserInformation.email || "Email"}&nbsp;<MdEdit color={`${UserInformation?.colorCode}`} size={"1rem"} onClick={() => showEditModal("email", UserInformation.email)} /> </div>
                  </a>
                  <a>
                    <PlaceIcon sx={{ color: UserInformation?.colorCode }} fontSize="medium" style={{ border: "1px solid black", borderRadius: "50%", padding: "1px" }} />
                    <div>{UserInformation.location || "Address"}&nbsp;<MdEdit onClick={() => showEditModal("location", UserInformation.location)} color={`${UserInformation?.colorCode}`} size={"1rem"} /></div>
                  </a>
                </div>
              </SlideDown>
            ) : null}
          </div>

          {/* //-------------------social links-------------------// */}

          <div className="edit-contact--info--container">
            <div className="edit-contact--info--heading--line">
              <div className="edit-contact--info--heading">Social Media
                {isgridsocial ? <BsListUl onClick={() => { setisgridsocial((prev) => !prev) }} className="edit-grid--icon" /> : <BsFillGrid3X2GapFill onClick={() => { setisgridsocial((prev) => !prev) }} className="edit-grid--icon" />}

              </div>
              <div
                className="edit-contact--info--opener--button"
                onClick={() => setsocialLinksOpen((prev) => !prev)}
              >

                {socialLinksOpen ? <UpOutlined /> : <DownOutlined />}

              </div>
            </div>
            {socialLinksOpen ? (
              <SlideDown className={"my-dropdown-slidedown"}>

                {!isgridsocial ?

                  (
                    <div className="edit-social--info--details">
                      {UserInformation?.userSocials?.map((social) => (
                        <a onClick={() => sendDataToModal(social)}>
                          <div>
                            <img src={`https://wajjcard.app/social/${social.linkName}.png`} />
                            <p>{capitalizeFirstLetter(social?.linkName)}</p>
                          </div>
                          <RightOutlined />
                        </a>
                      )
                      )}
                      <a onClick={() => navigation('/social')}>
                        <div>
                          {/* <img src={"plus.png"}  /> */}
                          <AddCircleOutlineIcon sx={{ fontSize: 52, color: `${UserInformation?.colorCode}` }} />
                          <p></p>
                        </div>
                      </a>

                    </div>
                  )

                  :
                  (
                    <div className="edit-social--info--details--grid">
                      {UserInformation.userSocials.map((s) => (
                        <a onClick={() => sendDataToModal(s)}>
                          <div>
                            <img src={`https://wajjcard.app/social/${s.linkName}.png`} />
                            <p>{capitalizeFirstLetter(s?.linkName)}</p>
                          </div>
                        </a>
                      ))}
                      <a onClick={() => navigation('/social')}>
                        <div>
                          {/* <img src={"plus.png"}  /> */}
                          <AddCircleOutlineIcon sx={{ fontSize: 56, color: `${UserInformation?.colorCode}` }} />
                          <p></p>
                        </div>
                      </a>

                    </div>
                  )

                }

              </SlideDown>
            ) : null}
          </div>

          {/* //-------------------custom links-------------------// */}

          <div className="edit-contact--info--container">
            <div className="edit-contact--info--heading--line">
              <div className="edit-contact--info--heading">Custom Links
                {isgridcustom ? <BsListUl onClick={() => { setisgridcustom((prev) => !prev) }} className="edit-grid--icon" /> : <BsFillGrid3X2GapFill onClick={() => { setisgridcustom((prev) => !prev) }} className="edit-grid--icon" />}
              </div>
              <div
                className="edit-contact--info--opener--button"
                onClick={() => setcustomLinksOpen((prev) => !prev)}
              >
                {customLinksOpen ? <UpOutlined /> : <DownOutlined />}
              </div>
            </div>
            {customLinksOpen ? (
              <SlideDown className={"my-dropdown-slidedown"}>
                {!isgridcustom ?
                  (
                    <div className="edit-social--info--details">
                      {userCustoms.map((s) => (
                        <a onClick={() => sendDataToCustomModal(s)}>
                          <div>
                            <img src={s.linkImage} />
                            <p>{s.linkName}</p>
                          </div>
                          <RightOutlined />
                        </a>
                      )
                      )}
                      <a onClick={addNewCustom}>
                        <div>
                          {/* <img src={"plus.png"}  /> */}
                          <AddCircleOutlineIcon sx={{ fontSize: 52, color: `${UserInformation?.colorCode}` }} />
                          <p></p>
                        </div>
                      </a>
                    </div>
                  )

                  :
                  (
                    <div className="edit-social--info--details--grid">
                      {userCustoms.map((s) => (
                        <a onClick={() => sendDataToCustomModal(s)}>
                          <div>
                            <img src={s.linkImage} />
                            <p>{s.linkName}</p>
                          </div>
                        </a>
                      ))}
                      <a onClick={addNewCustom}>
                        <div>
                          {/* <img src={"plus.png"}  /> */}
                          <AddCircleOutlineIcon sx={{ fontSize: 56, color: `${UserInformation?.colorCode}` }} />
                          <p></p>
                        </div>
                      </a>
                    </div>
                  )
                }


              </SlideDown>
            ) : null}
          </div>

          {/* //-------------------Bussiness hours-------------------// */}
          <div className="edit-contact--info--container edit-contact--bussiness--container">
            <div className="edit-contact--info--heading--line">
              <div className="edit-contact--info--heading">Bussiness hours</div>
              <div
                className="edit-contact--info--opener--button"
                onClick={() => setbussinesshoursOpen((prev) => !prev)}
              >
                {bussinesshoursOpen ? <UpOutlined /> : <DownOutlined />}
              </div>
            </div>
            {bussinesshoursOpen ? (
              <SlideDown className={"my-dropdown-slidedown"}>
                <div className="edit-bussiness--hours--details">
                  <div>
                    {Times.MonStart ?
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isMon: Times.isMon == 1 ? 0 : 1
                        //   }
                        // })}
                        className="edit-week_icons" color="green" size='1.5em' />
                      :
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isMon: Times.isMon == 1 ? 0 : 1
                        //   }
                        // })}
                        // style={{ color: `${UserInformation?.colorCode}` }}
                        className="edit-week_icons" size='1.5em' color="green" />
                    }


                    <h3>Monday</h3>
                    <div className="edit-time--inputs">
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              MonStart: e.target.value
                            }
                          })
                        }
                        } value={Times.MonStart}
                      />
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              MonEnd: e.target.value
                            }
                          })
                        }
                        } value={Times.MonEnd}
                      />
                    </div>

                  </div>
                  <div>
                    {Times.TuesStart ?
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isTues: Times.isTues == 1 ? 0 : 1
                        //   }
                        // })}
                        className="edit-week_icons" color="green" size='1.5em' />
                      :
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isTues: Times.isTues == 1 ? 0 : 1
                        //   }
                        // })}
                        // style={{ color: `${UserInformation?.colorCode}` }}
                        className="edit-week_icons" size='1.5em' color="green" />
                    }
                    <h3>Tuesday</h3>
                    <div className="edit-time--inputs">
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              TuesStart: e.target.value
                            }
                          })
                        }
                        } value={Times.TuesStart}
                      />
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              TuesEnd: e.target.value
                            }
                          })
                        }
                        } value={Times.TuesEnd}
                      />
                    </div>

                  </div>
                  <div>
                    {Times.WedStart ?
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isWed: Times.isWed == 1 ? 0 : 1
                        //   }
                        // })}
                        className="edit-week_icons" color="green" size='1.5em' />
                      :
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isWed: Times.isWed == 1 ? 0 : 1
                        //   }
                        // })}
                        // style={{ color: `${UserInformation?.colorCode}` }}
                        className="edit-week_icons" size='1.5em' color="green" />
                    }
                    <h3>Wednesday</h3>
                    <div className="edit-time--inputs">
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              WedStart: e.target.value
                            }
                          })
                        }
                        } value={Times.WedStart}
                      />
                      <input type="time"

                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              WedEnd: e.target.value
                            }
                          })
                        }
                        } value={Times.WedEnd}
                      />
                    </div>

                  </div>
                  <div>
                    {Times.ThursStart ?
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isThurs: Times.isThurs == 1 ? 0 : 1
                        //   }
                        // })}
                        className="edit-week_icons" color="green" size='1.5em' />
                      :
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isThurs: Times.isThurs == 1 ? 0 : 1
                        //   }
                        // })}
                        // style={{ color: `${UserInformation?.colorCode}` }}
                        className="edit-week_icons" size='1.5em' color="green" />
                    }
                    <h3>Thursday</h3>
                    <div className="edit-time--inputs">
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              ThursStart: e.target.value
                            }
                          })
                        }
                        } value={Times.ThursStart}
                      />
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              ThursEnd: e.target.value
                            }
                          })
                        }
                        } value={Times.ThursEnd}
                      />
                    </div>

                  </div>
                  <div>
                    {Times.FriStart ?
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isFri: Times.isFri == 1 ? 0 : 1
                        //   }
                        // })}
                        className="edit-week_icons" color="green" size='1.5em' />
                      :
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isFri: Times.isFri == 1 ? 0 : 1
                        //   }
                        // })}
                        // style={{ color: `${UserInformation?.colorCode}` }}
                        className="edit-week_icons" size='1.5em' color="green" />
                    }
                    <h3>Friday</h3>
                    <div className="edit-time--inputs">
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              FriStart: e.target.value
                            }
                          })
                        }
                        } value={Times.FriStart}

                      />
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              FriEnd: e.target.value
                            }
                          })
                        }
                        } value={Times.FriEnd}

                      />
                    </div>

                  </div>
                  <div>
                    {Times.SatStart ?
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isSat: Times.isSat == 1 ? 0 : 1
                        //   }
                        // })}
                        className="edit-week_icons" color="green" size='1.5em' />
                      :
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isSat: Times.isSat == 1 ? 0 : 1
                        //   }
                        // })}
                        // style={{ color: `${UserInformation?.colorCode}` }}
                        className="edit-week_icons" size='1.5em' color="green" />
                    }
                    <h3>Saturday</h3>
                    <div className="edit-time--inputs">
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              SatStart: e.target.value
                            }
                          })
                        }
                        } value={Times.SatStart}

                      />
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              SatEnd: e.target.value
                            }
                          })
                        }
                        } value={Times.SatEnd}
                      />
                    </div>

                  </div>
                  <div>
                    {Times.SunStart ?
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isSun: Times.isSun == 1 ? 0 : 1
                        //   }
                        // })}
                        className="edit-week_icons" color="green" size='1.5em' />
                      :
                      <MdEventAvailable
                        // onClick={() => setTimes((prev) => {
                        //   return {
                        //     ...prev,
                        //     isSun: Times.isSun == 1 ? 0 : 1
                        //   }
                        // })}
                        // style={{ color: `${UserInformation?.colorCode}` }}
                        className="edit-week_icons" size='1.5em' color="green" />
                    }
                    <h3>Sunday</h3>
                    <div className="edit-time--inputs">
                      <input type="time"
                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              SunStart: e.target.value
                            }
                          })
                        }
                        } value={Times.SunStart}
                      />
                      <input type="time"

                        onChange={(e) => {
                          setTimes((prev) => {
                            return {
                              ...prev,
                              SunEnd: e.target.value
                            }
                          })
                        }
                        } value={Times.SunEnd}
                      />
                    </div>

                  </div>
                </div>
                <div className="edit-button-for-times">
                  <Button
                    onClick={onTimesSubmit}
                    fullWidth={true}
                    style={{ backgroundColor: `${UserInformation?.colorCode}` }}
                    sx={{ marginBottom: 5, mt: 2 }}
                    variant="contained"
                    color="info"
                  >Save Time Slots</Button>
                </div>
              </SlideDown>
            ) : null}
          </div>








        </div>





      }





      {
        showModal ?
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
          : null
      }

      {
        customModal ?
          <>
            <div className='overlay'></div>
            <AddCustom
              custom={customModalData}
              prevValue={prevValue}
              modalOpen={() => setcustomModal(false)}
              deleteCustom={deleteCustom}
              updateCustom={updateCustom}
            />
          </>

          : null
      }


      {
        EditModal ?
          <>
            <div className='overlay'></div>
            <EditForm
              closeModal={closeModal}
              saveInfo={saveUpperInfo}
              property={EditModalProp}
              propertyValue={prevValueInfo}
              color={color} />
          </>
          : null
      }
      {
        BussinessInfoEditModal ?
          <>
            <div className='overlay'></div>
            <EditBussinessInfo
              closeModal={closeModal}
              bussinessInfoUpdate={bussinessInfoUpdate}
              property={"bussiness Info"}
              propertyValue={prevValueInfo} />
          </>
          : null
      }
    </>
  );
}

export default Edit;

{/* <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                > */}
{/* -------------? */ }
{/* <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem> */}

{/* -------------------------- */ }
{/* <MenuItem>
                    <Avatar src={profileImagePath} /> Change Theme
                  </MenuItem>

                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={UserInformation.colorCode}
                    label="Color"
                    fullWidth
                    style={{ width: "88%", marginLeft: "7%", marginBottom: "10px", marginTop: "10px" }}
                    onChange={changeselectedColor}
                    variant="standard"
                  >
                    <MenuItem value="#1EAFEB" selected >Blue</MenuItem>
                    <MenuItem value="#FF69B4">Hot Pink</MenuItem>
                    <MenuItem value="#FFA500">Orange</MenuItem>
                    <MenuItem value="#50B281">Green</MenuItem>

                  </Select>




                  <Divider /> */}
{/* <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
{/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
{/* ----------------- */ }
{/* {localStorage.getItem('loginWith') ?
                    <div className="google-button-div" >
                      <GoogleLogout
                        clientId={clientId} buttonText="Log out" onLogoutSuccess={handleLogout}
                      />
                    </div>
                    :
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  }
                </Menu> */}