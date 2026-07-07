import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolio } from '@/lib/portfolio-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download, PanelLeftClose, PanelLeft, Plus, Trash2, Sparkles, ChevronDown, User } from 'lucide-react';

type ResumeStyle =
  | 'ats'
  | 'modern'
  | 'developer'
  | 'executive'
  | 'minimal-serif'
  | 'split-timeline'
  | 'sidebar-bold'
  | 'compact-cards'
  | 'gradient'
  | 'resume-style';

const resumeStyles: { id: ResumeStyle; label: string; blurb: string }[] = [
  { id: 'ats', label: 'ATS-Friendly', blurb: 'Clean and scanner-safe.' },
  { id: 'modern', label: 'Modern', blurb: 'Balanced two-column layout.' },
  { id: 'developer', label: 'Developer', blurb: 'Code-inspired technical resume.' },
  { id: 'executive', label: 'Executive', blurb: 'Polished leadership-focused format.' },
  { id: 'minimal-serif', label: 'Minimal Serif', blurb: 'Elegant editorial presentation.' },
  { id: 'split-timeline', label: 'Split Timeline', blurb: 'Strong chronological story.' },
  { id: 'sidebar-bold', label: 'Sidebar Bold', blurb: 'High-contrast recruiter-friendly card.' },
  { id: 'compact-cards', label: 'Compact Cards', blurb: 'Dense layout for more information.' },
  { id: 'gradient', label: 'Gradient', blurb: 'Creative presentation with soft color.' },
  { id: 'resume-style', label: 'Resume Style', blurb: 'Professional two-column resume layout.' },
];

