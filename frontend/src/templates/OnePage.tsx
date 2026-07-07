import { Github, Linkedin, ExternalLink, Mail, ArrowDown, ChevronRight, Star } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-context';

const OnePageTemplate = ({ data }: { data: PortfolioData }) => (
  <div className="min-h-screen" style={{ background: '#022c22', color: '#ecfdf5', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
    {/* Hero — dramatic centered with emerald glow */}
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: 'rgba(16,185,129,0.12)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: 'rgba(52,211,153,0.06)' }} />
      </div>
      <div className="relative z-10">
        {data.avatar && (
          <img src={data.avatar} alt={data.name} className="w-32 h-32 rounded-full object-cover mx-auto mb-10" style={{ border: '3px solid rgba(16,185,129,0.4)', boxShadow: '0 0 60px rgba(16,185,129,0.2)' }} />
        )}
        <p className="text-xs uppercase tracking-[0.4em] mb-5 font-semibold" style={{ color: '#34d399' }}>{data.role}</p>
        <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tighter mb-6" style={{ background: 'linear-gradient(135deg, #ecfdf5, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {data.name}
        </h1>
        <p className="text-base max-w-lg mx-auto leading-relaxed mb-10" style={{ color: '#6ee7b7' }}>{data.bio}</p>
        <div className="flex items-center justify-center gap-3 mb-12">
          {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}><Github size={20} /></a>}
          {data.socialLinks.linkedin && <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}><Linkedin size={20} /></a>}
          <a href={`mailto:${data.email}`} className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-110" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}><Mail size={20} /></a>
        </div>
      </div>
      <div className="absolute bottom-8 animate-bounce" style={{ color: '#065f46' }}>
        <ArrowDown size={22} />
      </div>
    </section>

    {/* Skills — glowing grid */}
    <section className="py-28 px-6" style={{ background: '#022c22' }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: '#065f46' }}>What I Know</p>
        <h2 className="text-4xl font-extrabold mb-14 tracking-tight">Technologies</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {data.skills.map(s => (
            <span key={s} className="px-6 py-3 text-sm font-semibold rounded-2xl transition-all hover:scale-105" style={{ background: 'rgba(16,185,129,0.08)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.15)' }}>{s}</span>
          ))}
        </div>
      </div>
    </section>

    {/* Projects — large stacked cards */}
    <section className="py-28 px-6" style={{ background: '#064e3b' }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] mb-3 text-center" style={{ color: '#065f46' }}>Portfolio</p>
        <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight">Projects</h2>
        <div className="space-y-8">
          {data.projects.map((p, i) => (
            <div key={p.id} className="rounded-3xl p-8 transition-all hover:-translate-y-1" style={{ background: 'rgba(2,44,34,0.8)', border: '1px solid rgba(16,185,129,0.1)', backdropFilter: 'blur(10px)' }}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-2xl font-extrabold" style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-extrabold mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#6ee7b7' }}>{p.description}</p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {p.techStack.map(t => <span key={t} className="text-[10px] font-semibold px-3 py-1 rounded-lg" style={{ color: '#34d399', background: 'rgba(16,185,129,0.1)' }}>{t}</span>)}
                  </div>
                  <div className="flex gap-4">
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold transition-colors" style={{ color: '#6ee7b7' }}><Github size={14} /> Source</a>}
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold transition-colors" style={{ color: '#34d399' }}><ExternalLink size={14} /> Live Demo</a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Experience — vertical timeline with green dots */}
    <section className="py-28 px-6" style={{ background: '#022c22' }}>
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] mb-3 text-center" style={{ color: '#065f46' }}>Career</p>
        <h2 className="text-4xl font-extrabold text-center mb-16 tracking-tight">Experience</h2>
        <div className="space-y-10 relative">
          <div className="absolute left-5 top-0 bottom-0 w-[2px]" style={{ background: 'linear-gradient(to bottom, #34d399, transparent)' }} />
          {data.experience.map(exp => (
            <div key={exp.id} className="pl-14 relative">
              <div className="absolute left-3 top-2 w-4 h-4 rounded-full" style={{ background: '#34d399', boxShadow: '0 0 15px rgba(52,211,153,0.5)' }} />
              <h3 className="text-lg font-extrabold tracking-tight">{exp.position}</h3>
              <p className="text-sm font-semibold" style={{ color: '#34d399' }}>{exp.company}</p>
              <p className="text-xs mt-1" style={{ color: '#065f46' }}>{exp.duration}</p>
              <p className="text-sm mt-3 leading-relaxed" style={{ color: '#6ee7b7' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Education & CTA */}
    <section className="py-28 px-6 text-center" style={{ background: '#064e3b' }}>
      <h2 className="text-4xl font-extrabold mb-12 tracking-tight">Education</h2>
      {data.education.map(edu => (
        <div key={edu.id} className="mb-5">
          <p className="text-lg font-extrabold">{edu.degree}</p>
          <p className="text-sm" style={{ color: '#6ee7b7' }}>{edu.institution} · {edu.year}</p>
        </div>
      ))}
      <div className="mt-16">
        <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-sm font-extrabold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #059669, #34d399)', color: '#022c22', boxShadow: '0 10px 30px rgba(16,185,129,0.3)' }}>
          <Mail size={16} /> Let's Connect <ChevronRight size={16} />
        </a>
      </div>
    </section>
  </div>
);

export default OnePageTemplate;
