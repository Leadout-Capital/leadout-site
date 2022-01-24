import { graphql } from 'gatsby';
import React from 'react';

type BlogProps = {
  data: {
    posts: {
      edges: QueryNode<ContentfulBlogPost>[]
    },
  }
}

const blogListTemplate: React.FC<BlogProps> = ({ data }) => {
  return <div className="blog"><p>The blog list!!</p></div>;
};

export default blogListTemplate;

export const query = graphql`
  query AuthorBlogListQuery($skip: Int!, $limit: Int!, $slug: String!) {
    allContentfulBlogPost(
      filter: {author: {slug: {eq: $slug}, node_locale: {eq: "en-US"}}}
      sort: {order: DESC, fields: date}
      limit: $limit
      skip: $skip
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
            }
          }
        }
      }
    }
  }
`
