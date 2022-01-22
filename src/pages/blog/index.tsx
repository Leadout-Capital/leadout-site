import * as React from "react";
import "../../stylesheets/contact.scss";
import { graphql } from "gatsby";

type BlogProps = {
  data: {
    posts: {
      edges: QueryNode<ContentfulBlogPost>[]
    },
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
    posts: allContentfulBlogPost( filter: { node_locale: { eq: "en-US" } } ) {
      edges {
        node {
          title
          category {
            name
            color
          }
        }
      }
    }
  }
`;
