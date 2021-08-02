import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedinIn, faMediumM } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { graphql, useStaticQuery } from "gatsby";

type QueryData = {
  contentfulFooter: ContentfulFooter
}

const Footer = () => {
  const { contentfulFooter }: QueryData = useStaticQuery(graphql`
    query FooterQuery {
      contentfulFooter(name: { eq: "Footer" }) {
        twitter
        linkedIn
        medium
        email
      }
    }
  `);
  return (
    <footer>
      {contentfulFooter.twitter && <a href={contentfulFooter.twitter} target={"_blank"}>
        <FontAwesomeIcon icon={faTwitter} />
      </a>}
      {contentfulFooter.linkedIn && <a href={contentfulFooter.linkedIn} target={"_blank"}>
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>}
      {contentfulFooter.medium && <a href={contentfulFooter.medium} target={"_blank"}>
        <FontAwesomeIcon icon={faMediumM} />
      </a>}
      {contentfulFooter.email && <a href={`mailto:${contentfulFooter.email}`} target={"_blank"}>
        <FontAwesomeIcon icon={faEnvelope} />
      </a>}
    </footer>
  )
};

export default Footer;