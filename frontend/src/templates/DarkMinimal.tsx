import { Github, Linkedin, Twitter, ExternalLink, Mail, ArrowUpRight } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-context';

const DarkMinimalTemplate = ({ data }: { data: PortfolioData }) => (
  <div className="min-h-screen selection:bg-[#22d3ee]/20" style={{ background: '#09090b', color: '#fafafa', fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
    {/* Hero */}
    <section className="min-h-[85vh] flex flex-col justify-center px-6 sm:px-12 lg:px-24 max-w-5xl">
      <div className="flex items-center gap-6 mb-8">
        {data.avatar && (
          <img src={data.avatar} alt={data.name} className="w-20 h-20 rounded-full object-cover" style={{ border: '2px solid #22d3ee', boxShadow: '0 0 20px rgba(34,211,238,0.15)' }} />
        )}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22d3ee' }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: '#22d3ee' }}>Available for work</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight leading-[1.1]">{data.name}</h1>
        </div>
      </div>
      <p className="text-sm uppercase tracking-[0.2em] mb-4" style={{ color: '#22d3ee' }}>{data.role}</p>
      <p className="text-base leading-[1.8] max-w-xl" style={{ color: '#71717a' }}>{data.bio}</p>
      <div className="flex items-center gap-5 mt-8">
        {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" style={{ color: '#3f3f46' }} className="hover:text-[#fafafa] transition-colors"><Github size={18} /></a>}
        {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ color: '#3f3f46' }} className="hover:text-[#fafafa] transition-colors"><Linkedin size={18} /></a>}
        {data.socialLinks.twitter && <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" style={{ color: '#3f3f46' }} className="hover:text-[#fafafa] transition-colors"><Twitter size={18} /></a>}
        <a href={`mailto:${data.email}`} style={{ color: '#3f3f46' }} className="hover:text-[#fafafa] transition-colors"><Mail size={18} /></a>
      </div>
    </section>

    <div className="mx-6 sm:mx-12 lg:mx-24" style={{ borderTop: '1px solid #18181b' }} />

    {/* Projects — numbered list */}
    <section className="px-6 sm:px-12 lg:px-24 py-24 max-w-5xl">
      <p className="text-[10px] uppercase tracking-[0.4em] mb-14" style={{ color: '#3f3f46' }}>Projects</p>
      {data.projects.map((p, i) => (
        <div key={p.id} className="group py-8" style={{ borderBottom: '1px solid #18181b' }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-xs" style={{ color: '#3f3f46' }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-xl font-light tracking-tight" style={{ color: '#fafafa' }}>{p.title}</h3>
              </div>
              <p className="text-sm ml-8 leading-relaxed" style={{ color: '#52525b' }}>{p.description}</p>
              <div className="flex gap-3 ml-8 mt-3">
                {p.techStack.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded" style={{ border: '1px solid #27272a', color: '#22d3ee' }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 shrink-0 mt-1">
              {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ color: '#3f3f46' }} className="hover:text-[#22d3ee] transition-colors"><Github size={14} /></a>}
              {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#3f3f46' }} className="hover:text-[#22d3ee] transition-colors"><ArrowUpRight size={14} /></a>}
            </div>
          </div>
        </div>
      ))}
    </section>

    {/* Experience */}
    <section className="px-6 sm:px-12 lg:px-24 py-24 max-w-5xl">
      <p className="text-[10px] uppercase tracking-[0.4em] mb-14" style={{ color: '#3f3f46' }}>Experience</p>
      <div className="space-y-12">
        {data.experience.map(exp => (
          <div key={exp.id} className="grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-10">
            <span className="text-xs" style={{ color: '#3f3f46' }}>{exp.duration}</span>
            <div>
              <h3 className="text-base font-light">{exp.position}</h3>
              <p className="text-sm mt-0.5" style={{ color: '#22d3ee' }}>{exp.company}</p>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: '#52525b' }}>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Skills */}
    <section className="px-6 sm:px-12 lg:px-24 py-24 max-w-5xl">
      <p className="text-[10px] uppercase tracking-[0.4em] mb-10" style={{ color: '#3f3f46' }}>Stack</p>
      <div className="flex flex-wrap gap-3">
        {data.skills.map(s => (
          <span key={s} className="px-4 py-2 text-xs rounded transition-colors" style={{ border: '1px solid #27272a', color: '#a1a1aa' }}>{s}</span>
        ))}
      </div>
    </section>

    {/* Education */}
    <section className="px-6 sm:px-12 lg:px-24 py-24 max-w-5xl">
      <p className="text-[10px] uppercase tracking-[0.4em] mb-10" style={{ color: '#3f3f46' }}>Education</p>
      {data.education.map(edu => (
        <div key={edu.id} className="mb-4">
          <p className="text-base font-light">{edu.degree}</p>
          <p className="text-sm" style={{ color: '#3f3f46' }}>{edu.institution} · {edu.year}</p>
        </div>
      ))}
    </section>

    <footer className="px-6 sm:px-12 lg:px-24 py-12" style={{ borderTop: '1px solid #18181b' }}>
      <p className="text-xs" style={{ color: '#27272a' }}>© {new Date().getFullYear()} {data.name}</p>
    </footer>
  </div>
);

export default DarkMinimalTemplate;
