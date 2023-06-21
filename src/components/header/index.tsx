import { Box } from "@mui/system";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import HeaderLogo from "./headerLogo.png";

const Header = () => {
  const isMd = useMediaQueryUpHook();
  return (
    <Box width="100%" height="10rem" display="flex" justifyContent="center">
      <Box width={isMd ? "60%" : "100%"} height="100%" position="relative">
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          loading="lazy"
          src={HeaderLogo}
          alt="Header"
        />
      </Box>
    </Box>
  );
};

export default Header;
