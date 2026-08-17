// src/data/skillsData.js

import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiDocker,
  SiAmazonwebservices,
  SiOpenai,
  SiGoogle,
  SiGit,
  SiGithub,
  SiPostman,
  SiSwagger,
  SiVercel,
  SiRender,
  SiCloudinary,
} from 'react-icons/si';

import { VscVscode } from 'react-icons/vsc';

export const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      {
        name: 'HTML5',
        percent: 85,
        icon: SiHtml5,
        color: '#E34F26',
      },
      {
        name: 'CSS3',
        percent: 85,
        icon: SiCss3,
        color: '#1572B6',
      },
      {
        name: 'JavaScript',
        percent: 90,
        icon: SiJavascript,
        color: '#F7DF1E',
      },
      {
        name: 'TypeScript',
        percent: 85,
        icon: SiTypescript,
        color: '#3178C6',
      },
      {
        name: 'React.js',
        percent: 95,
        icon: SiReact,
        color: '#61DAFB',
      },
      {
        name: 'React Native',
        percent: 90,
        icon: SiReact,
        color: '#61DAFB',
      },
      {
        name: 'Next.js',
        percent: 90,
        icon: SiNextdotjs,
        color: '#ffffff',
      },
      {
        name: 'Tailwind CSS',
        percent: 92,
        icon: SiTailwindcss,
        color: '#06B6D4',
      },
    ],
  },

  {
    title: 'Backend',
    skills: [
      {
        name: 'Node.js',
        percent: 92,
        icon: SiNodedotjs,
        color: '#339933',
      },
      {
        name: 'Express.js',
        percent: 90,
        icon: SiExpress,
        color: '#ffffff',
      },
      {
        name: 'REST APIs',
        percent: 90,
        icon: SiSwagger,
        color: '#85EA2D',
      },
      {
        name: 'MongoDB',
        percent: 88,
        icon: SiMongodb,
        color: '#47A248',
      },
      {
        name: 'PostgreSQL',
        percent: 85,
        icon: SiPostgresql,
        color: '#4169E1',
      },
      {
        name: 'Prisma ORM',
        percent: 82,
        icon: SiPrisma,
        color: '#2D3748',
      },
      {
        name: 'JWT / RBAC',
        percent: 90,
        icon: SiNodedotjs,
        color: '#339933',
      },
    ],
  },

  {
    title: 'AI Integration',
    skills: [
      {
        name: 'OpenAI API',
        percent: 80,
        icon: SiOpenai,
        color: '#10A37F',
      },
      {
        name: 'Gemini API',
        percent: 75,
        icon: SiGoogle,
        color: '#4285F4',
      },
      {
        name: 'DeepSeek API',
        percent: 85,
        icon: SiOpenai,
        color: '#10A37F',
      },
    ],
  },

  {
    title: 'DevOps & Cloud',
    skills: [
      {
        name: 'Docker',
        percent: 75,
        icon: SiDocker,
        color: '#2496ED',
      },
      {
        name: 'AWS',
        percent: 60,
        icon: SiAmazonwebservices,
        color: '#FF9900',
      },
      {
        name: 'Vercel',
        percent: 88,
        icon: SiVercel,
        color: '#ffffff',
      },
      {
        name: 'Render',
        percent: 80,
        icon: SiRender,
        color: '#46E3B7',
      },
    ],
  },

  {
    title: 'Tools & Development',
    skills: [
      {
        name: 'Git',
        percent: 90,
        icon: SiGit,
        color: '#F05032',
      },
      {
        name: 'GitHub',
        percent: 90,
        icon: SiGithub,
        color: '#ffffff',
      },
      {
        name: 'Postman',
        percent: 85,
        icon: SiPostman,
        color: '#FF6C37',
      },
      {
        name: 'Swagger / OpenAPI',
        percent: 85,
        icon: SiSwagger,
        color: '#85EA2D',
      },
      {
        name: 'VS Code',
        percent: 90,
        icon: VscVscode,
        color: '#007ACC',
      },
    ],
  },

  {
    title: 'Other Technologies',
    skills: [
      {
        name: 'Cloudinary',
        percent: 75,
        icon: SiCloudinary,
        color: '#3448C5',
      },
      {
        name: 'EmailJS',
        percent: 70,
        icon: SiCloudinary,
        color: '#3448C5',
      },
    ],
  },
];