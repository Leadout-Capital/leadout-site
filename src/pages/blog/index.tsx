import * as React from "react";
import "../../stylesheets/contact.scss";
import { graphql } from "gatsby";
import { format, parseISO } from "date-fns";

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
      {data.posts.edges.map((post) => {
        const formattedDate = format(parseISO(post.node.date), 'MMMM dd, yyyy');
        const author = 'Leadout Capital';

        return (
          <div>
            <p>{post.node.title}</p>
            <p>{formattedDate}</p>
            <p>by: {author}</p>
            <p>Excerpt: {post.node.body?.childMarkdownRemark?.excerpt}</p>
            <p>Time to read: {post.node.body?.childMarkdownRemark?.timeToRead}</p>
            <p>Category: {post.node.category?.name} {post.node.category?.color}</p>
          </div>
        )
      }
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
