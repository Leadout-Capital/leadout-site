import React from 'react';
import { PostCard } from './PostCard';

export const PostGrid: React.FC<{ posts: QueryNode<ContentfulBlogPost>[] }> = ({posts}) => {
  return <div>{posts.map((post) => <PostCard post={post} />)}</div>;
};
