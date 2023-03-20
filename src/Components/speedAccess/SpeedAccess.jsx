import React from 'react'
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TelegramShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";

export default function SpeedAccess() {
    return (    
    <Box>
        <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />} >
            <SpeedDialAction
                icon={
                    <WhatsappShareButton url={window.location.href} >
                        <WhatsappIcon round={true} size={44} />
                    </WhatsappShareButton>
                }
                tooltipTitle={"share whatsap"}
            />

        </SpeedDial>
    </Box>
    )
}


