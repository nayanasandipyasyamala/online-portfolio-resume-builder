import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio, TemplateName } from '@/lib/portfolio-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Download, PanelLeftClose, PanelLeft, Plus, Trash2, Sparkles, ChevronDown, User } from 'lucide-react';
import templateMinimalImg from '@/assets/template-minimal.jpg';
import templateCreativeImg from '@/assets/template-creative.jpg';
import templateCorporateImg from '@/assets/template-corporate.jpg';
import templateStudentImg from '@/assets/template-student.jpg';
import templateOnepageImg from '@/assets/template-onepage.jpg';
import templateDarkMinimalImg from '@/assets/template-dark-minimal.jpg';
import templateDevBlogImg from '@/assets/template-dev-blog.jpg';
import templateResumeStyleImg from '@/assets/template-resume-style.jpg';
import MinimalTemplate from '@/templates/Minimal';
import CreativeTemplate from '@/templates/Creative';
import CorporateTemplate from '@/templates/Corporate';
import StudentTemplate from '@/templates/Student';
import OnePageTemplate from '@/templates/OnePage';
import DarkMinimalTemplate from '@/templates/DarkMinimal';
import DevBlogTemplate from '@/templates/DevBlog';
import ElegantSerifTemplate from '@/templates/ElegantSerif';
import MinimalistGridTemplate from '@/templates/MinimalistGrid';

const templateComponents: Record<TemplateName, React.ComponentType<{ data: any }>> = {
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  corporate: CorporateTemplate,
  student: StudentTemplate,
  'one-page': OnePageTemplate,
  'dark-minimal': DarkMinimalTemplate,
  'dev-blog': DevBlogTemplate,
  'elegant-serif': ElegantSerifTemplate,
  'minimalist-grid': MinimalistGridTemplate,
};

const templateNames: { id: TemplateName; label: string; img: string }[] = [
  { id: 'minimal', label: 'Minimal', img: templateMinimalImg },
  { id: 'creative', label: 'Creative', img: templateCreativeImg },
  { id: 'corporate', label: 'Corporate', img: templateCorporateImg },
  { id: 'student', label: 'Student', img: templateStudentImg },
  { id: 'one-page', label: 'One-page', img: templateOnepageImg },
  { id: 'dark-minimal', label: 'Dark', img: templateDarkMinimalImg },
  { id: 'dev-blog', label: 'Dev Blog', img: templateDevBlogImg },
  { id: 'elegant-serif', label: 'Elegant Serif', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=640&h=480&fit=crop' },
  { id: 'minimalist-grid', label: 'Minimalist Grid', img: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=640&h=480&fit=crop' },
];

const TemplateEditor = () => {
  const { data, updateData } = usePortfolio();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [templateDrawerOpen, setTemplateDrawerOpen] = useState(false);
  const [editSection, setEditSection] = useState<'profile' | 'projects' | 'experience' | 'education'>('profile');

  const TemplateComp = templateComponents[data.template];

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
    { id: 'projects' as const, label: 'Projects' },
    { id: 'experience' as const, label: 'Experience' },
    { id: 'education' as const, label: 'Education' },
  ];

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      {/* Top bar - hidden when printing */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border print:hidden">
        <div className="flex items-center justify-between h-12 px-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard?tab=templates" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft size={14} /> Back to Templates
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

          {/* Template switcher toggle */}
          <button
            onClick={() => setTemplateDrawerOpen(!templateDrawerOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-secondary/80 transition-colors border border-border"
          >
            <img
              src={templateNames.find(t => t.id === data.template)?.img}
              alt=""
              className="w-6 h-4 rounded-sm object-cover border border-border"
            />
            {templateNames.find(t => t.id === data.template)?.label}
            <ChevronDown size={12} className={`transition-transform ${templateDrawerOpen ? 'rotate-180' : ''}`} />
          </button>

          <Button size="sm" onClick={handleDownload} className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
            <Download size={14} /> Download PDF
          </Button>
        </div>
      </header>

      {/* Template thumbnail drawer */}
      {templateDrawerOpen && (
        <div className="bg-background border-b border-border px-4 py-3 print:hidden z-40 relative">
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {templateNames.map(t => (
              <button
                key={t.id}
                onClick={() => { updateData({ template: t.id }); setTemplateDrawerOpen(false); }}
                className={`shrink-0 group cursor-pointer transition-all rounded-lg overflow-hidden border-2 ${
                  data.template === t.id
                    ? 'border-primary shadow-md scale-105'
                    : 'border-transparent hover:border-muted-foreground/30 hover:shadow-sm'
                }`}
              >
                <div className="w-28">
                  <img src={t.img} alt={t.label} className="w-full h-20 object-cover object-top" />
                  <div className={`text-center py-1 text-[10px] font-medium ${
                    data.template === t.id ? 'text-primary bg-primary/5' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {t.label}
                  </div>
                </div>
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

              {editSection === 'experience' && (
                <>
                  <div className="flex items-center justify-between">
                    <Label className="text-[11px] font-semibold">Experience</Label>
                    <Button size="sm" variant="outline" onClick={addExperience} className="h-7 text-[11px] gap-1">
                      <Plus size={12} /> Add
                    </Button>
                  </div>
                  {data.experience.map((exp: any) => (
                    <div key={exp.id} className="p-3 rounded-lg bg-secondary/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <Input value={exp.position} onChange={e => updateExperience(exp.id, { position: e.target.value })} placeholder="Position" className="h-7 text-xs flex-1" />
                        <button onClick={() => removeExperience(exp.id)} className="ml-2 text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
                      </div>
                      <Input value={exp.company} onChange={e => updateExperience(exp.id, { company: e.target.value })} placeholder="Company" className="h-7 text-xs" />
                      <Input value={exp.duration} onChange={e => updateExperience(exp.id, { duration: e.target.value })} placeholder="Duration" className="h-7 text-xs" />
                      <Textarea value={exp.description} onChange={e => updateExperience(exp.id, { description: e.target.value })} placeholder="Description" rows={2} className="text-xs" />
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
                  {data.education.map((edu: any) => (
                    <div key={edu.id} className="p-3 rounded-lg bg-secondary/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <Input value={edu.institution} onChange={e => updateEducation(edu.id, { institution: e.target.value })} placeholder="Institution" className="h-7 text-xs flex-1" />
                        <button onClick={() => removeEducation(edu.id)} className="ml-2 text-muted-foreground hover:text-destructive"><Trash2 size={12} /></button>
                      </div>
                      <Input value={edu.degree} onChange={e => updateEducation(edu.id, { degree: e.target.value })} placeholder="Degree" className="h-7 text-xs" />
                      <Input value={edu.year} onChange={e => updateEducation(edu.id, { year: e.target.value })} placeholder="Year" className="h-7 text-xs" />
                    </div>
                  ))}
                </>
              )}
            </div>
          </aside>
        )}

        {/* Live Template Preview */}
        <main className="flex-1 overflow-y-auto print:overflow-visible">
          <TemplateComp data={data} />
        </main>
      </div>
    </div>
  );
};

export default TemplateEditor;
