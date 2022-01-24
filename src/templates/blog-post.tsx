import { CategoryButton } from '../components/Blog/CategoryButton';
import { graphql } from 'gatsby';
import React from 'react';
import "../stylesheets/post.scss";

type PostProps = {
  data: {
    post: ContentfulBlogPost;
  }
}

const blogPost: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-meta">
          <CategoryButton color={data.post.category.color} category={data.post.category.name} url={`/blog/category/${data.post.category.slug}`} />
          <h1>{data.post.title}</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.post.body.childMarkdownRemark.html }} className="post-body"/>
      </div>
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
