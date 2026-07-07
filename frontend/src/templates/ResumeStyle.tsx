import { Github, Linkedin, Mail, ExternalLink, MapPin, Phone } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-context';

const ResumeStyleTemplate = ({ data }: { data: PortfolioData }) => (
  <div className="min-h-screen py-10 px-4 sm:px-8" style={{ background: '#e8e4df', fontFamily: "'Merriweather', 'Times New Roman', serif" }}>
    <div className="max-w-[800px] mx-auto overflow-hidden" style={{ background: '#fff', boxShadow: '0 25px 50px rgba(0,0,0,0.12)', borderRadius: '2px' }}>
      {/* Header */}
      <div className="px-10 py-10" style={{ background: '#1e3a5f', color: '#fff' }}>
        <div className="flex items-center gap-6">
          {data.avatar && (
            <img src={data.avatar} alt={data.name} className="w-24 h-24 rounded-sm object-cover" style={{ border: '3px solid rgba(255,255,255,0.2)' }} />
          )}
          <div>
            <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>{data.name}</h1>
            <p className="text-sm mt-1.5 uppercase tracking-[0.15em]" style={{ color: '#7db8e0' }}>{data.role}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5 mt-5 text-xs" style={{ color: '#7db8e0' }}>
          <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={12} /> {data.email}
          </a>
          {data.socialLinks.github && (
            <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Github size={12} /> GitHub
            </a>
          )}
          {data.socialLinks.linkedin && (
            <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Linkedin size={12} /> LinkedIn
            </a>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-[240px_1fr]" style={{ color: '#1a1a1a' }}>
        {/* Left column */}
        <div className="px-8 py-8 space-y-8" style={{ background: '#f8f6f3', borderRight: '1px solid #e8e4df' }}>
          {/* Profile */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 pb-1.5" style={{ color: '#1e3a5f', borderBottom: '2px solid #1e3a5f' }}>Profile</h2>
            <p className="text-xs leading-[1.8]" style={{ color: '#666', fontFamily: 'sans-serif' }}>{data.bio}</p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 pb-1.5" style={{ color: '#1e3a5f', borderBottom: '2px solid #1e3a5f' }}>Expertise</h2>
            <div className="space-y-2.5">
              {data.skills.map(s => (
                <div key={s}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs" style={{ color: '#333', fontFamily: 'sans-serif' }}>{s}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: '#e8e4df' }}>
                    <div className="h-full rounded-full" style={{ width: `${70 + Math.random() * 30}%`, background: '#1e3a5f' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 pb-1.5" style={{ color: '#1e3a5f', borderBottom: '2px solid #1e3a5f' }}>Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-3">
                <p className="text-xs font-bold" style={{ color: '#1a1a1a' }}>{edu.degree}</p>
                <p className="text-[11px]" style={{ color: '#666', fontFamily: 'sans-serif' }}>{edu.institution}</p>
                <p className="text-[10px] mt-0.5" style={{ color: '#999', fontFamily: 'sans-serif' }}>{edu.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="px-8 py-8 space-y-8">
          {/* Experience */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5 pb-1.5" style={{ color: '#1e3a5f', borderBottom: '2px solid #1e3a5f' }}>Professional Experience</h2>
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-sm font-bold" style={{ color: '#1a1a1a' }}>{exp.position}</h3>
                    <span className="text-[10px] shrink-0" style={{ color: '#999', fontFamily: 'sans-serif' }}>{exp.duration}</span>
                  </div>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: '#1e3a5f' }}>{exp.company}</p>
                  <p className="text-xs mt-2 leading-[1.8]" style={{ color: '#666', fontFamily: 'sans-serif' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5 pb-1.5" style={{ color: '#1e3a5f', borderBottom: '2px solid #1e3a5f' }}>Notable Projects</h2>
            <div className="space-y-5">
              {data.projects.map(p => (
                <div key={p.id} className="pb-5" style={{ borderBottom: '1px solid #f0ece7' }}>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold" style={{ color: '#1a1a1a' }}>{p.title}</h3>
                    <div className="flex gap-2 shrink-0">
                      {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ color: '#999' }} className="hover:opacity-70"><Github size={12} /></a>}
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#1e3a5f' }}><ExternalLink size={12} /></a>}
                    </div>
                  </div>
                  <p className="text-xs mt-1.5 leading-[1.8]" style={{ color: '#666', fontFamily: 'sans-serif' }}>{p.description}</p>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {p.techStack.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[9px] rounded" style={{ background: '#eef2f7', color: '#1e3a5f', fontFamily: 'sans-serif', fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ResumeStyleTemplate;
