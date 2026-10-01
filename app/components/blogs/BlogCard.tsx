// =============================================================================
// BlogCard — reusable card for blog listing grid
// =============================================================================

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean; // larger hero card variant
  className?: string;
}

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col h-full bg-white rounded-[20px] overflow-hidden border border-[#f0e8de]",
        "shadow-[0_2px_12px_rgba(33, 26, 25,0.05)]",
        "hover:shadow-[0_6px_24px_rgba(111, 23, 38,0.12)]",
        "hover:-translate-y-0.5 transition-all duration-300",
        className
      )}
    >
      {/* Cover image */}
      <Link href={`/blogs/${post.slug}`} aria-label={`Read: ${post.title}`}>
        <div
          className={cn(
            "relative overflow-hidden bg-gradient-to-br from-[var(--maroon)] to-[var(--ink)]",
            featured ? "h-[300px] md:h-[400px] lg:h-[480px]" : "aspect-[16/10]"
          )}
        >
          {/* Wood-grain decorative overlay */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.12]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M0 ${i * 20} Q50 ${i * 20 - 8} 100% ${i * 20}`}
                stroke="var(--burgundy)"
                strokeWidth="2"
                fill="none"
              />
            ))}
          </svg>

          {/* Category pill */}
          <div className="absolute bottom-4 left-5">
            <div className="bg-[var(--burgundy)] text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-md">
              {post.category}
            </div>
          </div>
        </div>
      </Link>

      {/* Content — padded so nothing touches card edges */}
      <div
        className="flex flex-col flex-1"
        style={{ padding: featured ? '32px' : '24px' }}
      >
        {/* Meta */}
        <div className={cn("flex items-center gap-4", featured ? "mb-3" : "mb-2.5")}>
          <div className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--ink-soft)]">
            <Clock className="w-3 h-3" />
            {post.readTime} min read
          </div>
        </div>

        {/* Title */}
        <Link href={`/blogs/${post.slug}`}>
          <h3
            className={cn(
              "font-serif font-semibold text-[var(--ink)] leading-snug line-clamp-2",
              "hover:text-[var(--burgundy)] transition-colors duration-200",
              featured ? "text-2xl md:text-3xl lg:text-4xl mb-3" : "text-lg md:text-xl mb-2"
            )}
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-5 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author + Read more */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f5f0ea]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--burgundy)] to-[#a8744e] flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-semibold">{post.author.charAt(0)}</span>
            </div>
            <span className="text-xs text-[var(--ink-soft)] truncate max-w-[120px]">{post.author}</span>
          </div>
          <Link
            href={`/blogs/${post.slug}`}
            className="flex items-center gap-1 text-xs font-medium text-[var(--burgundy)] hover:gap-2 transition-all duration-200"
          >
            Read More <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
