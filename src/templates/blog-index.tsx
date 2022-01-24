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

const blogIndexTemplate: React.FC<BlogProps> = ({ data }) => {
  return (
    <div className="blog">
      <h1>Blog</h1>
      <PostGrid posts={data.posts.edges} />
    </div>
  );
};

export default blogIndexTemplate;

export const query = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    posts: allContentfulBlogPost(
      filter: {node_locale: {eq: "en-US"}}
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
