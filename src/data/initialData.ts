import { IProject, ISkill, IExperience, IEducation, IAchievement, IProfileConfig, IMessage } from '../types';

export const initialProfile: IProfileConfig = {
  name: "Yashas C.",
  title: "Full-Stack Software Developer",
  avatarUrl: "/profile.jpg",
  roles: [
    "Full-Stack Developer",
    "Software Engineer",
    "Systems & Cloud Enthusiast",
    "Open Source Contributor"
  ],
  tagline: "I build modern, scalable, and user-friendly web applications and systems that turn ideas into real-world solutions.",
  bio: "Passionate full-stack developer and computer science student with a strong foundation in data structures, algorithms, modern web development frameworks, and embedded IoT systems. Committed to writing clean, maintainable code and building high-performance applications that deliver delightful user experiences.",
  careerObjective: "To leverage modern web engineering, distributed backend architecture, and problem-solving skills to build impactful, scalable software products within high-growth engineering teams.",
  interests: [
    "Distributed Systems",
    "Modern Web Architecture",
    "Cloud Computing",
    "Internet of Things (IoT)",
    "Algorithm Optimization",
    "Open Source"
  ],
  philosophy: "Code is read far more often than it is written. I prioritize maintainability, performance, security, and human-centered design in every system I architect.",
  availableForHire: true,
  statusBadgeText: "Available for Opportunities",
  stats: {
    projectsCompleted: 15,
    technologiesCount: 22,
    certificationsCount: 6,
    yearsExperience: "3+"
  },
  socialLinks: {
    github: "https://github.com/yashaschandru",
    linkedin: "https://linkedin.com/in/yashas-chandru",
    email: "yashaschandru583@gmail.com",
    phone: "+91 8147837927",
    instagram: "https://instagram.com/yashas.dev",
    twitter: "https://x.com/yashas_dev",
    leetcode: "https://leetcode.com/u/yashas_code"
  },
  resumeUrl: "#resume"
};

