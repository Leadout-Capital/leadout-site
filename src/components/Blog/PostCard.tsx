import React from 'react';
import { Link } from 'gatsby';
import { format, parseISO } from 'date-fns';
import { CategoryButton } from './CategoryButton';

export const PostCard: React.FC<{ post: QueryNode<ContentfulBlogPost> }> = ({ post }) => {
  const formattedDate = format(parseISO(post.node.date), 'MMMM dd, yyyy');

  return (
    <div className="post-card">
      <div className="inner-card">
        <article>
          <div className="text-wrapper">
            <div className="category-container">
              <CategoryButton color={post.node.category.color} category={post.node.category.name} url={`/blog/category/${post.node.category.slug}`} />
            </div>
            {post.node.title ? (
              <Link to={`/blog/${post.node.slug}`}>
                <p className="title">{post.node.title}</p>
              </Link>
            ) : (
              ''
            )}
            {post.node.body?.childMarkdownRemark?.excerpt ? <p className="excerpt">{post.node.body?.childMarkdownRemark?.excerpt}</p> : ''}
            <div className="author-details">
              {post.node.author ? (
                <Link to={`/blog/author/${post.node.author.slug}`}>
                  <div className="author-image-wrapper">
                    <img src={post.node.author.image.file.url} alt={post.node.author.name} />
                  </div>
                </Link>
              ) : (
                ''
              )}
              <div className="author-text">
                <Link to={`/blog/author/${post.node.author.slug}`}>
                  <p className="name">{post.node.author.name}</p>
                </Link>
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
