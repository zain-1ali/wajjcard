import { Box, Modal } from '@mui/material'
import React from 'react'

const Model = ({ modelopen, handleclose, instruction, color }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 270,
        height: 110,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        // p: 4,
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'

    };
    return (
        <div>
            <Modal
                open={modelopen}
                onClose={handleclose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ width: '90%', textAlign: 'center' }}>{instruction}</div>
                    <button style={{ height: '30px', width: '70px', backgroundColor: `${color}`, outline: 'none', border: "none", color: 'white', borderRadius: '5px' }} onClick={() => handleclose()}>Ok</button>

                </Box>

            </Modal>
        </div>
    )
}

export default Model