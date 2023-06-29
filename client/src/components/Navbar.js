import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const drawerWidth = 240;

//navIteams
const navItems = ["Flipkart", "Meesho", "Feedback"];

//!Navbar main component
const Navbar = (props) => {
  const { window } = props;

  //Hook ans state
  const [mobileOpen, setMobileOpen] = React.useState(false);

  //handleDrawerToggle
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  //drawer object
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2,fontSize: '19px',fontWeight:900,color: '#5B3F89'}}>
        CROPBOX
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link to={"/" + item.toLowerCase()}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center",fontWeight:900,color: '#5B3F89',textDecoration:'none' }}>
                <ListItemText>{item}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  //Return the navbar component
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{backgroundColor:'#5B3F89'}}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { sm: "flex",fontWeight:900 },textAlign:{xs:"end   "} }}>
            CROPBOX
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link to={"/" + item.toLowerCase()} sx={{color: "#fff",textDecoration:'none !important'}}>
                <Button key={item} sx={{ color: "#fff",fontWeight:900,textDecoration:'none' }}>
                  {item}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

//Navbar component propTypes
Navbar.propTypes = {
  window: PropTypes.func
};

export default Navbar;
