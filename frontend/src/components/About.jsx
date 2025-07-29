import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Server, Cloud } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

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
    <section id="about" className="py-20 bg-gray-900 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About <span className="text-green-400">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image and Border Animation */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative w-80 h-80 mx-auto">
                {/* Animated Neon Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    background: [
                      'linear-gradient(45deg, #10b981, #3b82f6, #10b981)',
                      'linear-gradient(45deg, #3b82f6, #10b981, #3b82f6)',
                      'linear-gradient(45deg, #10b981, #3b82f6, #10b981)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{
                    padding: '3px',
                    borderRadius: '1rem'
                  }}
                >
                  <div className="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl font-bold text-black">SS</span>
                      </div>
                      <p className="text-white font-semibold text-lg">Siddharth Singh</p>
                      <p className="text-green-400 text-sm">Java Developer</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  I'm a passionate <span className="text-green-400 font-semibold">Java Backend Developer</span> with 
                  expertise in building robust, scalable systems. Currently pursuing my Master's in Computer Science 
                  at <span className="text-blue-400 font-semibold">Montclair State University</span>, I bring both 
                  academic knowledge and practical industry experience.
                </p>
                
                <p className="text-lg">
                  With professional experience at <span className="text-green-400 font-semibold">Cyberage Solution LLC</span> and 
                  <span className="text-green-400 font-semibold"> Creatick Infomatics</span>, I specialize in developing 
                  RESTful APIs, microservices architecture, and database optimization using modern Java frameworks.
                </p>

                <p className="text-lg">
                  My passion extends beyond backend development to innovative projects involving machine learning, 
                  computer vision, and accessibility solutions, achieving <span className="text-green-400 font-semibold">95%+ accuracy</span> in 
                  various recognition systems.
                </p>
              </div>

              {/* Tech Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-400/50 transition-colors">
                  <Server className="w-6 h-6 text-green-400" />
                  <span className="text-white font-medium">Backend Systems</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-400/50 transition-colors">
                  <Code className="w-6 h-6 text-blue-400" />
                  <span className="text-white font-medium">Spring Boot</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-400/50 transition-colors">
                  <Database className="w-6 h-6 text-purple-400" />
                  <span className="text-white font-medium">Database Design</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-400/50 transition-colors">
                  <Cloud className="w-6 h-6 text-cyan-400" />
                  <span className="text-white font-medium">Microservices</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;