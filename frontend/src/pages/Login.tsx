import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePortfolio } from '@/lib/portfolio-context';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, signup } = usePortfolio();
  const navigate = useNavigate();
  const location = useLocation();

  const isRegister = location.pathname === '/signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    try {
      if (isRegister) {
        if (!name.trim()) {
          setError('Please enter your name.');
          setSubmitting(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters.');
          setSubmitting(false);
          return;
        }
        await signup(name.trim(), email.trim(), password);
        toast.success('Account created! Welcome to Portfol.io');
      } else {
        await login(email.trim(), password);
        toast.success('Welcome back!');
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={14} /> Back
        </Link>

        <div className="mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mb-4">
            <span className="text-primary-foreground text-sm font-bold font-mono">P</span>
          </div>
          <h1 className="text-2xl font-serif tracking-tight mb-1">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isRegister ? 'Start building your portfolio.' : 'Log in to your portfolio dashboard.'}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 p-3 mb-4 rounded-lg bg-destructive/10 text-destructive text-xs"
          >
            <AlertCircle size={14} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs">Full Name</Label>
              <Input id="name" value={name} onChange={e => { setName(e.target.value); setError(''); }} placeholder="Alex Chen" />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="alex@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} placeholder="••••••••" />
            {isRegister && <p className="text-[10px] text-muted-foreground">Must be at least 6 characters</p>}
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Please wait...' : isRegister ? 'Create Account' : 'Log In'}
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => navigate(isRegister ? '/login' : '/signup')} className="text-accent hover:underline">
            {isRegister ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
