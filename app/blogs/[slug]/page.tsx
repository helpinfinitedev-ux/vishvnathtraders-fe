// =============================================================================
// BLOG DETAIL PAGE — /blogs/[slug]   (Option B theme)
// Theme: #6F1726 maroon · #52121D deep maroon · #F7F1E7 cream · #D8C3A5 sand
// All layout/spacing is in the scoped CSS below (.bd-*), so your global reset
// cannot remove padding or margins. Article HTML is styled via .bd-prose.
// =============================================================================

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
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

const FALLBACKS = [
  "radial-gradient(circle at 72% 38%,#D8C3A5 0 16%,transparent 17%),linear-gradient(135deg,#6F1726,#2A0A10)",
  "linear-gradient(160deg,transparent 55%,#D8C3A5 55%),linear-gradient(135deg,#8A2236,#52121D)",
  "radial-gradient(circle at 30% 70%,#F7F1E7 0 14%,transparent 15%),linear-gradient(135deg,#52121D,#2A0A10)",
  "linear-gradient(90deg,transparent 60%,#6F1726 60%),linear-gradient(135deg,#D8C3A5,#B39A78)",
];

const CSS = `
.bd{background:#F7F1E7;color:#2A1A1D;min-height:100vh;padding:48px 0 96px}
.bd *{box-sizing:border-box}
.bd a{color:inherit;text-decoration:none}
.bd-w{max-width:1480px;width:96%;margin:0 auto;padding:0 32px}

/* header */
.bd-crumbs{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 24px;font-size:14px;color:#6B5A55}
.bd-crumbs a:hover{color:#6F1726}
.bd-crumbs [aria-current]{color:#52121D;font-weight:600;max-width:340px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bd-head{max-width:860px;margin:0 0 36px}
.bd-pill{display:inline-block;margin:0 0 18px;padding:7px 14px;border-radius:999px;background:#6F1726;color:#F7F1E7;font-size:13px;font-weight:700}
.bd h1.bd-title{margin:0 0 22px;color:#52121D;font-size:clamp(2.2rem,5vw,3.75rem);line-height:1.04;font-weight:700}
.bd-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px 22px;font-size:14px;color:#6B5A55}
.bd-meta span{display:inline-flex;align-items:center;gap:7px}
.bd-by{display:inline-flex;align-items:center;gap:10px}
.bd-av{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:34px;height:34px;border-radius:50%;background:#6F1726;color:#F7F1E7;font-size:13px;font-weight:700}

/* cover */
.bd-cover{position:relative;overflow:hidden;height:440px;margin:0 0 40px;border-radius:28px}

/* layout */
.bd-layout{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:40px;align-items:start}
.bd-article{padding:48px;background:#fff;border:1px solid #EADFCB;border-radius:24px}
.bd-lead{margin:0 0 36px;padding:0 0 32px;border-bottom:1px solid #EADFCB;color:#4A3A37;font-size:20px;line-height:1.65}

/* article html */
.bd-prose{font-size:17px;line-height:1.8;color:#2A1A1D;max-width:720px}
.bd-prose>*:first-child{margin-top:0}
.bd-prose h2{margin:44px 0 14px;color:#52121D;font-size:34px;line-height:1.1;font-weight:700}
.bd-prose h3{margin:32px 0 10px;color:#6F1726;font-size:26px;line-height:1.15;font-weight:700}
.bd-prose p{margin:0 0 20px}
.bd-prose a{color:#6F1726;text-decoration:underline;text-underline-offset:3px}
.bd-prose ul,.bd-prose ol{margin:0 0 22px;padding:0 0 0 24px}
.bd-prose li{margin:0 0 8px}
.bd-prose li::marker{color:#6F1726}
.bd-prose blockquote{margin:28px 0;padding:22px 26px;border-radius:18px;background:#F7F1E7;color:#52121D;font-size:20px;line-height:1.55}
.bd-prose img{display:block;max-width:100%;height:auto;margin:28px 0;border-radius:20px}
.bd-prose table{width:100%;margin:28px 0;border-collapse:separate;border-spacing:0;font-size:15px;border:1px solid #EADFCB;border-radius:16px;overflow:hidden}
.bd-prose th{padding:14px 16px;background:#52121D;color:#F7F1E7;text-align:left;font-weight:700}
.bd-prose td{padding:14px 16px;border-top:1px solid #EADFCB}
.bd-prose tr:nth-child(even) td{background:#FBF7F0}
.bd-prose hr{margin:36px 0;border:0;border-top:1px solid #EADFCB}

/* tags / author / nav */
.bd-tags{display:flex;flex-wrap:wrap;gap:10px;margin:40px 0 0;padding:28px 0 0;border-top:1px solid #EADFCB}
.bd-tag{display:inline-flex;align-items:center;min-height:36px;padding:0 16px;border:1px solid #D8C3A5;border-radius:999px;color:#52121D;font-size:13px;font-weight:600}
.bd-author{display:flex;align-items:flex-start;gap:16px;margin:32px 0 0;padding:24px;border-radius:20px;background:#EFE4D2}
.bd-author .bd-av{width:52px;height:52px;font-size:20px}
.bd-author b{display:block;color:#52121D;font-size:16px}
.bd-author em{display:block;margin:2px 0 8px;color:#6F1726;font-size:13px;font-style:normal;font-weight:600}
.bd-author p{margin:0;font-size:14px;line-height:1.6;color:#4A3A37}
.bd-back{display:inline-flex;align-items:center;gap:8px;min-height:48px;margin:32px 0 0;padding:0 24px;border:1px solid #D8C3A5;border-radius:999px;color:#52121D;font-size:14px;font-weight:700;transition:background .2s}
.bd-back:hover{background:#EFE4D2}

/* sidebar */
.bd-side{position:sticky;top:110px;display:flex;flex-direction:column;gap:24px}
.bd-box{padding:28px;background:#fff;border:1px solid #EADFCB;border-radius:24px}
.bd-box h2{margin:0 0 18px;color:#52121D;font-size:28px;line-height:1.1;font-weight:700}
.bd-recent{display:flex;flex-direction:column;gap:18px}
.bd-recent a{display:flex;align-items:flex-start;gap:14px}
.bd-thumb{position:relative;flex-shrink:0;overflow:hidden;width:76px;height:76px;border-radius:14px}
.bd-recent b{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;color:#52121D;font-size:15px;line-height:1.35;font-weight:700}
.bd-recent a:hover b{color:#6F1726}
.bd-recent small{display:block;margin-top:6px;color:#6B5A55;font-size:12px}
.bd-cta{padding:28px;border-radius:24px;background:#52121D;color:#F7F1E7}
.bd-cta h3{margin:0 0 10px;color:#F7F1E7;font-size:30px;line-height:1.05;font-weight:700}
.bd-cta p{margin:0 0 20px;font-size:14px;line-height:1.6;color:#E7D9C4}
.bd-cta a{display:inline-flex;align-items:center;gap:8px;min-height:46px;padding:0 22px;border-radius:999px;background:#D8C3A5;color:#52121D;font-size:14px;font-weight:700;transition:background .2s}
.bd-cta a:hover{background:#F7F1E7}
.bd a:focus-visible{outline:3px solid rgba(111,23,38,.4);outline-offset:3px}

@media (max-width:1023px){
  .bd-layout{grid-template-columns:1fr}
  .bd-side{position:static}
  .bd-cover{height:320px}
}
@media (max-width:640px){
  .bd{padding-top:28px}
  .bd-w{padding:0 16px}
  .bd-article{padding:26px 20px}
  .bd-cover{height:220px;border-radius:20px}
  .bd-lead{font-size:18px}
  .bd-prose{font-size:16px}
  .bd-prose h2{font-size:28px}
  .bd-prose table{display:block;overflow-x:auto}
}
`;

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const recent = getRecentBlogs(3).filter((b) => b.slug !== slug).slice(0, 2);

  // optional cover field — works if your post has `image` or `coverImage`
  const cover =
    (post as typeof post & { coverImage?: string; image?: string }).coverImage ??
    (post as typeof post & { image?: string }).image;

  return (
    <div className="bd">
      <style>{CSS}</style>

      <div className="bd-w">
        {/* Breadcrumb */}
        <nav className="bd-crumbs" aria-label="Breadcrumb">
          <Link href="/blogs">Blog</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link href="/blogs">{post.category}</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="bd-head">
          {/* <span className="bd-pill">{post.category}</span> */}
          <h1 className="bd-title">{post.title}</h1>
          <div className="bd-meta">
            <span className="bd-by">
              <i className="bd-av" style={{ fontStyle: "normal" }}>{post.author.charAt(0)}</i>
              {post.author}
            </span>
            <span>
              <Calendar size={15} aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span>
              <Clock size={15} aria-hidden="true" />
              {post.readTime} min read
            </span>
          </div>
        </header>

        {/* Cover */}
        <div className="bd-cover" style={{ background: FALLBACKS[0] }}>
          {cover && (
            <Image
              src={cover}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 1136px"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        {/* Body */}
        <div className="bd-layout">
          <article className="bd-article">
            <p className="bd-lead">{post.excerpt}</p>

            <div
              className="bd-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags?.length > 0 && (
              <div className="bd-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="bd-tag">#{tag}</span>
                ))}
              </div>
            )}

            <div className="bd-author">
              <i className="bd-av" style={{ fontStyle: "normal" }}>{post.author.charAt(0)}</i>
              <div>
                <b>{post.author}</b>
                <em>{post.authorRole}</em>
                <p>
                  Expert contributor at WoodCraft Premium, sharing knowledge on
                  engineered wood products, quality standards and interior design
                  best practices.
                </p>
              </div>
            </div>

            <Link href="/blogs" className="bd-back">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to blog
            </Link>
          </article>

          {/* Sidebar */}
          <aside className="bd-side">
            {recent.length > 0 && (
              <div className="bd-box">
                <h2>Recent articles</h2>
                <div className="bd-recent">
                  {recent.map((b, i) => {
                    const img =
                      (b as typeof b & { coverImage?: string; image?: string }).coverImage ??
                      (b as typeof b & { image?: string }).image;
                    return (
                      <Link key={b.slug} href={`/blogs/${b.slug}`}>
                        <span
                          className="bd-thumb"
                          style={{ background: FALLBACKS[(i + 1) % FALLBACKS.length] }}
                        >
                          {img && (
                            <Image src={img} alt="" fill sizes="76px" style={{ objectFit: "cover" }} />
                          )}
                        </span>
                        <span>
                          <b>{b.title}</b>
                          <small>{formatDate(b.date)}</small>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bd-cta">
              <h3>Need product advice?</h3>
              <p>
                Our technical team can help you choose the right plywood grade
                for your project.
              </p>
              <Link href="/contact">
                Get expert advice <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}