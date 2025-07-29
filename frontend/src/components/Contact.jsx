import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Download, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { mockApi } from '../mock';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await mockApi.submitContactForm(formData);
      
      if (response.success) {
        toast({
          title: "Message Sent Successfully!",
          description: response.message,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = async () => {
    try {
      const response = await mockApi.downloadResume();
      if (response.success) {
        // In a real app, this would trigger the download
        toast({
          title: "Resume Download",
          description: "Resume download will begin shortly...",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "siddharthkumarsingh175@gmail.com",
      href: "mailto:siddharthkumarsingh175@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      value: "New Jersey, USA",
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      title: "GitHub",
      href: "https://github.com/siddharthsingh",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      title: "LinkedIn",
      href: "https://linkedin.com/in/siddharth-singh",
      color: "hover:text-blue-400"
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
    <section id="contact" className="py-20 bg-gray-900 relative">
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
              Get In <span className="text-green-400">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Ready to discuss your next project? Let's connect and create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
              {/* Contact Details */}
              <Card className="bg-gray-800 border-gray-700 hover:border-green-400/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Mail className="w-5 h-5 text-green-400 mr-2" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="p-2 bg-green-400/20 rounded-lg text-green-400">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.title}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white hover:text-green-400 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-gray-800 border-gray-700 hover:border-green-400/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Connect With Me</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-green-400/50 transition-all duration-300 group ${social.color}`}
                    >
                      <div className="text-green-400 group-hover:scale-110 transition-transform">
                        {social.icon}
                      </div>
                      <span className="text-white group-hover:text-green-400 transition-colors">
                        {social.title}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors ml-auto" />
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Resume Download */}
              <Card className="bg-gray-800 border-gray-700 hover:border-green-400/30 transition-all duration-300">
                <CardContent className="pt-6">
                  <Button
                    onClick={handleDownloadResume}
                    className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/25"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Resume
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="bg-gray-800 border-gray-700 hover:border-green-400/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Send Me a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name
                        </label>
                        <Input
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/20 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                          className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <Input
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        required
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/20 transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project or just say hello..."
                        required
                        rows={6}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/20 transition-all duration-300 resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-400/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;