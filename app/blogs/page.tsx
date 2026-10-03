"use client";

// =============================================================================
// BLOGS LISTING PAGE - Option B Layout
// =============================================================================

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blogs/BlogCard";
import { blogPosts, getAllBlogCategories } from "@/data/blogs";

const ALL_LABEL = "All articles";

const CSS = `
.bp-page {
  background: #F7F1E7;
  min-height: 100vh;
  padding: 64px 24px 96px;
  box-sizing: border-box;
}
.bp-page * {
  box-sizing: border-box;
}
.bp-container {
  max-width: 1480px;
  width: 96%;
  margin: 0 auto;
}
.bp-header {
  margin: 0 0 48px 0;
}
.bp-title {
  color: #52121D;
  font-size: 64px;
  line-height: 1.1;
  margin: 0 0 12px 0;
  font-weight: 700;
}
.bp-subtitle {
  color: #6B5A55;
  font-size: 20px;
  margin: 0;
}
.bp-layout {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}
.bp-sidebar {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 110px;
}
.bp-search {
  position: relative;
  margin: 0 0 32px 0;
}
.bp-search input {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #EADFCB;
  background: #fff;
  padding: 0 16px 0 44px;
  font-size: 15px;
  color: #2A1A1D;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.bp-search input:focus {
  border-color: #6F1726;
  box-shadow: 0 0 0 3px rgba(111, 23, 38, 0.1);
}
.bp-search svg {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B5A55;
  pointer-events: none;
}
.bp-cat-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 0 32px 0;
}
.bp-cat-btn {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid transparent;
  color: #2A1A1D;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}
.bp-cat-btn:hover:not(.is-active) {
  background: rgba(216, 195, 165, 0.3);
}
.bp-cat-btn:focus-visible {
  outline: 2px solid #6F1726;
  outline-offset: 2px;
}
.bp-cat-btn.is-active {
  background: #6F1726;
  color: #F7F1E7;
}
.bp-cta {
  background: #52121D;
  border-radius: 16px;
  padding: 24px;
  color: #fff;
}
.bp-cta h3 {
  font-size: 20px;
  margin: 0 0 8px 0;
  color: #F7F1E7;
  font-weight: 700;
}
.bp-cta p {
  font-size: 14px;
  color: rgba(247, 241, 231, 0.8);
  margin: 0 0 20px 0;
  line-height: 1.5;
}
.bp-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  width: 100%;
  background: #D8C3A5;
  color: #52121D;
  border-radius: 8px;
  font-weight: 700;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.2s;
}
.bp-cta-btn:hover {
  background: #C7B08E;
}
.bp-content {
  flex-grow: 1;
  min-width: 0;
}
.bp-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}
.bp-feat-wrap {
  grid-column: 1 / -1;
}
.bp-empty {
  text-align: center;
  padding: 64px 24px;
  background: #fff;
  border-radius: 24px;
  border: 1px solid #EADFCB;
  grid-column: 1 / -1;
}
.bp-empty p {
  color: #6B5A55;
  font-size: 18px;
  margin: 0;
}

@media (max-width: 1023px) {
  .bp-title {
    font-size: 52px;
  }
  .bp-layout {
    flex-direction: column;
    gap: 32px;
  }
  .bp-sidebar {
    width: 100%;
    position: relative;
    top: 0;
  }
  .bp-cta {
    display: none;
  }
  .bp-search {
    margin: 0 0 24px 0;
  }
  .bp-cat-list {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 8px;
    margin: 0;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .bp-cat-list::-webkit-scrollbar {
    display: none;
  }
  .bp-cat-btn {
    white-space: nowrap;
    border-radius: 22px;
    background: #fff;
    border: 1px solid #EADFCB;
  }
  .bp-cat-btn.is-active {
    background: #6F1726;
    border-color: #6F1726;
  }
}
@media (max-width: 699px) {
  .bp-page {
    padding: 40px 16px 80px;
  }
  .bp-title {
    font-size: 42px;
  }
  .bp-grid {
    grid-template-columns: 1fr;
  }
}
`;

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);
  const [searchQuery, setSearchQuery] = useState("");

  // Use explicitly defined categories to ensure they match exact requirements if they don't from data
  // But requirement says: "All articles, Buying Guide, Design Guide, Quality & Standards, Sustainability"
  const categories = [
    ALL_LABEL,
    ...getAllBlogCategories()
  ];

  const filtered = useMemo(() => {
    let result = blogPosts;

    if (activeCategory !== ALL_LABEL) {
      result = result.filter((b) => b.category === activeCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(q));
    }

    return result;
  }, [activeCategory, searchQuery]);

  const featuredPost = filtered.length > 0 ? filtered[0] : null;
  const restPosts = filtered.slice(1);

  return (
    <div className="bp-page">
      <style>{CSS}</style>

      <div className="bp-container">

        {/* <header className="bp-header">
          <h1 className="bp-title font-serif">Blog</h1>
          <p className="bp-subtitle">
            Guides for buyers, designers and dealers.
          </p>
        </header> */}

        <div className="bp-layout">

          <aside className="bp-sidebar">
            <div className="bp-search">
              <label htmlFor="blog-search" className="sr-only">Search blogs</label>
              <Search size={18} aria-hidden="true" />
              <input
                id="blog-search"
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="bp-cat-list" role="tablist" aria-label="Blog categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  aria-pressed={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`bp-cat-btn ${activeCategory === cat ? "is-active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="bp-cta">
              <h3 className="font-serif">Become a distributor</h3>
              <p>Join our growing network of premium plywood partners.</p>
              <Link href="/distributor" className="bp-cta-btn">
                Enquire now
              </Link>
            </div>
          </aside>

          <main className="bp-content">
            <div className="bp-grid">
              {filtered.length === 0 ? (
                <div className="bp-empty">
                  <p>No articles found matching your criteria.</p>
                </div>
              ) : (
                <>
                  {featuredPost && (
                    <div className="bp-feat-wrap">
                      <BlogCard post={featuredPost} featured />
                    </div>
                  )}
                  {restPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </>
              )}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
