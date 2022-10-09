import { Checkbox, ListItem, ListItemIcon, ListItemText, Switch, TextField } from "@mui/material";
import { useState } from "react";
import { NumberFilter } from "../../models/NumberFilter";

const Filter = (
    { filter, refreshTriangle }: { filter: NumberFilter, refreshTriangle: () => void }
) => {
    const [filterState] = useState<NumberFilter>(filter.getClone());
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

    const toggleActive = () => {
        filterState.toggleActive();
        setUpdateToDo();
    };

    const toggleChecked = () => {
        filterState.toggle();
        setUpdateToDo();
    };

    const inputChanged = (value: string) => {
        filterState.inputValue = value;
        setUpdateToDo(true);
    }

    const setUpdateToDo = (inputChanged: boolean = false) => {
        if(timeoutId) clearTimeout(timeoutId);
        setTimeoutId(setTimeout(() => updateFilter(inputChanged), 500));
    }

    const updateFilter = (inputChanged: boolean = false) => {
        filter.active = filterState.active;
        filter.checked = filterState.checked;
        filter.inputValue = filterState.inputValue;
        filter.inputChanged = inputChanged;
        refreshTriangle();
    }

    return (
        <ListItem>
            <ListItemIcon>
                <Checkbox
                  edge="start"
                  size="small"
                  checked={filterState.active}
                  onChange={() => toggleActive()}
                  tabIndex={-1}
                  disableRipple
                />
            </ListItemIcon>
            {!filterState.inputRequired && <ListItemText primary={filterState.name}/>}
            {!filterState.inputRequired && <Switch 
                size="small"
                checked={filterState.checked}
                disabled={!filterState.active}
                onChange={() => toggleChecked()} 
            />}
            {filterState.inputRequired && <TextField
                size="small"
                variant="outlined"
                label={filterState.name}
                placeholder="1,2,3"
                disabled={!filterState.active}
                value={filterState.inputValue}
                onChange={(e) => inputChanged(e.currentTarget.value)}
                inputProps={{ sx: { fontSize: 14 }}}
                InputLabelProps={{ sx: { fontSize: 14 }}}
                sx={{ ml: -1.7, mt: 0.5, mb: 0.5 }}
            ></TextField>}
        </ListItem>
    )
}
 
export default Filter;