import { FilterAltOutlined, ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText, Collapse, List } from "@mui/material";
import { useState } from "react";
import { NumberFilter } from "../../models/NumberFilter";
import { getLayoutFromsStorage, saveLayoutToStorage } from "../../services/SettingsDataService";
import Filter from "../Filter/Filter";

const Filters = (
    { filters, refreshTriangle }: { filters: NumberFilter[], refreshTriangle: () => void }
) => {
    const [open, setOpen] = useState<boolean>(() => getLayoutFromsStorage().filtersOpen);

    const toggleFilters = () => {
        setOpen(!open);
        saveLayoutToStorage({
            ...getLayoutFromsStorage(),
            filtersOpen: !open
        });
    }

    return (
        <>
            <ListItemButton 
                onClick={() => toggleFilters()}
                sx={{ 
                    backgroundColor: open ? "background.default" : "background.paper",
                    borderColor: open ? "primary.main" : "transparent"
                }}
            >
                <ListItemIcon>
                    <FilterAltOutlined fontSize="small" sx={{color: "text.primary" }}/>
                </ListItemIcon>
                <ListItemText primary="Filters"/>
                {open 
                    ? <ExpandLess fontSize="small" sx={{color: "text.primary"}}/> 
                    : <ExpandMore fontSize="small" sx={{color: "text.primary"}}/>
                }
            </ListItemButton>
            <Collapse in={open}>
                <List
                    dense={true}
                    sx={{ 
                        width: 250, 
                        maxWidth: "100%", 
                        bgcolor: 'background.paper'
                    }}
                >
                    {filters.map((filter, i) => (
                        <Filter 
                            key={i} 
                            filter={filter} 
                            refreshTriangle={refreshTriangle}
                        />
                    ))}
                </List>
            </Collapse>
        </>
    );
}
 
export default Filters;