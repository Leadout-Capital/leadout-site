import { format, parseISO } from 'date-fns';
import React from 'react';

export const PostCard = ({ post }) => {
  const formattedDate = format(parseISO(post.node.date), 'MMMM dd, yyyy');
    const author = 'Leadout Capital';

    return (
      <div>
        <p>{post.node.title}</p>
        <p>{formattedDate}</p>
        <p>by: {author}</p>
        <p>Excerpt: {post.node.body?.childMarkdownRemark?.excerpt}</p>
        <p>Time to read: {post.node.body?.childMarkdownRemark?.timeToRead}</p>
        <p>Category: {post.node.category?.name} {post.node.category?.color}</p>
      </div>
    )
};
