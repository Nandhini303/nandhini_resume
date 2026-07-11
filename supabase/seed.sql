-- ============================================================
-- Nandhini C Portfolio — Seed Data
-- Run this AFTER schema.sql in the Supabase SQL Editor.
-- Populates the database with default content so the
-- public site looks complete on first load.
-- ============================================================

-- ─── SITE SETTINGS ──────────────────────────────────────────

INSERT INTO site_settings (key, value) VALUES

-- Hero section
('hero', '{
  "badge": "B.Tech Information Technology · Student",
  "headline": ["Turning ideas", "into working"],
  "headlineAccent": "software.",
  "subtitle": "Hi, I''m Nandhini C — an IT student who enjoys turning ideas into working software, comfortable with Python, full-stack web pages, data science, and AI foundations.",
  "name": "Nandhini C",
  "role": "Information Technology Student",
  "primaryCta": { "label": "View selected work", "href": "#projects" },
  "secondaryCta": { "label": "Download résumé", "href": "/resume.pdf" },
  "videoSrc": "/hero-animation.mp4",
  "videoCaption": "Python · Full-Stack",
  "videoSubCaption": "HTML · CSS · AI",
  "story": [
    { "k": "I", "label": "Ideas & Specifications" },
    { "k": "D", "label": "Development & Prototyping" },
    { "k": "E", "label": "Engineering & Coding" },
    { "k": "A", "label": "Actionable Solutions" }
  ],
  "credentials": [
    { "value": "9.5", "label": "B.Tech IT CGPA" },
    { "value": "3", "label": "Bootcamp Certifications" },
    { "value": "2", "label": "Research Papers" }
  ],
  "ticker": ["Python", "HTML", "CSS", "Full-Stack Development", "OOP", "Data Science", "AI Foundations", "Excel", "Teamwork", "Communication", "Technical Presentation"],
  "socials": {
    "github": "https://github.com/Nandhini303",
    "linkedin": "https://linkedin.com/in/nandhini-c-040392348",
    "email": "nandhini303303@gmail.com"
  }
}'::jsonb),

-- About section
('about', '{
  "sectionLabel": "01 — About",
  "sectionTitle": "Bridging code and data",
  "narrative": "I''m an Information Technology student and B.Tech candidate who enjoys building functional software across Python scripting, responsive frontend interfaces, and full-stack environments.",
  "narrativeExtra": "I co-authored two research papers exploring supply chain resilience and big data intrusion detection. I also completed structured technical bootcamps in full-stack development and data science, refining my collaborative development skills.",
  "stack": ["Python", "HTML", "CSS", "Full-Stack Development", "Data Science", "AI Foundations", "Excel"],
  "profileCaption": "Nandhini C",
  "profileSubCaption": "IT Student · Coimbatore, India",
  "education": {
    "school": "EASA College of Engineering & Technology",
    "degree": "B.Tech, Information Technology",
    "years": "2023 — 2026"
  },
  "goals": {
    "now": "Secure a developer role to build high-performance applications.",
    "next": "Lead full-stack engineering projects and specialize in AI integrations."
  },
  "stats": [
    { "value": "9.5", "label": "B.Tech IT CGPA" },
    { "value": "1", "label": "Python Internships" },
    { "value": "3", "label": "Certifications Completed" },
    { "value": "2", "label": "Research Papers Co-authored" }
  ]
}'::jsonb),

-- Skills section
('skills', '{
  "sectionLabel": "02 — Toolkit",
  "sectionTitle": "What I build with",
  "categories": [
    { "title": "Languages", "icon": "Code", "items": ["Python"] },
    { "title": "Web Development", "icon": "Globe", "items": ["HTML", "CSS", "Full-Stack Development"] },
    { "title": "Concepts", "icon": "Brain", "items": ["Object-Oriented Programming (OOP)", "Data Science", "Artificial Intelligence Foundations"] },
    { "title": "Tools & Other", "icon": "Wrench", "items": ["Excel", "Teamwork", "Communication", "Technical Presentation"] }
  ],
  "certifications": [
    "Full Stack Development Bootcamp — NoviTech R&D Pvt Ltd (Credential ID: NT_FSDB327)",
    "NPTEL: Python for Data Science (Elite) — MoE, Govt. of India (Credential ID: NPTEL25CS104S433606017)",
    "Artificial Intelligence – 1 Week Challenge — NoviTech R&D Pvt Ltd (Credential ID: NT_5AIV915)"
  ],
  "ticker": ["Python", "HTML", "CSS", "Full-Stack Development", "OOP", "Data Science", "AI Foundations", "Excel", "Teamwork", "Communication", "Technical Presentation"]
}'::jsonb),

-- Navbar
('navbar', '{
  "links": [
    { "name": "About", "href": "#about" },
    { "name": "Skills", "href": "#skills" },
    { "name": "Experience", "href": "#timeline" },
    { "name": "Work", "href": "#projects" },
    { "name": "Writing", "href": "#blog" },
    { "name": "Contact", "href": "#contact" }
  ],
  "ctaLabel": "Résumé",
  "ctaHref": "/resume.pdf"
}'::jsonb),

