import { format, parseISO } from 'date-fns';
import { Link } from 'gatsby';
import React from 'react';

export const PostCard: React.FC<{ post: QueryNode<ContentfulBlogPost> }> = ({ post }) => {
  const formattedDate = format(parseISO(post.node.date), 'MMMM dd, yyyy');
  const author = 'Leadout Capital';

  return (
    <div className="post-card">
      <div className="inner-card">
        <article>
          <div className="text-wrapper">
            <div className="category-container">
              <CategoryButton color={post.node.category.color} category={post.node.category.name} />
            </div>
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


const CategoryButton = ({ category, color }) => (
  <div className={`category ${color}`}><Link to="/blog/category">{category}</Link></div>
)
