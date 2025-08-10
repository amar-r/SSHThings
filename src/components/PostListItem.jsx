import React from 'react';
import { Link } from 'react-router-dom';

export const Post = { slug: String, title: String, date: String, tags: Array, excerpt: String };

export default function PostListItem({ post }) {
  const { slug, title, date, tags = [], excerpt } = post;
  return (
    <article className="post-row">
      <h3 className="post-title">
        <Link to={`/blog/${slug}`} aria-label={title + ' – read post'}>
          {title} →
        </Link>
      </h3>
      {excerpt ? <p className="post-excerpt">{excerpt}</p> : null}
      <div className="post-meta">
        {date ? <span>{date}</span> : null}
        {tags.slice(0,4).map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </article>
  );
}
