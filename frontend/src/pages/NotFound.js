import { Box } from '@mui/material'
import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'

const NotFound = () => {
    return (
        <>
            <Navbar />
            <Box sx={{ height: '81vh', display: "flex", alignItems: "center", justifyContent: "center", color: "#a1a1a1" }}>

                <h1>Keresett oldal nem található</h1>
            </Box>
            <Footer />
        </>
    )
}

export default NotFound