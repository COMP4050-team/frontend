import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import React from 'react';

function RegisterButton(){
    return(
        <Link href = '/register'>
            <ListItemButton>
                <ListItemIcon><AppRegistrationIcon/></ListItemIcon>
                <ListItemText primary = 'Register'/>
            </ListItemButton>
        </Link>
    );
}

export default RegisterButton;