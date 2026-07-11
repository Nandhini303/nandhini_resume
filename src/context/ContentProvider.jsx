import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// ─── Fallback data (mirrors what was hardcoded in the components) ────

const GH = 'https://github.com/shadow-byte-warrior';

const fallbackSettings = {
  hero: {
    badge: 'B.Tech Information Technology · Student',
    headline: ['Turning ideas', 'into working'],
    headlineAccent: 'software.',
    subtitle:
      "Hi, I'm Nandhini C — an IT student who enjoys turning ideas into working software, comfortable with Python, full-stack web pages, data science, and AI foundations.",
    name: 'Nandhini C',
    role: 'Information Technology Student',
    primaryCta: { label: 'View selected work', href: '#projects' },
    secondaryCta: { label: 'Download résumé', href: '/resume.pdf' },
    videoSrc: '/hero-animation.mp4',
    videoCaption: 'Python · Full-Stack',
    videoSubCaption: 'HTML · CSS · AI Foundations',
    story: [
      { k: 'I', label: 'Ideas & Specifications' },
      { k: 'D', label: 'Development & Prototyping' },
      { k: 'E', label: 'Engineering & Coding' },
      { k: 'A', label: 'Actionable Solutions' },
    ],
    credentials: [
      { value: '9.5', label: 'B.Tech IT CGPA' },
      { value: '3', label: 'Bootcamp/Course Certifications' },
      { value: '2', label: 'Co-authored Research Papers' },
    ],
    ticker: ['Python', 'HTML', 'CSS', 'Full-Stack Development', 'OOP', 'Data Science', 'AI Foundations', 'Excel', 'Teamwork', 'Communication', 'Technical Presentation'],
    socials: {
      github: 'https://github.com/Nandhini303',
      linkedin: 'https://linkedin.com/in/nandhini-c-040392348',
      email: 'nandhini303303@gmail.com',
    },
  },
  about: {
    sectionLabel: '01 — About',
    sectionTitle: 'Bridging code and data',
    narrative:
      "I'm an Information Technology student and B.Tech candidate who enjoys building functional software across Python scripting, responsive frontend interfaces, and full-stack environments.",
    sqlTitle: 'whoami.sql',
    sqlQuery: 'SELECT role, focus\nFROM   nandhini_c\nWHERE  curiosity = TRUE;',
    sqlOutput: 'Nandhini C · turns\nideas into software',
    narrativeExtra:
      "I co-authored two research papers exploring supply chain resilience and big data intrusion detection. I also completed structured technical bootcamps in full-stack development and data science, refining my collaborative development skills.",
    stack: ['Python', 'HTML', 'CSS', 'Full-Stack Development', 'Data Science', 'AI Foundations', 'Excel'],
    profileCaption: 'Nandhini C',
    profileSubCaption: 'IT Student · Coimbatore, India',
    education: {
      school: 'EASA College of Engineering & Technology',
      degree: 'B.Tech, Information Technology',
      years: '2023 — 2026',
    },
    goals: {
      now: 'Secure a developer role to build high-performance applications.',
      next: 'Lead full-stack engineering projects and specialize in AI integrations.',
    },
    stats: [
      { value: '9.5', label: 'B.Tech IT CGPA' },
      { value: '1', label: 'Python Internships' },
      { value: '3', label: 'Certifications Completed' },
      { value: '2', label: 'Research Papers Co-authored' },
    ],
  },
  skills: {
    sectionLabel: '02 — Toolkit',
    sectionTitle: 'What I build with',
    categories: [
      { title: 'Languages', icon: 'Code', items: ['Python'] },
      { title: 'Web Development', icon: 'Globe', items: ['HTML', 'CSS', 'Full-Stack Development'] },
      { title: 'Concepts', icon: 'Brain', items: ['Object-Oriented Programming (OOP)', 'Data Science', 'Artificial Intelligence Foundations'] },
      { title: 'Tools & Other', icon: 'Wrench', items: ['Excel', 'Teamwork', 'Communication', 'Technical Presentation'] },
    ],
    certifications: [
      'Data Analytics Job Simulation — Deloitte / Forage (Credential ID: 694a3080e83f3f31dcdb6f126b)',
      'Python Development Intern Certificate — Cognifyz Technologies (Intern ID: CTI/A1/C277974)',
      'Full Stack Development Bootcamp — NoviTech R&D Pvt Ltd (Credential ID: NT_FSDB327)',
      'NPTEL: Python for Data Science (Elite) — MoE, Govt. of India (Credential ID: NPTEL25CS104S433606017)',
      'Artificial Intelligence – 1 Week Challenge — NoviTech R&D Pvt Ltd (Credential ID: NT_5AIV915)',
    ],
    ticker: ['Python', 'HTML', 'CSS', 'Full-Stack Development', 'OOP', 'Data Science', 'AI Foundations', 'Excel', 'Teamwork', 'Communication', 'Technical Presentation'],
  },
  certifications: {
    certifications: [
      {
        name: "Data Analytics Job Simulation",
        issuer: "Deloitte",
        issueDate: "December 2025",
        credentialId: "694a3080e83f3f31dcdb6f126b",
        credentialUrl: "https://theforage.com",
        image: "/certifications/deloitte_data_analytics.jpeg"
      },
      {
        name: "Python Development Intern Certificate",
        issuer: "Cognifyz Technologies",
        issueDate: "January 2026",
        credentialId: "CTI/A1/C277974",
        credentialUrl: "https://www.cognifyz.com",
        image: "/certifications/cognifyz_python_intern.jpeg"
      },
      {
        name: "2 Hour BootCamp in Full Stack Development",
        issuer: "NoviTech R&D Private Limited",
        issueDate: "February 2025",
        credentialId: "NT_FSDB327",
        credentialUrl: "",
        image: "/certifications/novitech_fullstack.jpeg"
      }
    ],
    hiddenFields: []
  },
  navbar: {
    links: [
      { name: 'About', href: '#about' },
      { name: 'Skills', href: '#skills' },
      { name: 'Experience', href: '#timeline' },
      { name: 'Work', href: '#projects' },
      { name: 'Writing', href: '#blog' },
      { name: 'Contact', href: '#contact' },
    ],
    ctaLabel: 'Résumé',
    ctaHref: '/resume.pdf',
  },
  contact: {
    sectionLabel: '05 — Contact',
    sectionTitle: "Let's build something together.",
    subtitle: "Interested in working with me, discussing my papers, or discussing role opportunities? Let's talk.",
    email: 'nandhini303303@gmail.com',
    phone: '9360750112',
    location: 'Coimbatore, Tamil Nadu',
  },
  footer: {
    name: 'Nandhini C',
    tagline: 'IT Student — Python · Full-Stack Development · AI Foundations.',
    github: 'https://github.com/Nandhini303',
    linkedin: 'https://linkedin.com/in/nandhini-c-040392348',
    email: 'nandhini303303@gmail.com',
    copyright: 'Built with React · Supabase.',
    designYear: '2026',
  },
  sections: {
    projects: {
      label: '04 — Selected Work',
      title: 'Publications & Projects',
      subtitle: 'Showcasing research papers and development bootcamps.',
    },
    blog: {
      label: '05 — Writing',
      title: 'Notes on the process',
    },
  },
  welcome: {
    enabled: true,
    quotes: [
      'Turning ideas into working software.',
      'From Python scripts to full-stack web pages.',
      'Comfortable digging into data, building interfaces.',
      'Bridging research, code, and design.',
    ],
    inviteTitle: 'Welcome to my space.',
    inviteSubtitle: "Let's explore software development and connect.",
    name: 'Nandhini C · IT Student',
  },
  theme: {
    accentColor: '#4F46E5',
    inkColor: '#0F172A',
    bgColor: '#F8FAFC',
    surfaceColor: '#FFFFFF',
    fontFamily: 'Inter',
  },
  seo: {
    metaTitle: 'Nandhini C — Portfolio',
    metaDescription: 'IT student and developer co-authored research papers with Python and Full-Stack skills.',
    keywords: 'Nandhini C, Python, Full-Stack, EASA College, Portfolio',
    ogImage: '',
    twitterHandle: '',
  },
};

