import { useContext } from "react";
import { ThemeContext, ThemeContextProps } from "@app/providers/ThemeProvider";

export function useTheme(): ThemeContextProps {
  return useContext(ThemeContext);
}
