import React, { useState } from 'react';
import { getAssetUrl } from '../../lib/api';

const GitIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ProjectCard = ({ project }) => {
  const [showAllTech, setShowAllTech] = useState(false);

  if (!project) return null;

  const displayTech = Array.isArray(project.tech_stack) ? project.tech_stack : [];
  const techToShow = showAllTech ? displayTech : displayTech.slice(0, 3);
  const extraTechCount = showAllTech ? 0 : Math.max(0, displayTech.length - 3);

  const thumbnailUrl = project.thumbnail_url || getAssetUrl(project.thumbnail) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop';

  return (
    <div
      className="flex flex-col h-full min-h-[200px] overflow-hidden bg-transparent backdrop-blur-sm border-[2px] border-white/10 shadow-sm transition-all duration-300"
      style={{
        borderRadius: '26px 16px 30px 18px / 18px 28px 18px 30px',
      }}
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-zinc-900">

        <img
          src={thumbnailUrl}
          alt={project.title}
          className="h-full w-full object-cover"
          decoding="async"
        />

        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1 z-20">
          {techToShow.map((tech, i) => (
            <span
              key={i}
              className="rounded-full bg-zinc-900/90 px-2 py-0.5 text-[9px] font-bold text-zinc-200 border border-zinc-700"
            >
              {tech}
            </span>
          ))}
          {extraTechCount > 0 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowAllTech(true);
              }}
              className="rounded-full bg-[#4093DB] px-2 py-0.5 text-[9px] font-bold text-white shadow-sm"
            >
              +{extraTechCount}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-3.5">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#4093DB] mb-1 leading-none">
          {project.category || 'Développement'}
        </span>

        <h2 className="text-[15px] font-black text-white mb-1 tracking-tight">
          {project.title}
        </h2>

        <p className="text-[12.5px] text-zinc-400 font-medium leading-relaxed line-clamp-3 mb-2.5 flex-1">
          {project.description}
        </p>

        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-zinc-800">
          <a
            href={project.github_url && project.github_url !== '#' ? project.github_url : '#'}
            target={project.github_url && project.github_url !== '#' ? "_blank" : "_self"}
            rel="noreferrer"
            onClick={(e) => {
              if (!project.github_url || project.github_url === '#') {
                e.preventDefault();
              }
            }}
            className="flex items-center gap-1.5 transition-colors text-zinc-400 hover:text-white cursor-pointer"
            aria-label="Code source"
          >
            <GitIcon />
            <span className="text-[9px] font-extrabold uppercase tracking-widest">Code source</span>
          </a>

          <a
            href={project.live_url && project.live_url !== '#' ? project.live_url : '#'}
            target={project.live_url && project.live_url !== '#' ? "_blank" : "_self"}
            rel="noreferrer"
            onClick={(e) => {
              if (!project.live_url || project.live_url === '#') {
                e.preventDefault();
              }
            }}
            className="flex items-center gap-1.5 transition-colors text-zinc-400 hover:text-[#4093DB] cursor-pointer"
            aria-label="Voir en ligne"
          >
            <LinkIcon />
            <span className="text-[9px] font-extrabold uppercase tracking-widest">Voir en ligne</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectCard);
