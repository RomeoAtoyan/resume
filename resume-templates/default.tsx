"use client";

const Default = () => {
  return (
    <article className="resume-container bg-white text-gray-800 font-sans flex flex-col justify-between p-10 leading-relaxed">
      {/* HEADER */}
      <header className="text-center border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Romeo Atoyan</h1>
        <p className="text-lg text-gray-600">Front-End Developer</p>
        <p className="text-sm text-gray-500 mt-1">
          romeo.atoyan@example.com · Antwerp, Belgium
        </p>
      </header>

      {/* SUMMARY */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-1">
          Profile
        </h2>
        <p className="mt-2 text-gray-700">
          Passionate front-end developer with 3+ years of experience building
          modern web applications using React, Next.js, and TypeScript.
          Dedicated to creating clean, user-friendly interfaces with a focus on
          performance and accessibility.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-1">
          Experience
        </h2>

        <div className="mt-2 space-y-4">
          <div>
            <p className="font-semibold">Front-End Developer — Freelance</p>
            <p className="text-sm text-gray-600 italic">2023 – Present</p>
            <p className="text-sm text-gray-700 mt-1">
              Building web apps for startups using React 19 and Next.js 15.
              Implemented responsive UIs, state management with Zustand, and
              real-time features with WebSockets.
            </p>
          </div>

          <div>
            <p className="font-semibold">Junior Developer — StudioPixel</p>
            <p className="text-sm text-gray-600 italic">2021 – 2023</p>
            <p className="text-sm text-gray-700 mt-1">
              Collaborated with designers to convert Figma designs into
              functional, pixel-perfect interfaces. Contributed to internal
              component libraries and improved build performance by 25%.
            </p>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-1">
          Education
        </h2>

        <div className="mt-2 space-y-3">
          <div>
            <p className="font-semibold">Bachelor of Computer Science</p>
            <p className="text-sm text-gray-600">
              University of Antwerp · 2018 – 2021
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-1">
          Skills
        </h2>
        <ul className="flex flex-wrap gap-2 mt-3">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "TailwindCSS",
            "Prisma",
            "Zustand",
            "Framer Motion",
            "Figma",
            "Node.js",
          ].map((skill) => (
            <li
              key={skill}
              className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-md"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-400 mt-8">
        © 2025 Romeo Atoyan — Resume generated with Next.js
      </footer>
    </article>
  );
};

export default Default;
