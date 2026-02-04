import React, { useState, useRef, useEffect } from "react";
import { Triangle } from "../../models/Triangle";
import { Alert, Snackbar, Typography } from "@mui/material";
import { TriangleView } from "../../models/TriangleView";

const TriangleImage = (
    { triangle: t, settings }: { triangle: Triangle, settings: TriangleView }
) => {
    const [hoveredNumber, setHoveredNumber] = useState<string>("0");
    const [hoveredColor, setHoveredColor] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [hoveredCell, setHoveredCell] = useState<{r: number, c: number} | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const R = settings.circleRadius;

    const handleHover = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
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
                    setHoveredCell({r: h, c: p});

                    if(p + p > h) p = h - p;
                    setHoveredNumber(t.nums[h][p].toString());
                    setHoveredColor(t.colored[h][p]);
                    setSnackbarOpen(true);
                    return;
                }
            }
        }
        setHoveredCell(null);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = settings.height * (R + R);
        const height = settings.height * (R + R);

        // High DPI scaling
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        for(let i = 0; i < settings.height; i++) {
             if (!t.nums[i]) continue;

             for(let j = 0; j < t.nums[i].length; j++) {
                 // Draw left side (j)
                 let cx = j * (R + R) + R + (settings.height - 1 - i) * R;
                 let cy = i * (R + R) + R;

                 let color = (hoveredCell?.r === i && hoveredCell?.c === j)
                             ? "red"
                             : (t.colored[i][j] ? settings.highlightColor : settings.color);

                 ctx.beginPath();
                 ctx.arc(cx, cy, R, 0, 2 * Math.PI);
                 ctx.fillStyle = color;
                 ctx.fill();

                 // Draw right side (i - j) if symmetric
                 if (i - j > j) {
                     let colRight = i - j;
                     cx = colRight * (R + R) + R + (settings.height - 1 - i) * R;

                     color = (hoveredCell?.r === i && hoveredCell?.c === colRight)
                                 ? "red"
                                 : (t.colored[i][j] ? settings.highlightColor : settings.color);

                     ctx.beginPath();
                     ctx.arc(cx, cy, R, 0, 2 * Math.PI);
                     ctx.fillStyle = color;
                     ctx.fill();
                 }
             }
        }

    }, [t, settings, hoveredCell, R]);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{ cursor: 'pointer' }}
                onMouseMove={handleHover}
                onMouseLeave={() => setHoveredCell(null)}
            />
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