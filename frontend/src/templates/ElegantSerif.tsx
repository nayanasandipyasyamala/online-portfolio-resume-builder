import { Github, Linkedin, Twitter, ExternalLink, Mail } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-context';

const ElegantSerifTemplate = ({ data }: { data: PortfolioData }) => (
  <div className="min-h-screen" style={{ background: '#faf8f5', color: '#2a2a2a', fontFamily: "'Garamond', 'Georgia', serif" }}>
    <div className="max-w-3xl mx-auto px-8 py-20">
      {/* Header */}
      <header className="mb-24 text-center">
        <h1 className="text-5xl mb-2" style={{ fontWeight: 300, letterSpacing: '0.05em' }}>{data.name}</h1>
        <p className="text-sm tracking-widest mb-6" style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'sans-serif' }}>{data.role}</p>
        <div className="w-12 h-0.5 mx-auto mb-6" style={{ background: '#d4a574' }}></div>
        <p className="text-base leading-relaxed mx-auto" style={{ color: '#555', maxWidth: '500px', fontStyle: 'italic' }}>{data.bio}</p>
      </header>

      {/* Contact */}
      <div className="flex items-center justify-center gap-6 mb-20">
        {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" style={{ color: '#888' }} className="hover:opacity-60"><Github size={18} /></a>}
        {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ color: '#888' }} className="hover:opacity-60"><Linkedin size={18} /></a>}
        {data.socialLinks.twitter && <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" style={{ color: '#888' }} className="hover:opacity-60"><Twitter size={18} /></a>}
        <a href={`mailto:${data.email}`} style={{ color: '#888' }} className="hover:opacity-60"><Mail size={18} /></a>
      </div>

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-20 text-center">
          <h2 className="text-xs tracking-widest mb-6" style={{ color: '#999', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 600 }}>Expertise</h2>
          <p className="text-sm" style={{ color: '#666', letterSpacing: '0.03em' }}>
            {data.skills.join(' · ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs tracking-widest mb-12 text-center" style={{ color: '#999', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 600 }}>Featured Work</h2>
          <div className="space-y-12">
            {data.projects.map((p, idx) => (
              <div key={p.id}>
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <h3 className="text-lg" style={{ fontWeight: 500 }}>{p.title}</h3>
                  <div className="flex gap-4 shrink-0">
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ color: '#bbb' }} className="hover:opacity-60"><Github size={16} /></a>}
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#bbb' }} className="hover:opacity-60"><ExternalLink size={16} /></a>}
                  </div>
                </div>
                <p className="text-sm" style={{ color: '#777', lineHeight: 1.8 }}>{p.description}</p>
                {p.techStack.length > 0 && <p className="text-xs mt-3" style={{ color: '#999', fontFamily: 'monospace' }}>{p.techStack.join(', ')}</p>}
                {idx < data.projects.length - 1 && <div className="mt-10" style={{ borderBottom: '1px solid #e8e0d5' }}></div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs tracking-widest mb-12 text-center" style={{ color: '#999', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 600 }}>Experience</h2>
          <div className="space-y-8">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-4 mb-1">
                  <h3 className="font-medium">{exp.position}</h3>
                  <span className="text-xs" style={{ color: '#999' }}>{exp.duration}</span>
                </div>
                <p className="text-sm mb-2" style={{ color: '#888' }}>{exp.company}</p>
                <p className="text-sm" style={{ color: '#777', lineHeight: 1.7 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-20">
          <h2 className="text-xs tracking-widest mb-12 text-center" style={{ color: '#999', textTransform: 'uppercase', fontFamily: 'sans-serif', fontWeight: 600 }}>Education</h2>
          <div className="space-y-6">
            {data.education.map(edu => (
              <div key={edu.id}>
                <h3 className="font-medium mb-1">{edu.degree}</h3>
                <p className="text-sm" style={{ color: '#888' }}>{edu.institution}</p>
                <p className="text-xs" style={{ color: '#999' }}>{edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center mt-20 pt-10" style={{ borderTop: '1px solid #e8e0d5', color: '#999', fontSize: '12px' }}>
        <p>© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
      </footer>
    </div>
  </div>
);

export default ElegantSerifTemplate;
