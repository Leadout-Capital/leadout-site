import { CategoryButton } from '../components/Blog/CategoryButton';
import { graphql, Link } from 'gatsby';
import React from 'react';
import "../stylesheets/post.scss";
import { format, parseISO } from 'date-fns';
import { Clock } from '../components/Icons/Clock';

type PostProps = {
  data: {
    post: ContentfulBlogPost;
  }
}

const blogPost: React.FC<PostProps> = ({ data }) => {
  const formattedDate = format(parseISO(data.post.date), 'MMMM dd, yyyy');
  return (
    <main className="post">
      <div className="post-wrapper">
        <div className="post-meta">
          <CategoryButton color={data.post.category.color} category={data.post.category.name} url={`/blog/category/${data.post.category.slug}`} />
          <h1>{data.post.title}</h1>
          {data.post.subtitle && <h2>{data.post.subtitle}</h2>}
          <div className="author-details">
              {data.post.author ? (
                <Link to={`/blog/author/${data.post.author.slug}`}>
                  <div className="author-image-wrapper">
                    <img src={data.post.author.image.file.url} alt={data.post.author.name} />
                  </div>
                </Link>
              ) : (
                ''
              )}
              <div className="author-text">
                <Link to={`/blog/author/${data.post.author.slug}`}>
                  <p className="name">{data.post.author.name}</p>
                </Link>
                <div className="date-time">
                  <p className="date">{formattedDate}</p>
                  <p className="time">
                    {' '}
                    ・<Clock /> {data.post.body?.childMarkdownRemark?.timeToRead} min
                  </p>
                </div>
              </div>
            </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.post.body.childMarkdownRemark.html }} className="post-body"/>
      </div>
    </main>
  );
};

export default blogPost;

export const query = graphql`
  query BlogPostBySlug(
    $slug: String!
  ) {
    post: contentfulBlogPost(slug: {eq: $slug}) {
      title
      subtitle
      date
      category {
        name
        color
        slug
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
          html
        }
      }
    }
  }
`;
