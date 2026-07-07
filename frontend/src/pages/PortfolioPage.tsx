
import { useParams, Link } from 'react-router-dom';
import { usePortfolio, TemplateName, PortfolioData } from '@/lib/portfolio-context';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import MinimalTemplate from '@/templates/Minimal';
import CreativeTemplate from '@/templates/Creative';
import CorporateTemplate from '@/templates/Corporate';
import StudentTemplate from '@/templates/Student';
import OnePageTemplate from '@/templates/OnePage';
import DarkMinimalTemplate from '@/templates/DarkMinimal';
import DevBlogTemplate from '@/templates/DevBlog';
import ResumeStyleTemplate from '@/templates/ResumeStyle';

const templateMap: Record<TemplateName, React.FC<{ data: any }>> = {
  minimal: MinimalTemplate,
  creative: CreativeTemplate,
  corporate: CorporateTemplate,
  student: StudentTemplate,
  'one-page': OnePageTemplate,
  'dark-minimal': DarkMinimalTemplate,
  'dev-blog': DevBlogTemplate,
  'resume-style': ResumeStyleTemplate,
};

const PortfolioPage = () => {
  const { username } = useParams();
  const { data: contextData } = usePortfolio();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    // Fetch public portfolio by username
    api.getPublicPortfolio(username)
      .then(data => {
        setPortfolioData(data);
      })
      .catch(err => {
        console.error('Failed to fetch portfolio:', err);
        setError(err.message || 'Portfolio not found');
      })
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-2">Portfolio not found</h1>
          <p className="text-sm text-muted-foreground mb-4">No portfolio exists for "{username}"</p>
          <Link to="/" className="text-accent text-sm hover:underline">Go home</Link>
        </div>
      </div>
    );
  }

  // Handle redirect
  if (portfolioData.settings.redirectUrl && portfolioData.isPublished) {
    // Show redirect option
  }

  const Template = templateMap[portfolioData.template] || MinimalTemplate;

  return <Template data={portfolioData} />;
};

export default PortfolioPage;
