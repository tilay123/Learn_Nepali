import { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import { HexColorPicker } from "react-colorful";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
export default function WriteOnCanvas({ small = false }) {
  if (small) {
    console.log("Small canvas");
  }
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("tomato");
  const [tempColor, setTempColor] = useState("tomato");

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    console.log("Use Effect called");

    //to support screens with higher screen density like Mac OS with Retina Screen we need to double the
    // pixel density.

    var width = small
      ? 250
      : window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    var height = small
      ? 250
      : window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    canvas.width = width * 2;
    canvas.height = height * 2;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // canvas.width = 600;
    // canvas.height = 600;
    // canvas.style.width = "300px";
    // canvas.style.height = "300px";

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round"; // round endings
    context.lineJoin = "round";

    context.strokeStyle = "tomato";
    context.lineWidth = 10;
    contextRef.current = context;
  }, [small]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log("onMouseDown");
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);

    setIsDrawing(true);
  };

  const handleTouchStart = (e) => {
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;

    const offsets = canvasRef.current.getBoundingClientRect();
    contextRef.current.beginPath();
    contextRef.current.moveTo(x - offsets.left, y - offsets.top);

    setIsDrawing(true);
  };

  const handleTouchMove = (e) => {
    if (!isDrawing) {
      return;
    }

    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;

    const offsets = canvasRef.current.getBoundingClientRect();

    contextRef.current.lineTo(x - offsets.left, y - offsets.top);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke(); // draw
    console.log("draw");
  };
  return (
    <Box>
      <Button
        sx={{ position: "absolute", ml: 1, mt: 1 }}
        variant="outlined"
        startIcon={<ClearIcon />}
        onClick={(e) =>
          contextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          )
        }
      >
        Clear
      </Button>

      <div
        onClick={() => setDialogIsOpen(!dialogIsOpen)}
        style={{
          height: "32px",
          width: "30px",
          position: "absolute",
          marginTop: "10px",
          marginLeft: "120px",
          backgroundColor: `${color}`,
        }}
      ></div>
      <Dialog onClose={(value) => setDialogIsOpen(false)} open={dialogIsOpen}>
        <Box sx={{ p: 2 }}>
          <DialogTitle>Pick a color</DialogTitle>
          <HexColorPicker
            color={color}
            onChange={(clr) => {
              setTempColor(clr);
            }}
          />
        </Box>

        <Button
          onClick={() => {
            setColor(tempColor);
            contextRef.current.strokeStyle = tempColor;
            setDialogIsOpen(false);
          }}
        >
          Save
        </Button>
        <Button sx={{ mb: 2 }} onClick={() => setDialogIsOpen(false)}>
          Cancel
        </Button>
      </Dialog>

      <canvas
        style={{
          border: "1px solid",
          userSelect: "none",
          WebkitUserDrag: "none",
          touchAction: "none", // prevent scrolling on mobile
          cursor: "pointer",
        }}
        onMouseDown={startDrawing}
        onTouchStart={handleTouchStart}
        onMouseUp={finishDrawing}
        onTouchEnd={finishDrawing}
        onMouseMove={draw}
        onTouchMove={handleTouchMove}
        ref={canvasRef}
      ></canvas>
    </Box>
  );
}
