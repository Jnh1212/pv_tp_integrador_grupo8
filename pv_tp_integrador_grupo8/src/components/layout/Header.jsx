import { AppBar, Toolbar, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          onClick={() => navigate("/login")}
          edge="end"
        >
          <HomeIcon />
        </IconButton>
        
        <IconButton
          color="inherit"
          onClick={() => navigate("/login")}
          edge="end"
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;