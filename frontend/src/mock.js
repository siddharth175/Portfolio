// Mock data for Siddharth Singh's Portfolio
export const mockData = {
  // Personal Information
  personalInfo: {
    name: "Siddharth Kumar Singh",
    title: "Java Developer & Backend Engineer",
    email: "siddharthkumarsingh175@gmail.com",
    phone: "+1 (555) 123-4567",
    location: "New Jersey, USA",
    tagline: "Building clean, scalable backend systems with Java, Spring Boot, and modern cloud technologies",
    linkedin: "https://linkedin.com/in/siddharth-singh",
    github: "https://github.com/siddharthsingh",
    resume: "/assets/resume/Siddharth_Singh_Resume.pdf"
  },

  // Education
  education: [
    {
      id: 1,
      institution: "Montclair State University",
      degree: "Master in Computer Science",
      location: "New Jersey, USA",
      period: "2022 - 2024",
      gpa: "3.8/4.0",
      courses: [
        "Software Engineering",
        "Database Systems",
        "Machine Learning",
        "Data Structures and Algorithms",
        "Web Development",
        "Operating System",
        "Data Mining",
        "Computer Architecture"
      ]
    },
    {
      id: 2,
      institution: "Sreenidhi Institute of Science and Technology",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      location: "Hyderabad, India",
      period: "2016 - 2020",
      gpa: "3.7/4.0"
    }
  ],

  // Work Experience
  experience: [
    {
      id: 1,
      title: "Software Developer Intern",
      company: "Cyberage Solution LLC",
      location: "New Jersey, USA",
      period: "Sep 2023 - Feb 2024",
      type: "Internship",
      description: "Developed and maintained Java APIs with Spring Boot, designed microservices, and worked with RESTful API integrations.",
      responsibilities: [
        "Developed and maintained Java APIs with Spring Boot",
        "Developed Rest endpoints using Spring Boot",
        "Designed and Developed Micro Services for the REST API endpoints",
        "Worked with Users/BA's to compile requirements for RESTful APIs and integrated systems like BOX",
        "Used Aspose to generate reports and upload same in BOX using BOX api's",
        "Used GIT for code management and Stash as repository",
        "Monitored system health using Splunk",
        "Performed defect tracking, bug fixing, and enhancements",
        "Wrote Junits for integration testing and logic testing"
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "Microservices", "Git", "Splunk", "JUnit", "BOX API"]
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "Creatick Infomatics",
      location: "Hyderabad, India",
      period: "Nov 2020 - May 2021",
      type: "Full-time",
      description: "Designed and optimized RESTful APIs integrating with cloud services and distributed computing frameworks.",
      responsibilities: [
        "Designed and optimized RESTful APIs integrating seamlessly with cloud services and distributed computing frameworks",
        "Developed Micro Services for the REST API endpoints",
        "Created Docker images from Docker file",
        "Developed SQL and PL/SQL queries using MySQL",
        "Conducted comprehensive monitoring and troubleshooting using industry-standard tools",
        "Responsible for backup, recovery, and upgrading the PostgreSQL databases",
        "Engaged in cross-functional team projects"
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "Docker", "MySQL", "PostgreSQL", "Cloud Services"]
    }
  ],

  // Contact Form Messages (Mock responses)
  contactResponses: [
    "Thank you for reaching out! I'll get back to you within 24 hours.",
    "Thanks for your message! I'm excited to discuss potential opportunities with you.",
    "I appreciate your interest! I'll review your message and respond soon.",
    "Thank you for contacting me! I look forward to connecting with you."
  ],

  // Skills
  skills: {
    programmingLanguages: [
      { name: "Java", level: 95, yearsExperience: 4 },
      { name: "Python", level: 85, yearsExperience: 3 },
      { name: "JavaScript", level: 80, yearsExperience: 2 },
      { name: "HTML5", level: 90, yearsExperience: 3 },
      { name: "CSS", level: 85, yearsExperience: 3 }
    ],
    frameworks: [
      { name: "Spring Boot", level: 95, yearsExperience: 3 },
      { name: "React", level: 80, yearsExperience: 2 },
      { name: "Hibernate", level: 85, yearsExperience: 3 },
      { name: "Apache Spark", level: 75, yearsExperience: 1 },
      { name: "Hadoop", level: 70, yearsExperience: 1 }
    ],
    databases: [
      { name: "MySQL", level: 90, yearsExperience: 4 },
      { name: "MongoDB", level: 85, yearsExperience: 2 },
      { name: "Oracle", level: 80, yearsExperience: 2 },
      { name: "PostgreSQL", level: 75, yearsExperience: 1 }
    ],
    tools: [
      { name: "IntelliJ IDEA", level: 95, yearsExperience: 4 },
      { name: "VS Code", level: 90, yearsExperience: 3 },
      { name: "Git", level: 90, yearsExperience: 4 },
      { name: "Maven", level: 88, yearsExperience: 3 },
      { name: "Docker", level: 75, yearsExperience: 1 }
    ]
  },

  // Testimonials (Mock)
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Software Engineer",
      company: "Cyberage Solution LLC",
      message: "Siddharth is an exceptional developer with a strong grasp of Java and Spring Boot. His ability to design scalable microservices and work collaboratively made him a valuable team member during his internship.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      position: "Tech Lead",
      company: "Creatick Infomatics",
      message: "Working with Siddharth was a great experience. He consistently delivered high-quality REST APIs and showed excellent problem-solving skills. His attention to detail and proactive approach to learning new technologies is commendable.",
      rating: 5,
      image: "/api/placeholder/100/100"
    },
    {
      id: 3,
      name: "Prof. Michael Chen",
      position: "Computer Science Professor",
      company: "Montclair State University",
      message: "Siddharth demonstrates exceptional academic performance and practical application of computer science concepts. His innovative projects, particularly in machine learning and computer vision, showcase his technical depth and creativity.",
      rating: 5,
      image: "/api/placeholder/100/100"
    }
  ],

  // Statistics
  statistics: [
    { label: "Years of Experience", value: "3+" },
    { label: "Projects Completed", value: "15+" },
    { label: "Technologies Mastered", value: "20+" },
    { label: "GitHub Repositories", value: "25+" }
  ]
};

// Mock API functions
export const mockApi = {
  // Contact form submission
  submitContactForm: (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomResponse = mockData.contactResponses[
          Math.floor(Math.random() * mockData.contactResponses.length)
        ];
        resolve({
          success: true,
          message: randomResponse,
          timestamp: new Date().toISOString()
        });
      }, 1500); // Simulate API delay
    });
  },

  // Download resume
  downloadResume: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          downloadUrl: mockData.personalInfo.resume,
          filename: "Siddharth_Singh_Resume.pdf"
        });
      }, 1000);
    });
  },

  // Get project details
  getProjectDetails: (projectId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          project: {
            id: projectId,
            detailedDescription: "This is a detailed view of the project...",
            challenges: ["Challenge 1", "Challenge 2"],
            solutions: ["Solution 1", "Solution 2"],
            learnings: ["Learning 1", "Learning 2"]
          }
        });
      }, 800);
    });
  }
};