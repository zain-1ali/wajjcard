import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, pink, orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { SiSimpleanalytics } from 'react-icons/si'
import StyleIcon from '@mui/icons-material/Style';
import BarChartIcon from '@mui/icons-material/BarChart';
import axios from 'axios';
export default function SimpleBottomNavigation({ color }) {
  const [value, setValue] = React.useState(1);
  let navigate = useNavigate()

  let [theColor, settheColor] = React.useState("#2196F3")
  const baseurl = "https://wajjcard.app/apis"
  const getData = async () => {
    var token = localStorage.getItem("token");
    var config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    let res = await axios.get(`${baseurl}/api/User/Info`, config);
    // setUserInformation(res.data.user);
    settheColor(res.data.user.colorCode)

  };

  React.useEffect(() => {
    getData()
  }, [])

  return (
    <Box width={"100%"}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction onClick={() => navigate('/LiveView')} icon={<LiveTvIcon sx={{ color: color }} />} />
        <BottomNavigationAction onClick={() => navigate('/Edit')} icon={<EditIcon sx={{ color: color }} />} />
        <BottomNavigationAction onClick={() => navigate('/Social')} icon={<PeopleIcon sx={{ color: color }} />} />
        <BottomNavigationAction onClick={() => navigate('/analytics')} icon={<BarChartIcon sx={{ color: color }} />} />
      </BottomNavigation>
      <CssBaseline />
    </Box>

  );
}