-- Contact section
('contact', '{
  "sectionLabel": "05 — Contact",
  "sectionTitle": "Let''s build something together.",
  "subtitle": "Interested in working with me, discussing my papers, or discussing role opportunities? Let''s talk.",
  "email": "nandhini303303@gmail.com",
  "phone": "9360750112",
  "location": "Coimbatore, Tamil Nadu"
}'::jsonb),

-- Footer
('footer', '{
  "name": "Nandhini C",
  "tagline": "IT Student — Python · Full-Stack Development · AI Foundations.",
  "github": "https://github.com/Nandhini303",
  "linkedin": "https://linkedin.com/in/nandhini-c-040392348",
  "email": "nandhini303303@gmail.com",
  "copyright": "Built with React · Supabase.",
  "designYear": "2026"
}'::jsonb),

-- Welcome / intro quotes
('welcome', '{
  "quotes": [
    "Turning ideas into working software.",
    "From Python scripts to full-stack web pages.",
    "Comfortable digging into data, building interfaces.",
    "Bridging research, code, and design."
  ],
  "inviteTitle": "Welcome to my space.",
  "inviteSubtitle": "Let''s explore software development and connect.",
  "name": "Nandhini C · IT Student"
}'::jsonb)

ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();


-- ─── PROJECTS ───────────────────────────────────────────────

INSERT INTO projects (title, problem, data, process, insight, tags, github_link, sort_order) VALUES

(
  'Supply Chain Performance & Resilience Analysis',
  'Examined how disruptions affect supply chain performance and explored resilience factors within end-to-end supply chain operations.',
  'Supply Chain disruption considerations and resilience factors research dataset.',
  'Co-authored a research paper studying end-to-end supply chain disruption considerations and modelling resilience factors using Python and Excel.',
  'Identified key structural bottlenecks and recommended data-driven resilience strategies to mitigate disruption risks.',
  ARRAY['Python', 'Data Science', 'Excel'],
  'https://github.com/Nandhini303',
  1
),
(
  'Big Data Analytics for Intrusion Detection',
  'Applied big data analytics techniques to strengthen intrusion detection systems for improved threat identification.',
  'Network logs and intrusion signature patterns dataset.',
  'Co-authored research outlining big data processing methods to detect network intrusion, training anomaly detection models.',
  'Established a highly accurate detection approach for suspicious network activities and potential threats.',
  ARRAY['Python', 'Data Science', 'AI Foundations'],
  'https://github.com/Nandhini303',
  2
),
(
  'Full Stack Development Projects',
  'Explored front-end development concepts and responsive website design through hands-on web development practice.',
  'NoviTech Full Stack Bootcamp web assignments and challenges.',
  'Developed responsive, clean web interfaces with HTML and CSS and structured basic server integrations.',
  'Mastered frontend components, responsive design layouts, and modern web application development workflow.',
  ARRAY['HTML', 'CSS', 'Full-Stack Development'],
  'https://github.com/Nandhini303',
  3
);


-- ─── BLOGS ──────────────────────────────────────────────────

INSERT INTO blogs (title, slug, excerpt, content, tags, read_time, published, sort_order, published_at) VALUES

(
  'My research journey in supply chain resilience',
  'research-journey-supply-chain-resilience',
  'Exploring how data analytics and disruption considerations improve end-to-end supply chain operations.',
  E'### Overview\nSupply chain disruptions are more common than ever. In our research paper, we explored how data analytics helps identify resilience factors.\n\n### The methodology\nWe analyzed variables contributing to supply chain bottlenecks and examined how "black box" visibility impacts resilience.\n\n### Key takeaway\nIntegrating predictive models with real-time tracking provides a significant resilience boost.',
  ARRAY['Supply Chain', 'Research', 'Data Science'],
  '4 min read',
  true,
  1,
  now()
),
(
  'Strengthening intrusion detection with big data analytics',
  'intrusion-detection-big-data-analytics',
  'How big data techniques allow for faster and more accurate threat detection in modern network security.',
  E'### The challenge\nTraditional intrusion detection systems struggle with the sheer volume of modern network traffic.\n\n### The approach\nBy applying big data analytics, we can identify anomalies and signature patterns in real-time logs.\n\n### The payoff\nEnhanced threat identification capability and reduced false positive rates across enterprise networks.',
  ARRAY['Intrusion Detection', 'Big Data', 'Security'],
  '5 min read',
  true,
  2,
  now()
);


-- ─── EXPERIENCES ────────────────────────────────────────────

INSERT INTO experiences (role, company, period, type, impact, sort_order) VALUES

(
  'Python Development Intern',
  'Cognifyz Technologies',
  'Dec 2025 — Jan 2026',
  'Internship',
  'Assigned real-world Python development tasks during a structured internship; wrote, tested, and debugged scripts to meet each task’s requirements, delivering working solutions that reinforced core programming and problem-solving fundamentals. Partnered with a development team on hands-on assignments, communicating progress and resolving issues collaboratively, which built practical teamwork and workplace-communication skills in a live software environment.',
  1
);
