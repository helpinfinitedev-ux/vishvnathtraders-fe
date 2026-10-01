// =============================================================================
// BlogHighlights — home section showcasing recent blogs
// Colored cards: inset rounded image on top, white bold title below
// Card colors cycle through blue → sage → green (like the reference design)
//
// NOTE: padding / margin are inline styles on purpose, because Tailwind
// spacing classes were not applying on this site.
// =============================================================================

import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getRecentBlogs } from "@/data/blogs";
import { cn } from "@/lib/utils";

// Card background colors, repeated in this order (slightly deepened so the
// white title text stays readable)
const CARD_COLORS = ["#6c90b4", "#7e918c", "#6f8f73"];

// The fields this card needs. If your blog type uses different names
// (e.g. `coverImage` instead of `image`), change them here only.
type PostLike = {
  id: string | number;
  slug: string;
  title: string;
  image?: string;
  coverImage?: string;
};

export function BlogHighlights() {
  const recentBlogs = getRecentBlogs(3);

  return (
    <section
      id="blog-highlights"
      className="section-pad bg-white"
      aria-labelledby="blog-highlights-heading"
    >
      <div className="container-site">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <SectionHeading
            id="blog-highlights-heading"
            eyebrow="Knowledge & Insights"
            title="From Our Blog"
            subtitle="Expert advice, industry trends, and practical guides for your next project."
            className="mb-0"
          />
          <Link href="/blogs" className="shrink-0 distributor-btn">
            View All Articles <ArrowRight size={11} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {recentBlogs.map((item, index) => {
            const post = item as unknown as PostLike;
            const cover = post.image ?? post.coverImage;

            return (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                aria-label={`Read: ${post.title}`}
                className={cn(
                  "group flex flex-col rounded-[28px]",
                  "transition-transform duration-300 hover:-translate-y-1.5",
                  "shadow-[0_6px_24px_rgba(33, 26, 25,0.10)]",
                  "hover:shadow-[0_16px_40px_rgba(33, 26, 25,0.16)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--burgundy)] focus-visible:ring-offset-2"
                )}
                style={{
                  backgroundColor: CARD_COLORS[index % CARD_COLORS.length],
                  padding: "0.4rem",
                }}
              >
                {/* Image — inset with its own rounded corners */}
                <div className="relative h-56 md:h-64 overflow-hidden rounded-[22px] bg-white/20">
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cover}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/60">
                      <ImageIcon className="w-12 h-12" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  )}
                </div>

                {/* Title */}
                <div
                  className="flex flex-1 items-center"
                  style={{ padding: "1.75rem 1.5rem 2rem 1.5rem", minHeight: "8.5rem" }}
                >
                  <h3 className="font-serif text-xl md:text-[1.35rem] font-semibold leading-snug text-white line-clamp-3">
                    {post.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}