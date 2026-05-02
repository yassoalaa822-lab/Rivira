import React, { useEffect, useContext } from 'react';
import { TransitionContext } from '../App';
import SplitText from '../components/SplitText';

interface Article {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: 1,
    category: "Carbon Technology",
    date: "March 12, 2025",
    title: "AI-Driven MOFs: A New Frontier in Carbon Sequestration",
    excerpt: "Researchers have successfully deployed AI-designed Metal-Organic Frameworks (MOFs) that capture CO2 with 40% higher efficiency than previous methods, marking a pivotal shift in direct air capture viability.",
    image: "/carbon-sequestration.png",
    readTime: "6 min read"
  },
  {
    id: 2,
    category: "Renewable Energy",
    date: "February 28, 2025",
    title: "Perovskite Breakthrough: Solar Efficiency Hits Record 34%",
    excerpt: "The latest tandem silicon-perovskite cells have surpassed the theoretical limits of traditional panels, promising a future of cheaper, ultra-efficient energy production for urban infrastructure.",
    image: "https://elitebusinessmagazine.co.uk/wp-content/uploads/2023/11/Pioneering-sustainability.webp",
    readTime: "5 min read"
  },
  {
    id: 3,
    category: "Water Innovation",
    date: "January 15, 2025",
    title: "Smart Membranes: AI and IoT Revolutionize Water Recycling",
    excerpt: "New graphene-based smart membranes are now using real-time IoT sensors to adapt filtration density based on water turbidity, drastically reducing energy consumption in wastewater treatment.",
    image: "https://www.twi-global.com/CachedImage.axd?ImageName=What-is-Sustainability.jpg&ImageWidth=784&ImageHeight=379&ImageVersionID=102110&ImageModified=20201029133929",
    readTime: "7 min read"
  }
];

const BlogCard: React.FC<{ article: Article }> = ({ article }) => {
  const { navigateTo } = useContext(TransitionContext);

  return (
    <div 
      style={{
        background: 'white',
        borderRadius: '32px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        opacity: 1 // Ensure full visibility
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.borderColor = 'var(--primary-green)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
      }}
      onClick={() => navigateTo(`/contact`)}
    >
      <div style={{ width: '100%', height: '260px', overflow: 'hidden' }}>
        <img 
          src={article.image} 
          alt={article.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} 
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <span style={{ 
            background: 'rgba(163, 230, 53, 0.1)', 
            color: '#1a3c34', 
            padding: '0.4rem 1rem', 
            borderRadius: '100px', 
            fontSize: '0.85rem', 
            fontWeight: 700 
          }}>
            {article.category}
          </span>
          <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{article.date}</span>
        </div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a3c34', marginBottom: '1.2rem', lineHeight: 1.3 }}>
          {article.title}
        </h3>
        <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
          {article.excerpt}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1a3c34', fontWeight: 700, fontSize: '0.9rem', marginTop: 'auto' }}>
          <span>{article.readTime}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const Blog: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="blog-page" style={{ position: 'relative', minHeight: '100vh', background: '#f8fbf8', paddingTop: '160px', paddingBottom: '120px' }}>
      <main className="container">
        <section style={{ maxWidth: '800px', margin: '0 auto 6rem auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', color: '#1a3c34', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.03em' }}>
            <SplitText 
              text="Latest Insights"
              delay={60}
              from={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
              to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            />
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#1a3c34', opacity: 0.7, lineHeight: 1.6 }}>
            <SplitText 
              text="Stay informed on the cutting edge of sustainability, 4IR technology, and global restoration milestones."
              delay={30}
            />
          </p>
        </section>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
          gap: '3rem' 
        }}>
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;
