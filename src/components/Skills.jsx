import React, { useState, useMemo } from 'react';
import TypewriterText from './ui/TypewriterText';

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  const techStack = [
    { name: 'HTML', icon_path: 'html5/html5-original.svg' },
    { name: 'CSS', icon_path: 'css3/css3-original.svg' },
    { name: 'JavaScript', icon_path: 'javascript/javascript-original.svg' },
    { name: 'React', icon_path: 'react/react-original.svg' },
    { name: 'PHP', icon_path: 'php/php-original.svg' },
    { name: 'Laravel', icon_path: 'laravel/laravel-original.svg' },
    { name: 'MySQL', icon_path: 'mysql/mysql-original.svg' },
    { name: 'Git', icon_path: 'git/git-original.svg' },
    { name: 'GitHub', icon_path: 'github/github-original.svg' },
    { name: 'Vite', icon_path: 'vitejs/vitejs-original.svg' },
    { name: 'Bootstrap', icon_path: 'bootstrap/bootstrap-original.svg' },
  ];

  const iconUrl = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

  const renderEmptyCells = useMemo(() => {
    if (techStack.length % 5 === 0) return null;
    return Array.from({ length: 5 - (techStack.length % 5) }).map((_, i) => (
      <div key={`empty-${i}`} className="relative aspect-square border-r border-b border-dashed border-zinc-700/60">
        <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-zinc-400 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" />
      </div>
    ));
  }, [techStack.length]);

  return (
    <section id="skills" className="py-24 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center md:items-start lg:flex-row gap-8 lg:gap-24">

        <div className="flex-shrink-0 lg:w-1/3 pt-4 text-center lg:text-left select-none pr-4">
          <h2 className="text-[#4093DB] text-4xl md:text-5xl font-['Caveat',cursive] leading-none mb-0 -rotate-3 w-fit mx-auto lg:mx-0">
            <TypewriterText text="Mes" speed={100} />
          </h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.8]">
            <TypewriterText text="Compétences" speed={100} delay={800} />
          </h3>
        </div>

        <div className="flex-grow w-full max-w-[700px] relative">
          <div
            className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-0 border-t border-l border-dashed border-zinc-700/60 relative"
          >
            {techStack.map((skill) => (
              <SkillCell
                key={skill.name}
                skill={skill}
                iconUrl={iconUrl(skill.icon_path)}
                isActive={activeSkill === skill.name}
                setActiveSkill={setActiveSkill}
              />
            ))}

            {renderEmptyCells}
          </div>
        </div>

      </div>
    </section>
  );
};

const SkillCell = React.memo(({ skill, iconUrl, isActive, setActiveSkill }) => {
  return (
    <div
      onMouseEnter={() => setActiveSkill(skill.name)}
      onMouseLeave={() => setActiveSkill(null)}
      className="relative aspect-square border-r border-b border-dashed border-zinc-700/60 cursor-pointer overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-zinc-400 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5 z-10">
        <img
          src={iconUrl}
          alt={skill.name}
          className="w-full h-full object-contain"
          style={{
            filter: isActive ? 'none' : 'grayscale(100%)',
            opacity: isActive ? 1 : 0.4,
            transition: 'filter 0.4s ease, opacity 0.4s ease',
          }}
        />
      </div>
    </div>
  );
});

export default React.memo(Skills);
