import { DownloadRounded } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const Downloader = () => {
    const downloadImage = () => {
        const svg = document.getElementById("triangleSVG");
        if(!svg) return;

        const uriData = `data:image/svg+xml;base64,${window.btoa(new XMLSerializer().serializeToString(svg))}`;
        const img = new Image();
        const { width, height } = svg.getBoundingClientRect();

        img.src = uriData;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            [canvas.width, canvas.height] = [width, height];

            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);

            const url = canvas.toDataURL("image/png", 1.0);
            const a = document.createElement("a");
            a.href = url;
            a.download = "triangle.png";
            a.append(canvas);
            a.click();
            a.remove();
        };
    }

    return (
        <ListItemButton onClick={downloadImage}>
            <ListItemIcon>
                    <DownloadRounded fontSize="small" sx={{color: "text.primary" }}/>
            </ListItemIcon>
            <ListItemText primary="Export"/>
        </ListItemButton>
    );
}
 
export default Downloader;