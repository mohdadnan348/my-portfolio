// src/components/Skills.jsx
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skillCategories } from '../data/skillsData';

const SkillBar = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <skill.icon className="text-xl" style={{ color: skill.color }} />
          <span className="font-medium text-gray-200">{skill.name}</span>
        </div>
        <span className="text-sm text-orange-400">{skill.percent}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.percent}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 px-6 md:px-12">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical <span className="gradient-text">Expertise</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Modern stack & tools I master to deliver high-quality solutions</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass-card p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold mb-6 border-b border-white/10 pb-2 inline-block gradient-text">
                {category.title}
              </h3>
              <div>
                {category.skills.map((skill, idx) => (
                  <SkillBar key={idx} skill={skill} index={idx} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;