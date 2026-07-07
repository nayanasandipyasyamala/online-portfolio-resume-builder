import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

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

const resumeTemplates: { id: ResumeStyle; label: string; blurb: string }[] = [
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

const ResumePage = () => {
  const navigate = useNavigate();

  const handleSelect = (id: ResumeStyle) => {
    navigate('/resume-editor', { state: { resumeStyle: id } });
  };

  return (
    <div className="min-h-screen bg-secondary/50">
      <div className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md print:hidden">
        <div className="container flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Link to="/dashboard?tab=templates" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft size={14} /> Portfolio Templates
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">Choose a resume template, then continue to the editor.</div>
        </div>
      </div>

      <div className="container py-8">
        <div className="mb-5 print:hidden">
          <h1 className="text-2xl font-serif">Resume Templates</h1>
          <p className="text-sm text-muted-foreground">Select one of the eight resume styles below to open the editor.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block rounded-3xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-semibold">Pick a resume style</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Click any template below and it will open the editor with that resume style selected.
              This desktop-only panel keeps the selection clear and easy.
            </p>
          </aside>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {resumeTemplates.slice(0, 8).map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelect(template.id)}
                className="group flex h-full flex-col justify-between rounded-[32px] border border-border bg-card p-6 text-left shadow-card transition hover:border-accent hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <div>
                  <div className="text-lg font-semibold text-foreground">{template.label}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{template.blurb}</p>
                </div>
                <span className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition group-hover:border-accent group-hover:bg-accent/5">
                  Select
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const getContactItems = (data: any) =>
  [data.email, data.socialLinks.github, data.socialLinks.linkedin, data.socialLinks.twitter].filter(Boolean);

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

export default ResumePage;