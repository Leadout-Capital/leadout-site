import * as React from "react";
import "../../stylesheets/blog.scss";
import { graphql } from "gatsby";
import { PostGrid } from "../../components/Blog/PostGrid";

type BlogProps = {
  data: {
    posts: {
      edges: QueryNode<ContentfulBlogPost>[]
    },
  }
}

const Blog: React.FC<BlogProps> = ({ data }) => {
  return (
    <main className={"blog"}>
      <h1>Blog</h1>
      <PostGrid posts={data.posts.edges} />
    </main>
  )
};

export default Blog;

export const query = graphql`
  query {
    posts: allContentfulBlogPost(
      filter: { node_locale: { eq: "en-US" }  }
      sort: {fields: date, order: DESC}
    ) {
      edges {
        node {
          title
          date
          category {
            name
            color
          }
          author {
            name
            image {
              file {
                url
              }
            }
          }
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 100)
              timeToRead
              html
            }
          }
        }
      }
    }
  }
`;
