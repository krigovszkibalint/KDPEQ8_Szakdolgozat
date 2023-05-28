import { Box, styled } from '@mui/material'
import React from 'react'
import headerImage from '../images/header.png';
import SearchInputEl from './SearchInputEl';

const Header = () => {

    const StyleHeader = styled(Box)(({ theme }) => (
        {
            display: "flex",
            justifyContent: 'center',
            minHeight: 500,
            backgroundImage: `url(${headerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: theme.palette.secondary.main,
            color: "white",
            paddingTop: 300,
            fontweight: "bold",
        }

    ));
    return (
        <>
            <StyleHeader >
              <SearchInputEl />
            </StyleHeader>
        </>
    )
}

export default Header