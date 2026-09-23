// =============================================================================
// BlogCard — reusable card for blog listing grid
// =============================================================================

import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate, truncate, cn } from "@/lib/utils";
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
        "group flex flex-col bg-white rounded-[18px] overflow-hidden border border-[#f0e8de]",
        "shadow-[0_2px_12px_rgba(28,28,28,0.05)]",
        "hover:shadow-[0_8px_28px_rgba(200,149,108,0.14)]",
        "hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      {/* Cover image placeholder */}
      <Link href={`/blogs/${post.slug}`} aria-label={`Read: ${post.title}`}>
        <div
          className={cn(
            "relative overflow-hidden bg-gradient-to-br from-[#2d2520] to-[#1c1c1c]",
            featured ? "h-64 md:h-72" : "h-48"
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
                stroke="#c8956c"
                strokeWidth="2"
                fill="none"
              />
            ))}
          </svg>

          {/* Category pill overlay */}
          <div className="absolute bottom-4 left-4">
            <Badge variant="wood">{post.category}</Badge>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-[#9ca3af]">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#9ca3af]">
            <Clock className="w-3 h-3" />
            {post.readTime} min read
          </div>
        </div>

        {/* Title */}
        <Link href={`/blogs/${post.slug}`}>
          <h3
            className={cn(
              "font-serif font-semibold text-[#1c1c1c] leading-snug mb-2.5",
              "hover:text-[#c8956c] transition-colors duration-200",
              featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
            )}
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-[#6b7280] leading-relaxed mb-5 flex-1">
          {truncate(post.excerpt, featured ? 30 : 20)}
        </p>

        {/* Author + Read more */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f5f0ea]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#c8956c] to-[#a8744e] flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-semibold">{post.author.charAt(0)}</span>
            </div>
            <span className="text-xs text-[#6b7280] truncate max-w-[120px]">{post.author}</span>
          </div>
          <Link
            href={`/blogs/${post.slug}`}
            className="flex items-center gap-1 text-xs font-medium text-[#c8956c] hover:gap-2 transition-all duration-200"
          >
            Read More <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
