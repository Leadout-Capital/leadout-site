import React from 'react';
import { PostCard } from './PostCard';

export const PostGrid: React.FC<{ posts: QueryNode<ContentfulBlogPost>[] }> = ({posts}) => {
  return <div className="post-grid">{posts.map((post, i) => <PostCard key={i} post={post} />)}</div>;
};
