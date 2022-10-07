import { Stack, Drawer, Toolbar, List, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { FILTER_LIST } from "../../models/FilterList";
import { Triangle } from "../../models/Triangle";
import Filters from "../Filters/Filters";
import Navbar from "../Navbar/Navbar";
import TriangleImage from "../Triangle/TriangleImage";

const Home = () => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerStatus, setDrawerStatus] = useState<boolean>(!sm);
    
    let h: number = 100;
    const [t, setT] = useState<Triangle>(() => {
        let t = new Triangle(FILTER_LIST);
        t.compute(h);
        return t;
    });

    const [key, setKey] = useState<number>(0);

    const toggleDrawer = () => {
        setDrawerStatus(!drawerStatus);
    }

    const refreshTriangle = () => {
        t.updateColor();
        setT(t);
        setKey(key + 1);
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
                >
                    <Toolbar />
                    <List
                        dense={true}
                        sx={{ width: 250, maxWidth: "100%", bgcolor: 'background.paper' }}
                    >
                        <Filters filters={t.filters} refreshTriangle={() => refreshTriangle()}/>
                    </List>
                </Drawer>
                <Stack 
                    flexGrow={1} 
                    justifyContent="center" 
                    alignItems="center"
                    padding={2}
                    bgcolor="background.default"
                >
                    <TriangleImage key={"t" + key} triangle={t} height={h}/>
                </Stack>
            </Stack>
        </Stack>
    );
}
 
export default Home;