const fallbackProjects = [
  {
    _id: '1',
    title: 'Supply Chain Performance & Resilience Analysis',
    problem: "Examined how disruptions affect supply chain performance and explored resilience factors within end-to-end supply chain operations.",
    data: 'Supply Chain disruption considerations and resilience factors research dataset.',
    process: 'Co-authored a research paper studying end-to-end supply chain disruption considerations and modelling resilience factors using Python and Excel.',
    insight: 'Identified key structural bottlenecks and recommended data-driven resilience strategies to mitigate disruption risks.',
    tags: ['Python', 'Data Science', 'Excel'],
    githubLink: 'https://github.com/Nandhini303',
  },
  {
    _id: '2',
    title: 'Big Data Analytics for Intrusion Detection',
    problem: "Applied big data analytics techniques to strengthen intrusion detection systems for improved threat identification.",
    data: 'Network logs and intrusion signature patterns dataset.',
    process: 'Co-authored research outlining big data processing methods to detect network intrusion, training anomaly detection models.',
    insight: 'Established a highly accurate detection approach for suspicious network activities and potential threats.',
    tags: ['Python', 'Data Science', 'AI Foundations'],
    githubLink: 'https://github.com/Nandhini303',
  },
  {
    _id: '3',
    title: 'Full Stack Development Projects',
    problem: "Explored front-end development concepts and responsive website design through hands-on web development practice.",
    data: 'NoviTech Full Stack Bootcamp web assignments and challenges.',
    process: 'Developed responsive, clean web interfaces with HTML and CSS and structured basic server integrations.',
    insight: 'Mastered frontend components, responsive design layouts, and modern web application development workflow.',
    tags: ['HTML', 'CSS', 'Full-Stack Development'],
    githubLink: 'https://github.com/Nandhini303',
  },
];

