import React, { useEffect, useState } from 'react';
import './Analytics.css';
import logo from '../../img/logo.png'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AiFillQuestionCircle } from 'react-icons/ai'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Model from '../Modal';
import { LinearProgress, Zoom } from '@mui/material';
import Resetmodal from '../Resetmodal';
// import { border } from '@mui/system';

const Analytics = ({ location, setnavcolor }) => {
    const baseurl = "https://wajjcard.app/apis"
    const [UserInformation, setUserInformation] = useState({});
    const [anlyticsInformation, setanalyticsInformation] = useState([]);

    const [screenChange, setscreenChange] = useState(true);
    const [zoomInAnimation, setzoomInAnimation] = useState(true);
    let [forOpen, setforOpen] = useState(false)
    const getData = async () => {
        var token = localStorage.getItem("token");
        var config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let res = await axios.get(`${baseurl}/api/User/Info`, config);
        setUserInformation(res.data.user);
        setnavcolor(res.data.user.colorCode)

    };

    const getAnalyticsData = async () => {
        var token = localStorage.getItem("token");
        var config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let res = await axios.get(`${baseurl}/api/User/getAnalytics`, config);
        setanalyticsInformation(res.data.data);
        console.log(res)

    };

    // let getVcfAnalytics = () => {

    // }

    useEffect(() => {
        const timeoutforzoom = setTimeout(() => {
            setzoomInAnimation(false)
        }, 2500)
        const timeout = setTimeout(() => {
            // setloaderShow(false)
            setscreenChange(false)
        }, 3000)
        getData()
        getAnalyticsData()
        location(true)
        return () => {
            clearTimeout(timeout)
            clearTimeout(timeoutforzoom)
        }
    }, [])
    console.log(UserInformation)
    console.log(anlyticsInformation)
    const navigate = useNavigate()
    let [modelopen, setmodelopen] = useState(false)
    let [instruction, setinstruction] = useState('')

    let modalHandelar = (instructions) => {
        setinstruction(instructions)
        setmodelopen(true)
    }
    let handleclose = () => {
        setmodelopen(false)
        setinstruction('')
    }

    // ------------------------------->To reset Analytics<---------------------------------------
    let forReset = async () => {

        var token = localStorage.getItem("token");
        var config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        let res = await axios.get(`${baseurl}/api/User/resetAnalytics`, config);
        // setanalyticsInformation(res.data.data);
        console.log(res)
        setforOpen(false)
        window.location.reload(true);
    }
    //  ---------------------------------->To close resetModal<-------------------------------------
    let forClose = () => {
        setforOpen(false)
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
                <div className='analytics-main'>
                    <div className='analytics-second-main'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', width: '43%', justifyContent: 'space-around', alignItems: 'center', height: '50px' }}>
                                <AiOutlineArrowLeft style={{ fontSize: '22px', cursor: 'pointer', color: `${UserInformation.colorCode}` }} onClick={() => navigate(-1)} />
                                <h2 style={{ fontSize: '22px', color: `${UserInformation.colorCode}` }}>Analytics</h2>
                            </div>
                            <div style={{ width: '25%', display: 'flex', alignItems: 'center' }}>
                                <div style={{ display: 'flex', width: '73%', height: '70%', color: `${UserInformation.colorCode}`, alignItems: 'center', fontSize: '20px', justifyContent: 'flex-end', cursor: 'pointer' }} onClick={() => setforOpen(true)}>Reset</div>
                            </div>
                        </div>
                        <div className='total-views'>
                            <div className='total-views-inner'>
                                <div className='total-views-text'>
                                    <h1 style={{ fontSize: '18px' }}>Total Views</h1>
                                    <h2 style={{ fontSize: '20px', width: '40px' }}>{anlyticsInformation?.total_views ? anlyticsInformation?.total_views : 0}</h2>
                                </div>
                                <img src={UserInformation?.profilePicture} alt="" className='total-views-img' />
                            </div>
                        </div>
                        <div className='link-network'>
                            <div className='link-engagement'>
                                <div style={{ position: 'relative', height: '25px' }}>
                                    <AiFillQuestionCircle style={{ position: 'absolute', right: '5px', fontSize: '22px', top: '4px', color: `${UserInformation.colorCode}` }} onClick={() => modalHandelar('Counts of how many people click all links')} />
                                </div>
                                <div style={{ marginTop: '9px', marginLeft: '5px', display: 'flex', width: '155px', height: '40px', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '15px', marginBottom: '4px' }}>Link Clicks</h3>
                                    <p>{anlyticsInformation?.cur_wk_clicks ? anlyticsInformation?.cur_wk_clicks : 0}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '7px', width: '155px', marginLeft: '5px' }}>
                                    <h3 style={{ fontSize: '14px', marginRight: '4px' }}>Since last week</h3>
                                    <p style={{ fontSize: '14px', marginLeft: '4px' }}>{anlyticsInformation?.pst_wk_clicks ? anlyticsInformation?.pst_wk_clicks : 0}</p>
                                </div>
                            </div>
                            <div className='my-network'>
                                <div style={{ position: 'relative', height: '25px' }}>
                                    <AiFillQuestionCircle style={{ position: 'absolute', right: '5px', fontSize: '22px', top: '4px', color: `${UserInformation.colorCode}` }} onClick={() => modalHandelar('Counts of how many people download your contact')} />
                                </div>
                                <div style={{ marginTop: '9px', marginLeft: '5px', display: 'flex', width: '155px', height: '40px', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '13.5px', marginBottom: '4px' }}>Contact Downloads</h3>
                                    <p>{anlyticsInformation?.cur_wk_contacts ? anlyticsInformation?.cur_wk_contacts : 0}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '7px', width: '155px', marginLeft: '5px' }}>
                                    <h3 style={{ fontSize: '14px', marginRight: '4px' }}>Since last week</h3>
                                    <p style={{ fontSize: '14px', marginLeft: '4px' }}>{anlyticsInformation?.pst_wk_contacts ? anlyticsInformation?.pst_wk_contacts : 0}</p>
                                </div>
                            </div>
                        </div>

                        {anlyticsInformation?.links?.length > 0 || anlyticsInformation?.custom_links?.length > 0 ?
                            <div style={{ marginTop: '17px' }}>
                                {anlyticsInformation?.links?.map((s, i) => {

                                    return <div className='analytics-all-social' key={i}>
                                        <div className='analytics-single-social'>
                                            <div style={{ display: 'flex', alignItems: 'center', width: '148px', justifyContent: 'space-around' }}>
                                                <img src={`https://wajjcard.app/social/${s.linkImage}`} alt="social logo" style={{ height: '35px', width: '35px' }} />
                                                <p>{s.linkName}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', width: '50px', justifyContent: 'space-around', height: '40px' }}>
                                                <p style={{ marginTop: '5px' }}>{s.clicks}</p>
                                                <AiFillQuestionCircle style={{ fontSize: '20px', color: `${UserInformation.colorCode}` }} onClick={() => modalHandelar('Counts of how many people click this link invidually')} />
                                            </div>
                                        </div>
                                    </div>
                                })}


                                {anlyticsInformation?.custom_links?.map((s, i) => {

                                    return <div className='analytics-all-social' key={i}>
                                        <div className='analytics-single-social'>
                                            <div style={{ display: 'flex', alignItems: 'center', width: '148px', justifyContent: 'space-around' }}>
                                                <img src={s.linkImage} alt="social logo" style={{ height: '35px', width: '35px', borderRadius: '100px' }} />
                                                <p>{s.linkName}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', width: '50px', justifyContent: 'space-around', height: '40px' }}>
                                                <p style={{ marginTop: '5px' }}>{s.clicks}</p>
                                                <AiFillQuestionCircle style={{ fontSize: '20px', color: `${UserInformation.colorCode}` }} onClick={() => modalHandelar('Counts of how many people click this link invidually')} />
                                            </div>
                                        </div>
                                    </div>
                                })}
                                <br />
                                <br />
                                <br />



                            </div>
                            :
                            <div style={{ marginTop: '17px ', textAlign: 'center' }}>No links to show</div>
                        }

                    </div>

                </div>



            }
            <Model handleclose={handleclose} modelopen={modelopen} instruction={instruction} color={UserInformation.colorCode} />
            <Resetmodal forClose={forClose} forOpen={forOpen} forReset={forReset} color={UserInformation.colorCode} />

        </>
    )
}

export default Analytics