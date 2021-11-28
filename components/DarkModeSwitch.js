import Switch from "@mui/material/Switch";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { ColorContext } from "../context/ColorModeContext";
const DarkModeSwitch = () => {
  const { mode, toggleColorMode } = useContext(ColorContext);

  console.log("Mode", mode);
  const ColorModeSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#070058",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#808080",
    },
  }));

  return (
    <ColorModeSwitch
      sx={{ ml: "auto" }}
      checked={mode === "dark"}
      icon={<Brightness7Icon />}
      checkedIcon={<Brightness4Icon style={{ fill: "white" }} />}
      onChange={toggleColorMode}
    ></ColorModeSwitch>
  );
};

export default DarkModeSwitch;
