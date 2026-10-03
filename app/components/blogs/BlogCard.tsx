// =============================================================================
// BlogCard — reusable card for blog listing grid
// =============================================================================

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean; // larger hero card variant
}

const CSS = `
.bc-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 24px;
  border: 1px solid #EADFCB;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  text-decoration: none;
}
.bc-card * {
  box-sizing: border-box;
}
.bc-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -8px rgba(111, 23, 38, 0.15);
}
.bc-card:hover .bc-img {
  transform: scale(1.05);
}
.bc-img-wrap {
  position: relative;
  height: 210px;
  overflow: hidden;
  background: linear-gradient(135deg, #6F1726, #52121D, #D8C3A5);
  flex-shrink: 0;
}
.bc-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.bc-body {
  display: flex;
  flex-direction: column;
  padding: 24px;
  flex-grow: 1;
}
.bc-cat {
  color: #6F1726;
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 12px 0;
}
.bc-title {
  color: #52121D;
  font-size: 26px;
  line-height: 1.2;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: inherit;
  font-weight: 700;
}
.bc-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #6B5A55;
  font-size: 13px;
  margin: 0 0 20px 0;
}
.bc-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}
.bc-excerpt {
  display: none;
}
.bc-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #EADFCB;
  padding-top: 16px;
  margin-top: auto;
}
.bc-author {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #2A1A1D;
  font-size: 14px;
}
.bc-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #6F1726;
  color: #F7F1E7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}
.bc-read-more {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6F1726;
  font-size: 14px;
  font-weight: 600;
  min-height: 44px;
}

/* Featured variation */
.bc-card.is-featured {
  flex-direction: row;
}
.bc-card.is-featured .bc-img-wrap {
  width: 46%;
  height: auto;
  min-height: 340px;
}
.bc-card.is-featured .bc-body {
  width: 54%;
  padding: 32px;
  justify-content: center;
}
.bc-card.is-featured .bc-title {
  font-size: 42px;
  margin: 0 0 16px 0;
  -webkit-line-clamp: 2;
}
.bc-card.is-featured .bc-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #6B5A55;
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 24px 0;
}
@media (max-width: 699px) {
  .bc-card.is-featured {
    flex-direction: column;
  }
  .bc-card.is-featured .bc-img-wrap {
    width: 100%;
    height: 240px;
    min-height: 240px;
  }
  .bc-card.is-featured .bc-body {
    width: 100%;
    padding: 24px;
  }
  .bc-card.is-featured .bc-title {
    font-size: 28px;
  }
}
`;

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <>
      <style>{CSS}</style>
      <Link
        href={`/blogs/${post.slug}`}
        className={`bc-card ${featured ? "is-featured" : ""}`}
        aria-label={`Read article: ${post.title}`}
      >
        <div className="bc-img-wrap">
          {(post as any).image || (post as any).coverImage ? (
            <img src={(post as any).image || (post as any).coverImage} alt="" className="bc-img" />
          ) : (
            <div className="bc-img" /> /* Fallback gradient shown via container */
          )}
        </div>

        <div className="bc-body">
          <div className="bc-cat">{post.category}</div>
          <h3 className="bc-title">{post.title}</h3>
          
          <p className="bc-excerpt">{post.excerpt}</p>
          
          <div className="bc-meta">
            <span>
              <Calendar size={14} aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span>
              <Clock size={14} aria-hidden="true" />
              {post.readTime} min read
            </span>
          </div>

          <div className="bc-footer">
            <div className="bc-author">
              <div className="bc-avatar" aria-hidden="true">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span>{post.author}</span>
            </div>
            <div className="bc-read-more">
              Read more <ArrowRight size={16} aria-hidden="true" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
