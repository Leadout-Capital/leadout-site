import { CategoryButton } from '../components/Blog/CategoryButton';
import { graphql } from 'gatsby';
import React from 'react';

type PostProps = {
  data: {
    post: ContentfulBlogPost;
  }
}

const blogPost: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="blog">
      <CategoryButton color={data.post.category.color} category={data.post.category.name} url={`/blog/category/${data.post.category.slug}`} />
      <h1>The post!!</h1>
    </div>
  );
};

export default blogPost;

export const query = graphql`
  query BlogPostBySlug(
    $slug: String!
  ) {
    post: contentfulBlogPost(slug: {eq: $slug}) {
      title
      date
      category {
        name
        color
        slug
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
