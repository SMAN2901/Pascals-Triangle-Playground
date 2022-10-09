import { Handshake, Person, Workspaces } from "@mui/icons-material";
import { Divider, Link, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const ExternalLinks = () => {
    const links = [
        {
            name: "Pascal's Triangle",
            link: "https://en.wikipedia.org/wiki/Pascal%27s_triangle",
            icon: <Workspaces fontSize="small" sx={{color: "text.primary" }}/>
        },
        {
            name: "Contribute",
            link: "https://github.com/SMAN2901/pascals-triangle-playground",
            icon: <Handshake fontSize="small" sx={{color: "text.primary" }}/>
        },
        {
            name: "Author",
            link: "https://github.com/SMAN2901",
            icon: <Person fontSize="small" sx={{color: "text.primary" }}/>
        }
    ];

    return (
        <>
            {links.map((item) => <>
                <Divider light={false} component="li" />
                <ListItem 
                    component={Link} 
                    href={item.link}
                    target="_blank"
                    color="text.primary"
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name}/>
                </ListItem>
            </>)}
        </>
    );
}
 
export default ExternalLinks;