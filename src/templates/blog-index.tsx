import React from 'react';
import { graphql } from 'gatsby';
import { PostGrid } from '../components/Blog/PostGrid';
import { PageNav } from '../components/Blog/PageNav';
import "../stylesheets/blog.scss";

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
  }
}

const blogIndexTemplate: React.FC<BlogProps> = ({ data, pageContext }) => {
  return (
    <main className="blog">
      <h1>Blog</h1>
      <PostGrid posts={data.posts.edges} />
      <PageNav page={pageContext.currentPage} totalPages={pageContext.numPages} url={'/blog'} />
    </main>
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
          slug
          date
          category {
            name
            slug
            color
          }
          author {
            name
            slug
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
