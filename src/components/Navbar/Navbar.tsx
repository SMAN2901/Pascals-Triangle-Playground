import { Menu, KeyboardArrowLeft } from "@mui/icons-material";
import { IconButton, Typography, AppBar, Toolbar, Stack } from "@mui/material";

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
                    aria-label="menu"
                    sx={{ mr: 2, color: "HighlightText" }}
                    onClick={() => toggleDrawer()}
                >
                    { drawerOpen ? <KeyboardArrowLeft /> : <Menu /> }
                </IconButton>
                <Stack>
                    <Typography 
                        variant="button"
                        sx={{ 
                            fontSize: "1.0rem", 
                            lineHeight: "1.0rem", 
                            letterSpacing: "0.1rem", 
                            mb: 0.4
                        }}
                    >
                        PASCAL'S TRIANGLE
                    </Typography>
                    <Typography 
                        variant="button"
                        color="secondary.main"
                        sx={{
                            fontSize: "0.8rem", 
                            lineHeight: "0.8rem", 
                            letterSpacing: "0.4rem",
                        }}
                    >
                        PLAYGROUND
                    </Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
 
export default Navbar;