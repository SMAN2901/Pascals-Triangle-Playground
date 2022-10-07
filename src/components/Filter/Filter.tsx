import { Checkbox, ListItem, ListItemIcon, ListItemText, Switch, TextField } from "@mui/material";
import { NumberFilter } from "../../models/NumberFilter";

const Filter = (
    { filter, refreshTriangle }: { filter: NumberFilter, refreshTriangle: () => void }
) => {
    const toggleActive = () => {
        filter.toggleActive();
        refreshTriangle();
    };

    const toggleChecked = () => {
        filter.toggle();
        refreshTriangle();
    };

    const inputChanged = (value: string) => {
        filter.inputValue = value;
        filter.inputChanged = true;
        refreshTriangle();
    }

    return (
        <ListItem>
            <ListItemIcon>
                <Checkbox
                  edge="start"
                  size="small"
                  checked={filter.active}
                  onChange={() => toggleActive()}
                  tabIndex={-1}
                  disableRipple
                />
            </ListItemIcon>
            {!filter.inputRequired && <ListItemText primary={filter.name}/>}
            {!filter.inputRequired && <Switch 
                size="small"
                checked={filter.checked}
                disabled={!filter.active}
                onChange={() => toggleChecked()} 
            />}
            {filter.inputRequired && <TextField
                size="small"
                variant="outlined"
                label={filter.name}
                placeholder="1,2,3"
                disabled={!filter.active}
                value={filter.inputValue}
                onChange={(e) => inputChanged(e.currentTarget.value)}
                inputProps={{ sx: { fontSize: 14 }}}
                InputLabelProps={{ sx: { fontSize: 14 }}}
                sx={{ ml: -1.7, mt: 0.5, mb: 0.5 }}
            ></TextField>}
        </ListItem>
    )
}
 
export default Filter;