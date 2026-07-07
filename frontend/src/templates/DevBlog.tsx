import { Github, Linkedin, Twitter, ExternalLink, Mail, Terminal, Code2, Folder, ChevronRight, Play } from 'lucide-react';
import { PortfolioData } from '@/lib/portfolio-context';

const DevBlogTemplate = ({ data }: { data: PortfolioData }) => (
  <div className="min-h-screen" style={{ background: '#1e1e2e', color: '#cdd6f4', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
    {/* IDE-style title bar */}
    <nav className="sticky top-0 z-50" style={{ background: '#181825', borderBottom: '1px solid #313244' }}>
      <div className="max-w-4xl mx-auto px-6 h-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#f38ba8' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#fab387' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#a6e3a1' }} />
          </div>
          {/* Tabs like IDE */}
          <div className="flex ml-4">
            <div className="px-4 py-1.5 text-[10px] flex items-center gap-1.5" style={{ background: '#1e1e2e', color: '#89b4fa', borderTop: '2px solid #89b4fa', borderRight: '1px solid #313244' }}>
              <Code2 size={10} /> portfolio.tsx
            </div>
            <div className="px-4 py-1.5 text-[10px] flex items-center gap-1.5" style={{ color: '#585b70' }}>
              <Terminal size={10} /> terminal
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {data.socialLinks.github && <a href={data.socialLinks.github} target="_blank" rel="noreferrer" style={{ color: '#585b70' }} className="hover:text-[#89b4fa] transition-colors"><Github size={14} /></a>}
          {data.socialLinks.twitter && <a href={data.socialLinks.twitter} target="_blank" rel="noreferrer" style={{ color: '#585b70' }} className="hover:text-[#89b4fa] transition-colors"><Twitter size={14} /></a>}
          <a href={`mailto:${data.email}`} style={{ color: '#585b70' }} className="hover:text-[#89b4fa] transition-colors"><Mail size={14} /></a>
        </div>
      </div>
    </nav>

    {/* IDE layout with line numbers */}
    <div className="max-w-4xl mx-auto grid" style={{ gridTemplateColumns: '48px 1fr' }}>
      {/* Line numbers gutter */}
      <div className="select-none text-right pr-3 pt-8 pb-8 text-[10px] leading-[2.4]" style={{ color: '#45475a', background: '#181825', borderRight: '1px solid #313244' }}>
        {Array.from({ length: 60 }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      {/* Code content */}
      <div className="px-8 py-8">
        {/* Hero as code block */}
        <section className="mb-10">
          <p className="text-xs mb-1" style={{ color: '#585b70' }}>
            <span style={{ color: '#cba6f7' }}>const</span> <span style={{ color: '#89b4fa' }}>developer</span> <span style={{ color: '#89dceb' }}>=</span> {'{'}
          </p>
          <div className="ml-6 space-y-1">
            <div className="flex items-center gap-4">
              {data.avatar && (
                <img src={data.avatar} alt={data.name} className="w-14 h-14 rounded-lg object-cover" style={{ border: '2px solid #313244' }} />
              )}
              <div>
                <p><span style={{ color: '#a6e3a1' }}>name</span>: <span style={{ color: '#fab387' }}>"{data.name}"</span>,</p>
                <p><span style={{ color: '#a6e3a1' }}>role</span>: <span style={{ color: '#fab387' }}>"{data.role}"</span>,</p>
              </div>
            </div>
            <p className="mt-3"><span style={{ color: '#a6e3a1' }}>bio</span>: <span style={{ color: '#fab387' }}>"{data.bio}"</span>,</p>
          </div>
          <p className="text-xs mt-2" style={{ color: '#585b70' }}>{'};'}</p>
        </section>

        {/* Skills as array */}
        <section className="mb-10 rounded-xl p-5" style={{ background: '#181825', border: '1px solid #313244' }}>
          <p className="text-xs mb-2">
            <span style={{ color: '#cba6f7' }}>const</span> <span style={{ color: '#89b4fa' }}>skills</span> <span style={{ color: '#89dceb' }}>=</span> [
          </p>
          <div className="flex flex-wrap gap-2 ml-4 mb-2">
            {data.skills.map((s, i) => (
              <span key={s} className="px-3 py-1 text-xs rounded-md" style={{ 
                background: i % 4 === 0 ? 'rgba(137,180,250,0.1)' : i % 4 === 1 ? 'rgba(166,227,161,0.1)' : i % 4 === 2 ? 'rgba(250,179,135,0.1)' : 'rgba(203,166,247,0.1)',
                color: i % 4 === 0 ? '#89b4fa' : i % 4 === 1 ? '#a6e3a1' : i % 4 === 2 ? '#fab387' : '#cba6f7',
                border: `1px solid ${i % 4 === 0 ? 'rgba(137,180,250,0.2)' : i % 4 === 1 ? 'rgba(166,227,161,0.2)' : i % 4 === 2 ? 'rgba(250,179,135,0.2)' : 'rgba(203,166,247,0.2)'}`
              }}>"{s}"</span>
            ))}
          </div>
          <p className="text-xs" style={{ color: '#585b70' }}>];</p>
        </section>

        {/* Projects as function calls */}
        <section className="mb-10">
          <p className="text-xs mb-6">
            <span style={{ color: '#585b70' }}>{'// '}</span>
            <span style={{ color: '#6c7086' }}>Projects — {data.projects.length} repositories</span>
          </p>
          <div className="space-y-4">
            {data.projects.map((p, i) => (
              <div key={p.id} className="rounded-xl p-5 group transition-all hover:translate-x-1" style={{ background: '#181825', border: '1px solid #313244' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Play size={12} style={{ color: '#a6e3a1' }} />
                    <h3 className="text-sm font-bold" style={{ color: '#89b4fa' }}>
                      <span style={{ color: '#cba6f7' }}>fn </span>{p.title.replace(/\s+/g, '_').toLowerCase()}()
                    </h3>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="px-2 py-1 rounded text-[10px] flex items-center gap-1" style={{ background: '#313244', color: '#585b70' }}><Github size={10} /> src</a>}
                    {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="px-2 py-1 rounded text-[10px] flex items-center gap-1" style={{ background: 'rgba(166,227,161,0.1)', color: '#a6e3a1' }}><ExternalLink size={10} /> run</a>}
                  </div>
                </div>
                <p className="text-xs leading-relaxed ml-5 mb-3" style={{ color: '#6c7086' }}>// {p.description}</p>
                <div className="flex gap-2 ml-5 flex-wrap">
                  {p.techStack.map(t => (
                    <span key={t} className="px-2 py-0.5 text-[10px] rounded" style={{ background: '#313244', color: '#cba6f7' }}>#{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience as git log */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg" style={{ background: '#181825', display: 'inline-flex' }}>
            <Terminal size={12} style={{ color: '#a6e3a1' }} />
            <span className="text-xs" style={{ color: '#a6e3a1' }}>$</span>
            <span className="text-xs" style={{ color: '#cdd6f4' }}>git log --oneline --career</span>
          </div>
          <div className="space-y-5">
            {data.experience.map((exp, i) => (
              <div key={exp.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ background: i === 0 ? 'rgba(166,227,161,0.15)' : '#313244', color: i === 0 ? '#a6e3a1' : '#585b70' }}>
                    {String.fromCharCode(65 + i)}{String(i + 1)}
                  </div>
                  {i < data.experience.length - 1 && <div className="w-px flex-1 mt-2" style={{ background: '#313244' }} />}
                </div>
                <div className="pb-2">
                  <h3 className="text-sm font-bold" style={{ color: '#cdd6f4' }}>{exp.position}</h3>
                  <p className="text-xs" style={{ color: '#f9e2af' }}>{exp.company}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#45475a' }}>{exp.duration}</p>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: '#6c7086' }}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-10">
          <p className="text-xs mb-4">
            <span style={{ color: '#cba6f7' }}>interface</span> <span style={{ color: '#89b4fa' }}>Education</span> {'{'}
          </p>
          {data.education.map(edu => (
            <div key={edu.id} className="ml-6 mb-3">
              <p className="text-sm" style={{ color: '#cdd6f4' }}>{edu.degree}</p>
              <p className="text-xs" style={{ color: '#45475a' }}>{edu.institution} · {edu.year}</p>
            </div>
          ))}
          <p className="text-xs" style={{ color: '#585b70' }}>{'}'}</p>
        </section>
      </div>
    </div>

    {/* Footer — terminal prompt */}
    <footer style={{ borderTop: '1px solid #313244', background: '#181825' }}>
      <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
        <p className="text-[10px]" style={{ color: '#45475a' }}>
          <span style={{ color: '#a6e3a1' }}>❯</span> Built by {data.name} • <span style={{ color: '#f9e2af' }}>main</span> ✓
        </p>
        <div className="flex items-center gap-3 text-[10px]" style={{ color: '#45475a' }}>
          <span>UTF-8</span>
          <span>TypeScript React</span>
          <span>Ln 60, Col 1</span>
        </div>
      </div>
    </footer>
  </div>
);

export default DevBlogTemplate;
