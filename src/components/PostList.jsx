import React from 'react';
import PostListItem from './PostListItem';

export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="empty">Posts are brewing. First one lands soon.</div>;
  }
  return (
    <div className="list">
      {posts.map(p => <PostListItem key={p.slug} post={p} />)}
    </div>
  );
}
