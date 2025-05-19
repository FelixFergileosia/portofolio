/**
 * app/projects/page.tsx – Projects listing page for your portfolio (Next.js app‑dir)
 *
 * ‑ Drops straight into `src/app/projects/page.tsx`
 * ‑ Uses Tailwind for styling and `next/image` for optimized images
 * ‑ Hover animation: `hover:scale-105 transform-gpu transition-transform duration-500`
 */

import Image from "next/image";
import Link from "next/link";

// ——————————————————————————————————————————————————————
// 1️⃣ Project type & mock data — swap with your real data / CMS / MDX
// ——————————————————————————————————————————————————————
export type Project = {
  id: string; // stable identifier / slug
  title: string;
  description: string;
  tech: string[];
  /**
   * Set `kind` to "personal" for your own side‑projects or "company" for work you did as an employee/contractor.
   * Company projects usually won’t expose GitHub or public demos, so leave those undefined.
   */
  kind: "personal" | "company";
  github?: string;
  demo?: string;
  image: string; // public/… path or remote URL
};

const projects: Project[] = [
  {
    id: "ev-dashboard",
    title: "Smart EV Dashboard",
    description:
      "Realtime dashboard that visualises battery health and other vehicle information for Polytron EV Motorcycles. Built with React.",
    tech: ["React", "Javascript", "Tailwind"],
    github: "https://github.com/yourname/ev-dashboard",
    demo: "https://ev-demo.vercel.app",
    image: "/smartevdashboard.png",
    kind: "company",
  },
  {
    id: "anime-scraper",
    title: "MyAnimeList Scraper",
    description: "Headless Puppeteer script that pulls anime data",
    tech: ["Node.js", "Puppeteer"],
    github: "https://github.com/yourname/mal-scraper",
    image: "/myanimelistscrapper.png",
    kind: "personal",
  },
  {
    id: "app-link",
    title: "App Link Redirect Service",
    description:
      "Production microservice that redirects users to Google Play or App Store based on their User‑Agent.",
    tech: ["Express", "Docker"],
    image: "/applink.png",
    kind: "company", // 🏢 work project – no public repo or demo
  },
];

// ——————————————————————————————————————————————————————
// 2️⃣ ProjectCard component (local to this file for simplicity)
//    Feel free to extract to `@/components/ProjectCard.tsx`
// ——————————————————————————————————————————————————————
function ProjectCard({
  title,
  description,
  tech,
  github,
  demo,
  image,
  kind,
}: Project) {
  return (
    <div className="flex flex-col p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl hover:scale-105 transform-gpu transition-transform duration-500">
      {/* Screenshot */}
      <Image
        src={image}
        alt={`${title} screenshot`}
        width={800}
        height={450}
        className="rounded-lg mb-4 object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority
      />

      {/* Optional badge */}
      {kind === "company" && (
        <span className="self-start mb-2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white">
          Company project
        </span>
      )}

      {/* Title */}
      <h3 className="text-yellow-300 text-2xl font-bold mb-2 line-clamp-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-white/80 mb-4 line-clamp-3">{description}</p>

      {/* Tech badges */}
      <ul className="flex flex-wrap gap-2 mb-4">
        {tech.map((t) => (
          <li
            key={t}
            className="text-xs px-2 py-1 bg-neutral-800 text-neutral-100 rounded-full"
          >
            {t}
          </li>
        ))}
      </ul>

      {/* External links – hide if project is company‑internal */}
      {kind === "personal" && (
        <div className="mt-auto flex gap-4">
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
              aria-label={`GitHub repository – ${title}`}
            >
              GitHub ↗
            </Link>
          )}
          {demo && (
            <Link
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
              aria-label={`Live demo – ${title}`}
            >
              Live Demo ↗
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// ——————————————————————————————————————————————————————
// 3️⃣ Page component – rendered at /projects
// ——————————————————————————————————————————————————————
export default function ProjectsPage() {
  return (
    <section className="min-h-screen bg-neutral-950 py-24 px-24">
      <h1 className="text-5xl font-extrabold text-white text-center mb-12">
        Projects
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}
