import { useState, useEffect, useRef, useCallback } from "react";
import { RouterNavLink } from "@app/components/RouterLink";

import {
  Paper,
  Box,
  Grid,
  Typography,
  Stack,
  purple,
  lightBlue,
  blue,
  SvgIcon,
  AddBusinessIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  IconButton,
} from "@single-spa-example/react-mui";

export interface NavMenusProps {
  name: string;
  path: string;
  svgIcon: typeof SvgIcon;
}

export interface SubNavMenuProps {
  title: string;
  menus: NavMenusProps[];
}

export function SubNavMenu({ title, menus }: SubNavMenuProps) {
  const [subNavMenus, setSubNavmenus] = useState([]);
  const [hasOverflow, setHasOverflow] = useState(false);
  const ref = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    setSubNavmenus(menus);
  }, [menus]);

  const loadArrowButton = useCallback(() => {
    timerRef.current = setTimeout(() => {
      const clientWidth = ref.current?.clientWidth;
      const scrollWidth = ref.current?.scrollWidth;

      if (!clientWidth) {
        return loadArrowButton();
      }
      clearTimeout(timerRef.current);
      setHasOverflow(clientWidth < scrollWidth);
    }, 0);
  }, []);

  useEffect(loadArrowButton, [loadArrowButton]);

  const backArrowClick = () => {
    const lastIndex = subNavMenus.length - 1;
    const lastSubNavMenu = subNavMenus[lastIndex];
    const newSubNavMenus = subNavMenus.slice(0, lastIndex);
    setSubNavmenus([lastSubNavMenu, ...newSubNavMenus]);
  };

  const forwardArrowClick = () => {
    const firstSubNavMenu = subNavMenus[0];
    const newSubNavMenus = subNavMenus.slice(1, subNavMenus.length);
    setSubNavmenus([...newSubNavMenus, firstSubNavMenu]);
  };

  return (
    !!subNavMenus.length && (
      <Grid container bgcolor={lightBlue["50"]} px={1} py={2} alignItems="center">
        <Grid item xs={2} xl={1.5}>
          <Typography variant="h6" noWrap color={purple["500"]}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={10} xl={10.5}>
          <Stack direction="row" spacing={2}>
            {hasOverflow && (
              <IconButton
                sx={{
                  maxHeight: "40px",
                  marginTop: "auto !important",
                  marginBottom: "auto !important",
                }}
                onClick={backArrowClick}>
                <ArrowBackIosIcon sx={{ color: blue["900"] }} />
              </IconButton>
            )}

            <Box sx={{ flex: 1, overflow: "hidden", width: 0 }}>
              <Stack direction="row" justifyContent="start" spacing={3} ref={ref}>
                {subNavMenus.map(({ name, path, svgIcon: SvgIcon = AddBusinessIcon }) => {
                  return (
                    <RouterNavLink
                      key={name}
                      to={path}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        "&.active": {
                          bgcolor: "common.white",
                        },
                      }}>
                      <Stack alignItems="center">
                        <Paper
                          elevation={2}
                          sx={{
                            borderRadius: "100vw",
                            maxWidth: "40px",
                          }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: purple["50"],
                              borderRadius: "100vw",
                              px: 2,
                              py: 0.5,
                            }}>
                            <SvgIcon sx={{ fontSize: "1rem", color: purple["500"] }} />
                          </Box>
                        </Paper>
                        <Typography noWrap mt={0.5} variant="body2" color={blue["900"]}>
                          <strong>{name}</strong>
                        </Typography>
                      </Stack>
                    </RouterNavLink>
                  );
                })}
              </Stack>
            </Box>
            {hasOverflow && (
              <IconButton
                onClick={forwardArrowClick}
                sx={{
                  maxHeight: "40px",
                  marginTop: "auto !important",
                  marginBottom: "auto !important",
                }}>
                <ArrowForwardIosIcon sx={{ color: blue["900"] }} />
              </IconButton>
            )}
          </Stack>
        </Grid>
      </Grid>
    )
  );
}

export default SubNavMenu;
