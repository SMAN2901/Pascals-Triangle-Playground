import React, { useState } from "react";
import { Triangle } from "../../models/Triangle";
import { useTheme } from "@mui/material/styles";
import { Alert, Snackbar, Typography } from "@mui/material";
import { TripOrigin } from "@mui/icons-material";
import style from "./TriangleImage.module.scss";

const TriangleImage = (
    { triangle: t, height }: { triangle: Triangle, height: number }
) => {
    const theme = useTheme();
    const [hoveredNumber, setHoveredNumber] = useState<number>(0);
    const [hoveredColor, setHoveredColor] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    const R: number = 3;
    let a: number[] = [];

    for(let i = 0; i < height; i++) {
        a.push(i);
    }

    const handleHover = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        let { left, top } = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - left;
        let y = e.clientY - top;

        let h = Math.floor(y / (R + R));
        let l = (height - 1 - h) * R;
        let r = height * (R + R) - l;

        if(x >= l && x <= r) {
            let p = Math.floor((x - l) / (R + R));
            
            if(p >= 0 && p <= h) {
                let cx = l + p * (R + R) + R;
                let cy = h * (R + R) + R;
                let d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));

                if(d <= R) {
                    setHoveredNumber(t.nums[h][p]);
                    setHoveredColor(t.colored[h][p]);
                    setSnackbarOpen(true);
                    return;
                }
            }
        }

        //setHoveredNumber(0);
    }

    const getRow = (i: number) => (
        <React.Fragment key={i}>
            {t.nums[i].map((x, j) => (
                <circle
                    className={style.circle}
                    key={j}
                    cx={j * (R + R) + R + (height - 1 - i) * R}
                    cy={i * (R + R) + R}
                    r={R}
                    stroke="transparent"
                    strokeWidth={1}
                    fill={t.colored[i][j] ? theme.palette.secondary.main : theme.palette.primary.main}
                ></circle>
            ))}
        </React.Fragment>
    );

    return (
        <>
            <svg 
                width={height * (R + R)} 
                height={height * (R + R)}
                onMouseMove={(e) => handleHover(e)}
            >
                {a.map((i) => getRow(i))}
            </svg>
            <Snackbar 
                open={snackbarOpen}
                autoHideDuration={6000} 
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ mt: 4 }}
            >
                <Alert
                    variant="outlined"
                    color="info"
                    icon={<TripOrigin 
                        fontSize="small" 
                        color={hoveredNumber ? (hoveredColor ? "secondary" : "primary") : "disabled"}
                        sx={{ pt: 0.4 }}
                    ></TripOrigin>}
                    sx={{ minWidth: "100px" }}
                >
                    <Typography 
                        variant="button" 
                        color="text.primary"
                    >
                        {hoveredNumber}
                    </Typography>
                </Alert>
            </Snackbar>
        </>
    );
}
 
export default TriangleImage;