const ResumeEditor = () => {
  const { data, updateData } = usePortfolio();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [styleDrawerOpen, setStyleDrawerOpen] = useState(false);
  const [resumeStyle, setResumeStyle] = useState<ResumeStyle>(
    (location.state?.resumeStyle as ResumeStyle) || 'modern'
  );
  const [editSection, setEditSection] = useState<'profile' | 'projects' | 'experience' | 'education'>('profile');

  const handleDownload = () => {
    const content = document.querySelector('main');
    if (!content) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
      .map(el => el.outerHTML).join('');
    printWindow.document.write(`<!DOCTYPE html><html><head>${styles}<style>body{margin:0;}</style></head><body>${content.innerHTML}</body></html>`);
    printWindow.document.close();
    printWindow.onload = () => { printWindow.print(); printWindow.close(); };
  };

  const generateBio = () => {
    const bio = `Experienced ${data.role} skilled in ${data.skills.slice(0, 4).join(', ')}. Passionate about building scalable, user-centric solutions that drive impact.`;
    updateData({ bio });
  };

  const addProject = () => {
    updateData({ projects: [...data.projects, { id: Date.now().toString(), title: '', description: '', techStack: [], link: '', github: '' }] });
  };
  const removeProject = (id: string) => {
    updateData({ projects: data.projects.filter(p => p.id !== id) });
  };
  const updateProject = (id: string, updates: any) => {
    updateData({ projects: data.projects.map(p => (p.id === id ? { ...p, ...updates } : p)) });
  };

  const addExperience = () => {
    updateData({ experience: [...data.experience, { id: Date.now().toString(), company: '', position: '', duration: '', description: '' }] });
  };
  const removeExperience = (id: string) => {
    updateData({ experience: data.experience.filter(e => e.id !== id) });
  };
  const updateExperience = (id: string, updates: any) => {
    updateData({ experience: data.experience.map(e => (e.id === id ? { ...e, ...updates } : e)) });
  };

  const addEducation = () => {
    updateData({ education: [...data.education, { id: Date.now().toString(), institution: '', degree: '', year: '' }] });
  };
  const removeEducation = (id: string) => {
    updateData({ education: data.education.filter(e => e.id !== id) });
  };
  const updateEducation = (id: string, updates: any) => {
    updateData({ education: data.education.map(e => (e.id === id ? { ...e, ...updates } : e)) });
  };

  const sections = [
    { id: 'profile' as const, label: 'Profile' },
    { id: 'experience' as const, label: 'Experience' },
    { id: 'education' as const, label: 'Education' },
    { id: 'projects' as const, label: 'Projects' },
  ];

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      {/* Top bar - hidden when printing */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border print:hidden">
        <div className="flex items-center justify-between h-12 px-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard?tab=templates" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
            <div className="h-4 w-px bg-border" />
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              {sidebarOpen ? <PanelLeftClose size={14} /> : <PanelLeft size={14} />}
              {sidebarOpen ? 'Hide Editor' : 'Show Editor'}
            </button>
          </div>

          {/* Resume style switcher toggle */}
          <button
            onClick={() => setStyleDrawerOpen(!styleDrawerOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-secondary/80 transition-colors border border-border"
          >
            {resumeStyles.find(s => s.id === resumeStyle)?.label}
            <ChevronDown size={12} className={`transition-transform ${styleDrawerOpen ? 'rotate-180' : ''}`} />
          </button>

          <Button size="sm" onClick={handleDownload} className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
            <Download size={14} /> Download PDF
          </Button>
        </div>
      </header>

      {/* Resume style selector drawer */}
      {styleDrawerOpen && (
        <div className="bg-background border-b border-border px-4 py-3 print:hidden z-40 relative">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {resumeStyles.map(s => (
              <button
                key={s.id}
                onClick={() => { setResumeStyle(s.id); setStyleDrawerOpen(false); }}
                className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                  resumeStyle === s.id
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="text-xs font-semibold">{s.label}</div>
                <div className="text-[11px]">{s.blurb}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Editor Sidebar */}
        {sidebarOpen && (
          <aside className="w-80 shrink-0 bg-background border-r border-border overflow-y-auto print:hidden">
            {/* Section tabs */}
            <div className="flex border-b border-border">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setEditSection(s.id)}
                  className={`flex-1 py-2.5 text-[11px] font-medium transition-colors ${
                    editSection === s.id ? 'text-foreground border-b-2 border-accent' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="p-4 space-y-4">
              {editSection === 'profile' && (
                <>
                  {/* Avatar upload */}
                  <div className="space-y-1.5">
                    <Label className="text-[11px]">Profile Photo</Label>
                    <div className="flex items-center gap-3">
                      {data.avatar ? (
                        <img src={data.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-border" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border">
                          <User size={18} className="text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <label className="cursor-pointer text-[10px] font-medium px-2 py-1 rounded bg-secondary hover:bg-secondary/80 border border-border">
                          Upload
                          <input type="file" accept="image/*" onChange={e => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => updateData({ avatar: ev.target?.result as string });
                            reader.readAsDataURL(file);
                          }} className="hidden" />
                        </label>
                        {data.avatar && (
                          <button onClick={() => updateData({ avatar: '' })} className="ml-1 text-[10px] text-muted-foreground hover:text-destructive">✕</button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px]">Full Name</Label>
                    <Input value={data.name} onChange={e => updateData({ name: e.target.value })} className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px]">Role / Title</Label>
                    <Input value={data.role} onChange={e => updateData({ role: e.target.value })} className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px]">Email</Label>
                    <Input value={data.email} onChange={e => updateData({ email: e.target.value })} className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-[11px]">Bio</Label>
                      <button onClick={generateBio} className="flex items-center gap-1 text-[10px] text-accent hover:underline">
                        <Sparkles size={10} /> AI Generate
                      </button>
                    </div>
                    <Textarea value={data.bio} onChange={e => updateData({ bio: e.target.value })} rows={3} className="text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px]">Skills (comma separated)</Label>
                    <Input
                      value={data.skills.join(', ')}
                      onChange={e => updateData({ skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[11px]">Social Links</Label>
                    <Input placeholder="GitHub" value={data.socialLinks.github || ''} onChange={e => updateData({ socialLinks: { ...data.socialLinks, github: e.target.value } })} className="h-8 text-xs" />
                    <Input placeholder="LinkedIn" value={data.socialLinks.linkedin || ''} onChange={e => updateData({ socialLinks: { ...data.socialLinks, linkedin: e.target.value } })} className="h-8 text-xs" />
                    <Input placeholder="Twitter" value={data.socialLinks.twitter || ''} onChange={e => updateData({ socialLinks: { ...data.socialLinks, twitter: e.target.value } })} className="h-8 text-xs" />
                  </div>
                </>
              )}

              {editSection === 'experience' && (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] font-semibold">Experience</Label>
                    <Button size="sm" variant="outline" onClick={addExperience} className="h-7 text-[11px] gap-1">
                      <Plus size={12} /> Add
                    </Button>
                  </div>
                  {data.experience.map((e: any) => (
                    <div key={e.id} className="p-3 rounded-lg bg-secondary/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <Input value={e.position} onChange={ev => updateExperience(e.id, { position: ev.target.value })} placeholder="Position" className="h-7 text-xs flex-1" />
                        <button onClick={() => removeExperience(e.id)} className="ml-2 text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
                      </div>
                      <Input value={e.company} onChange={ev => updateExperience(e.id, { company: ev.target.value })} placeholder="Company" className="h-7 text-xs" />
                      <Input value={e.duration} onChange={ev => updateExperience(e.id, { duration: ev.target.value })} placeholder="Duration" className="h-7 text-xs" />
                      <Textarea value={e.description} onChange={ev => updateExperience(e.id, { description: ev.target.value })} placeholder="Description" rows={2} className="text-xs" />
                    </div>
                  ))}
                </>
              )}

              {editSection === 'education' && (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] font-semibold">Education</Label>
                    <Button size="sm" variant="outline" onClick={addEducation} className="h-7 text-[11px] gap-1">
                      <Plus size={12} /> Add
                    </Button>
                  </div>
                  {data.education.map((e: any) => (
                    <div key={e.id} className="p-3 rounded-lg bg-secondary/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <Input value={e.degree} onChange={ev => updateEducation(e.id, { degree: ev.target.value })} placeholder="Degree" className="h-7 text-xs flex-1" />
                        <button onClick={() => removeEducation(e.id)} className="ml-2 text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
                      </div>
                      <Input value={e.institution} onChange={ev => updateEducation(e.id, { institution: ev.target.value })} placeholder="Institution" className="h-7 text-xs" />
                      <Input value={e.year} onChange={ev => updateEducation(e.id, { year: ev.target.value })} placeholder="Year" className="h-7 text-xs" />
                    </div>
                  ))}
                </>
              )}

              {editSection === 'projects' && (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] font-semibold">Projects</Label>
                    <Button size="sm" variant="outline" onClick={addProject} className="h-7 text-[11px] gap-1">
                      <Plus size={12} /> Add
                    </Button>
                  </div>
                  {data.projects.map((p: any) => (
                    <div key={p.id} className="p-3 rounded-lg bg-secondary/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <Input value={p.title} onChange={e => updateProject(p.id, { title: e.target.value })} placeholder="Title" className="h-7 text-xs flex-1" />
                        <button onClick={() => removeProject(p.id)} className="ml-2 text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
                      </div>
                      <Textarea value={p.description} onChange={e => updateProject(p.id, { description: e.target.value })} placeholder="Description" rows={2} className="text-xs" />
                      <Input value={p.techStack?.join(', ') || ''} onChange={e => updateProject(p.id, { techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} placeholder="Tech stack" className="h-7 text-xs font-mono" />
                      <div className="grid grid-cols-2 gap-2">
                        <Input value={p.link || ''} onChange={e => updateProject(p.id, { link: e.target.value })} placeholder="Live URL" className="h-7 text-xs" />
                        <Input value={p.github || ''} onChange={e => updateProject(p.id, { github: e.target.value })} placeholder="GitHub" className="h-7 text-xs" />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </aside>
        )}

        {/* Main preview area */}
        <main className="flex-1 overflow-auto flex justify-center bg-secondary/30 print:bg-white">
          <div className="w-full max-w-[210mm] min-h-[297mm] bg-card p-8 shadow-float print:max-w-none print:shadow-none print:p-0 sm:p-12 print:bg-white m-8 print:m-0">
            {resumeStyle === 'ats' && <ATSResume data={data} />}
            {resumeStyle === 'modern' && <ModernResume data={data} />}
            {resumeStyle === 'developer' && <DeveloperResume data={data} />}
            {resumeStyle === 'executive' && <ExecutiveResume data={data} />}
            {resumeStyle === 'minimal-serif' && <MinimalSerifResume data={data} />}
            {resumeStyle === 'split-timeline' && <SplitTimelineResume data={data} />}
            {resumeStyle === 'sidebar-bold' && <SidebarBoldResume data={data} />}
            {resumeStyle === 'compact-cards' && <CompactCardsResume data={data} />}
            {resumeStyle === 'gradient' && <GradientResume data={data} />}
            {resumeStyle === 'resume-style' && <SidebarBoldResume data={data} />}
          </div>
        </main>
      </div>
    </div>
  );
};

// ============ Resume Components ============

const getContactItems = (data: any) =>
  [data.email, data.socialLinks?.github, data.socialLinks?.linkedin, data.socialLinks?.twitter].filter(Boolean);

const ATSResume = ({ data }: { data: any }) => (
  <div className="font-sans text-foreground">
    <h1 className="mb-1 text-2xl font-bold">{data.name}</h1>
    <p className="mb-1 text-sm text-muted-foreground">{data.role}</p>
    <p className="mb-4 text-xs text-muted-foreground">{getContactItems(data).join(' • ')}</p>
    <hr className="mb-4 border-border" />

    <h2 className="mb-2 text-xs font-bold uppercase tracking-wider">Summary</h2>
    <p className="mb-4 text-xs leading-relaxed">{data.bio}</p>

    <h2 className="mb-2 text-xs font-bold uppercase tracking-wider">Skills</h2>
    <p className="mb-4 text-xs">{data.skills.join(' • ')}</p>

    <h2 className="mb-2 text-xs font-bold uppercase tracking-wider">Experience</h2>
    {data.experience.map((exp: any) => (
      <div key={exp.id} className="mb-3">
        <div className="flex justify-between">
          <span className="text-xs font-semibold">{exp.position}</span>
          <span className="text-xs text-muted-foreground">{exp.duration}</span>
        </div>
        <p className="text-xs text-muted-foreground">{exp.company}</p>
        <p className="mt-1 text-xs">{exp.description}</p>
      </div>
    ))}

    <h2 className="mb-2 text-xs font-bold uppercase tracking-wider">Education</h2>
    {data.education.map((edu: any) => (
      <div key={edu.id} className="mb-2">
        <span className="text-xs font-semibold">{edu.degree}</span>
        <span className="text-xs text-muted-foreground"> - {edu.institution}, {edu.year}</span>
      </div>
    ))}

    <h2 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider">Projects</h2>
    {data.projects.map((project: any) => (
      <div key={project.id} className="mb-2">
        <span className="text-xs font-semibold">{project.title}</span>
        <p className="text-xs">{project.description}</p>
      </div>
    ))}
  </div>
);

const ModernResume = ({ data }: { data: any }) => (
  <div className="font-sans text-foreground">
    <div className="mb-8">
      <h1 className="mb-1 text-3xl font-serif tracking-tight">{data.name}</h1>
      <p className="mb-2 text-sm font-medium text-accent">{data.role}</p>
      <p className="max-w-lg text-xs leading-relaxed text-muted-foreground">{data.bio}</p>
    </div>

    <div className="mb-6 flex flex-wrap gap-2">
      {data.skills.map((skill: string) => (
        <span key={skill} className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{skill}</span>
      ))}
    </div>

    <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
      <div className="space-y-6">
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">Education</h2>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-3">
              <p className="text-xs font-semibold">{edu.degree}</p>
              <p className="text-[10px] text-muted-foreground">{edu.institution}, {edu.year}</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">Contact</h2>
          {getContactItems(data).map((item) => (
            <p key={item} className="text-[10px] text-muted-foreground">{item}</p>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">Experience</h2>
          {data.experience.map((exp: any) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-semibold">{exp.position}</h3>
                <span className="font-mono text-[10px] text-muted-foreground">{exp.duration}</span>
              </div>
              <p className="mb-1 text-xs text-accent/80">{exp.company}</p>
              <p className="text-xs text-muted-foreground">{exp.description}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">Projects</h2>
          {data.projects.map((project: any) => (
            <div key={project.id} className="mb-3">
              <h3 className="text-sm font-semibold">{project.title}</h3>
              <p className="mb-1 text-xs text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.techStack?.map((tech: string) => (
                  <span key={tech} className="text-[9px] font-mono text-accent">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DeveloperResume = ({ data }: { data: any }) => (
  <div className="font-mono text-xs text-foreground">
    <div className="mb-6">
      <p className="text-muted-foreground">{`// ${data.role}`}</p>
      <h1 className="mt-1 text-2xl font-bold font-sans">{data.name}</h1>
      <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground">{data.bio}</p>
    </div>

    <div className="mb-6">
      <p className="mb-2 font-bold text-accent">{'>'} skills</p>
      <p className="pl-4">{data.skills.join(', ')}</p>
    </div>

    <div className="mb-6">
      <p className="mb-2 font-bold text-accent">{'>'} experience</p>
      {data.experience.map((exp: any) => (
        <div key={exp.id} className="mb-3 pl-4">
          <p className="font-sans font-bold">
            {exp.position} <span className="font-normal text-muted-foreground">@ {exp.company}</span>
          </p>
          <p className="text-muted-foreground">{exp.duration}</p>
          <p className="mt-0.5 font-sans">{exp.description}</p>
        </div>
      ))}
    </div>

    <div className="mb-6">
      <p className="mb-2 font-bold text-accent">{'>'} projects</p>
      {data.projects.map((project: any) => (
        <div key={project.id} className="mb-3 pl-4">
          <p className="font-sans font-bold">{project.title}</p>
          <p className="font-sans text-muted-foreground">{project.description}</p>
          <p className="mt-0.5 text-accent/70">[{project.techStack?.join(', ')}]</p>
        </div>
      ))}
    </div>

    <div>
      <p className="mb-2 font-bold text-accent">{'>'} education</p>
      {data.education.map((edu: any) => (
        <div key={edu.id} className="mb-2 pl-4">
          <p className="font-sans">
            <span className="font-bold">{edu.degree}</span> - {edu.institution} ({edu.year})
          </p>
        </div>
      ))}
    </div>
  </div>
);

const ExecutiveResume = ({ data }: { data: any }) => (
  <div className="font-sans text-foreground">
    <div className="border-b border-foreground pb-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Executive Profile</p>
          <h1 className="mt-2 text-4xl font-light">{data.name}</h1>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em]">{data.role}</p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          {getContactItems(data).map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
    </div>

    <div className="my-6 rounded-2xl bg-secondary/70 p-5">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.3em]">Leadership Summary</h2>
      <p className="text-sm leading-6">{data.bio}</p>
    </div>

    <div className="grid gap-8 md:grid-cols-[1.3fr_0.9fr]">
      <div>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em]">Experience</h2>
        {data.experience.map((exp: any) => (
          <div key={exp.id} className="mb-5 border-l-2 border-accent pl-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-base font-semibold">{exp.position}</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{exp.duration}</span>
            </div>
            <p className="text-sm text-accent">{exp.company}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{exp.description}</p>
          </div>
        ))}

        <h2 className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.3em]">Selected Projects</h2>
        {data.projects.map((project: any) => (
          <div key={project.id} className="mb-4 rounded-xl border border-border p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold">{project.title}</h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {project.techStack?.slice(0, 2).join(' / ')}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{project.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]">Core Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string) => (
              <span key={skill} className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em]">{skill}</span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.3em]">Education</h2>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-3">
              <p className="text-sm font-semibold">{edu.degree}</p>
              <p className="text-xs text-muted-foreground">{edu.institution}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MinimalSerifResume = ({ data }: { data: any }) => (
  <div className="text-foreground">
    <div className="mb-10 text-center">
      <h1 className="text-4xl font-serif tracking-tight">{data.name}</h1>
      <p className="mt-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">{data.role}</p>
      <p className="mt-4 text-xs text-muted-foreground">{getContactItems(data).join(' • ')}</p>
    </div>

    <div className="mx-auto mb-8 max-w-2xl text-center">
      <p className="font-serif text-lg leading-8">{data.bio}</p>
    </div>

    <div className="grid gap-8 md:grid-cols-2">
      <section>
        <h2 className="mb-4 border-b border-border pb-2 font-serif text-xl">Experience</h2>
        {data.experience.map((exp: any) => (
          <div key={exp.id} className="mb-5">
            <p className="font-serif text-lg">{exp.position}</p>
            <p className="text-sm text-muted-foreground">{exp.company} • {exp.duration}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-4 border-b border-border pb-2 font-serif text-xl">Projects</h2>
        {data.projects.map((project: any) => (
          <div key={project.id} className="mb-5">
            <p className="font-serif text-lg">{project.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-accent">{project.techStack?.join(' • ')}</p>
          </div>
        ))}
      </section>
    </div>

    <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
      <section>
        <h2 className="mb-4 border-b border-border pb-2 font-serif text-xl">Skills</h2>
        <p className="text-sm leading-7 text-muted-foreground">{data.skills.join(' • ')}</p>
      </section>
      <section>
        <h2 className="mb-4 border-b border-border pb-2 font-serif text-xl">Education</h2>
        {data.education.map((edu: any) => (
          <div key={edu.id} className="mb-3">
            <p className="text-sm font-semibold">{edu.degree}</p>
            <p className="text-sm text-muted-foreground">{edu.institution}</p>
            <p className="text-xs text-muted-foreground">{edu.year}</p>
          </div>
        ))}
      </section>
    </div>
  </div>
);

const SplitTimelineResume = ({ data }: { data: any }) => (
  <div className="font-sans text-foreground">
    <div className="mb-8 grid gap-6 border-b border-border pb-6 md:grid-cols-[1.2fr_0.8fr]">
      <div>
        <h1 className="text-3xl font-bold">{data.name}</h1>
        <p className="mt-2 text-sm text-accent">{data.role}</p>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{data.bio}</p>
      </div>
      <div className="rounded-2xl bg-secondary/80 p-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]">Contact</h2>
        {getContactItems(data).map((item) => (
          <p key={item} className="mb-1 text-xs text-muted-foreground">{item}</p>
        ))}
      </div>
    </div>

    <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
      <section>
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.25em]">Career Timeline</h2>
        {data.experience.map((exp: any) => (
          <div key={exp.id} className="relative mb-6 border-l border-border pl-5">
            <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-accent" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{exp.duration}</p>
            <h3 className="mt-1 text-sm font-semibold">{exp.position}</h3>
            <p className="text-xs text-accent">{exp.company}</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{exp.description}</p>
          </div>
        ))}
      </section>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em]">Skills</h2>
          <div className="space-y-2">
            {data.skills.map((skill: string) => (
              <div key={skill} className="rounded-lg border border-border px-3 py-2 text-xs">{skill}</div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em]">Education</h2>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-3 rounded-lg bg-secondary/60 p-3">
              <p className="text-xs font-semibold">{edu.degree}</p>
              <p className="text-[11px] text-muted-foreground">{edu.institution}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{edu.year}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em]">Projects</h2>
          {data.projects.map((project: any) => (
            <div key={project.id} className="mb-3">
              <p className="text-xs font-semibold">{project.title}</p>
              <p className="text-[11px] leading-5 text-muted-foreground">{project.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  </div>
);

const SidebarBoldResume = ({ data }: { data: any }) => (
  <div className="grid min-h-full gap-0 overflow-hidden rounded-[24px] border border-border md:grid-cols-[0.9fr_1.6fr]">
    <aside className="bg-foreground px-8 py-10 text-background">
      <p className="text-xs uppercase tracking-[0.35em] text-background/70">Profile</p>
      <h1 className="mt-4 text-3xl font-semibold">{data.name}</h1>
      <p className="mt-2 text-sm text-background/80">{data.role}</p>

      <div className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-background/70">Contact</h2>
        {getContactItems(data).map((item) => (
          <p key={item} className="mb-2 text-xs text-background/80">{item}</p>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-background/70">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string) => (
            <span key={skill} className="rounded-full border border-background/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-background/85">{skill}</span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-background/70">Education</h2>
        {data.education.map((edu: any) => (
          <div key={edu.id} className="mb-4">
            <p className="text-sm font-semibold">{edu.degree}</p>
            <p className="text-xs text-background/75">{edu.institution}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-background/60">{edu.year}</p>
          </div>
        ))}
      </div>
    </aside>

    <main className="bg-card px-8 py-10 text-foreground">
      <section className="mb-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Summary</h2>
        <p className="text-sm leading-7 text-muted-foreground">{data.bio}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Experience</h2>
        {data.experience.map((exp: any) => (
          <div key={exp.id} className="mb-5 rounded-xl border border-border p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-sm font-semibold">{exp.position}</h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{exp.duration}</span>
            </div>
            <p className="text-xs text-accent">{exp.company}</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.projects.map((project: any) => (
            <div key={project.id} className="rounded-xl bg-secondary/60 p-4">
              <h3 className="text-sm font-semibold">{project.title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{project.description}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-accent">{project.techStack?.slice(0, 3).join(' • ')}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
);

const CompactCardsResume = ({ data }: { data: any }) => (
  <div className="font-sans text-foreground">
    <div className="mb-6 rounded-3xl bg-secondary/70 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-sm text-accent">{data.role}</p>
        </div>
        <div className="text-xs text-muted-foreground">
          {getContactItems(data).map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{data.bio}</p>
    </div>

    <div className="mb-6 grid gap-3 md:grid-cols-2">
      <section className="rounded-2xl border border-border p-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string) => (
            <span key={skill} className="rounded-md bg-secondary px-2 py-1 text-[10px] font-medium">{skill}</span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border p-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]">Education</h2>
        {data.education.map((edu: any) => (
          <div key={edu.id} className="mb-3 last:mb-0">
            <p className="text-xs font-semibold">{edu.degree}</p>
            <p className="text-[11px] text-muted-foreground">{edu.institution}</p>
            <p className="text-[10px] text-muted-foreground">{edu.year}</p>
          </div>
        ))}
      </section>
    </div>

    <section className="mb-6">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]">Experience</h2>
      <div className="grid gap-4">
        {data.experience.map((exp: any) => (
          <div key={exp.id} className="rounded-2xl border border-border p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-semibold">{exp.position}</h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{exp.duration}</span>
            </div>
            <p className="text-xs text-accent">{exp.company}</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]">Projects</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {data.projects.map((project: any) => (
          <div key={project.id} className="rounded-2xl bg-foreground p-4 text-background">
            <h3 className="text-sm font-semibold">{project.title}</h3>
            <p className="mt-2 text-xs leading-5 text-background/75">{project.description}</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-background/60">{project.techStack?.join(' • ')}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const GradientResume = ({ data }: { data: any }) => (
  <div className="overflow-hidden rounded-[28px] border border-border bg-[linear-gradient(135deg,#fff8f1_0%,#f2f7ff_50%,#eefcf4_100%)] p-8 text-foreground">
    <div className="mb-8 flex flex-col gap-4 border-b border-foreground/10 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Creative Resume</p>
        <h1 className="mt-3 text-4xl font-serif">{data.name}</h1>
        <p className="mt-2 text-sm font-medium text-accent">{data.role}</p>
      </div>
      <div className="rounded-2xl bg-white/70 px-4 py-3 text-xs text-muted-foreground shadow-sm">
        {getContactItems(data).map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>

    <div className="mb-8 rounded-3xl bg-white/65 p-5 shadow-sm">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em]">About</h2>
      <p className="text-sm leading-7 text-muted-foreground">{data.bio}</p>
    </div>

    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-5">
        <section className="rounded-3xl bg-white/70 p-5 shadow-sm">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]">Experience</h2>
          {data.experience.map((exp: any) => (
            <div key={exp.id} className="mb-4 last:mb-0">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-sm font-semibold">{exp.position}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{exp.duration}</span>
              </div>
              <p className="text-xs text-accent">{exp.company}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-white/70 p-5 shadow-sm">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]">Projects</h2>
          {data.projects.map((project: any) => (
            <div key={project.id} className="mb-4 last:mb-0">
              <h3 className="text-sm font-semibold">{project.title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack?.map((tech: string) => (
                  <span key={tech} className="rounded-full bg-secondary px-2 py-1 text-[10px]">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="space-y-5">
        <section className="rounded-3xl bg-white/70 p-5 shadow-sm">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill: string) => (
              <span key={skill} className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.2em]">{skill}</span>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white/70 p-5 shadow-sm">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]">Education</h2>
          {data.education.map((edu: any) => (
            <div key={edu.id} className="mb-3 last:mb-0">
              <p className="text-sm font-semibold">{edu.degree}</p>
              <p className="text-xs text-muted-foreground">{edu.institution}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{edu.year}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  </div>
);

export default ResumeEditor;
