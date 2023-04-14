import React from 'react'
import './addsocial.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { BsQuestionLg } from 'react-icons/bs'
import Socialmodal from '../Socialmodal/Socialmodal';

function AddSocial({ social, modalOpen, prevValue, deleteSocial, updateSocial }) {
  //---------------------state for the input value
  const [inputUrl, setinputUrl] = useState(prevValue);
  const baseUrls = [
    {
      "name": "snapchat",
      "baseUrl": "https://www.snapchat.com/add/"
    },
    {
      "name": "Twitter",
      "baseUrl": "https://www.twitter.com/"
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
      "name": "Zoom",
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
    {
      "name": "etsy",
      "baseUrl": "https://etsy.com/"
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

  let returnUrl = (name) => {

    if (name === "whatsapp") {
      return "Phone"
    }
    else if (name === "phone") {
      return "Phone"
    }
    else if (name === "email") {
      return "Email"
    }
    else if (name === "tiktok") {
      return "Username"
    }
    else if (name === "instagram") {
      return "Username"
    }
    else if (name === "Twitter") {
      return "Username"
    }
    else if (name === "snapchat") {
      return "Username"
    }
    else {
      return "Profile link"
    }



    // social.linkName === "whatsapp" ? `https://wa.me/${inputUrl}` : social.linkName === "phone" ? `tel:${inputUrl}` : social.linkName === "email" ? `mailto:${inputUrl}` : inputUrl
  }

  let [openmodel, setopenmodel] = useState(false)
  let [instruction, setinstruction] = useState('')
  let closemodal = () => {
    setopenmodel(false)
  }
  let showmodal = (name) => {
    setopenmodel(true)
    if (name === "whatsapp") {
      setinstruction('Add your phone number including your country code (e.g. +33743210012)')
    }
    else if (name === "phone") {
      setinstruction('Add your phone number including your country code (e.g. +33743210012)')
    }
    else if (name === "email") {
      setinstruction("Input your email address.")
    }
    else if (name === "tiktok") {
      setinstruction("Open your TikTok app and log into your account.Click on profile located at the bottom right corner.Your username will be shown under your profile picture. Copy and paste your username into the TikTok URL field.")
    }
    else if (name === "instagram") {
      setinstruction("Open up your Instagram app and log into your account.Click on your profile picture at the bottom right corner.Your username will be shown at the very top of your profile (above your profile picture). Paste your username into the Instagram URL field.")
    }
    else if (name === "Twitter") {
      setinstruction("Go to your Twitter profile (app or web) and your username is the one starting with @.")
    }
    else if (name === "snapchat") {
      setinstruction("Open your Snapchat app and log into your account.Tap into your profile icon at the top left corner of the screen.Your username is shown next to your Snapchat score.Copy and paste the username into the Snapchat URL field.")
    }
    else if (name === "linkedin") {
      setinstruction("Open your LinkedIn app and log into your account.Go to your profile page.Click on the three dots beside add sectionSelect Share via...Select Copy.Paste the copied link into the LinkedIn URL field.")
    }
    else if (name === "facebook") {
      setinstruction("Navigate to your Facebook profile Copy your profile link Paste your profile link here.")
    }
    else if (name === "Zoom") {
      setinstruction('Your Personal Meeting ID (PMI) and URL can be found in the Personal Meeting ID section in your Zoom profile. Select the "eye" icon to reveal the full details.')
    }
    else if (name === "pinterest") {
      setinstruction("Open your Pinterest app and log into your account.Click onto your profile picture located at the bottom right corner.Click into the three dots menu located at the top right corner.Select copy profile link.Paste the copied link into the Pinterest URL field.")
    }
    else if (name === "tumblr") {
      setinstruction("Click on the tripple dot icon at the top right corner. Click on Copy Link and you're done!")
    }
    else if (name === "indeed") {
      setinstruction("Click “Share” in the top right corner of the document. Click “Copy link,” which allows you to share a URL with whomever you want")
    }
    else if (name === "vimeo") {
      setinstruction("Visit www.vimeo.com and log into your account.Click into settings.Go to your profile page and copy the Vimeo URL located at the bottom.Paste the copied link into the Vimeo URL field.")
    }
    else if (name === "youtube") {
      setinstruction("Sign in to your YouTube Studio account.From the Menu, select Customisation Basic Info.Click into the Channel URL and copy the link.Paste the copied link into the YouTube URL field.")
    }
    else if (name === "etsy") {
      setinstruction("On Etsy.com, go to your shop's homepage.Copy the URL that appears in your browser's search bar.")
    }
  }

  console.log(social.linkName)

  return (
    <>
      <Socialmodal openmodel={openmodel} closemodal={closemodal} instruction={instruction} />
      <div className='addSocial-container'>
        <Slide in={true} direction="up" timeout={{ appear: 500, enter: 500, exit: 500 }} >
          <div className='addSocial-card--container'>
            <div className='addSocial-header'>
              <h2>{social.linkName.charAt(0).toUpperCase() + social.linkName.slice(1)}</h2>
              <div className='addSocial-close--icon'><KeyboardArrowDownIcon onClick={() => modalOpen()} /></div>
            </div>
            <img src={`https://wajjcard.app/social/${social.linkName}.png`} />
            <div className='addSocial-input--container'>
              {prevValue === null ?
                <div style={{ display: 'flex', alignItems: 'center', width: '112%', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <TextField style={{ width: '90%' }} fullWidth={true} size='small' id="outlined-basic" label={returnUrl(social?.linkName)} value={inputUrl} onChange={(e) => setinputUrl(e.target.value)} variant="outlined" />
                  {/* social.linkName.charAt(0).toUpperCase() + social.linkName.slice(1) */}
                  <div style={{ height: '25px', width: '25px', borderRadius: '100px', backgroundColor: '#010243', marginLeft: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => showmodal(social.linkName)}>
                    <BsQuestionLg style={{ color: 'white', fontSize: '15px' }} />
                  </div>
                </div>
                :
                <div style={{ display: 'flex', alignItems: 'center', width: '112%', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <TextField style={{ width: '90%' }} fullWidth={true} size='small' id="outlined-basic" label={returnUrl(social?.linkName)} value={inputUrl} onChange={(e) => setinputUrl(e.target.value)} variant="outlined" />
                  <div style={{ height: '25px', width: '25px', borderRadius: '100px', backgroundColor: '#010243', marginLeft: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={() => showmodal(social.linkName)}>
                    <BsQuestionLg style={{ color: 'white', fontSize: '15px' }} />
                  </div>
                </div>

              }
              <div className='addSocial-save--open'>
                <a target="_blank" href={openUrl(inputUrl, social.linkName)} style={{ textDecoration: 'none', width: '131px' }}><Button variant="outlined" fullWidth={true} sx={{ marginBottom: 3 }} color="info" >Open</Button></a>
                {/* baseUrls?.find((e) => e.name === social.linkName).baseUrl + inputUrl */}
                <div><Button onClick={() => deleteSocial(social.id)} variant="outlined" fullWidth={true} sx={{ marginBottom: 3 }} color="error" >Delete</Button></div>
              </div>
              <Button onClick={() => updateSocial(social.id, inputUrl)} fullWidth={true} sx={{ marginBottom: 5 }} variant="contained" color="info" style={{ backgroundColor: '#010243' }}>SAVE</Button>
            </div>
          </div>
        </Slide>
      </div>
    </>
  )
}

export default AddSocial