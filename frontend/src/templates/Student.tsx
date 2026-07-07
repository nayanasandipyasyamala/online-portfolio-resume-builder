import { Github, Linkedin, ExternalLink, Mail, BookOpen, Sparkles, Rocket, Heart } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-context';

const StudentTemplate = ({ data }: { data: PortfolioData }) => (
  <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #e0f2fe 0%, #f0fdf4 40%, #fdf4ff 100%)', color: '#1e293b', fontFamily: "'Nunito', 'Comic Sans MS', cursive, sans-serif" }}>
    {/* Bubbly nav */}
    <nav className="sticky top-0 z-40 backdrop-blur-md px-6" style={{ background: 'rgba(255,255,255,0.7)', borderBottom: '2px dashed #c4b5fd' }}>
      <div className="max-w-3xl mx-auto h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚀</span>
          <span className="font-extrabold text-sm" style={{ color: '#7c3aed' }}>{data.name.split(' ')[0]}'s Space</span>
        </div>
        <div className="flex items-center gap-3">
          {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#ede9fe', color: '#7c3aed' }}><Github size={14} /></a>}
          {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#dbeafe', color: '#2563eb' }}><Linkedin size={14} /></a>}
        </div>
      </div>
    </nav>

    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Hero — stacked cards with avatar */}
      <div className="relative mb-12">
        <div className="absolute -top-3 -left-3 w-full h-full rounded-3xl" style={{ background: '#c4b5fd', transform: 'rotate(-2deg)' }} />
        <div className="relative rounded-3xl p-8" style={{ background: '#fff', boxShadow: '0 8px 30px rgba(124,58,237,0.1)' }}>
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {data.avatar ? (
              <img src={data.avatar} alt={data.name} className="w-24 h-24 rounded-full object-cover" style={{ border: '4px solid #c4b5fd', boxShadow: '0 0 0 4px #fff, 0 0 0 8px #c4b5fd' }} />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black" style={{ background: 'linear-gradient(135deg, #c4b5fd, #93c5fd)', color: '#fff' }}>
                {data.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-black tracking-tight" style={{ color: '#1e293b' }}>
                Hey, I'm {data.name}! <span className="inline-block animate-bounce">👋</span>
              </h1>
              <p className="text-sm font-bold mt-1 flex items-center justify-center sm:justify-start gap-1.5" style={{ color: '#7c3aed' }}>
                <Sparkles size={14} /> {data.role}
              </p>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: '#64748b' }}>{data.bio}</p>
            </div>
          </div>
          {/* Skill bubbles */}
          <div className="flex gap-2 mt-6 flex-wrap justify-center sm:justify-start">
            {data.skills.map((s, i) => {
              const colors = ['#dbeafe', '#fce7f3', '#d1fae5', '#fef3c7', '#ede9fe', '#ffe4e6'];
              const textColors = ['#2563eb', '#db2777', '#059669', '#d97706', '#7c3aed', '#e11d48'];
              return (
                <span key={s} className="px-3 py-1.5 text-xs font-extrabold rounded-full" style={{ background: colors[i % colors.length], color: textColors[i % textColors.length] }}>{s}</span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Education — highlighted for students */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider mb-4" style={{ color: '#7c3aed' }}>
          <span className="text-lg">🎓</span> Education
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {data.education.map((edu, i) => (
            <div key={edu.id} className="rounded-2xl p-5" style={{ background: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderLeft: `4px solid ${i % 2 === 0 ? '#7c3aed' : '#2563eb'}` }}>
              <p className="text-sm font-black" style={{ color: '#1e293b' }}>{edu.degree}</p>
              <p className="text-xs mt-1" style={{ color: '#7c3aed' }}>{edu.institution}</p>
              <p className="text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full inline-block" style={{ background: '#ede9fe', color: '#7c3aed' }}>{edu.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects — colorful stagger cards */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider mb-4" style={{ color: '#7c3aed' }}>
          <span className="text-lg">💡</span> Projects
        </h2>
        <div className="space-y-4">
          {data.projects.map((p, i) => {
            const accents = ['#7c3aed', '#2563eb', '#059669', '#db2777'];
            const bgs = ['#ede9fe', '#dbeafe', '#d1fae5', '#fce7f3'];
            const accent = accents[i % accents.length];
            const bg = bgs[i % bgs.length];
            return (
              <div key={p.id} className="rounded-2xl p-6 transition-transform hover:-translate-y-1 hover:shadow-lg" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', borderBottom: `3px solid ${accent}` }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black" style={{ background: bg, color: accent }}>
                      {String(i + 1)}
                    </div>
                    <h3 className="text-base font-black" style={{ color: '#1e293b' }}>{p.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: bg, color: accent }}><Github size={12} /></a>}
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: bg, color: accent }}><ExternalLink size={12} /></a>}
                  </div>
                </div>
                <p className="text-xs leading-relaxed ml-[52px]" style={{ color: '#64748b' }}>{p.description}</p>
                <div className="flex gap-1.5 mt-3 ml-[52px] flex-wrap">
                  {p.techStack.map(t => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: bg, color: accent }}>{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-wider mb-4" style={{ color: '#7c3aed' }}>
            <span className="text-lg">⚡</span> Experience
          </h2>
          {data.experience.map(exp => (
            <div key={exp.id} className="rounded-2xl p-5 mb-3" style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-black">{exp.position}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: '#dbeafe', color: '#2563eb' }}>{exp.duration}</span>
              </div>
              <p className="text-xs font-bold mt-0.5" style={{ color: '#7c3aed' }}>{exp.company}</p>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: '#64748b' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer className="text-center py-10 mt-8" style={{ borderTop: '2px dashed #c4b5fd' }}>
        <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-black transition-transform hover:scale-105" style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', boxShadow: '0 8px 24px rgba(124,58,237,0.3)' }}>
          <Mail size={14} /> Let's Connect! <Heart size={14} />
        </a>
        <p className="text-xs mt-4" style={{ color: '#a78bfa' }}>Made with 💜 by {data.name}</p>
      </footer>
    </div>
  </div>
);

export default StudentTemplate;
