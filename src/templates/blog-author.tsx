import React from 'react';
import { graphql } from 'gatsby';
import { PostGrid } from '../components/Blog/PostGrid';
import { PageNav } from '../components/Blog/PageNav';

type BlogProps = {
  data: {
    posts: {
      edges: QueryNode<ContentfulBlogPost>[]
    },
  },
  pageContext: {
    currentPage: number;
    limit: number;
    numPages: number;
    skip: number;
    slug: string;
  }
}

const blogListTemplate: React.FC<BlogProps> = ({ data, pageContext }) => {
  return (
    <div className="blog">
      <h1>Blog</h1>
      <PostGrid posts={data.posts.edges} />
      <PageNav page={pageContext.currentPage} totalPages={pageContext.numPages} url={`/blog/author/${pageContext.slug}`} />
    </div>
  );
};

export default blogListTemplate;

export const query = graphql`
  query AuthorBlogListQuery($skip: Int!, $limit: Int!, $slug: String!) {
    posts: allContentfulBlogPost(
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
