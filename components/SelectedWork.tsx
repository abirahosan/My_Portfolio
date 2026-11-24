'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Button from './Button';

const PROJECTS = [
  {
    index: '01', title: 'Cisco Packet Tracer Networking Labs', subtitle: 'Networking Labs',
    description: 'Cisco Packet Tracer labs covering VLANs with 802.1Q trunking and router-based inter-VLAN routing across three switches, plus OSPF and RIPv2 on multi-router topologies with VLSM addressing plans for an HQ and two branches.',
    tags: ['Packet Tracer', 'VLAN / Trunking', 'OSPF / RIPv2'], year: 'CCNA Labs', size: 'large',
    link: 'https://github.com/abirahosan/Cisco-Packet-Tracer-Labs',
  },
  {
    index: '02', title: 'ML-Based DDoS Detection in IoT Networks', subtitle: 'Network Security',
    description: 'Applied network-security research comparing Logistic Regression, Random Forest, and XGBoost for benign-vs-attack traffic classification on the CIC-IoT-2023 dataset. The best model (XGBoost) reached an F1 of about 99.3%.',
    tags: ['Python', 'XGBoost', 'CIC-IoT-2023'], year: 'Research', size: 'small',
    link: 'https://github.com/abirahosan/ACN_research_project',
  },
  {
    index: '03', title: '2.5D U-Net Segmentation Thesis', subtitle: 'Academic Thesis',
    description: 'Group research project on automatic kidney, tumour, and cyst segmentation in contrast-enhanced CT using a 2.5D U-Net on the KiTS23 dataset, with uncertainty quantification via MC Dropout.',
    tags: ['2.5D U-Net', 'KiTS23', 'MC Dropout'], year: 'Thesis', size: 'small',
    link: 'https://github.com/abirahosan/kits23-2.5d-unet-uncertainty',
  },
  {
    index: '04', title: 'CSE Coursework', subtitle: 'Academic Projects',
    description: 'University assignments and coursework projects at AIUB covering core computer science fundamentals, algorithms, and programming concepts, alongside networking subjects including Computer Networks, Advanced Computer Networks, and Network Security.',
    tags: ['C++', 'Python', 'Algorithms'], year: 'AIUB', size: 'large',
    link: 'https://github.com/abirahosan',
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 48, scale: 0.97 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-bg-card border border-bg-border rounded-2xl overflow-hidden cursor-pointer
        ${project.size === 'large' ? 'lg:col-span-2' : 'lg:col-span-1'}`}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: 'easeOut' } }}
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
    >
      <div className={`relative w-full bg-bg-elevated overflow-hidden ${project.size === 'large' ? 'h-56 md:h-72' : 'h-44 md:h-56'}`}>
        <div
          className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500"
          style={{ background: `radial-gradient(ellipse at ${index % 2 === 0 ? '30%' : '70%'} 50%, rgba(200,184,154,0.18) 0%, transparent 70%)` }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`grid-${project.index}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f0ede8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${project.index})`} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-7xl md:text-8xl font-light text-ink-primary/5 select-none">{project.index}</span>
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="#0f0f10" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="font-mono text-xs text-ink-muted mb-1.5">{project.index} — {project.year}</p>
            <h3 className="font-display text-xl md:text-2xl text-ink-primary">{project.title}</h3>
          </div>
          <span className="shrink-0 font-mono text-xs text-ink-muted bg-bg-elevated px-3 py-1.5 rounded-full border border-bg-border mt-1">{project.subtitle}</span>
        </div>
        <p className="font-body text-sm text-ink-secondary leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="font-mono text-xs text-ink-muted px-2.5 py-1 rounded-md border border-bg-border">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SelectedWork() {
  const { ref, isVisible } = useScrollReveal(0.3);

  return (
    <div id="work" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12 md:mb-16">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label mb-3">Portfolio</p>
          <h2 className="section-title">My <span className="font-display italic text-ink-accent">Work</span></h2>
        </motion.div>
        <Button href="https://github.com/abirahosan" variant="ghost" size="sm" className="hidden md:inline-flex">GitHub →</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
        {PROJECTS.map((project, i) => <ProjectCard key={project.index} project={project} index={i} />)}
      </div>
    </div>
  );
}
