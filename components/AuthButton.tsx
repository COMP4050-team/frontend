import { Login, Logout } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import React from "react";
import useIsLoggedIn from "../hooks/isLoggedIn";

function AuthButton() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Link href={isLoggedIn ? "/logout" : "/login"}>
      <ListItemButton>
        <ListItemIcon>{isLoggedIn ? <Logout /> : <Login />}</ListItemIcon>
        <ListItemText primary={isLoggedIn ? "Log Out" : "Log In"} />
      </ListItemButton>
    </Link>
  );
}

export default AuthButton;
