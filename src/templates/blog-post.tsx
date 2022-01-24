import { graphql } from 'gatsby';
import React from 'react';

type PostProps = {
  data: {
    contentfulBlogPost: ContentfulBlogPost;
  }
}

const blogPost: React.FC<PostProps> = ({ data }) => {
  return <div className="blog">The post!!</div>;
};

export default blogPost;

export const query = graphql`
  query BlogPostBySlug(
    $slug: String!
  ) {
    contentfulBlogPost(slug: {eq: $slug}) {
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
`;
