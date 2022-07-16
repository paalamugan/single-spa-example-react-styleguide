import { Link as MuiLink } from "@single-spa-example/react-mui";
import { Link, NavLink, LinkProps, NavLinkProps } from "react-router-dom";

export function RouterLink(props: LinkProps) {
  return <MuiLink component={Link} {...props} />;
}

export function RouterNavLink(props: NavLinkProps | any) {
  return <MuiLink component={NavLink} {...props} />;
}
