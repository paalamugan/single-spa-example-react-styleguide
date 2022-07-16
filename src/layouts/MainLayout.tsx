import { useMemo } from "react";

import { startCase, camelCase } from "lodash";
import { Outlet, useLocation } from "@app/router";

import { Box } from "@single-spa-example/react-mui";

import SubNavMenu, { NavMenusProps } from "@app/components/SubNavMenu";

interface MainLayoutProps {
  subNavMenu: {
    [key: string]: Array<NavMenusProps>;
  };
}

const getSubMenus = (subNavMenu, id, prefixPath): Array<NavMenusProps> => {
  let subNavMenus = subNavMenu[id] || [];
  const subMenus = subNavMenus.map((subNavMenu) => ({
    ...subNavMenu,
    path: prefixPath + subNavMenu.path,
  }));
  return subMenus;
};

const MainLayout = ({ subNavMenu }: MainLayoutProps) => {
  const { pathname } = useLocation();

  const title = startCase(pathname.split("/")[2]);
  const id = camelCase(title);
  const splits = pathname.split("/");
  const prefixPath = splits.slice(0, splits.length - 1).join("/");

  const menus = useMemo(
    () => getSubMenus(subNavMenu, id, prefixPath),
    [subNavMenu, prefixPath, id],
  );

  return (
    <Box>
      <SubNavMenu title={title} menus={menus} />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
