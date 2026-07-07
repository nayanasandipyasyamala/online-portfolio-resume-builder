import { Github, Linkedin, Twitter, ExternalLink, Mail } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-context';

const MinimalistGridTemplate = ({ data }: { data: PortfolioData }) => (
  <div className="min-h-screen" style={{ background: '#ffffff', color: '#1a1a1a', fontFamily: "'Inter', '-apple-system', 'BlinkMacSystemFont', sans-serif" }}>
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="mb-16">
        <div className="flex items-center gap-6 mb-8">
          {data.avatar && (
            <img src={data.avatar} alt={data.name} className="w-16 h-16 rounded object-cover" style={{ border: '1px solid #e5e5e5' }} />
          )}
          <div>
            <h1 className="text-4xl font-light tracking-tight mb-1">{data.name}</h1>
            <p className="text-sm tracking-wide" style={{ color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>{data.role}</p>
          </div>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed" style={{ color: '#555' }}>{data.bio}</p>
        <div className="flex items-center gap-5 mt-6">
          {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" style={{ color: '#999' }} className="hover:opacity-60"><Github size={16} /></a>}
          {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ color: '#999' }} className="hover:opacity-60"><Linkedin size={16} /></a>}
          {data.socialLinks.twitter && <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" style={{ color: '#999' }} className="hover:opacity-60"><Twitter size={16} /></a>}
          <a href={`mailto:${data.email}`} style={{ color: '#999' }} className="hover:opacity-60"><Mail size={16} /></a>
        </div>
      </header>

      <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '24px' }}>
        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: '#999' }}>Skills</h2>
            <div className="grid grid-cols-3 gap-4">
              {data.skills.map((skill, idx) => (
                <div key={idx} style={{ border: '1px solid #f0f0f0', padding: '12px 16px', borderRadius: '4px', background: '#fafafa' }}>
                  <p className="text-sm" style={{ color: '#555' }}>{skill}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Grid */}
        {data.projects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-widest font-semibold mb-8" style={{ color: '#999' }}>Projects</h2>
            <div className="grid grid-cols-2 gap-6">
              {data.projects.map(p => (
                <div key={p.id} style={{ border: '1px solid #e5e5e5', borderRadius: '4px', padding: '16px', background: '#f9f9f9' }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-medium text-sm">{p.title}</h3>
                    <div className="flex gap-2">
                      {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ color: '#bbb' }} className="hover:opacity-60"><Github size={14} /></a>}
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#bbb' }} className="hover:opacity-60"><ExternalLink size={14} /></a>}
                    </div>
                  </div>
                  <p className="text-xs mb-3" style={{ color: '#777', lineHeight: 1.6 }}>{p.description}</p>
                  {p.techStack.length > 0 && <p className="text-xs" style={{ color: '#999', fontFamily: 'monospace' }}>{p.techStack.join(', ')}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-widest font-semibold mb-8" style={{ color: '#999' }}>Experience</h2>
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id} style={{ borderLeft: '3px solid #e5e5e5', paddingLeft: '16px' }}>
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h3 className="font-medium text-sm">{exp.position}</h3>
                    <span className="text-xs" style={{ color: '#999' }}>{exp.duration}</span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: '#888' }}>{exp.company}</p>
                  <p className="text-xs" style={{ color: '#666', lineHeight: 1.6 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-widest font-semibold mb-8" style={{ color: '#999' }}>Education</h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id} style={{ border: '1px solid #f0f0f0', borderRadius: '4px', padding: '12px 16px', background: '#fafafa' }}>
                  <h3 className="font-medium text-sm mb-1">{edu.degree}</h3>
                  <p className="text-xs" style={{ color: '#888' }}>{edu.institution}</p>
                  <p className="text-xs" style={{ color: '#999' }}>{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  </div>
);

export default MinimalistGridTemplate;
