import { format, parseISO } from 'date-fns';
import { Link } from 'gatsby';
import React from 'react';

export const PostCard: React.FC<{ post: QueryNode<ContentfulBlogPost> }> = ({ post }) => {
  const formattedDate = format(parseISO(post.node.date), 'MMMM dd, yyyy');
    const author = 'Leadout Capital';

    return (
      // <article className="post-card">
      //   <p>{post.node.title}</p>
      //   <p>{formattedDate}</p>
      //   <p>by: {author}</p>
      //   <p>Excerpt: {post.node.body?.childMarkdownRemark?.excerpt}</p>
      //   <p>Time to read: {post.node.body?.childMarkdownRemark?.timeToRead}</p>
      //   <p>Category: {post.node.category?.name} {post.node.category?.color}</p>
      // </article>
      <div className="post-card">
        <div className="inner-card">
          <article>
            <div className="text-wrapper">
              {/* <div className="category-container">
                <p>Category</p>
              </div> */}
              {post.node.title ? (
                <Link to={`/blog/${post.node.title}`}>
                  <p className="title">{post.node.title}</p>
                </Link>
              ) : (
                ''
              )}
              {post.node.body?.childMarkdownRemark?.excerpt ? <p className="excerpt">{post.node.body?.childMarkdownRemark?.excerpt}</p> : ''}
              <div className="author-details">
                {/* {post.author.thumbnail ? (
                  <Link href={post.author.url}>
                    <div className="author-image-wrapper">
                      <Image {...post.author.thumbnail} />
                    </div>
                  </Link>
                ) : (
                  ''
                )} */}
                <div className="author-text">
                  {/* <Link href={post.author.url}> */}
                    <p className="name">{author}</p>
                  {/* </Link> */}
                  <div className="date-time">
                    <p className="date">{formattedDate}</p>
                    <p className="time">
                      {' '}
                      ・{post.node.body?.childMarkdownRemark?.timeToRead} min
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
};
