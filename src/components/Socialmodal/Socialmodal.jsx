import { Box, Modal } from '@mui/material'
import React from 'react'

const Socialmodal = ({ openmodel, closemodal, instruction }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 310,

        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 2,
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'

    };
    return (
        <div>
            <Modal
                open={openmodel}
                onClose={closemodal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Instructions</h2>
                    <div style={{ marginTop: '10px' }}>{instruction}</div>
                    <button style={{ height: '30px', width: '70px', backgroundColor: '#010243', outline: 'none', border: "none", color: 'white', borderRadius: '5px', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => closemodal()}>Ok</button>
                    {/* <div style={{ height: "25px", width: '70px', backgroundColor: '#010243', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', marginTop: '20px', color: 'white', fontSize: '15px', }} onClick={() => { closemodal() }}>Ok</div> */}
                </Box>
            </Modal>
        </div>
    )
}

export default Socialmodal