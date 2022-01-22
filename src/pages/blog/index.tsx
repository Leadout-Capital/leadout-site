import * as React from "react";
import "../../stylesheets/contact.scss";
import { graphql } from "gatsby";

type BlogProps = {
  data: {
    contactFormFields: {
      edges: QueryNode<ContentfulContactFormField>[]
    },
    contactFormTitle: ContentfulTextField,
    contactFormSubtitle: ContentfulTextField
  }
}

const Blog: React.FC<BlogProps> = ({ data }) => {
  return (
    <main className={"contact"}>
      <p>The blog!</p>
    </main>
  )
};

export default Blog;

export const query = graphql`
  query {
    contactFormFields: allContentfulContactFormField(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: [index] }
    ) {
      edges {
        node {
          key
          title
          subtitle
          required
          type
          options
          airtableTableName
          airtableColumnName
        }
      }
    }
    contactFormTitle: contentfulTextField(name: { eq: "Contact Form Title" }) {
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    contactFormSubtitle: contentfulTextField(name: { eq: "Contact Form Subtitle" }) {
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
