require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Blog = require('./models/Blog');

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nandhini_portfolio';

const seedData = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await Project.deleteMany({});
    await Blog.deleteMany({});

    // Seed Projects
    const GH = "https://github.com/Nandhini303";
    const projects = [
      {
        title: "Supply Chain Performance & Resilience Analysis",
        problem: "Examined how disruptions affect supply chain performance and explored resilience factors within end-to-end supply chain operations.",
        data: "Supply Chain disruption considerations and resilience factors research dataset.",
        process: "Co-authored a research paper studying end-to-end supply chain disruption considerations and modelling resilience factors using Python and Excel.",
        insight: "Identified key structural bottlenecks and recommended data-driven resilience strategies to mitigate disruption risks.",
        tags: ["Python", "Data Science", "Excel"],
        githubLink: GH,
        order: 1
      },
      {
        title: "Big Data Analytics for Intrusion Detection",
        problem: "Applied big data analytics techniques to strengthen intrusion detection systems for improved threat identification.",
        data: "Network logs and intrusion signature patterns dataset.",
        process: "Co-authored research outlining big data processing methods to detect network intrusion, training anomaly detection models.",
        insight: "Established a highly accurate detection approach for suspicious network activities and potential threats.",
        tags: ["Python", "Data Science", "AI Foundations"],
        githubLink: GH,
        order: 2
      },
      {
        title: "Full Stack Development Projects",
        problem: "Explored front-end development concepts and responsive website design through hands-on web development practice.",
        data: "NoviTech Full Stack Bootcamp web assignments and challenges.",
        process: "Developed responsive, clean web interfaces with HTML and CSS and structured basic server integrations.",
        insight: "Mastered frontend components, responsive design layouts, and modern web application development workflow.",
        tags: ["HTML", "CSS", "Full-Stack Development"],
        githubLink: GH,
        order: 3
      }
    ];

    // Seed Blogs
    const blogs = [
      {
        title: "My research journey in supply chain resilience",
        slug: "research-journey-supply-chain-resilience",
        excerpt: "Exploring how data analytics and disruption considerations improve end-to-end supply chain operations.",
        content: `### Overview
Supply chain disruptions are more common than ever. In our research paper, we explored how data analytics helps identify resilience factors.

### The methodology
We analyzed variables contributing to supply chain bottlenecks and examined how "black box" visibility impacts resilience.

### Key takeaway
Integrating predictive models with real-time tracking provides a significant resilience boost.`,
        tags: ["Supply Chain", "Research", "Data Science"],
        readTime: "4 min read"
      },
      {
        title: "Strengthening intrusion detection with big data analytics",
        slug: "intrusion-detection-big-data-analytics",
        excerpt: "How big data techniques allow for faster and more accurate threat detection in modern network security.",
        content: `### The challenge
Traditional intrusion detection systems struggle with the sheer volume of modern network traffic.

### The approach
By applying big data analytics, we can identify anomalies and signature patterns in real-time logs.

### The payoff
Enhanced threat identification capability and reduced false positive rates across enterprise networks.`,
        tags: ["Intrusion Detection", "Big Data", "Security"],
        readTime: "5 min read"
      }
    ];

    await Project.insertMany(projects);
    await Blog.insertMany(blogs);

    console.log('Database successfully seeded!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
