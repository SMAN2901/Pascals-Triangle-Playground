import React, { useState } from "react";
import { Triangle } from "../../models/Triangle";
import { Alert, Snackbar, Typography } from "@mui/material";
import style from "./TriangleImage.module.scss";
import { TriangleView } from "../../models/TriangleView";

const TriangleImage = (
    { triangle: t, settings }: { triangle: Triangle, settings: TriangleView }
) => {
    const [hoveredNumber, setHoveredNumber] = useState<string>("0");
    const [hoveredColor, setHoveredColor] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const R = settings.circleRadius;

    let a: number[] = [];

    for(let i = 0; i < settings.height; i++) {
        a.push(i);
    }

    const handleHover = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        let { left, top } = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - left;
        let y = e.clientY - top;

        let h = Math.floor(y / (R + R));
        let l = (settings.height - 1 - h) * R;
        let r = settings.height * (R + R) - l;

        if(x >= l && x <= r) {
            let p = Math.floor((x - l) / (R + R));
            
            if(p >= 0 && p <= h) {
                let cx = l + p * (R + R) + R;
                let cy = h * (R + R) + R;
                let d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));

                if(d <= R) {
                    if(p + p > h) p = h - p;
                    setHoveredNumber(t.nums[h][p].toString());
                    setHoveredColor(t.colored[h][p]);
                    setSnackbarOpen(true);
                    return;
                }
            }
        }
    }

    const getRow = (i: number, reverse: boolean = false) => (
        <React.Fragment key={(reverse ? "R" : "L") + i}>
            {t.nums[i].map((_, j) => (
                (!reverse || (reverse && i - j > j)) && <circle
                    className={style.circle}
                    key={(reverse ? "R" : "L") + j}
                    cx={(reverse ? (i - j) : j) * (R + R) + R + (settings.height - 1 - i) * R}
                    cy={i * (R + R) + R}
                    r={R}
                    stroke="transparent"
                    strokeWidth={1}
                    fill={t.colored[i][j] ? settings.highlightColor : settings.color}
                ></circle>
            ))}
        </React.Fragment>
    );

    return (
        <>
            <svg 
                id="triangleSVG"
                width={settings.height * (R + R)} 
                height={settings.height * (R + R)}
                onMouseMove={(e) => handleHover(e)}
            >
                {a.map((i) => getRow(i))}
                {a.map((i) => getRow(i, true))}
            </svg>
            <Snackbar 
                open={snackbarOpen}
                autoHideDuration={6000} 
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    variant="filled"
                    color={hoveredColor ? "warning" : "info"}
                    icon={false}
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