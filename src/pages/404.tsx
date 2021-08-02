import * as React from "react"
import "../stylesheets/404.scss";
import { graphql } from "gatsby";

type NotFoundProps = {
  data: {
    contentfulTextField: ContentfulTextField
  }
}

const NotFound: React.FC<NotFoundProps> = ({ data }) => (
  <main className={"not-found"}>
    <header dangerouslySetInnerHTML={{ __html: data.contentfulTextField.body.childMarkdownRemark.html }} />
  </main>
);

export default NotFound;

export const query = graphql`
  query {
    contentfulTextField(name: { eq: "Not Found Content" }) {
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;