const fallbackBlogs = [
  {
    _id: '1',
    title: 'My research journey in supply chain resilience',
    excerpt: 'Exploring how data analytics and disruption considerations improve end-to-end supply chain operations.',
    content: '### Overview\nSupply chain disruptions are more common than ever. In our research paper, we explored how data analytics helps identify resilience factors.\n\n### The methodology\nWe analyzed variables contributing to supply chain bottlenecks and examined how "black box" visibility impacts resilience.\n\n### Key takeaway\nIntegrating predictive models with real-time tracking provides a significant resilience boost.',
    tags: ['Supply Chain', 'Research', 'Data Science'],
    readTime: '4 min read',
    publishedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Strengthening intrusion detection with big data analytics',
    excerpt: 'How big data techniques allow for faster and more accurate threat detection in modern network security.',
    content: '### The challenge\nTraditional intrusion detection systems struggle with the sheer volume of modern network traffic.\n\n### The approach\nBy applying big data analytics, we can identify anomalies and signature patterns in real-time logs.\n\n### The payoff\nEnhanced threat identification capability and reduced false positive rates across enterprise networks.',
    tags: ['Intrusion Detection', 'Big Data', 'Security'],
    readTime: '5 min read',
    publishedAt: new Date().toISOString(),
  },
];

const fallbackExperiences = [
  {
    id: '1',
    role: 'Python Development Intern',
    company: 'Cognifyz Technologies',
    period: 'Dec 2025 — Jan 2026',
    type: 'Internship',
    impact: 'Assigned real-world Python development tasks during a structured internship; wrote, tested, and debugged scripts to meet each task’s requirements, delivering working solutions that reinforced core programming and problem-solving fundamentals. Partnered with a development team on hands-on assignments, communicating progress and resolving issues collaboratively, which built practical teamwork and workplace-communication skills in a live software environment.',
  },
];

// ─── Deep merge (draft preview overrides win over fetched content) ──
function isPlainObject(x) {
  return x && typeof x === 'object' && !Array.isArray(x);
}
function deepMerge(base, over) {
  if (!isPlainObject(base) || !isPlainObject(over)) return over === undefined ? base : over;
  const out = { ...base };
  for (const key of Object.keys(over)) {
    out[key] = isPlainObject(base[key]) && isPlainObject(over[key])
      ? deepMerge(base[key], over[key])
      : over[key];
  }
  return out;
}

// ─── Context ────────────────────────────────────────────────

const ContentContext = createContext(null);

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a ContentProvider');
  return ctx;
}

// Helper: convert Supabase project row → component shape
function mapProject(row) {
  return {
    _id: row.id,
    title: row.title,
    problem: row.problem,
    data: row.data,
    process: row.process,
    insight: row.insight,
    tags: row.tags || [],
    githubLink: row.github_link,
    liveLink: row.live_link,
    demoLink: row.live_link,
    imageUrl: row.image_url,
    // ProjectCard reads the raw column names — keep both shapes wired
    image_url: row.image_url,
    created_at: row.created_at,
  };
}

function mapBlog(row) {
  return {
    _id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    tags: row.tags || [],
    readTime: row.read_time,
    coverImage: row.cover_image,
    // BlogCard reads the raw column name — keep both shapes wired
    cover_image: row.cover_image,
    authorName: row.author_name,
    authorAvatar: row.author_avatar,
    publishedAt: row.published_at,
  };
}

