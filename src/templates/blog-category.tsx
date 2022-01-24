import { graphql } from 'gatsby';
import React from 'react';

const blogListTemplate = () => {
  return <div className="blog"><p>The blog list!!</p></div>;
};

export default blogListTemplate;

export const query = graphql`
  query categoryBlogListQuery($skip: Int!, $limit: Int!, $slug: String!) {
    allContentfulBlogPost(
      filter: {category: {slug: {eq: $slug}, node_locale: {eq: "en-US"}}}
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
