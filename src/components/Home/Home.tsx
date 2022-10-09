import { Stack, Drawer, Toolbar, List, useMediaQuery, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Triangle } from "../../models/Triangle";
import { TriangleView } from "../../models/TriangleView";
import { getLayoutFromsStorage, getSettingsFromStorage, saveLayoutToStorage, saveSettingsToStorage } from "../../services/SettingsDataService";
import { getTriangleFromStorage, saveTriangleToStorage } from "../../services/TriangleDataService";
import Downloader from "../Downloader/Downloader";
import ExternalLinks from "../ExternalLinks/ExternalLinks";
import Filters from "../Filters/Filters";
import Navbar from "../Navbar/Navbar";
import Settings from "../Settings/Settings";
import TriangleImage from "../Triangle/TriangleImage";

const Home = ({ changeTheme }: { changeTheme: (name: string) => void}) => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerStatus, setDrawerStatus] = useState<boolean>(() => {
        if(sm) return false;
        return getLayoutFromsStorage().drawerOpen;
    });
    
    let h: number = 100;
    const [t, setT] = useState<Triangle>(() => {
        let t = getTriangleFromStorage();
        t.compute(h);
        return t;
    });

    const [key, setKey] = useState<number>(0);

    const [settings, setSettings] = useState<TriangleView>(() => {
        let s = getSettingsFromStorage();
        if(!s.color) s.color = theme.palette.primary.main;
        if(!s.highlightColor) s.highlightColor = theme.palette.secondary.main;
        return s;
    });

    const toggleDrawer = () => {
        setDrawerStatus(!drawerStatus);
        saveLayoutToStorage({
            ...getLayoutFromsStorage(),
            drawerOpen: !drawerStatus
        });
    }

    const refreshTriangle = () => {
        t.updateColor();
        setT(t);
        setKey(key + 1);
        saveTriangleToStorage(t);
    }

    const updateSettings = (s: TriangleView) => {
        setSettings(s);
        setKey(key + 1);
        saveSettingsToStorage(s);
    }

    return (
        <Stack flexDirection="column" sx={{ height: "100%" }}>
            <Stack>
                <Navbar drawerOpen={drawerStatus} toggleDrawer={toggleDrawer}/>
            </Stack>
            <Stack flexGrow={1} overflow="auto">
                <Drawer 
                    anchor="left"
                    variant={ sm ? "temporary" : "persistent" }
                    open={drawerStatus}
                    onClose={() => toggleDrawer()}
                    PaperProps={{ sx: { backgroundImage: "none" }}}
                >
                    <Toolbar />
                    <List
                        dense={true}
                        sx={{ width: 250, maxWidth: "100%", bgcolor: 'background.paper' }}
                    >
                        <Divider light={false} component="li" />
                        <Settings 
                            settings={settings} 
                            updateSettings={updateSettings}
                            changeTheme={changeTheme}
                        ></Settings>
                        <Divider light={false} component="li" />
                        <Filters filters={t.filters} refreshTriangle={() => refreshTriangle()}/>
                        <Divider light={false} component="li" />
                        <Downloader></Downloader>
                        <ExternalLinks></ExternalLinks>
                    </List>
                </Drawer>
                <Stack
                    flexGrow={1}
                    justifyContent="center" 
                    alignItems="center"
                    padding={2}
                    boxSizing="border-box"
                    width="fit-content"
                    minWidth="100%"
                    bgcolor="background.default"
                >
                    <TriangleImage key={"t" + key} triangle={t} settings={settings}/>
                </Stack>
            </Stack>
        </Stack>
    );
}
 
export default Home;