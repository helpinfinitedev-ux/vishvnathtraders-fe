"use client";

// =============================================================================
// BLOGS LISTING PAGE
// =============================================================================

import { useState, useMemo } from "react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/blogs/BlogCard";
import { blogPosts, getAllBlogCategories } from "@/data/blogs";
import { cn } from "@/lib/utils";

const ALL_LABEL = "All";

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);
  const categories = [ALL_LABEL, ...getAllBlogCategories()];

  const filtered = useMemo(() =>
    activeCategory === ALL_LABEL
      ? blogPosts
      : blogPosts.filter((b) => b.category === activeCategory),
    [activeCategory]
  );

  const [featuredPost, ...restPosts] = filtered;

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      {/* Page Header */}
      <div className="bg-[#1c1c1c] relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a18] to-[#2d2520]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#c8956c]/8 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="container-site relative z-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c8956c] mb-4">Knowledge Hub</p>
          <h1 className="font-serif text-white font-semibold leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
            Industry Guides & Insights
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
            Expert guides on plywood grades, veneer selection, quality standards, and sustainable building materials.
          </p>
        </div>
      </div>

      <div className="container-site py-10 md:py-16">
        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filter by blog category">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === cat
                  ? "bg-[#c8956c] text-white"
                  : "bg-white border border-[#e8ddd4] text-[#6b7280] hover:border-[#c8956c] hover:text-[#c8956c]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📰</p>
            <p className="text-[#6b7280]">No posts in this category yet.</p>
          </div>
        ) : (
          <>
            {/* Featured post (first) */}
            {featuredPost && (
              <div className="mb-8">
                <BlogCard post={featuredPost} featured />
              </div>
            )}

            {/* Rest of posts grid */}
            {restPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