export const initialProjects: IProject[] = [
  {
    id: "proj-1",
    title: "Automatic Street Light Controller",
    slug: "automatic-street-light-controller",
    category: "Arduino",
    shortDescription: "Smart energy-efficient automatic street light control system utilizing LDR photo-sensors and microcontrollers to minimize power consumption.",
    problemStatement: "Traditional municipal street lighting systems run on rigid schedules or manual switches, leading to massive electric power wastage during daylight and cloudy transitions.",
    solution: "Designed an automated threshold-sensing embedded circuitry using an Arduino Uno, Light Dependent Resistor (LDR), relays, and dual-mode energy regulation that dims during twilight and powers off at dawn.",
    features: [
      "Real-time ambient lux detection via calibrated LDR sensor module",
      "Hysteresis thresholding to prevent flickering during sunset/sunrise transitions",
      "Power surge protection circuit with optical relay isolation",
      "Serial telemetry output for voltage monitoring and energy metrics logging",
      "Fail-safe manual override bypass switch"
    ],
    technologies: ["Arduino (C/C++)", "Embedded Systems", "LDR Sensors", "Relay Control", "Circuit Design"],
    challenges: "Calibrating the LDR voltage divider to prevent erratic light trigger loops caused by passing vehicle headlights or momentary shadows.",
    results: "Reduced simulated urban power consumption by 42% in experimental trial runs with 99.8% switching accuracy.",
    githubUrl: "https://github.com/yashaschandru/automatic-street-light-controller",
    liveUrl: "https://wokwi.com/projects/sample-arduino-street-light",
    imageUrl: "/projects/street_light_controller.jpg",
    featured: true,
    sortOrder: 1,
    createdAt: "2025-01-15T10:00:00.000Z"
  },
  {
    id: "proj-2",
    title: "Student Management System",
    slug: "student-management-system",
    category: "Web",
    shortDescription: "Comprehensive web-based portal for managing student academic records, attendance tracking, course registrations, and grade reporting.",
    problemStatement: "Educational departments struggle with fragmented spreadsheets, slow transcript generation, and prone-to-error manual grade calculation workflows.",
    solution: "Developed an enterprise-grade full-stack portal with role-based access control (Admin, Faculty, Student), real-time attendance logging, PDF report card generation, and automated CGPA computing.",
    features: [
      "Role-Based Access Control (RBAC) with JWT auth and encrypted session state",
      "Batch student CSV import, validation, and automated enrollment",
      "Dynamic grade book with automated semester GPA and aggregate CGPA calculator",
      "Visual attendance analytics dashboards with low-attendance warnings",
      "Instant PDF transcript generation and email dispatches"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "Chart.js"],
    challenges: "Handling bulk student grading updates under concurrency and structuring normalized relational queries in MongoDB.",
    results: "Streamlined administrative processing time by 75% for 1,200+ mock enrolled students.",
    githubUrl: "https://github.com/yashaschandru/student-management-portal",
    liveUrl: "https://student-portal-demo.example.com",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    featured: true,
    sortOrder: 2,
    createdAt: "2025-02-10T14:30:00.000Z"
  },
  {
    id: "proj-3",
    title: "Java Desktop Scientific Calculator",
    slug: "java-scientific-calculator",
    category: "Java",
    shortDescription: "Feature-rich Java Swing desktop calculator supporting scientific computation, trigonometric functions, memory registers, and calculation history.",
    problemStatement: "Desktop utility calculators often lack intuitive history rollbacks, operator precedence parsing, or clean multi-precision floating point accuracy.",
    solution: "Built a modern GUI calculator implementing Dijkstra's Shunting-yard algorithm for robust mathematical expression parsing with BigFraction support.",
    features: [
      "Complete standard & scientific function suite (sin, cos, tan, log, ln, sqrt, powers, factorials)",
      "Expression evaluation engine with parenthesis nesting and strict operator precedence",
      "Persistent calculation history reel with one-click recall",
      "Memory register operations (M+, M-, MR, MC)",
      "Dark/Light theme switching and keyboard shortcut navigation"
    ],
    technologies: ["Java", "Java Swing / AWT", "Shunting-Yard Algorithm", "JUnit", "Object-Oriented Design"],
    challenges: "Ensuring exact precision on IEEE 754 floating-point edge cases and gracefully catching syntax errors (divide-by-zero, unmatched parentheses).",
    results: "Passed 100% of 120+ unit test assertions with sub-millisecond expression resolution time.",
    githubUrl: "https://github.com/yashaschandru/java-scientific-calculator",
    liveUrl: "https://github.com/yashaschandru/java-scientific-calculator/releases",
    imageUrl: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&q=80",
    featured: true,
    sortOrder: 3,
    createdAt: "2024-11-20T08:00:00.000Z"
  },
  {
    id: "proj-4",
    title: "DevFolio Pro - Full-Stack Portfolio & CMS",
    slug: "devfolio-pro-portfolio",
    category: "Web",
    shortDescription: "Ultra-fast developer portfolio with glassmorphism design, real-time REST API, dynamic project filtering, resume generator, and admin CMS dashboard.",
    problemStatement: "Static developer websites require code changes and redeployments whenever a new skill, project, or certificate is earned.",
    solution: "Engineered a headless CMS-integrated portfolio allowing dynamic updates of projects, experiences, and messages backed by MongoDB, Express, React, and JWT security.",
    features: [
      "Dynamic REST backend with MongoDB persistence and automatic in-memory fallback",
      "Authenticated Admin Dashboard with full CRUD for projects, skills, education, and messages",
      "Interactive category filters, search bar, and detailed project case-study modals",
      "Built-in interactive ATS resume preview and PDF print-optimized template",
      "Contact form with instant database storage, spam filtering, and toast notifications"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Framer Motion"],
    challenges: "Ensuring sub-second load times while rendering rich animated layouts and maintaining 100% accessible dark/light contrast.",
    results: "Achieved 98+ Google Lighthouse performance, accessibility, and SEO audit scores.",
    githubUrl: "https://github.com/yashaschandru/devfolio-pro-portfolio",
    liveUrl: "https://devfolio-pro.example.com",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    featured: true,
    sortOrder: 4,
    createdAt: "2025-03-01T12:00:00.000Z"
  },
  {
    id: "proj-5",
    title: "High-Performance File Compression Utility",
    slug: "huffman-file-compressor",
    category: "C/C++",
    shortDescription: "Command-line file compression and decompression tool written in C++ using Huffman Coding and min-heap binary trees.",
    problemStatement: "Large text and log files consume heavy bandwidth and disk storage during transmission across constrained network pipes.",
    solution: "Implemented an optimized bit-level Huffman encoding algorithm with canonical codebooks that creates lossless compressed `.huf` archives.",
    features: [
      "Greedy prefix-free Huffman tree generation via custom Min-Heap priority queues",
      "Byte-packed bitstream serializer for lossless archive compression",
      "Header compression table storing character frequency maps",
      "Benchmarking telemetry displaying execution time, entropy, and space savings percentage"
    ],
    technologies: ["C++", "Data Structures", "Huffman Algorithm", "Binary I/O", "Bitwise Manipulation"],
    challenges: "Handling exact bitwise padding at EOF boundaries and minimizing memory allocations during recursion.",
    results: "Achieved 38-55% compression ratios on ASCII texts and source repositories.",
    githubUrl: "https://github.com/yashaschandru/huffman-cpp-compressor",
    liveUrl: "https://github.com/yashaschandru/huffman-cpp-compressor",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    featured: false,
    sortOrder: 5,
    createdAt: "2024-09-12T16:00:00.000Z"
  },
  {
    id: "proj-6",
    title: "Smart Cloud Weather & Air Quality Station",
    slug: "iot-weather-station",
    category: "Arduino",
    shortDescription: "IoT environmental monitoring node using ESP32/Arduino, DHT22, and MQ-135 sensors transmitting data to an Express cloud dashboard.",
    problemStatement: "Micro-climate air pollution and humidity spikes in indoor workshops frequently go unnoticed without localized telemetry.",
    solution: "Constructed an IoT sensor hub that reads temperature, humidity, and gas PPM levels, streaming telemetry via MQTT/HTTP to a cloud API.",
    features: [
      "Multi-sensor array measuring Temperature, Humidity, and Air Quality (CO/Smoke PPM)",
      "Wi-Fi connected ESP32 microcontroller with deep sleep power management",
      "Real-time WebSocket data broadcast to browser dashboard",
      "Configurable threshold email notifications when Air Quality Index degrades"
    ],
    technologies: ["Arduino", "ESP32", "C++", "MQTT", "Node.js", "WebSockets"],
    challenges: "Sensor warming calibration curves and intermittent Wi-Fi reconnection handling.",
    results: "Continuous 30-day uptime monitoring with 5-second telemetry resolution.",
    githubUrl: "https://github.com/yashaschandru/esp32-iot-weather-station",
    liveUrl: "https://iot-station-demo.example.com",
    imageUrl: "https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?w=800&q=80",
    featured: false,
    sortOrder: 6,
    createdAt: "2024-10-05T09:00:00.000Z"
  }
];

export const initialSkills: ISkill[] = [
  // Frontend
  { id: "sk-1", name: "React.js", category: "Frontend", proficiency: 92, iconName: "Atom", experienceLevel: "Advanced", tags: ["Hooks", "Context", "Vite", "SPA"] },
  { id: "sk-2", name: "JavaScript (ES6+)", category: "Frontend", proficiency: 95, iconName: "FileCode", experienceLevel: "Expert", tags: ["Async/Await", "DOM", "Closures"] },
  { id: "sk-3", name: "TypeScript", category: "Frontend", proficiency: 88, iconName: "Code2", experienceLevel: "Advanced", tags: ["Generics", "Interfaces", "Strict Typing"] },
  { id: "sk-4", name: "Tailwind CSS", category: "Frontend", proficiency: 94, iconName: "Palette", experienceLevel: "Expert", tags: ["Responsive", "Dark Mode", "Custom Themes"] },
  { id: "sk-5", name: "HTML5 & CSS3", category: "Frontend", proficiency: 98, iconName: "Layout", experienceLevel: "Expert", tags: ["Semantic HTML", "Flexbox", "Grid", "Animations"] },

  // Backend
  { id: "sk-6", name: "Node.js", category: "Backend", proficiency: 90, iconName: "Server", experienceLevel: "Advanced", tags: ["Event Loop", "Streams", "NPM", "Async IO"] },
  { id: "sk-7", name: "Express.js", category: "Backend", proficiency: 92, iconName: "Cpu", experienceLevel: "Advanced", tags: ["REST APIs", "Middleware", "Routing", "Auth"] },
  { id: "sk-8", name: "RESTful APIs", category: "Backend", proficiency: 94, iconName: "Network", experienceLevel: "Expert", tags: ["API Design", "JSON", "Error Handling", "Versioning"] },
  { id: "sk-9", name: "JWT & Security", category: "Backend", proficiency: 86, iconName: "ShieldCheck", experienceLevel: "Intermediate", tags: ["Tokens", "Bcrypt", "CORS", "Rate Limiting"] },

  // Database
  { id: "sk-10", name: "MongoDB & Mongoose", category: "Database", proficiency: 88, iconName: "Database", experienceLevel: "Advanced", tags: ["NoSQL", "Aggregation", "Indexing", "Schemas"] },
  { id: "sk-11", name: "MySQL", category: "Database", proficiency: 85, iconName: "TableProperties", experienceLevel: "Intermediate", tags: ["Relational", "Joins", "Transactions", "Triggers"] },
  { id: "sk-12", name: "PostgreSQL", category: "Database", proficiency: 82, iconName: "Layers", experienceLevel: "Intermediate", tags: ["ACID", "Complex Queries", "Foreign Keys"] },

  // Programming
  { id: "sk-13", name: "Java", category: "Programming", proficiency: 90, iconName: "Coffee", experienceLevel: "Advanced", tags: ["OOP", "Collections", "Multithreading", "Swing"] },
  { id: "sk-14", name: "C++", category: "Programming", proficiency: 88, iconName: "Binary", experienceLevel: "Advanced", tags: ["STL", "Data Structures", "Algorithms", "Pointers"] },
  { id: "sk-15", name: "C", category: "Programming", proficiency: 85, iconName: "Terminal", experienceLevel: "Intermediate", tags: ["Memory Management", "Pointers", "System Calls"] },
  { id: "sk-16", name: "Python", category: "Programming", proficiency: 84, iconName: "FileTerminal", experienceLevel: "Intermediate", tags: ["Scripting", "Automation", "OOP", "NumPy"] },

  // Tools
  { id: "sk-17", name: "Git & GitHub", category: "Tools", proficiency: 95, iconName: "GitBranch", experienceLevel: "Expert", tags: ["Branches", "PRs", "Workflows", "Rebase"] },
  { id: "sk-18", name: "VS Code", category: "Tools", proficiency: 96, iconName: "Code", experienceLevel: "Expert", tags: ["Extensions", "Debugging", "Snippets"] },
  { id: "sk-19", name: "Postman", category: "Tools", proficiency: 92, iconName: "Send", experienceLevel: "Advanced", tags: ["API Testing", "Collections", "Mock Servers"] },
  { id: "sk-20", name: "Docker & Linux", category: "Tools", proficiency: 78, iconName: "Box", experienceLevel: "Intermediate", tags: ["Containers", "CLI", "Shell Scripting"] }
];

export const initialExperience: IExperience[] = [
  {
    id: "exp-1",
    organization: "Apex Tech Innovations",
    role: "Full-Stack Web Developer Intern",
    type: "Internship",
    startDate: "June 2024",
    endDate: "August 2024",
    current: false,
    location: "Bangalore, India (Remote)",
    description: [
      "Engineered responsive React dashboards and implemented 12+ RESTful API endpoints using Express.js and MongoDB.",
      "Optimized database queries and added indexing, reducing API response latency by 35% on high-traffic data tables.",
      "Collaborated with cross-functional teams in daily Agile standups, code reviews, and Git feature-branch workflows."
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Git"]
  },
  {
    id: "exp-2",
    organization: "Freelance & Independent Client Projects",
    role: "Full-Stack Web Consultant",
    type: "Freelance",
    startDate: "January 2024",
    endDate: "Present",
    current: true,
    location: "Remote",
    description: [
      "Delivered 5+ custom websites and web portals for local business clients and student organizations with 100% on-time delivery.",
      "Implemented responsive mobile-first UI designs, SEO optimizations, and secure payment and contact workflows.",
      "Provided continuous maintenance, performance audits, and cloud deployment setup on Vercel and Render."
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "REST APIs", "Vercel"]
  },
  {
    id: "exp-3",
    organization: "College Computer Science Club & Hackathon Team",
    role: "Technical Lead & Core Contributor",
    type: "College Activity",
    startDate: "September 2023",
    endDate: "Present",
    current: true,
    location: "Campus",
    description: [
      "Conducted technical hands-on workshops on Git/GitHub, Modern JavaScript, and Web Development for 80+ junior peers.",
      "Mentored student teams in 24-hour hackathons, assisting in debugging, architectural planning, and rapid prototyping.",
      "Organized annual coding competitions and managed the club's open-source web assets."
    ],
    technologies: ["Git", "JavaScript", "Python", "Problem Solving", "Team Leadership"]
  }
];

export const initialEducation: IEducation[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Engineering (B.E.)",
    field: "Computer Science & Engineering",
    institution: "Visvesvaraya Technological University (VTU) Affiliated Institute",
    university: "Visvesvaraya Technological University",
    startYear: "2022",
    endYear: "2026",
    cgpaOrPercentage: "8.85 / 10.0 CGPA",
    location: "Karnataka, India",
    relevantCoursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java/C++)",
      "Database Management Systems (DBMS)",
      "Computer Networks",
      "Operating Systems",
      "Web Technologies",
      "Software Engineering Principles"
    ],
    honors: "Dean's List Academic Excellence, Departmental Merit Scholar"
  },
  {
    id: "edu-2",
    degree: "Pre-University / Higher Secondary (12th Grade)",
    field: "Science (PCMB - Physics, Chemistry, Math, Biology)",
    institution: "Pre-University Composite College",
    university: "State Board of Pre-University Education",
    startYear: "2020",
    endYear: "2022",
    cgpaOrPercentage: "94.5%",
    location: "Karnataka, India",
    relevantCoursework: [
      "Advanced Mathematics & Calculus",
      "Physics & Electronics",
      "Computer Applications"
    ],
    honors: "Distinction with Top 2% State Percentile"
  }
];

