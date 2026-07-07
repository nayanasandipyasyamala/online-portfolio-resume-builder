import { motion } from 'framer-motion';
import { ArrowRight, Layers, Palette, FileText, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import templateMinimal from '@/assets/template-minimal.jpg';
import templateCreative from '@/assets/template-creative.jpg';
import templateCorporate from '@/assets/template-corporate.jpg';
import templateStudent from '@/assets/template-student.jpg';
import templateOnepage from '@/assets/template-onepage.jpg';

const features = [
  { icon: Palette, title: 'Beautiful Templates', desc: '5 handcrafted portfolio templates for every role and style.' },
  { icon: FileText, title: 'Resume Builder', desc: 'Generate ATS-friendly resumes from your portfolio data instantly.' },
  { icon: Globe, title: 'One-click Publish', desc: 'Get a live portfolio URL and share it with the world.' },
  { icon: Sparkles, title: 'AI-Powered Bio', desc: 'Auto-generate professional bios from your skills and role.' },
  { icon: Layers, title: 'Live Preview', desc: 'See changes in real-time as you build your portfolio.' },
  { icon: ArrowRight, title: 'Smart Redirects', desc: 'Route visitors to your portfolio, LinkedIn, or any URL.' },
];

const Index = () => {
  const templates = [
    { name: 'Minimal', img: templateMinimal },
    { name: 'Creative', img: templateCreative },
    { name: 'Corporate', img: templateCorporate },
    { name: 'Student', img: templateStudent },
    { name: 'One-page', img: templateOnepage },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <div className="text-lg font-semibold">
            <Link to="/" className="hover:underline">
              Profile Center
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-mono text-muted-foreground mb-6">
              Build · Preview · Publish
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight tracking-tight mb-6">
              Your work, presented
              <br />
              <span className="text-accent">with intent.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              A portfolio engine for developers, designers, and students. 
              Choose a template, fill your data, publish in minutes.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/login">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                  Start Building <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/portfolio/ravikumar">
                <Button size="lg" variant="outline">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-secondary/50">
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-serif tracking-tight mb-3">Everything you need</h2>
            <p className="text-muted-foreground">No CMS, no complexity. Just a polished portfolio.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-5 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-shadow duration-200"
              >
                <f.icon size={20} className="text-accent mb-3" />
                <h3 className="text-sm font-semibold font-sans mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 px-6">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-serif tracking-tight mb-3">5 unique templates</h2>
          <p className="text-muted-foreground mb-10">Each one handcrafted, responsive, and ready to customize.</p>
          <div className="grid grid-cols-5 gap-3">
            {templates.map((template, i) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="aspect-[3/4] rounded-lg bg-secondary overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200 cursor-pointer"
              >
                <img src={template.img} alt={template.name} className="w-full h-full object-cover" />
                <div className="p-3 bg-background/80 text-sm font-medium">{template.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-primary">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-serif tracking-tight text-primary-foreground mb-4">
            Ready to stand out?
          </h2>
          <p className="text-primary-foreground/70 mb-8">
            Join thousands of professionals who present their work with intention.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
              Create Your Portfolio <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2026 Portfol.io</span>
          <span className="font-mono">Built with intent.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
