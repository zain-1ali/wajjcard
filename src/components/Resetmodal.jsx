import { Box, Modal } from '@mui/material';
import React from 'react'

const Resetmodal = ({ forClose, forOpen, forReset, color }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 270,
        height: 110,
        bgcolor: 'background.paper',
        boxShadow: 24,
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'

    };
    return (
        <div>
            <Modal
                open={forOpen}
                onClose={forClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ width: '90%', textAlign: 'center' }}>Are you sure to reset your analytics data?</div>
                    <div style={{ width: '70%', textAlign: 'center', display: 'flex', justifyContent: 'space-around', }}>
                        <button style={{ height: '30px', width: '70px', backgroundColor: `${color}`, outline: 'none', border: "none", color: 'white', borderRadius: '5px' }} onClick={() => forReset()}>Yes</button>
                        <button style={{ height: '30px', width: '70px', backgroundColor: `${color}`, outline: 'none', border: "none", color: 'white', borderRadius: '5px' }} onClick={() => forClose()}>No</button>
                    </div>
                </Box>

            </Modal>
        </div>
    )
}

export default Resetmodal