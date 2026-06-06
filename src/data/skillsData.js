// src/data/skillsData.js
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, 
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiGit, SiDocker, SiGraphql, SiTypescript, SiRedux,
  SiOpenai ,SiPostman 
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaCloud } from 'react-icons/fa'; // fallback for AWS

export const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#06B6D4' },
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Redux', icon: SiRedux, color: '#764ABC' },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
      { name: 'AI Integration', icon: SiOpenai, color: '#10A37F' },
    ]
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git/GitHub', icon: SiGit, color: '#F05032' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'AWS Cloud', icon: FaCloud, color: '#FF9900' },
      { name: 'Postman', icon: SiPostman, color: '#F05032' },
      { name: 'VS Code', icon: VscVscode, color: '#2496ED' },
    ]
  }
];