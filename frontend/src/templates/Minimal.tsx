import { Github, Linkedin, Twitter, ExternalLink, Mail, ArrowRight } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-context';

const MinimalTemplate = ({ data }: { data: PortfolioData }) => (
  <div className="min-h-screen" style={{ background: '#ffffff', color: '#111111', fontFamily: "'Georgia', serif" }}>
    <div className="max-w-2xl mx-auto px-6 py-24">
      {/* Header */}
      <header className="mb-20">
        <div className="flex items-center gap-5 mb-6">
          {data.avatar && (
            <img src={data.avatar} alt={data.name} className="w-14 h-14 rounded-full object-cover" style={{ border: '2px solid #eee' }} />
          )}
          <div>
            <h1 className="text-4xl tracking-tight mb-1" style={{ fontWeight: 400, letterSpacing: '-0.03em' }}>{data.name}</h1>
            <p className="text-sm" style={{ color: '#999', fontFamily: 'monospace' }}>{data.role}</p>
          </div>
        </div>
        <p className="text-base leading-[1.8]" style={{ color: '#555', maxWidth: '480px' }}>{data.bio}</p>
        <div className="flex items-center gap-4 mt-6">
          {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" style={{ color: '#bbb' }} className="hover:opacity-70"><Github size={16} /></a>}
          {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ color: '#bbb' }} className="hover:opacity-70"><Linkedin size={16} /></a>}
          {data.socialLinks.twitter && <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" style={{ color: '#bbb' }} className="hover:opacity-70"><Twitter size={16} /></a>}
          <a href={`mailto:${data.email}`} style={{ color: '#bbb' }} className="hover:opacity-70"><Mail size={16} /></a>
        </div>
      </header>

      {/* Skills — simple comma list */}
      <section className="mb-16">
        <p className="text-sm" style={{ color: '#999' }}>
          {data.skills.join(' · ')}
        </p>
      </section>

      {/* Projects — clean list */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: '#bbb', fontFamily: 'sans-serif', fontWeight: 600 }}>Projects</h2>
        <div className="space-y-8">
          {data.projects.map(p => (
            <div key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }} className="pb-8 last:border-0">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg" style={{ fontWeight: 400 }}>{p.title}</h3>
                <div className="flex gap-3 shrink-0">
                  {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ color: '#ccc' }} className="hover:opacity-60"><Github size={14} /></a>}
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#ccc' }} className="hover:opacity-60"><ArrowRight size={14} /></a>}
                </div>
              </div>
              <p className="text-sm mt-2" style={{ color: '#777', lineHeight: 1.7 }}>{p.description}</p>
              <p className="text-xs mt-2" style={{ color: '#bbb', fontFamily: 'monospace' }}>{p.techStack.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-[0.2em] mb-8" style={{ color: '#bbb', fontFamily: 'sans-serif', fontWeight: 600 }}>Experience</h2>
        <div className="space-y-8">
          {data.experience.map(exp => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-base" style={{ fontWeight: 400 }}>{exp.position}</h3>
                <span className="text-xs" style={{ color: '#bbb', fontFamily: 'monospace' }}>{exp.duration}</span>
              </div>
              <p className="text-sm" style={{ color: '#999', fontStyle: 'italic' }}>{exp.company}</p>
              <p className="text-sm mt-1" style={{ color: '#777', lineHeight: 1.7 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xs uppercase tracking-[0.2em] mb-6" style={{ color: '#bbb', fontFamily: 'sans-serif', fontWeight: 600 }}>Education</h2>
        {data.education.map(edu => (
          <div key={edu.id} className="mb-3">
            <span style={{ fontWeight: 400 }}>{edu.degree}</span>
            <span className="text-sm" style={{ color: '#999' }}> — {edu.institution}, {edu.year}</span>
          </div>
        ))}
      </section>
    </div>
  </div>
);

export default MinimalTemplate;
