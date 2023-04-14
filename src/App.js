import Profile from "./components/Profile/Profile";
import './index.css'
import Edit from "./components/Edit/Edit";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Social from "./components/Social/Social";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { useEffect, useState } from "react";
import SimpleBottomNavigation from "./components/Navigation/BottomNavigation";
import Live from "./components/Live_profile/Live";
import { blue, pink, orange, green } from '@mui/material/colors';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import ActivateTag from "./components/ActivateTag/ActivateTag";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdatePassword from "./components/Auth/UpdatePassword";
import SignUpIn from "./components/newFeature/signUpIn";
import Notfound from "./components/notFound/Notfound";
import Analytics from "./components/Analytics/Analytics";

function App() {

  const clientId = '411694513670-af9r88j6qk1jil66oa56a0gn4pcu58gb.apps.googleusercontent.com'

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const [shownav, setshownav] = useState(false);
  const [navColor, setnavcolor] = useState({ color: blue[500] })
  const changeLocation = (value) => {
    setshownav(value)
  }
  // const setnavIconsColor = (color) => {
  //   setnavcolor(color)
  // if (color === "#1EAFEB") {
  //   setnavcolor({ color: blue[500] })
  // }
  // if (color === "#FF69B4") {
  //   setnavcolor({ color: pink[400] })
  // }
  // if (color === "#FFA500") {
  //   setnavcolor({ color: orange[500] })
  // }
  // if (color === "#50B281") {
  //   setnavcolor({ color: green[600] })
  // }
  // }
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login location={changeLocation} />} />
          <Route path='/LiveView' element={<Profile location={changeLocation} setnavcolor={setnavcolor} />} />
          <Route path="/Register" element={<Register location={changeLocation} />} />
          <Route path='/Edit' element={<Edit location={changeLocation} setnavcolor={setnavcolor} />} />
          <Route path="/Social" element={<Social location={changeLocation} setnavcolor={setnavcolor} />} />
          <Route path="/ForgotPassword" element={<ForgotPassword location={changeLocation} />} />
          <Route path="/UpdatePassword" element={<UpdatePassword location={changeLocation} />} />
          {/* <Route path="/ActivateTag" element={<ActivateTag buttoncolor={navColor.color} location={changeLocation} />}/> */}
          <Route path="/:username" element={<Live location={changeLocation} />} />
          <Route path="/SignUpIn" element={<SignUpIn />} />
          <Route path="/notfound" element={<Notfound />} />
          <Route path="/analytics" element={<Analytics location={changeLocation} setnavcolor={setnavcolor} />} />
        </Routes>
        {shownav ?
          <div className="navigation">
            <div className="navigation--container">
              <SimpleBottomNavigation color={navColor} />
            </div>
          </div>
          :
          null
        }

      </div>
    </BrowserRouter>
  );
}

export default App;
