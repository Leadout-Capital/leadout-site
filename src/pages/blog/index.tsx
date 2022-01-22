import * as React from "react";
import "../../stylesheets/contact.scss";
import { graphql } from "gatsby";
import { PostCard } from "../../components/Blog/PostCard";

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
      {data.posts.edges.map((post) => <PostCard post={post} />
      )}
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
