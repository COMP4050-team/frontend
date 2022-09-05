import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Book } from "@mui/icons-material";
import Link from "next/link";

interface Props {
  items: { text: string; href: string }[];
}

export const CustomList: React.FC<Props> = ({ items }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List>
        {items.map(({ text, href }) => (
          <ListItem key={text} disablePadding>
            <Link href={href}>
              <ListItemButton>
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                <ListItemText>{text}</ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
