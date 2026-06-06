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
      { name: 'JavaScript', percent: 90, icon: SiJavascript, color: '#06B6D4' },
      { name: 'React.js', percent: 95, icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', percent: 90, icon: SiNextdotjs, color: '#ffffff' },
      { name: 'ReactNative', percent: 95, icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', percent: 85, icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', percent: 92, icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Redux', percent: 88, icon: SiRedux, color: '#764ABC' },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', percent: 92, icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', percent: 90, icon: SiExpress, color: '#ffffff' },
      { name: 'MongoDB', percent: 88, icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', percent: 85, icon: SiPostgresql, color: '#4169E1' },
      { name: 'GraphQL', percent: 80, icon: SiGraphql, color: '#E10098' },
      { name: 'AI Integration', percent: 80, icon: SiOpenai, color: '#10A37F' },
    ]
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git/GitHub', percent: 95, icon: SiGit, color: '#F05032' },
      { name: 'Docker', percent: 78, icon: SiDocker, color: '#2496ED' },
      { name: 'AWS Cloud', percent: 75, icon: FaCloud, color: '#FF9900' },
      { name: 'Postman', percent: 85, icon: SiPostman, color: '#F05032' },
      { name: 'Vs Code', percent: 78, icon: VscVscode, color: '#2496ED' },
    ]
  }
];