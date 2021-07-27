import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedinIn, faMediumM } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => (
  <footer>
    <a href={"https://twitter.com/leadoutcapital"} target={"_blank"}>
      <FontAwesomeIcon icon={faTwitter} />
    </a>
    <a href={"https://www.linkedin.com/company/leadout-capital/about/"} target={"_blank"}>
      <FontAwesomeIcon icon={faLinkedinIn} />
    </a>
    <a href={"https://medium.com/@leadoutcapital"} target={"_blank"}>
      <FontAwesomeIcon icon={faMediumM} />
    </a>
    <a href={"mailto:grit@leadoutcapital.com"} target={"_blank"}>
      <FontAwesomeIcon icon={faEnvelope} />
    </a>
  </footer>
);

export default Footer;