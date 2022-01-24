import { PostGrid } from '../components/Blog/PostGrid';
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
  return (
    <div className="blog">
      <h1>Blog</h1>
      <PostGrid posts={data.posts.edges} />
    </div>
  );
};

export default blogListTemplate;

export const query = graphql`
  query categoryBlogListQuery($skip: Int!, $limit: Int!, $slug: String!) {
    posts: allContentfulBlogPost(
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
