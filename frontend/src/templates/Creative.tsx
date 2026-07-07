import { Github, Linkedin, ExternalLink, Mail, ArrowUpRight, Instagram } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-context';

const CreativeTemplate = ({ data }: { data: PortfolioData }) => (
  <div className="min-h-screen" style={{ background: '#000', color: '#fff', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
    {/* Split hero — left text, right image block */}
    <section className="grid md:grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center px-8 sm:px-16 py-20">
        <p className="text-xs font-sans uppercase tracking-[0.4em] mb-6" style={{ color: '#e63946' }}>Portfolio</p>
        <h1 className="text-5xl sm:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
          {data.name.split(' ').map((w, i) => (
            <span key={i} className="block" style={{ color: i === 0 ? '#fff' : '#e63946' }}>{w}</span>
          ))}
        </h1>
        <p className="text-sm font-sans italic mb-2" style={{ color: '#888' }}>{data.role}</p>
        <p className="text-sm font-sans leading-[1.9] max-w-md" style={{ color: '#666' }}>{data.bio}</p>
        <div className="flex items-center gap-5 mt-8">
          {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" style={{ color: '#555' }} className="hover:text-white transition-colors"><Github size={18} /></a>}
          {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ color: '#555' }} className="hover:text-white transition-colors"><Linkedin size={18} /></a>}
          <a href={`mailto:${data.email}`} style={{ color: '#555' }} className="hover:text-white transition-colors"><Mail size={18} /></a>
        </div>
      </div>
      <div className="relative hidden md:block" style={{ background: '#e63946' }}>
        {data.avatar ? (
          <img src={data.avatar} alt={data.name} className="w-full h-full object-cover mix-blend-multiply opacity-80" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[200px] font-bold" style={{ color: 'rgba(0,0,0,0.15)' }}>{data.name.charAt(0)}</span>
          </div>
        )}
      </div>
    </section>

    {/* Skills — horizontal scroll strip */}
    <section className="py-6 overflow-hidden" style={{ background: '#e63946' }}>
      <div className="flex gap-10 px-8 animate-marquee">
        {[...data.skills, ...data.skills].map((s, i) => (
          <span key={i} className="text-lg font-bold uppercase tracking-wider whitespace-nowrap" style={{ color: '#000' }}>{s}</span>
        ))}
      </div>
    </section>

    {/* Projects — editorial grid with big numbers */}
    <section className="px-8 sm:px-16 py-24" style={{ background: '#0a0a0a' }}>
      <div className="flex items-baseline justify-between mb-16">
        <h2 className="text-5xl font-bold tracking-tight">Work</h2>
        <span className="text-xs font-sans uppercase tracking-[0.3em]" style={{ color: '#555' }}>{data.projects.length} Projects</span>
      </div>
      <div className="space-y-0">
        {data.projects.map((p, i) => (
          <div key={p.id} className="group grid md:grid-cols-[80px_1fr_auto] gap-6 items-start py-10" style={{ borderTop: '1px solid #1a1a1a' }}>
            <span className="text-5xl font-bold" style={{ color: '#e63946', opacity: 0.4 }}>{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-2">{p.title}</h3>
              <p className="text-sm font-sans leading-relaxed mb-3" style={{ color: '#666' }}>{p.description}</p>
              <div className="flex gap-3 flex-wrap">
                {p.techStack.map(t => (
                  <span key={t} className="text-[10px] font-sans uppercase tracking-wider px-3 py-1" style={{ border: '1px solid #333', color: '#888' }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ color: '#555' }} className="hover:text-white transition-colors"><Github size={16} /></a>}
              {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#e63946' }} className="hover:text-white transition-colors"><ArrowUpRight size={16} /></a>}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Experience — timeline with red accent */}
    <section className="px-8 sm:px-16 py-24" style={{ background: '#000' }}>
      <h2 className="text-5xl font-bold tracking-tight mb-16">Experience</h2>
      <div className="space-y-12 max-w-2xl">
        {data.experience.map(exp => (
          <div key={exp.id} className="flex gap-6">
            <div className="w-px shrink-0 relative" style={{ background: '#222' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ background: '#e63946' }} />
            </div>
            <div className="pb-2">
              <p className="text-xs font-sans uppercase tracking-wider mb-1" style={{ color: '#e63946' }}>{exp.company}</p>
              <h3 className="text-xl font-bold tracking-tight">{exp.position}</h3>
              <p className="text-[10px] font-sans uppercase tracking-wider mt-1 mb-3" style={{ color: '#444' }}>{exp.duration}</p>
              <p className="text-sm font-sans leading-relaxed" style={{ color: '#666' }}>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Education */}
    <section className="px-8 sm:px-16 py-20" style={{ borderTop: '1px solid #1a1a1a' }}>
      <h2 className="text-3xl font-bold tracking-tight mb-10">Education</h2>
      {data.education.map(edu => (
        <div key={edu.id} className="mb-6">
          <p className="text-lg font-bold">{edu.degree}</p>
          <p className="text-sm font-sans" style={{ color: '#666' }}>{edu.institution} — {edu.year}</p>
        </div>
      ))}
    </section>

    {/* Footer */}
    <footer className="px-8 sm:px-16 py-10 flex justify-between items-center" style={{ borderTop: '1px solid #1a1a1a' }}>
      <p className="text-xs font-sans" style={{ color: '#333' }}>© {new Date().getFullYear()} {data.name}</p>
      <a href={`mailto:${data.email}`} className="text-xs font-sans uppercase tracking-wider hover:text-white transition-colors" style={{ color: '#e63946' }}>Get in touch →</a>
    </footer>
  </div>
);

export default CreativeTemplate;
