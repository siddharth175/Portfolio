import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Code, Database, Eye, Cpu } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const projects = [
    {
      title: "Hotel Management System - MERN Stack",
      description: "Developed a cutting-edge hotel management system using the MERN stack, enabling real-time bookings and dynamic room availability management. Implemented a seamless customer experience with an intuitive UI and optimized data storage using MongoDB, ensuring efficient booking processes.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Real-time Updates"],
      icon: <Database className="w-6 h-6" />,
      category: "Full-Stack Development",
      achievements: ["Real-time booking system", "Dynamic room management", "Optimized database queries", "Responsive UI/UX"],
      githubUrl: "https://github.com/siddharthsingh/hotel-management",
      liveUrl: "https://hotel-system-demo.com"
    },
    {
      title: "FaceVerify: Dataset-Driven Face Recognition System",
      description: "Developed FaceVerify using OpenCV and Python, achieving a 98% accuracy in real-time facial recognition via the ResNet model. Implemented advanced computer vision techniques for robust face detection and recognition in various lighting conditions.",
      technologies: ["Python", "OpenCV", "ResNet", "Machine Learning", "Computer Vision", "Deep Learning"],
      icon: <Eye className="w-6 h-6" />,
      category: "Machine Learning",
      achievements: ["98% recognition accuracy", "Real-time processing", "ResNet model optimization", "Robust lighting handling"],
      githubUrl: "https://github.com/siddharthsingh/face-recognition",
      liveUrl: "https://faceverify-demo.com"
    },
    {
      title: "Human-Computer Interaction System",
      description: "Developed an intelligent and interactive system that utilizes hand gestures and voice commands to seamlessly control various computer functionalities, achieving 95% accuracy in gesture recognition and 90% accuracy in voice command interpretation.",
      technologies: ["Python", "OpenCV", "Speech Recognition", "Computer Vision", "Machine Learning", "Natural Language Processing"],
      icon: <Cpu className="w-6 h-6" />,
      category: "Accessibility Technology",
      achievements: ["95% gesture accuracy", "90% voice accuracy", "Multi-modal interaction", "Accessibility focused"],
      githubUrl: "https://github.com/siddharthsingh/gesture-voice-control",
      liveUrl: "https://hci-system-demo.com"
    },
    {
      title: "Morse Code Implementation Using Eye Blinks",
      description: "Engineered a Morse code communication system using eye blinks with OpenCV, achieving 90% accuracy in blink detection. This innovative accessibility solution enables communication for individuals with limited mobility.",
      technologies: ["Python", "OpenCV", "Computer Vision", "Signal Processing", "Accessibility Tech", "Pattern Recognition"],
      icon: <Code className="w-6 h-6" />,
      category: "Accessibility Innovation",
      achievements: ["90% blink accuracy", "Real-time processing", "Morse code translation", "Assistive technology"],
      githubUrl: "https://github.com/siddharthsingh/morse-eye-blink",
      liveUrl: "https://morse-blink-demo.com"
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
    <section id="projects" className="py-20 bg-gray-900 relative">
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
              Featured <span className="text-green-400">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Innovative solutions combining cutting-edge technology with practical applications
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group"
              >
                <Card className="bg-gray-800 border-gray-700 hover:border-green-400/50 transition-all duration-300 h-full flex flex-col hover:shadow-lg hover:shadow-green-400/10">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg text-black group-hover:scale-110 transition-transform">
                          {project.icon}
                        </div>
                        <Badge variant="outline" className="text-green-400 border-green-400/50">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-green-400 transition-colors line-clamp-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-base leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow space-y-6">
                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="bg-gray-700 text-gray-300 hover:bg-green-400/20 hover:text-green-400 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-3">Key Achievements</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-center text-sm text-gray-400">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 flex-shrink-0"></div>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2 border-green-400/50 text-green-400 hover:bg-green-400/10"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </Button>
                    <Button
                      size="sm"
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View More Projects Button */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-green-400/50 text-green-400 hover:bg-green-400/10 hover:border-green-400 px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://github.com/siddharthsingh', '_blank')}
            >
              <Github className="mr-2 w-5 h-5" />
              View All Projects on GitHub
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;