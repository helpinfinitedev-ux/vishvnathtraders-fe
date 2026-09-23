// =============================================================================
// BLOG DETAIL PAGE — /blogs/[slug]
// =============================================================================

import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { BlogCard } from "@/components/blogs/BlogCard";
import { getBlogBySlug, getRecentBlogs } from "@/data/blogs";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const recent = getRecentBlogs(3).filter((b) => b.slug !== slug).slice(0, 2);

  return (
    <div className="bg-[#fafaf8] min-h-screen">
      {/* Hero */}
      <div className="bg-[#1c1c1c] relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a18] to-[#2d2520]" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#c8956c]/8 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="container-site relative z-10 max-w-3xl">
          <Breadcrumb
            items={[{ label: "Blogs", href: "/blogs" }, { label: post.category, href: "/blogs" }, { label: post.title }]}
            className="mb-6 [&_*]:text-white/50 [&_a]:hover:text-[#c8956c]"
          />
          <Badge variant="wood" className="mb-4">{post.category}</Badge>
          <h1
            className="font-serif text-white font-semibold leading-tight mb-5"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} min read
            </span>
            <span>By {post.author}</span>
          </div>
        </div>
      </div>

      <div className="container-site py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 md:gap-16">
          {/* ── Article body ── */}
          <article>
            {/* Excerpt */}
            <p className="text-lg text-[#4b5563] leading-relaxed border-l-4 border-[#c8956c] pl-5 mb-8 italic">
              {post.excerpt}
            </p>

            {/* Content — HTML string rendered safely */}
            <div
              className="prose-woodcraft"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[#f0e8de]">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">#{tag}</Badge>
              ))}
            </div>

            {/* Author card */}
            <div className="mt-8 p-5 bg-[#f2e8dc] rounded-[16px] flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c8956c] to-[#a8744e] flex items-center justify-center shrink-0">
                <span className="text-white font-semibold text-lg">{post.author.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold text-[#1c1c1c] text-sm">{post.author}</p>
                <p className="text-xs text-[#c8956c]">{post.authorRole}</p>
                <p className="text-xs text-[#6b7280] mt-1 leading-relaxed">
                  Expert contributor at WoodCraft Premium — sharing knowledge on engineered wood products, quality standards, and interior design best practices.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 mt-8">
              <Link href="/blogs" className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#c8956c] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </Link>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="lg:sticky lg:top-24 self-start space-y-8">
            {/* Recent posts */}
            <div className="bg-white rounded-[18px] border border-[#f0e8de] p-6">
              <h2 className="font-serif text-base font-semibold text-[#1c1c1c] mb-5">Recent Articles</h2>
              <div className="flex flex-col gap-4">
                {recent.map((b) => (
                  <Link key={b.slug} href={`/blogs/${b.slug}`} className="group flex gap-3 items-start">
                    <div className="w-16 h-16 rounded-[10px] bg-gradient-to-br from-[#f2e8dc] to-[#e8ddd4] shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#1c1c1c] leading-snug group-hover:text-[#c8956c] transition-colors line-clamp-2">
                        {b.title}
                      </p>
                      <p className="text-xs text-[#9ca3af] mt-1">{formatDate(b.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA sidebar card */}
            <div className="bg-gradient-to-br from-[#7c4a2a] to-[#c8956c] rounded-[18px] p-6 text-white">
              <h3 className="font-serif text-lg font-semibold mb-2">Need Product Advice?</h3>
              <p className="text-sm text-white/75 leading-relaxed mb-4">
                Our technical team can help you choose the right plywood grade for your project.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-[8px] transition-colors"
              >
                Get Expert Advice <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
