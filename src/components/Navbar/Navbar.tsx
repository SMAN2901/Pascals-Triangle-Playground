import { Menu, KeyboardArrowLeft } from "@mui/icons-material";
import { IconButton, Typography, AppBar, Toolbar } from "@mui/material";

const Navbar = (
    { drawerOpen, toggleDrawer }: { drawerOpen: boolean, toggleDrawer: () => void }
) => {
    return (
        
            <AppBar 
                position="static"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar variant="dense">
                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => toggleDrawer()}
                    >
                        { drawerOpen ? <KeyboardArrowLeft /> : <Menu /> }
                    </IconButton>
                    <Typography variant="button">
                        PASCAL'S TRIANGLE PLAYGROUND
                    </Typography>
                </Toolbar>
            </AppBar>
    );
}
 
export default Navbar;