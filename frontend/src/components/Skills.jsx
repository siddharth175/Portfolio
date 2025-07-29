import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Server, Wrench, GitBranch, Monitor } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code2 className="w-6 h-6" />,
      skills: [
        { name: "Java", level: 95, color: "from-orange-400 to-red-500" },
        { name: "Python", level: 85, color: "from-blue-400 to-blue-600" },
        { name: "JavaScript", level: 80, color: "from-yellow-400 to-yellow-600" },
        { name: "HTML5", level: 90, color: "from-orange-500 to-red-600" },
        { name: "CSS", level: 85, color: "from-blue-400 to-purple-500" }
      ]
    },
    {
      title: "Frameworks & Libraries",
      icon: <Server className="w-6 h-6" />,
      skills: [
        { name: "Spring Boot", level: 95, color: "from-green-400 to-green-600" },
        { name: "React", level: 80, color: "from-cyan-400 to-blue-500" },
        { name: "Hibernate", level: 85, color: "from-purple-400 to-purple-600" },
        { name: "Apache Spark", level: 75, color: "from-orange-400 to-red-500" },
        { name: "Hadoop", level: 70, color: "from-yellow-400 to-orange-500" }
      ]
    },
    {
      title: "Databases",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "MySQL", level: 90, color: "from-blue-400 to-blue-600" },
        { name: "MongoDB", level: 85, color: "from-green-400 to-green-600" },
        { name: "Oracle", level: 80, color: "from-red-400 to-red-600" },
        { name: "PostgreSQL", level: 75, color: "from-indigo-400 to-purple-500" }
      ]
    },
    {
      title: "Developer Tools",
      icon: <Wrench className="w-6 h-6" />,
      skills: [
        { name: "IntelliJ IDEA", level: 95, color: "from-orange-400 to-red-500" },
        { name: "VS Code", level: 90, color: "from-blue-400 to-blue-600" },
        { name: "Eclipse", level: 85, color: "from-purple-400 to-purple-600" },
        { name: "Maven", level: 88, color: "from-green-400 to-green-600" },
        { name: "Git", level: 90, color: "from-orange-400 to-red-500" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="skills" className="py-20 bg-black relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical <span className="text-green-400">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Proficient in modern technologies and frameworks for building scalable, efficient applications
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-green-400/30 transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className="flex items-center mb-8">
                  <div className="p-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl text-black mr-4 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-green-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                        >
                          {/* Animated glow effect */}
                          <motion.div
                            className="absolute inset-0 bg-white/20 rounded-full"
                            animate={{ 
                              opacity: [0.5, 1, 0.5],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: skillIndex * 0.2
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl font-semibold text-white text-center mb-8">
              Other <span className="text-green-400">Technologies</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                "REST APIs", "Microservices", "Docker", "Agile/Scrum", "Jira", 
                "Splunk", "JUnit", "Git", "Tomcat", "OpenCV", "Machine Learning",
                "Data Mining", "System Design", "CI/CD", "Cloud Computing"
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:border-green-400 hover:text-green-400 hover:scale-105 transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;