function mapExperience(row) {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    period: row.period,
    type: row.type,
    impact: row.impact,
  };
}

// ─── Provider ───────────────────────────────────────────────

export function ContentProvider({ children }) {
  const [settings, setSettings] = useState(fallbackSettings);
  const [projects, setProjects] = useState(fallbackProjects);
  const [blogs, setBlogs] = useState(fallbackBlogs);
  const [experiences, setExperiences] = useState(fallbackExperiences);
  const [loading, setLoading] = useState(true);

  // ── Live draft preview: when this app runs inside the admin's preview iframe,
  //    the admin pushes unsaved form drafts here so the site re-renders instantly.
  const [previewOverride, setPreviewOverride] = useState(null);
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    const isFrame = typeof window !== 'undefined' && window.parent && window.parent !== window;
    setInIframe(isFrame);
    if (!isFrame) return;

    const handleMessage = (event) => {
      if (event.data?.type === 'PREVIEW_OVERRIDE') {
        console.log("ContentProvider: received PREVIEW_OVERRIDE payload", event.data.payload);
        setPreviewOverride(event.data.payload || null);
      }
    };
    window.addEventListener('message', handleMessage);
    // Tell the parent we're mounted and ready to receive the current draft.
    window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (!supabase) {
      console.warn('Supabase client not available — using fallback data.');
      setLoading(false);
      return;
    }

    // Per-table fetchers so realtime events can refresh just what changed
    const fetchSettings = async () => {
      const { data: rows, error } = await supabase
        .from('site_settings')
        .select('key, value');
      if (!error && rows && rows.length > 0) {
        const merged = { ...fallbackSettings };
        for (const row of rows) {
          let val = row.value;
          if (val && typeof val === 'object' && !Array.isArray(val)) {
            // Map legacy hidden object if it exists
            if (val.hidden && typeof val.hidden === 'object') {
              const extraHiddenFields = Object.entries(val.hidden)
                .filter(([_, isHidden]) => isHidden === true)
                .map(([k]) => k);
              val = {
                ...val,
                hiddenFields: Array.from(new Set([...(val.hiddenFields || []), ...extraHiddenFields]))
              };
            }
            merged[row.key] = { ...(fallbackSettings[row.key] || {}), ...val };
          } else {
            merged[row.key] = val;
          }
        }
        setSettings(merged);
      }
    };

    // Public site only shows published rows — drafts stay admin-only
    const fetchProjects = async () => {
      const { data: rows, error } = await supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
      if (!error && rows) setProjects(rows.length > 0 ? rows.map(mapProject) : []);
    };

    const fetchBlogs = async () => {
      const { data: rows, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
      if (!error && rows) setBlogs(rows.length > 0 ? rows.map(mapBlog) : []);
    };

    const fetchExperiences = async () => {
      const { data: rows, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });
      if (!error && rows) setExperiences(rows.length > 0 ? rows.map(mapExperience) : []);
    };

    const fetchAll = async () => {
      try {
        await Promise.all([fetchSettings(), fetchProjects(), fetchBlogs(), fetchExperiences()]);
      } catch (err) {
        console.warn('Supabase fetch failed, using fallback data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();

    // ── Realtime: any admin save instantly updates the public site ──
    const channel = supabase
      .channel('content-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, fetchSettings)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, fetchProjects)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, fetchBlogs)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'experiences' }, fetchExperiences)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Submit contact form to Supabase instead of the old Express endpoint
  const submitContact = async (formData) => {
    if (!supabase) {
      throw new Error('Supabase not configured — email me directly instead.');
    }
    const { error } = await supabase
      .from('contact_messages')
      .insert([{
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }]);
    if (error) throw error;
    return { message: 'Message sent successfully!' };
  };

  // Apply live draft overrides (if any) on top of the fetched/fallback content.
  const mergedSettings = previewOverride?.settings
    ? deepMerge(settings, previewOverride.settings)
    : settings;
  const mergedProjects = previewOverride?.projects ?? projects;
  const mergedBlogs = previewOverride?.blogs ?? blogs;
  const mergedExperiences = previewOverride?.experiences ?? experiences;

  const isPreview = inIframe || (typeof window !== 'undefined' && window.location.search.includes('preview'));

  const value = {
    settings: mergedSettings,
    projects: mergedProjects,
    blogs: mergedBlogs,
    experiences: mergedExperiences,
    loading,
    submitContact,
    isPreview,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}
