import { DigitalTwinChat } from "@/components/digital-twin-chat";

export default function Home() {
  const highlights = [
    "Designed a novel trusted pipeline for Google corporate containers with strong provenance and isolation.",
    "Extended Google rollout enforcement across corporate clusters, impacting thousands of VMs.",
    "Spearheaded a Kubernetes and KubeVirt-based provisioning platform migrating thousands of workloads.",
    "Mentored engineers and led initiatives spanning open source, research, and student impact at scale.",
  ];

  const journey = [
    {
      period: "2022 - Present",
      role: "Software Engineer III, Site Reliability Engineering",
      org: "Google, New York",
      detail:
        "Driving reliability strategy for large-scale infrastructure with deep focus on distributed systems and secure platform operations.",
    },
    {
      period: "2020 - 2022",
      role: "Software Engineer II/III, Site Reliability Engineering",
      org: "Google, Dublin",
      detail:
        "Built and evolved production systems for platform rollout, workload provisioning, and enterprise cloud migration.",
    },
    {
      period: "2019",
      role: "Software Engineer",
      org: "Facebook, London",
      detail:
        "Designed a universal language framework that transpiled to Hack, Python, and JavaScript for cross-team adoption.",
    },
    {
      period: "2018 - 2020",
      role: "Research and Teaching Leadership",
      org: "IIIT Hyderabad and IIT Madras",
      detail:
        "Published and advanced reinforcement learning research while leading large teaching and mentorship cohorts.",
    },
  ];

  const publications = [
    "Action Selection For Composable Modular Deep Reinforcement Learning",
    "An Enhanced Advising Model in Teacher-Student Framework using State Categorization",
    "Advice Replay Approach for Richer Knowledge Transfer in Teacher Student Framework",
  ];

  return (
    <div className="relative overflow-hidden bg-[#05070d] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.12),transparent_35%)]" />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <span className="text-sm font-medium tracking-[0.25em] text-zinc-400">
          VAIBHAV GUPTA
        </span>
        <a
          href="mailto:guptavaibhav18197@gmail.com"
          className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-100 transition hover:border-cyan-400 hover:text-cyan-200"
        >
          Contact
        </a>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-8 md:px-10">
        <section className="grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Site Reliability Engineer at Google
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              Enterprise-grade systems. Edgy product instincts.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
              I build and scale resilient distributed platforms that power
              critical operations. From secure infrastructure pipelines to
              large-scale workload migrations, I combine engineering depth with
              execution speed to move ambitious systems into production.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/oblivious/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                LinkedIn
              </a>
              <a
                href="#portfolio"
                className="rounded-full border border-zinc-600 px-5 py-2 text-sm font-semibold text-zinc-100 transition hover:border-white"
              >
                Portfolio (Coming Soon)
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 shadow-[0_0_80px_rgba(56,189,248,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Core Stack
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Go",
                "Python",
                "C++",
                "Kubernetes",
                "Linux",
                "Distributed Systems",
                "SRE",
                "JavaScript",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-xs text-zinc-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-semibold text-cyan-300">5+</p>
                <p className="text-sm text-zinc-400">Years at Google</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-purple-300">1000s</p>
                <p className="text-sm text-zinc-400">Workloads Impacted</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-5">
          <h2 className="text-2xl font-semibold tracking-tight">About Me</h2>
          <p className="max-w-4xl text-zinc-300">
            Passionate software engineer with a proven track record of building
            and scaling distributed systems, leading projects, and mentoring
            talent. I enjoy problems at the intersection of reliability,
            systems design, and platform evolution where precision and velocity
            both matter.
          </p>
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-semibold tracking-tight">
            Career Highlights
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <article
                key={item}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-zinc-200 transition hover:border-cyan-400/40"
              >
                {item}
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-2xl font-semibold tracking-tight">
            Career Journey
          </h2>
          <div className="space-y-4">
            {journey.map((step) => (
              <article
                key={`${step.period}-${step.role}`}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
                  {step.period}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {step.role}
                </h3>
                <p className="text-sm text-zinc-400">{step.org}</p>
                <p className="mt-3 text-zinc-300">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h2 className="text-xl font-semibold text-white">
              Publications & Research
            </h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              {publications.map((paper) => (
                <li key={paper} className="rounded-lg bg-zinc-800/60 p-3">
                  {paper}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h2 className="text-xl font-semibold text-white">
              Awards & Recognition
            </h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              <li className="rounded-lg bg-zinc-800/60 p-3">ACM ICPC 2017</li>
              <li className="rounded-lg bg-zinc-800/60 p-3">ACM ICPC 2016</li>
              <li className="rounded-lg bg-zinc-800/60 p-3">
                SOF International Science Olympiad
              </li>
            </ul>
          </article>
        </section>

        <section
          id="portfolio"
          className="rounded-2xl border border-zinc-700 bg-gradient-to-r from-zinc-900 to-zinc-950 p-8"
        >
          <h2 className="text-2xl font-semibold text-white">
            Portfolio Showcase
          </h2>
          <p className="mt-3 max-w-3xl text-zinc-300">
            A curated set of selected projects and case studies will be
            published here soon. The section is intentionally production-ready
            so links and cards can be plugged in quickly.
          </p>
          <a
            href="https://www.linkedin.com/in/oblivious/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
          >
            Follow on LinkedIn
          </a>
        </section>

        <DigitalTwinChat />
      </main>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-10 text-sm text-zinc-500 md:px-10">
        Built with Next.js. Designed to blend enterprise clarity with an edgy
        visual identity.
      </footer>
    </div>
  );
}