export const initialAchievements: IAchievement[] = [
  {
    id: "ach-1",
    title: "Meta Certified Front-End Developer Specialization",
    category: "Certification",
    issuer: "Meta / Coursera",
    date: "2024",
    credentialUrl: "https://coursera.org/verify/professional-cert/sample",
    certificateImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
    description: "9-course comprehensive specialization covering React, JavaScript, Advanced UI UX, Version Control, and Front-End Capstone Project.",
    skillsGained: ["React.js", "Advanced JS", "Jest Unit Testing", "UI/UX Architecture"]
  },
  {
    id: "ach-2",
    title: "Finalist & 2nd Runner Up - State Level Hackathon",
    category: "Hackathon",
    issuer: "Inter-Collegiate Innovation Conclave",
    date: "2024",
    credentialUrl: "https://hackathon-verify.example.com",
    certificateImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    description: "Built a functional AI-assisted emergency municipal response platform within 24 hours competing against 45+ university teams.",
    skillsGained: ["Rapid Prototyping", "Team Pitching", "Full-Stack Integration"]
  },
  {
    id: "ach-3",
    title: "Node.js & MongoDB Backend Web Development",
    category: "Certification",
    issuer: "Udemy / MongoDB University",
    date: "2023",
    credentialUrl: "https://udemy.com/certificate/UC-sample",
    certificateImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    description: "Hands-on mastery of REST APIs, Mongoose data modeling, JWT authentication, aggregation pipelines, and deployment.",
    skillsGained: ["Node.js", "Express", "Mongoose", "API Security"]
  },
  {
    id: "ach-4",
    title: "5-Star Problem Solving & Gold Badge in Java / C++",
    category: "Technical",
    issuer: "HackerRank & LeetCode",
    date: "2024",
    credentialUrl: "https://hackerrank.com/profile/sample",
    certificateImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    description: "Solved 350+ algorithmic problems across arrays, trees, dynamic programming, and graph theory.",
    skillsGained: ["Data Structures", "Algorithms", "Time Complexity Optimization"]
  }
];

export const initialMessages: IMessage[] = [
  {
    id: "msg-1",
    name: "Sarah Jenkins",
    email: "sarah.j@techrecruiters.com",
    phone: "+1 415-555-0143",
    subject: "Full-Stack Developer Opportunity",
    message: "Hi Yashas, I came across your portfolio and was impressed by your full-stack projects and embedded systems work. We have an opening on our engineering team and would love to schedule a quick introduction call.",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "msg-2",
    name: "David Chen",
    email: "david@startupstudio.io",
    phone: "+1 206-555-0182",
    subject: "Freelance Project Inquiry - React & Express",
    message: "Hello! We are looking to revamp our student portal dashboard and need a skilled React/Node developer. Could you let us know your availability for a 4-week freelance contract?",
    isRead: true,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
  }
];
