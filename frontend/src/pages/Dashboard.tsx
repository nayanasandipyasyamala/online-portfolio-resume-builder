import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { usePortfolio } from '@/lib/portfolio-context';
import {
  User, Briefcase, GraduationCap, FolderOpen, Palette, Globe,
  Plus, Trash2, LogOut, Eye, FileText, Settings, Sparkles,
} from 'lucide-react';

type Tab = 'profile' | 'projects' | 'experience' | 'education' | 'templates' | 'resume' | 'settings';

const Dashboard = () => {
  const { data, updateData, logout } = usePortfolio();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<Tab>(() => {
    const t = searchParams.get('tab');
    return (t && ['profile','projects','experience','education','templates','resume','settings'].includes(t)) ? t as Tab : 'profile';
  });
  const navigate = useNavigate();

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'templates', label: 'Portfolio Templates', icon: Palette },
    { id: 'resume', label: 'Resume Templates', icon: FileText },
  ];


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const generateBio = () => {
    const bioOptions = [
      // 1. Product-focused
      `Product-focused ${data.role} with expertise in ${data.skills.slice(0, 4).join(', ')}. I design scalable features and ship customer-ready products quickly.`,
      // 2. Leadership + impact
      `Seasoned ${data.role} driving cross-functional teams. I use ${data.skills.slice(0, 3).join(', ')} to create data-driven outcomes and high-quality user experiences.`,
      // 3. Creative/UX
      `Creative ${data.role} blending design and code. I build polished interfaces with ${data.skills.slice(0, 4).join(', ')} and focus on usability.`,
      // 4. Performance/system
      `Performance-oriented ${data.role} specializing in ${data.skills.slice(0, 4).join(', ')}. I optimize reliability, speed, and architecture at scale.`,
      // 5. Learning/mentorship
      `Curious ${data.role}, constantly learning new tools in ${data.skills.slice(0, 4).join(', ')}. I mentor teams and foster clean, maintainable engineering culture.`,
      // 6. Startup / builder
      `Startup builder ${data.role}, shipping rapid prototypes and full products with ${data.skills.slice(0, 4).join(', ')}. I love solving hard problems under tight deadlines.`,
    ];

    const pick = bioOptions[Math.floor(Math.random() * bioOptions.length)];
    updateData({ bio: pick });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Clipboard copy failed', err);
      return false;
    }
  };

  const handlePublish = async () => {
    const shouldPublish = !data.isPublished;
    updateData({ isPublished: shouldPublish });

    if (shouldPublish && data.username) {
      const link = `http://localhost:8080/portfolio/${data.username}`;
      const copied = await copyToClipboard(link);

      if (copied) {
        window.alert(`Published! Link copied to clipboard:\n${link}`);
      } else {
        window.alert(`Published! Copy this link manually:\n${link}`);
      }
    }
  };

  if (!data || !data.username) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="h-14 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container h-full flex items-center justify-between">
          <div className="text-lg font-semibold">Profile Center</div>
          <div className="flex items-center gap-2">
            
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  if (data.username) {
                    window.open(`/portfolio/${data.username}`, "_blank");
                  }
                }}
              >
                <Eye size={14} /> Preview
              </Button>
            
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5"
              onClick={handlePublish}
            >
              <Globe size={14} /> {data.isPublished ? 'Unpublish' : 'Publish'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={handleLogout}
            >
              <LogOut size={14} /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-52 shrink-0 hidden lg:block">
          <nav className="space-y-1 sticky top-20">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  tab === t.id ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <t.icon size={15} /> {t.label}
              </button>
            ))}
            {/* Settings button */}
            <button
              onClick={() => setTab('settings')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                tab === 'settings' ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <Settings size={15} /> Settings
            </button>
          </nav>
        </aside>

        {/* Mobile tabs */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 flex justify-around px-2 py-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] ${
                tab === t.id ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            {tab === 'profile' && <ProfileTab data={data} updateData={updateData} generateBio={generateBio} />}
            {tab === 'projects' && <ProjectsTab data={data} updateData={updateData} />}
            {tab === 'experience' && <ExperienceTab data={data} updateData={updateData} />}
            {tab === 'education' && <EducationTab data={data} updateData={updateData} />}
            {tab === 'templates' && <TemplatesTab data={data} updateData={updateData} />}
            {tab === 'resume' && <ResumeTemplatesTab />}
            {tab === 'settings' && <SettingsTab data={data} updateData={updateData} />}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

// --- Profile Tab ---
const ProfileTab = ({ data, updateData, generateBio }: any) => {
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updateData({ avatar: ev.target?.result as string });
    reader.readAsDataURL(file);
  };

  return (
  <div className="max-w-xl space-y-6">
    <div>
      <h2 className="text-xl font-serif mb-1">Profile</h2>
      <p className="text-xs text-muted-foreground">Your public information.</p>
    </div>
    <div className="space-y-4">
      {/* Avatar upload */}
      <div className="space-y-1.5">
        <Label className="text-xs">Profile Photo</Label>
        <div className="flex items-center gap-4">
          {data.avatar ? (
            <img src={data.avatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover border border-border" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center border border-border">
              <User size={24} className="text-muted-foreground" />
            </div>
          )}
          <div>
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-secondary hover:bg-secondary/80 transition-colors border border-border">
              Upload Photo
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
            {data.avatar && (
              <button onClick={() => updateData({ avatar: '' })} className="ml-2 text-[10px] text-muted-foreground hover:text-destructive">
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs">Full Name</Label>
          <Input value={data.name} onChange={e => updateData({ name: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Username</Label>
          <Input value={data.username} onChange={e => updateData({ username: e.target.value })} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Role / Title</Label>
        <Input value={data.role} onChange={e => updateData({ role: e.target.value })} placeholder="Full-Stack Developer" />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Bio</Label>
          <button onClick={generateBio} className="flex items-center gap-1 text-[10px] text-accent hover:underline">
            <Sparkles size={12} /> AI Generate
          </button>
        </div>
        <Textarea value={data.bio} onChange={e => updateData({ bio: e.target.value })} rows={3} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Skills (comma separated)</Label>
        <Input
          value={data.skills.join(', ')}
          onChange={e => updateData({ skills: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) })}
        />
      </div>
      <div className="space-y-3">
        <Label className="text-xs">Social Links</Label>
        <Input placeholder="GitHub URL" value={data.socialLinks.github || ''} onChange={e => updateData({ socialLinks: { ...data.socialLinks, github: e.target.value } })} />
        <Input placeholder="LinkedIn URL" value={data.socialLinks.linkedin || ''} onChange={e => updateData({ socialLinks: { ...data.socialLinks, linkedin: e.target.value } })} />
        <Input placeholder="Twitter URL" value={data.socialLinks.twitter || ''} onChange={e => updateData({ socialLinks: { ...data.socialLinks, twitter: e.target.value } })} />
      </div>
    </div>
  </div>
  );
};

// --- Projects Tab ---
const ProjectsTab = ({ data, updateData }: any) => {
  const addProject = () => {
    updateData({
      projects: [...data.projects, { id: Date.now().toString(), title: '', description: '', techStack: [], link: '', github: '' }],
    });
  };
  const removeProject = (id: string) => {
    updateData({ projects: data.projects.filter((p: any) => p.id !== id) });
  };
  const updateProject = (id: string, updates: any) => {
    updateData({ projects: data.projects.map((p: any) => (p.id === id ? { ...p, ...updates } : p)) });
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif mb-1">Projects</h2>
          <p className="text-xs text-muted-foreground">Showcase your best work.</p>
        </div>
        <Button size="sm" variant="outline" onClick={addProject} className="gap-1"><Plus size={14} /> Add</Button>
      </div>
      <div className="space-y-4">
        {data.projects.map((p: any) => (
          <div key={p.id} className="p-4 rounded-xl shadow-card space-y-3 bg-card">
            <div className="flex items-start justify-between">
              <Input value={p.title} onChange={e => updateProject(p.id, { title: e.target.value })} placeholder="Project title" className="font-medium" />
              <button onClick={() => removeProject(p.id)} className="p-1.5 text-muted-foreground hover:text-destructive ml-2 shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
            <Textarea value={p.description} onChange={e => updateProject(p.id, { description: e.target.value })} placeholder="Brief description..." rows={2} />
            <Input value={p.techStack?.join(', ') || ''} onChange={e => updateProject(p.id, { techStack: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean) })} placeholder="Tech stack (comma separated)" className="text-xs font-mono" />
            <div className="grid grid-cols-2 gap-3">
              <Input value={p.link || ''} onChange={e => updateProject(p.id, { link: e.target.value })} placeholder="Live URL" className="text-xs" />
              <Input value={p.github || ''} onChange={e => updateProject(p.id, { github: e.target.value })} placeholder="GitHub URL" className="text-xs" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Experience Tab ---
const ExperienceTab = ({ data, updateData }: any) => {
  const add = () => updateData({ experience: [...data.experience, { id: Date.now().toString(), company: '', position: '', duration: '', description: '' }] });
  const remove = (id: string) => updateData({ experience: data.experience.filter((e: any) => e.id !== id) });
  const update = (id: string, updates: any) => updateData({ experience: data.experience.map((e: any) => (e.id === id ? { ...e, ...updates } : e)) });

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif mb-1">Experience</h2>
          <p className="text-xs text-muted-foreground">Your professional journey.</p>
        </div>
        <Button size="sm" variant="outline" onClick={add} className="gap-1"><Plus size={14} /> Add</Button>
      </div>
      {data.experience.map((exp: any) => (
        <div key={exp.id} className="p-4 rounded-xl shadow-card space-y-3 bg-card">
          <div className="flex items-start justify-between">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <Input value={exp.position} onChange={e => update(exp.id, { position: e.target.value })} placeholder="Position" />
              <Input value={exp.company} onChange={e => update(exp.id, { company: e.target.value })} placeholder="Company" />
            </div>
            <button onClick={() => remove(exp.id)} className="p-1.5 text-muted-foreground hover:text-destructive ml-2"><Trash2 size={14} /></button>
          </div>
          <Input value={exp.duration} onChange={e => update(exp.id, { duration: e.target.value })} placeholder="2022 – Present" className="text-xs" />
          <Textarea value={exp.description} onChange={e => update(exp.id, { description: e.target.value })} placeholder="Description..." rows={2} />
        </div>
      ))}
    </div>
  );
};

// --- Education Tab ---
const EducationTab = ({ data, updateData }: any) => {
  const add = () => updateData({ education: [...data.education, { id: Date.now().toString(), institution: '', degree: '', year: '' }] });
  const remove = (id: string) => updateData({ education: data.education.filter((e: any) => e.id !== id) });
  const update = (id: string, updates: any) => updateData({ education: data.education.map((e: any) => (e.id === id ? { ...e, ...updates } : e)) });

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif mb-1">Education</h2>
          <p className="text-xs text-muted-foreground">Your academic background.</p>
        </div>
        <Button size="sm" variant="outline" onClick={add} className="gap-1"><Plus size={14} /> Add</Button>
      </div>
      {data.education.map((edu: any) => (
        <div key={edu.id} className="p-4 rounded-xl shadow-card space-y-3 bg-card">
          <div className="flex items-start justify-between">
            <Input value={edu.institution} onChange={e => update(edu.id, { institution: e.target.value })} placeholder="Institution" className="flex-1" />
            <button onClick={() => remove(edu.id)} className="p-1.5 text-muted-foreground hover:text-destructive ml-2"><Trash2 size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input value={edu.degree} onChange={e => update(edu.id, { degree: e.target.value })} placeholder="Degree" />
            <Input value={edu.year} onChange={e => update(edu.id, { year: e.target.value })} placeholder="Year" />
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Templates Tab ---
import templateMinimal from '@/assets/template-minimal.jpg';
import templateCreative from '@/assets/template-creative.jpg';
import templateCorporate from '@/assets/template-corporate.jpg';
import templateStudent from '@/assets/template-student.jpg';
import templateOnepage from '@/assets/template-onepage.jpg';
import templateDarkMinimal from '@/assets/template-dark-minimal.jpg';
import templateDevBlog from '@/assets/template-dev-blog.jpg';

const TemplatesTab = ({ data, updateData }: any) => {
  const navigate = useNavigate();
  const portfolioTemplates: { id: string; name: string; desc: string; img: string }[] = [
    { id: 'minimal', name: 'Minimal Developer', desc: 'Clean, typography-focused layout for developers.', img: templateMinimal },
    { id: 'creative', name: 'Creative Designer', desc: 'Bold, colorful layout with large project showcases.', img: templateCreative },
    { id: 'corporate', name: 'Professional Corporate', desc: 'Formal, structured layout for corporate roles.', img: templateCorporate },
    { id: 'student', name: 'Student Portfolio', desc: 'Fresh, approachable design for students.', img: templateStudent },
    { id: 'one-page', name: 'One-page Scroll', desc: 'Smooth single-page scrolling experience.', img: templateOnepage },
    { id: 'dark-minimal', name: 'Dark Minimal', desc: 'Sleek dark theme with blue accents.', img: templateDarkMinimal },
    { id: 'dev-blog', name: 'Developer Blog', desc: 'Terminal-inspired layout with code aesthetics.', img: templateDevBlog },
    { id: 'elegant-serif', name: 'Elegant Serif', desc: 'Sophisticated editorial design with serif typography.', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=640&h=480&fit=crop' },
    { id: 'minimalist-grid', name: 'Minimalist Grid', desc: 'Clean grid-based layout for maximum clarity.', img: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=640&h=480&fit=crop' },
  ];

  const handleSelectPortfolio = (id: string) => {
    updateData({ template: id });
    navigate('/editor');
  };

  const handleSelectResume = (id: string) => {
    navigate('/resume-editor', { state: { resumeStyle: id } });
  };

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h2 className="text-xl font-serif mb-1">Portfolio Templates</h2>
        <p className="text-xs text-muted-foreground">Click a template to select it and open the editor.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {portfolioTemplates.map(t => (
          <button
            key={t.id}
            onClick={() => handleSelectPortfolio(t.id)}
            className={`p-4 rounded-xl text-left transition-all duration-200 cursor-pointer group ${
              data.template === t.id
                ? 'shadow-card-hover ring-2 ring-accent bg-card'
                : 'shadow-card bg-card hover:shadow-card-hover hover:ring-1 hover:ring-border'
            }`}
          >
            <div className="aspect-[4/3] rounded-lg bg-secondary mb-3 overflow-hidden">
              <img src={t.img} alt={t.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="text-sm font-medium">{t.name}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">{t.desc}</p>
          </button>
        ))}
      </div>

    </div>
  );
};

const ResumeTemplatesTab = () => {
  const navigate = useNavigate();

  const resumeTemplates: { id: string; label: string; desc: string }[] = [
    { id: 'ats', label: 'ATS-Friendly', desc: 'Clean and scanner-safe.' },
    { id: 'modern', label: 'Modern', desc: 'Balanced two-column layout.' },
    { id: 'developer', label: 'Developer', desc: 'Code-inspired technical resume.' },
    { id: 'executive', label: 'Executive', desc: 'Polished leadership-focused format.' },
    { id: 'minimal-serif', label: 'Minimal Serif', desc: 'Elegant editorial presentation.' },
    { id: 'split-timeline', label: 'Split Timeline', desc: 'Strong chronological story.' },
    { id: 'sidebar-bold', label: 'Sidebar Bold', desc: 'High-contrast recruiter-friendly card.' },
    { id: 'compact-cards', label: 'Compact Cards', desc: 'Dense layout for more information.' },
  ];

  const handleSelect = (id: string) => {
    navigate('/resume-editor', { state: { resumeStyle: id } });
  };

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h2 className="text-xl font-serif mb-1">Resume Templates</h2>
        <p className="text-xs text-muted-foreground">Choose a resume template and open the editor directly.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resumeTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleSelect(template.id)}
            className="rounded-3xl border border-border bg-card p-6 text-left shadow-card transition hover:border-accent hover:shadow-card-hover"
          >
            <div className="text-base font-semibold text-foreground">{template.label}</div>
            <p className="mt-3 text-sm text-muted-foreground">{template.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Settings Tab ---
const SettingsTab = ({ data, updateData }: any) => (
  <div className="max-w-xl space-y-6">
    <div>
      <h2 className="text-xl font-serif mb-1">Settings</h2>
      <p className="text-xs text-muted-foreground">Configure publishing and redirect options.</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label className="text-xs">Portfolio URL</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">/portfolio/</span>
          <Input value={data.username} onChange={e => updateData({ username: e.target.value })} className="font-mono text-sm" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Redirect URL (optional)</Label>
        <Input
          value={data.settings.redirectUrl || ''}
          onChange={e => updateData({ settings: { ...data.settings, redirectUrl: e.target.value } })}
          placeholder="https://linkedin.com/in/username"
          className="text-sm"
        />
        <p className="text-[10px] text-muted-foreground">If set, visitors can be redirected to this URL.</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
