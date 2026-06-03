// src/components/Projects.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/projectsData';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass-card group overflow-hidden rounded-2xl flex flex-col h-full"
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center gap-4 pb-4">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-orange-500 transition">
            <FiExternalLink className="text-white text-xl" />
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-orange-500 transition">
            <FiGithub className="text-white text-xl" />
          </a>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.techTags.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 text-xs rounded-full bg-white/10 text-orange-300 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 px-6 md:px-12">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="gradient-text">Projects</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Real-world applications demonstrating modern full-stack development</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;