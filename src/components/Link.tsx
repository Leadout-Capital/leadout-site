import * as React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { AProps } from "react-html-props";

const ACCENT_COLOR = "#79a5b9";
export const TRANSITION_DURATION = 1.5;

type LinkProps = AProps & {
  to
}

const Link: React.FC<LinkProps> = ({ to, ...props }) => (
  <AniLink
    {...props}
    cover
    bg={ACCENT_COLOR}
    direction={"up"}
    to={to}
    duration={TRANSITION_DURATION}
  />
);

export default Link;