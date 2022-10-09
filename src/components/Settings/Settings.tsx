import { Circle, DarkMode, ExpandLess, ExpandMore, LightMode, Refresh, Tune } from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slider, TextField, Typography, IconButton, useTheme, Menu } from "@mui/material";
import { MouseEvent, useState } from "react";
import { TriangleView } from "../../models/TriangleView";
import { ColorResult, SketchPicker } from 'react-color';
import { getLayoutFromsStorage, saveLayoutToStorage } from "../../services/SettingsDataService";

const Settings = (
    { 
        settings, 
        updateSettings,
        changeTheme
    }: { 
        settings: TriangleView, 
        updateSettings: (s: TriangleView) => void,
        changeTheme: (name: string) => void
    }
) => {
    const [open, setOpen] = useState<boolean>(() => getLayoutFromsStorage().settingsOpen);
    const [pickerFor, setPickerFor] = useState<number>(0);
    const [pickerAnchor, setPickerAnchor] = useState<null | HTMLElement>(null);
    const [pickerOpen, setPickerOpen] = useState<boolean>(false);
    const [pickerColor, setPickerColor] = useState<string>("");
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const theme = useTheme();

    const toggleSettings = () => {
        setOpen(!open);
        saveLayoutToStorage({
            ...getLayoutFromsStorage(),
            settingsOpen: !open
        });
    }

    const onHeightChange = (value: number | number[]) => {
        settings.height = Array.isArray(value) ? value[0] : value;
        setUpdateToDo();
    }

    const onSizeChange = (value: number | number[]) => {
        settings.circleRadius = Array.isArray(value) ? value[0] : value;
        setUpdateToDo();
    }

    const onColorChange = (value: string) => {
        settings.color = value;
        setUpdateToDo();
    }

    const onColorReset = () => {
        settings.color = theme.palette.primary.main;
        setUpdateToDo();
    }

    const onHighlightColorChange = (value: string) => {
        settings.highlightColor = value;
        setUpdateToDo();
    }

    const onHighlightColorReset = () => {
        settings.highlightColor = theme.palette.secondary.main;
        setUpdateToDo();
    }

    const openPicker = (e: MouseEvent<HTMLButtonElement>, forProp: number) => {
        setPickerFor(forProp);
        setPickerColor((forProp === 1) ? theme.palette.primary.main : theme.palette.secondary.main);
        setPickerAnchor(e.currentTarget);
        setPickerOpen(true);
    }

    const onColorPick = (color: ColorResult) => {
        setPickerColor(color.hex);
        if(pickerFor === 1) onColorChange(color.hex);
        else onHighlightColorChange(color.hex);
    }

    const setUpdateToDo = () => {
        if(timeoutId) clearTimeout(timeoutId);
        setTimeoutId(setTimeout(() => updateSettings(settings), 500));
    }
    
    return (
        <>
            <ListItemButton 
                onClick={() => toggleSettings()} 
                sx={{ backgroundColor: open ? "background.default" : "background.paper" }}
            >
                <ListItemIcon>
                    <Tune fontSize="small" sx={{color: "text.primary" }}/>
                </ListItemIcon>
                <ListItemText primary="Settings"/>
                {open 
                    ? <ExpandLess fontSize="small" sx={{color: "text.primary"}}/> 
                    : <ExpandMore fontSize="small" sx={{color: "text.primary"}}/>
                }
            </ListItemButton>
            <Collapse in={open}>
                <List
                    dense={true}
                    sx={{ width: 250, maxWidth: "100%", bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography fontSize="small" sx={{ mr: 1, width: "30%" }}>Height</Typography>
                        <Slider
                            aria-label="Height"
                            size="small"
                            step={1}
                            min={1}
                            max={100}
                            value={settings.height}
                            valueLabelDisplay="auto"
                            onChange={(_, v) => onHeightChange(v)}
                            sx={{ ml: 1, mr: 1 }}
                        />
                    </ListItem>
                    <ListItem>
                        <Typography fontSize="small" sx={{ mr: 1, width: "30%" }}>Size</Typography>
                        <Slider
                            aria-label="Size"
                            size="small"
                            step={1}
                            min={1}
                            max={20}
                            value={settings.circleRadius}
                            valueLabelDisplay="auto"
                            onChange={(_, v) => onSizeChange(v)}
                            sx={{ ml: 1, mr: 1 }}
                        />
                    </ListItem>
                    <ListItem>
                        <IconButton onClick={(e) => openPicker(e, 1)}>
                            <Circle fontSize="small" sx={{ color: settings.color}}></Circle>
                        </IconButton>
                        <TextField
                            size="small"
                            variant="outlined"
                            value={settings.color}
                            onChange={(e) => onColorChange(e.currentTarget.value)}
                            inputProps={{ sx: { fontSize: 14 }}}
                            InputLabelProps={{ sx: { fontSize: 14 }}}
                            sx={{ ml: 2, mt: 0.5, mb: 0.5 }}
                        ></TextField>
                        <IconButton onClick={() => onColorReset()}>
                            <Refresh fontSize="small" sx={{ color: "text.primary" }}></Refresh>
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <IconButton onClick={(e) => openPicker(e, 2)}>
                            <Circle fontSize="small" sx={{ color: settings.highlightColor}}></Circle>
                        </IconButton>
                        <TextField
                            size="small"
                            variant="outlined"
                            value={settings.highlightColor}
                            onChange={(e) => onHighlightColorChange(e.currentTarget.value)}
                            inputProps={{ sx: { fontSize: 14 }}}
                            InputLabelProps={{ sx: { fontSize: 14 }}}
                            sx={{ ml: 2, mt: 0.5, mb: 0.5 }}
                        ></TextField>
                        <IconButton onClick={() => onHighlightColorReset()}>
                            <Refresh fontSize="small" sx={{ color: "text.primary" }}></Refresh>
                        </IconButton>
                    </ListItem>
                    <ListItem>
                        <Typography fontSize="small" sx={{ mr: 1, width: "fill-available" }}>Theme</Typography>
                        <IconButton onClick={() => changeTheme("light")}>
                            <LightMode 
                                fontSize="small" 
                                sx={{ color: "secondary.main" }}
                            ></LightMode>
                        </IconButton>
                        <IconButton onClick={() => changeTheme("dark")}>
                            <DarkMode 
                                fontSize="small" 
                                sx={{ color: "primary.main" }}
                            ></DarkMode>
                        </IconButton>
                    </ListItem>
                </List>
            </Collapse>
            <Menu
                anchorEl={pickerAnchor}
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                MenuListProps={{ sx: { padding: 0 }}}
            >
                <SketchPicker
                    color={pickerColor}
                    onChange={(e: ColorResult) => onColorPick(e)}
                ></SketchPicker>
            </Menu>
        </>
    )
}
 
export default Settings;