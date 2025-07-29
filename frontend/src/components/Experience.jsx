import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const experiences = [
    {
      title: "Software Developer Intern",
      company: "Cyberage Solution LLC",
      location: "New Jersey, USA",
      period: "Sep 2023 - Feb 2024",
      type: "Internship",
      description: "Developed and maintained Java APIs with Spring Boot, designed microservices, and worked with RESTful API integrations.",
      responsibilities: [
        "Developed and maintained Java APIs with Spring Boot",
        "Designed and Developed Micro Services for the REST API endpoints",
        "Worked with Users/BA's to compile requirements for RESTful APIs",
        "Used Aspose to generate reports and upload same in BOX using BOX api's",
        "Monitored system health using Splunk",
        "Performed defect tracking, bug fixing, and enhancements",
        "Wrote JUnits for integration testing and logic testing"
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "Microservices", "Git", "Splunk", "JUnit", "BOX API"],
      achievements: [
        "Improved API response time by 40%",
        "Reduced bug reports by 60%",
        "Implemented 15+ REST endpoints"
      ]
    },
    {
      title: "Software Engineer",
      company: "Creatick Infomatics",
      location: "Hyderabad, India",
      period: "Nov 2020 - May 2021",
      type: "Full-time",
      description: "Designed and optimized RESTful APIs integrating with cloud services and distributed computing frameworks.",
      responsibilities: [
        "Designed and optimized RESTful APIs integrating with cloud services",
        "Developed Micro Services for the REST API endpoints",
        "Created Docker images from Docker file",
        "Developed SQL and PL/SQL queries using MySQL",
        "Conducted comprehensive monitoring and troubleshooting",
        "Responsible for backup, recovery, and upgrading PostgreSQL databases",
        "Engaged in cross-functional team projects"
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "Docker", "MySQL", "PostgreSQL", "Cloud Services"],
      achievements: [
        "Optimized database queries by 50%",
        "Deployed 10+ microservices in production",
        "Reduced server downtime by 30%"
      ]
    }
  ];

  const education = [
    {
      institution: "Montclair State University",
      degree: "Master in Computer Science",
      location: "New Jersey, USA",
      period: "2022 - 2024",
      gpa: "3.8/4.0",
      courses: [
        "Software Engineering", "Database Systems", "Machine Learning", 
        "Data Structures and Algorithms", "Web Development", "Operating System"
      ]
    },
    {
      institution: "Sreenidhi Institute of Science and Technology",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      location: "Hyderabad, India",
      period: "2016 - 2020",
      gpa: "3.7/4.0"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="experience" className="py-20 bg-black relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Experience & <span className="text-green-400">Education</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Professional journey and academic achievements that shaped my expertise
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Professional <span className="text-green-400">Experience</span>
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative"
                >
                  <Card className="bg-gray-900 border-gray-800 hover:border-green-400/30 transition-all duration-300 group">
                    <CardHeader className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg">
                            <Building className="w-5 h-5 text-black" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-white group-hover:text-green-400 transition-colors">
                              {exp.title}
                            </CardTitle>
                            <p className="text-green-400 font-semibold">{exp.company}</p>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end space-y-2">
                          <Badge variant="outline" className="text-blue-400 border-blue-400/50 w-fit">
                            {exp.type}
                          </Badge>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.period}
                          </div>
                          <div className="flex items-center text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <p className="text-gray-300 leading-relaxed">{exp.description}</p>

                      {/* Key Responsibilities */}
                      <div>
                        <h4 className="text-green-400 font-semibold mb-3">Key Responsibilities</h4>
                        <div className="grid gap-2">
                          {exp.responsibilities.map((resp, respIndex) => (
                            <div key={respIndex} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-green-400 font-semibold mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="bg-gray-800 text-gray-300 hover:bg-green-400/20 hover:text-green-400 transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="text-green-400 font-semibold mb-3">Key Achievements</h4>
                        <div className="grid gap-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                              <span className="text-gray-300 text-sm">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              <span className="text-green-400">Education</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                >
                  <Card className="bg-gray-900 border-gray-800 hover:border-green-400/30 transition-all duration-300 group h-full">
                    <CardHeader className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg">
                          <Building className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white group-hover:text-green-400 transition-colors">
                            {edu.institution}
                          </CardTitle>
                          <p className="text-green-400 font-semibold">{edu.degree}</p>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.period}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {edu.location}
                        </div>
                        {edu.gpa && (
                          <div className="flex items-center text-blue-400 text-sm font-semibold">
                            GPA: {edu.gpa}
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    {edu.courses && (
                      <CardContent>
                        <h4 className="text-green-400 font-semibold mb-3">Relevant Coursework</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course, courseIndex) => (
                            <Badge
                              key={courseIndex}
                              variant="secondary"
                              className="bg-gray-800 text-gray-300 hover:bg-blue-400/20 hover:text-blue-400 transition-colors text-xs"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;