/*
 * CWLABS Portfolio Builder — seed data.
 * This mirrors the shape of a portfolio record returned by the CWLABS API.
 * It is only used to seed a brand-new draft in local/dev mode; real deployments
 * hydrate the draft from the authenticated user's stored portfolio.
 */
window.CW_SAMPLE_DATA = {
  basics: {
    fullName: "Aarav Menon",
    role: "Cybersecurity Analyst & Full-Stack Developer",
    tagline: "I break things on purpose, then build them back stronger.",
    bio: "I am a final-year Computer Science student specialising in offensive security and secure application development. Over the last three years I have competed in more than forty Capture The Flag events, built internal tooling for a regional SOC, and shipped full-stack products used by a few thousand students. I care about clear documentation, reproducible research and software that fails safely. Outside of security work I write about threat modelling, mentor first-year students, and maintain a small set of open-source utilities for log analysis.",
    location: "Kochi, India",
    email: "aarav.menon@example.com",
    profileImage: "",
    coverImage: ""
  },
  links: {
    github: "https://github.com/example",
    linkedin: "https://linkedin.com/in/example",
    website: "https://example.com",
    twitter: "",
    other: [
      { label: "TryHackMe", url: "https://tryhackme.com/p/example" },
      { label: "HackTheBox", url: "https://app.hackthebox.com/profile/example" }
    ]
  },
  skills: [
    { name: "Penetration Testing", category: "Security", level: 90 },
    { name: "Threat Modelling", category: "Security", level: 82 },
    { name: "Burp Suite", category: "Tools", level: 88 },
    { name: "Wireshark", category: "Tools", level: 80 },
    { name: "Python", category: "Programming", level: 92 },
    { name: "JavaScript", category: "Programming", level: 85 },
    { name: "Docker", category: "DevOps", level: 75 },
    { name: "Linux Hardening", category: "Systems", level: 84 }
  ],
  projects: [
    {
      name: "Sentinel Log Pipeline",
      description: "A streaming log ingestion and correlation pipeline that normalises firewall, auth and application logs into a single timeline and raises alerts on suspicious authentication bursts.",
      technologies: ["Python", "Kafka", "Elasticsearch", "Docker"],
      image: "",
      url: "https://example.com/sentinel",
      repo: "https://github.com/example/sentinel",
      severity: "Medium",
      category: "Detection Engineering"
    },
    {
      name: "ThreatLens",
      description: "A browser-based threat modelling workspace that turns architecture sketches into STRIDE findings and exports reviewable reports for engineering teams.",
      technologies: ["TypeScript", "React", "Node.js"],
      image: "",
      url: "https://example.com/threatlens",
      repo: "https://github.com/example/threatlens"
    },
    {
      name: "CampusPass",
      description: "A campus access-control platform with role-based dashboards, audit trails and offline verification for events. Used by three departments during the annual tech fest.",
      technologies: ["Next.js", "PostgreSQL", "Redis"],
      image: "",
      url: "",
      repo: "https://github.com/example/campuspass"
    }
  ],
  experience: [
    {
      role: "Security Analyst Intern",
      company: "Regional Security Operations Centre",
      description: "Triaged SIEM alerts, wrote detection rules for brute-force and lateral-movement patterns, and documented incident response runbooks adopted by the on-call rotation.",
      startDate: "2025-06",
      endDate: "2025-12"
    },
    {
      role: "Full-Stack Developer (Freelance)",
      company: "Independent",
      description: "Delivered secure web applications for small businesses, including authentication hardening, dependency auditing and deployment automation.",
      startDate: "2024-01",
      endDate: "2025-05"
    }
  ],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "State Institute of Technology",
      description: "Specialisation in information security. Final-year project on automated vulnerability triage.",
      startDate: "2022-08",
      endDate: "2026-05"
    }
  ],
  certificates: [
    {
      name: "Certified Ethical Hacker (CEH)",
      issuer: "EC-Council",
      date: "2025-03",
      image: "",
      verifyUrl: "https://example.com/verify/ceh"
    },
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      date: "2024-09",
      image: "",
      verifyUrl: ""
    }
  ],
  achievements: [
    { title: "National CTF Finals — 2nd Place", description: "Placed second in the national collegiate capture-the-flag finals among 120 teams.", date: "2025-10" },
    { title: "Best Security Project", description: "Awarded for the automated vulnerability triage tool at the department project expo.", date: "2025-04" }
  ],
  publications: [
    { title: "Automating Triage of Low-Severity Findings", description: "A short paper on reducing analyst fatigue with heuristic prioritisation.", date: "2025-07", url: "https://example.com/paper" }
  ],
  writeups: [
    { title: "Abusing Kerberos Delegation in a Lab", description: "A walkthrough of a delegated-trust misconfiguration and its remediation.", date: "2025-08", url: "https://example.com/writeups/kerberos", category: "Active Directory" },
    { title: "Detecting Lateral Movement with NetFlow", description: "Practical detection engineering notes from a home lab.", date: "2025-02", url: "https://example.com/writeups/netflow", category: "Detection Engineering" }
  ],
  ctfAchievements: [
    { event: "National Collegiate CTF Finals", placement: "2nd Place", description: "Team captain for the web-exploitation and forensics categories.", date: "2025-10", category: "Web / Forensics" },
    { event: "Regional Hackathon CTF", placement: "Top 10", description: "Solved the full cryptography track.", date: "2025-03", category: "Cryptography" }
  ],
  meta: {
    templateId: "template-18",
    published: false,
    slug: "aarav-menon"
  }
};
