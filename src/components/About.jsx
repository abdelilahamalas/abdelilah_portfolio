import React, { useRef, useEffect, useMemo } from 'react';
import { Briefcase, Award, Users, Cpu } from 'lucide-react';
import { gsap } from '../lib/gsap';
import TypewriterText from './ui/TypewriterText';

const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const dynamicStats = useMemo(() => {
    return [
      {
        label: 'Formation',
        value: 'Technicien Spécialisé — OFPPT',
        icon: <Briefcase size={24} />,
        description: 'Développement Digital, Option Full Stack.'
      },
      {
        label: 'Expérience',
        value: 'Stage professionnel',
        icon: <Award size={24} />,
        description: 'Secrétariat Général du Gouvernement — Royaume du Maroc. Du 01/03/2026 au 31/03/2026. Développement d’un système de gestion des congés (SGG Congés) avec React, Laravel et MySQL.'
      },
      {
        label: 'Compétences',
        value: 'Technologies clés',
        icon: <Cpu size={24} />,
        description: 'React, JavaScript, TypeScript, PHP, Laravel, MySQL, MongoDB, Git / GitHub.'
      },
      {
        label: 'Objectif',
        value: 'Vision professionnelle',
        icon: <Users size={24} />,
        description: 'Créer des applications web professionnelles, performantes et utiles, avec une architecture propre et une excellente expérience utilisateur.'
      },
    ];
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 92%',
            once: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [dynamicStats]);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[#4093DB] text-4xl font-['Caveat',cursive] leading-none mb-3 -rotate-2">
            <TypewriterText text="À propos" speed={100} />
          </h2>
          <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-8">
            <TypewriterText text="Développer l'avenir," speed={40} />
            <br />
            <TypewriterText text="ligne par ligne." delay={1000} speed={40} />
          </h3>

          <div className="max-w-2xl space-y-6 text-zinc-400 text-lg leading-relaxed mb-12">
            <p>
              Je suis un Développeur Full Stack dévoué, avec un œil attentif pour le design minimaliste et un engagement total envers l'écriture d'un code propre et maintenable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {dynamicStats.map((stat, index) => {
            const blobRadii = [
              '28px 18px 32px 20px / 20px 30px 20px 32px',
              '20px 32px 20px 30px / 30px 20px 32px 20px',
              '32px 20px 28px 22px / 22px 32px 20px 30px',
              '20px 30px 20px 32px / 28px 20px 30px 22px'
            ];
            const radius = blobRadii[index % blobRadii.length];

            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="about-card group relative h-full flex flex-col p-5 md:p-6 bg-transparent backdrop-blur-sm cursor-pointer overflow-hidden border border-white/10 shadow-sm transition-all duration-300 hover:scale-[1.01]"
                style={{ borderRadius: radius }}
              >
                <div className="about-card-bg" style={{ borderRadius: radius }} />

                <div className="relative z-10 flex flex-col flex-1">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0 bg-[#8BBDE0]/15 border border-[#8BBDE0]/20 transition-all duration-500 group-hover:bg-[#4093DB] group-hover:border-[#4093DB]">
                    <div className="text-[#4093DB] transition-colors duration-500 group-hover:text-white">
                      {React.cloneElement(stat.icon, { size: 20 })}
                    </div>
                  </div>
                  <div className="text-lg font-black text-white mb-0.5 transition-colors duration-500 group-hover:text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold text-[#4093DB] uppercase tracking-[0.2em] mb-2.5 transition-colors duration-500 group-hover:text-[#0284c7]">
                    {stat.label}
                  </div>
                  <p className="text-zinc-400 text-[12.5px] leading-relaxed flex-1 transition-colors duration-500 group-hover:text-slate-600">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .about-card-bg {
          position: absolute;
          inset: 0;
          background: #ffffff;
          transform: translateY(160%) skewY(-8deg);
          transform-origin: bottom left;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 1;
        }
        .about-card:hover .about-card-bg {
          transform: translateY(0%) skewY(0deg);
        }
      `}</style>
    </section>
  );
};

export default About;
