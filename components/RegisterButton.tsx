import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import useIsLoggedIn from '../hooks/isLoggedIn';


function RegisterButton(){
    const isLoggedIn = useIsLoggedIn();

    return(
        <Link href = '/register'>
            <ListItemButton>
                <ListItemIcon>{isLoggedIn ? '' : <AppRegistrationIcon/>}</ListItemIcon>
                <ListItemText primary={isLoggedIn ? '' : 'Register'}/>
            </ListItemButton>
        </Link>
    );
}

export default RegisterButton;