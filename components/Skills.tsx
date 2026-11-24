'use client';

import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const SKILL_GROUPS: { category: string; items: { name: string; level?: number }[] }[] = [
  {
    category: 'Networking & Routing',
    items: [
      { name: 'VLAN Configuration' },
      { name: 'VLAN Trunking' },
      { name: 'Static Routing' },
      { name: 'RIP' },
      { name: 'OSPF' },
      { name: 'EIGRP' },
    ],
  },
  {
    category: 'Network Services & Security',
    items: [
      { name: 'Access Control Lists (ACL)' },
      { name: 'DHCP' },
      { name: 'Network Address Translation (NAT)' },
      { name: 'Network Security Fundamentals' },
    ],
  },
  {
    category: 'IP Addressing',
    items: [
      { name: 'IPv4' },
      { name: 'IPv6' },
      { name: 'Subnetting' },
      { name: 'VLSM' },
    ],
  },
  {
    category: 'IT & Hardware',
    items: [
      { name: 'Computer Hardware' },
      { name: 'PC Assembly and Maintenance' },
      { name: 'Operating Systems' },
      { name: 'Hardware Troubleshooting' },
      { name: 'Printer Configuration' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Cisco Packet Tracer' },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level?: number; delay: number }) {
  const { ref, isVisible } = useScrollReveal(0.5);

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-body text-sm text-ink-secondary">{name}</span>
        {level !== undefined && <span className="font-mono text-xs text-ink-muted">{level}%</span>}
      </div>
      <div className="h-px bg-bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-ink-accent to-ink-primary rounded-full"
          initial={{ width: 0 }}
          animate={isVisible && level !== undefined ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function SkillCard({ group, groupIndex }: { group: typeof SKILL_GROUPS[0]; groupIndex: number }) {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: groupIndex * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="bg-bg-card border border-bg-border rounded-2xl p-7 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-ink-primary">{group.category}</h3>
        <div className="w-1.5 h-1.5 rounded-full bg-ink-accent" />
      </div>
      <div className="space-y-5">
        {group.items.map((skill, si) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            delay={groupIndex * 0.08 + si * 0.07}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, isVisible } = useScrollReveal(0.4);

  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <motion.div
        ref={ref as React.Ref<HTMLDivElement>}
        initial={{ opacity: 0, y: 24 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14"
      >
        <p className="section-label mb-3">Capabilities</p>
        <h2 className="section-title">
          Skills & <span className="font-display italic text-ink-accent">Learning</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SKILL_GROUPS.map((group, gi) => (
          <SkillCard key={group.category} group={group} groupIndex={gi} />
        ))}
      </div>
    </section>
  );
}
