"use client";

import React from "react";

const Default = () => {
  return (
    <div
      className="resume-container"
      style={{
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        color: "#111",
        padding: "20px",
        lineHeight: 1.5,
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          borderBottom: "2px solid #e5e7eb",
          paddingBottom: "15px",
          marginBottom: "20px",
        }}
      >
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "100%",
            objectFit: "cover",
            border: "2px solid #ccc",
          }}
        />
        <div>
          <h1 style={{ fontSize: "1.75rem", margin: 0 }}>John Doe</h1>
          <h2 style={{ fontSize: "1.1rem", color: "#555", margin: "4px 0 0" }}>
            Front-End Developer
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#777", marginTop: "4px" }}>
            Passionate about crafting elegant, high-performance web interfaces.
          </p>
        </div>
      </header>

      {/* Body: 2-column layout */}
      <main
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "20px",
        }}
      >
        {/* Left column */}
        <aside>
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitleStyle}>Contact</h3>
            <p>Email: john.doe@example.com</p>
            <p>Phone: +1 555 123 4567</p>
            <p>Location: San Francisco, CA</p>
          </section>

          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitleStyle}>Skills</h3>
            <ul style={ulStyle}>
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Node.js</li>
              <li>Prisma / SQL</li>
            </ul>
          </section>

          <section>
            <h3 style={sectionTitleStyle}>Languages</h3>
            <p>English (Native)</p>
            <p>Dutch (B2)</p>
          </section>
        </aside>

        {/* Right column */}
        <div>
          <section style={{ marginBottom: "20px" }}>
            <h3 style={sectionTitleStyle}>Experience</h3>
            <div style={itemStyle}>
              <h4 style={itemTitleStyle}>Front-End Developer – Acme Corp</h4>
              <span style={itemSubtitleStyle}>2021 – Present</span>
              <p style={itemDescStyle}>
                Building and maintaining scalable Next.js applications with
                React 19 and TypeScript. Led the migration to a new design
                system using shadcn/ui.
              </p>
            </div>
            <div style={itemStyle}>
              <h4 style={itemTitleStyle}>Web Developer – Pixel Studio</h4>
              <span style={itemSubtitleStyle}>2018 – 2021</span>
              <p style={itemDescStyle}>
                Designed and implemented over 50+ responsive client websites
                using React and TailwindCSS.
              </p>
            </div>
          </section>

          <section>
            <h3 style={sectionTitleStyle}>Education</h3>
            <div style={itemStyle}>
              <h4 style={itemTitleStyle}>B.Sc. in Computer Science</h4>
              <span style={itemSubtitleStyle}>2015 – 2018 | MIT</span>
              <p style={itemDescStyle}>
                Focused on software engineering, algorithms, and human-computer
                interaction.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 600,
  borderBottom: "1px solid #ddd",
  paddingBottom: "4px",
  marginBottom: "8px",
  color: "#222",
};

const itemStyle: React.CSSProperties = {
  marginBottom: "10px",
};

const itemTitleStyle: React.CSSProperties = {
  fontSize: "1rem",
  fontWeight: 600,
  marginBottom: "2px",
};

const itemSubtitleStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#555",
  marginBottom: "4px",
  display: "block",
};

const itemDescStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#333",
};

const ulStyle: React.CSSProperties = {
  paddingLeft: "16px",
  margin: 0,
};

export default Default;
