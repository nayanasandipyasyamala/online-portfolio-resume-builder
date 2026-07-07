import { Github, Linkedin, Mail, ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-context';

const CorporateTemplate = ({ data }: { data: PortfolioData }) => (
  <div className="min-h-screen" style={{ background: '#f7f8fa', color: '#1a1f36', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
    {/* Header */}
    <header style={{ background: 'linear-gradient(135deg, #1a1f36 0%, #2d3561 100%)' }} className="px-8 py-14">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          {data.avatar && (
            <img src={data.avatar} alt={data.name} className="w-20 h-20 rounded-lg object-cover" style={{ border: '3px solid rgba(255,255,255,0.15)' }} />
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#fff' }}>{data.name}</h1>
            <p className="text-sm mt-1" style={{ color: '#7c83a1' }}>{data.role}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.1)', color: '#a5aac7' }}><Github size={13} /> GitHub</a>}
          {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.1)', color: '#a5aac7' }}><Linkedin size={13} /> LinkedIn</a>}
          <a href={`mailto:${data.email}`} className="px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5" style={{ background: '#4f46e5', color: '#fff' }}><Mail size={13} /> Contact</a>
        </div>
      </div>
    </header>

    <div className="max-w-4xl mx-auto px-8 py-10">
      {/* Summary card */}
      <div className="rounded-xl p-6 mb-8 -mt-8 relative z-10" style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
        <p className="text-sm leading-[1.8]" style={{ color: '#525772' }}>{data.bio}</p>
        <div className="flex gap-2 mt-4 flex-wrap">
          {data.skills.map(s => (
            <span key={s} className="px-3 py-1 text-xs rounded-md font-medium" style={{ background: '#eef2ff', color: '#4f46e5' }}>{s}</span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Education */}
          <div className="rounded-xl p-6" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#4f46e5' }}>
              <GraduationCap size={14} /> Education
            </h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-4 last:mb-0 pb-4 last:pb-0" style={{ borderBottom: '1px solid #f1f3f9' }}>
                <p className="text-sm font-semibold">{edu.degree}</p>
                <p className="text-xs" style={{ color: '#7c83a1' }}>{edu.institution}</p>
                <p className="text-xs font-mono mt-1" style={{ color: '#a5aac7' }}>{edu.year}</p>
              </div>
            ))}
          </div>

          {/* Contact card */}
          <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#fff' }}>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>Get in Touch</h2>
            <a href={`mailto:${data.email}`} className="text-sm hover:underline">{data.email}</a>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-8">
          {/* Experience */}
          <div className="rounded-xl p-6" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-6" style={{ color: '#4f46e5' }}>
              <Briefcase size={14} /> Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id} className="pl-5" style={{ borderLeft: '3px solid #e0e7ff' }}>
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-sm font-bold">{exp.position}</h3>
                    <span className="text-[10px] font-mono shrink-0" style={{ color: '#a5aac7' }}>{exp.duration}</span>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: '#4f46e5' }}>{exp.company}</p>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: '#7c83a1' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="rounded-xl p-6" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-6" style={{ color: '#4f46e5' }}>
              <Award size={14} /> Key Projects
            </h2>
            <div className="space-y-5">
              {data.projects.map(p => (
                <div key={p.id} className="p-4 rounded-lg" style={{ background: '#f8f9fc', border: '1px solid #eef2ff' }}>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold">{p.title}</h3>
                    <div className="flex gap-2 shrink-0">
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: '#4f46e5' }}><ExternalLink size={13} /></a>}
                      {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ color: '#a5aac7' }}><Github size={13} /></a>}
                    </div>
                  </div>
                  <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#7c83a1' }}>{p.description}</p>
                  <div className="flex gap-1.5 flex-wrap mt-3">
                    {p.techStack.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[10px] rounded font-mono" style={{ background: '#eef2ff', color: '#4f46e5' }}>{t}</span>
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

export default CorporateTemplate;
