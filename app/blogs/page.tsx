"use client";

// =============================================================================
// BLOGS LISTING PAGE
// =============================================================================

import { useState, useMemo } from "react";
import type { Metadata } from "next";
import { PageBanner } from "@/components/ui/PageBanner";
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
    <>
      {/* ── Page Banner ── */}
      <PageBanner
        title="Blog"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />

      <section className="section-pad bg-[#fafaf8] min-h-screen">
        <div className="container-site">
          {/* Category filter chips */}
          <div
            className="flex flex-wrap justify-center gap-3 md:gap-4 items-center"
            style={{ marginBottom: '56px' }}
            role="tablist"
            aria-label="Filter by blog category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-3 md:px-10 rounded-full text-sm sm:text-base font-bold tracking-widest uppercase transition-all duration-300 relative text-center",
                  activeCategory === cat
                    ? "bg-gradient-to-b from-[#e3b895] to-[#a8744e] text-white shadow-[0_8px_16px_-4px_rgba(111, 23, 38,0.6),inset_0_3px_4px_rgba(255,255,255,0.4),inset_0_-3px_4px_rgba(0,0,0,0.2)] border border-[#905e3b] scale-[1.02]"
                    : "bg-gradient-to-b from-[#ffffff] to-[#e8ddd4] text-[var(--ink-soft)] shadow-[0_6px_12px_-4px_rgba(0,0,0,0.08),inset_0_3px_4px_rgba(255,255,255,0.9),inset_0_-3px_4px_rgba(0,0,0,0.05)] border border-[#d0c5bc] hover:text-[#a8744e] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_-4px_rgba(111, 23, 38,0.25),inset_0_3px_4px_rgba(255,255,255,0.9),inset_0_-3px_4px_rgba(0,0,0,0.05)]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[20px] border border-[#f0e8de]">
              <p className="text-4xl mb-4">📰</p>
              <p className="text-[var(--ink-soft)]">No posts in this category yet.</p>
            </div>
          ) : (
            <>
              {/* Featured post (first) */}
              {featuredPost && (
                <div className="mb-10 md:mb-12">
                  <BlogCard post={featuredPost} featured />
                </div>
              )}

              {/* Rest of posts grid */}
              {restPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
                  {restPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
