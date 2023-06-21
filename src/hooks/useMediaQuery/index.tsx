import { useMediaQuery, useTheme } from "@mui/material";
import { Breakpoint } from "@mui/system";
import { useEffect, useState } from "react";

const useMediaQueryUpHook = (breakpoint: Breakpoint = "md") => {
  const [state, setstate] = useState<boolean>(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(breakpoint));

  useEffect(() => {
    setstate(matches);
    return () => {
      setstate(false);
    };
  }, [matches]);
  return state;
};

export default useMediaQueryUpHook;
