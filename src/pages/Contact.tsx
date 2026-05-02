import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from '../components/SplitText';

const Tree: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  const treeRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    if (treeRef.current) {
      gsap.fromTo(treeRef.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.75)' }
      );
    }
  }, []);

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g ref={treeRef}>
        {/* Realistic Tapered Trunk */}
        <path d="M-2 0 Q-2 -10 0 -15 Q2 -10 2 0 Z" fill="#4e342e" />
        <path d="M0 -8 L-5 -12 M1 -10 L4 -14" stroke="#3e2723" strokeWidth="1" strokeLinecap="round" />
        
        {/* Organic Layered Foliage */}
        <g transform="translate(0, -15)">
          <path d="M-12 0 Q-15 -15 0 -25 Q15 -15 12 0 Q0 5 -12 0" fill="#1b5e20" />
          <path d="M-8 -5 Q-12 -18 2 -22 Q12 -18 8 -5 Z" fill="#2e7d32" opacity="0.8" />
          <path d="M-4 -10 Q-6 -20 4 -20 Q10 -15 6 -10 Z" fill="#43a047" opacity="0.6" />
          <circle cx="2" cy="-18" r="4" fill="#aed581" opacity="0.4" />
        </g>
      </g>
    </g>
  );
};

const EarthMascot: React.FC<{ value: number }> = ({ value }) => {
  const getMessage = () => {
    if (value === 0) return "Is it getting hot in here? ☀️";
    if (value < 20) return "Ooh, a little shade! Thank you! 🌱";
    if (value < 50) return "The air is feeling crispy and fresh! 🌬️";
    if (value < 80) return "I'm breathing again! You're a legend! 🌍";
    return "WE DID IT! I feel like a brand new planet! ❤️✨";
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '-20px',
      left: '-40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      zIndex: 10
    }}>
      <div style={{
        background: 'white',
        padding: '0.75rem 1.25rem',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#1a3c34',
        position: 'relative',
        maxWidth: '200px',
        textAlign: 'center',
        border: '2px solid #e5e7eb'
      }}>
        {getMessage()}
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          right: '20px',
          width: '0',
          height: '0',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid #e5e7eb'
        }} />
      </div>
      <div style={{ 
        fontSize: '4rem', 
        animation: 'bounce mascot-bounce 3s infinite ease-in-out'
      }}>
        {value > 70 ? '🌍🥰' : value > 30 ? '🌍😊' : '🌍🥵'}
      </div>
      <style>{`
        @keyframes mascot-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

const ContactPage: React.FC = () => {
  const [impactValue, setImpactValue] = useState(0);
  const [formType, setFormType] = useState<'pilot' | 'inspection' | 'complaint'>('pilot');
  const labelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (labelRef.current) {
      gsap.to(labelRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  });

  const treesCount = Math.floor(impactValue * 10); 
  const carbonOffset = (treesCount * 0.021).toFixed(1); 
  const hectareRestored = (treesCount / 1000).toFixed(1);

  const products = ["SIRA", "PureDrp", "CleanCycle", "KEMETRA"];

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === 'pilot') {
      setSubmissionMessage("Thank you for your interest! Currently, there isn't stock yet for the selected product. We will notify you once it's available.");
    } else {
      setSubmissionMessage("Your request has been successfully submitted! Our engineering team will review it and get back to you shortly.");
    }
    setIsSubmitted(true);
  };

  const renderForm = () => {
    if (isSubmitted) {
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }} className="animate-fade-in">
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
            {formType === 'pilot' ? '📦' : '✅'}
          </div>
          <p style={{ fontSize: '1.2rem', color: '#1a3c34', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            {submissionMessage}
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="btn-outline-nav"
            style={{ padding: '0.8rem 2rem', borderRadius: '100px', borderColor: '#1a3c34', color: '#1a3c34' }}
          >
            Go Back
          </button>
        </div>
      );
    }

    switch(formType) {
      case 'pilot':
        return (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="input-group">
                <label>Target Product</label>
                <select style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', border: '1px solid #e5e7eb', outline: 'none', background: 'white', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%231a3c34%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.5rem center', cursor: 'pointer' }}>
                  {products.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="input-group">
                <label>Contact Number</label>
                <input type="tel" placeholder="+20 123 456 7890" required />
              </div>
            </div>
            <div className="input-group">
              <label>Message</label>
              <textarea placeholder="Tell us about your project goals..." style={{ minHeight: '120px' }} required />
            </div>
            <button type="submit" className="btn-get-started btn-roll" style={{ background: 'var(--primary-green)', color: '#1a3c34', height: '72px', borderRadius: '100px', width: '100%' }}>
              <div className="roll-text" style={{ height: '72px' }}>
                <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Request Pilot</span>
                <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Request Pilot</span>
              </div>
            </button>
          </form>
        );
      case 'inspection':
        return (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="input-group">
                <label>Contact Number</label>
                <input type="tel" placeholder="+20 123 456 7890" required />
              </div>
            </div>
            <button type="submit" className="btn-get-started btn-roll" style={{ background: 'var(--primary-green)', color: '#1a3c34', height: '72px', borderRadius: '100px', width: '100%' }}>
              <div className="roll-text" style={{ height: '72px' }}>
                <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Request Inspection</span>
                <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Request Inspection</span>
              </div>
            </button>
          </form>
        );
      case 'complaint':
        return (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} className="animate-fade-in">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required />
            </div>
            <div className="input-group">
              <label>Description of the problem</label>
              <textarea placeholder="Please describe the issue in detail..." style={{ minHeight: '150px' }} required />
            </div>
            <button type="submit" className="btn-get-started btn-roll" style={{ background: '#ef4444', color: 'white', height: '72px', borderRadius: '100px', width: '100%' }}>
              <div className="roll-text" style={{ height: '72px' }}>
                <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Submit Complaint</span>
                <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Submit Complaint</span>
              </div>
            </button>
          </form>
        );
    }
  };

  return (
    <div className="contact-page" style={{ position: 'relative', minHeight: '100vh', background: '#f8fbf8', paddingTop: '160px', paddingBottom: '120px' }}>
      <main className="container">
        {/* --- Hero Section --- */}
        <section style={{ maxWidth: '900px', margin: '0 auto 6rem auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', color: '#1a3c34', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.03em' }}>
            <SplitText 
              text="Get in touch"
              delay={60}
              from={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
              to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            />
          </h1>
          <p style={{ fontSize: '1.4rem', color: '#1a3c34', opacity: 0.7, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
            <SplitText 
              text="Choose how you'd like to collaborate with us. Our specialized forms ensure your request reaches the right engineering team."
              delay={30}
            />
          </p>
        </section>

        {/* --- Impact Calculator Section --- */}
        <section style={{ 
          maxWidth: '1200px', 
          margin: '0 auto 10rem auto', 
          display: 'grid', 
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', 
          gap: '6rem',
          alignItems: 'center'
        }}>
          {/* Left: Calculation UI */}
          <div style={{ 
            background: 'white', 
            borderRadius: '48px', 
            padding: '5rem 4rem', 
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 950, color: '#1a3c34', marginBottom: '1.5rem', lineHeight: 1, letterSpacing: '-0.02em' }}>
              Want to start<br />planting trees?
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#6b7280', lineHeight: 1.7, marginBottom: '4rem' }}>
              Meaningful climate action has never been so easy. Adjust the slider to see your potential impact.
            </p>

            <div style={{ marginBottom: '4rem' }}>
              <div style={{ position: 'relative', width: '100%', height: '40px', display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'absolute', width: '100%', height: '12px', background: '#f3f4f6', borderRadius: '10px' }} />
                <div style={{ 
                  position: 'absolute', 
                  width: `${impactValue}%`, 
                  height: '12px', 
                  background: 'linear-gradient(to right, var(--primary-green), #bef264)', 
                  borderRadius: '10px',
                  transition: 'width 0.1s ease-out'
                }} />
                
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={impactValue} 
                  onChange={(e) => setImpactValue(parseInt(e.target.value))}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    appearance: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    zIndex: 2,
                    margin: 0
                  }}
                  className="impact-slider"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', borderTop: '2px solid #f9fafb', paddingTop: '3rem' }}>
              <div>
                <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1a3c34', margin: 0 }}>{treesCount}k</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trees</p>
              </div>
              <div>
                <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1a3c34', margin: 0 }}>{carbonOffset}k</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>tCO2</p>
              </div>
              <div>
                <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1a3c34', margin: 0 }}>{hectareRestored}k</p>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hectare</p>
              </div>
            </div>
          </div>

          {/* Right: Visual Plate */}
          <div style={{ position: 'relative' }}>
            <EarthMascot value={impactValue} />
            <svg viewBox="0 0 800 600" style={{ width: '100%', height: 'auto' }}>
              <path d="M50 250 L50 300 L400 500 L400 450 Z" fill="#5d4037" />
              <path d="M400 450 L400 500 L750 300 L750 250 Z" fill="#3e2723" />
              <path d="M400 100 L750 250 L400 450 L50 250 Z" fill="#43a047" stroke="#2e7d32" strokeWidth="2" />
              <path d="M400 110 L740 250 L400 440 L60 250 Z" fill="#4caf50" opacity="0.4" />
              <path d="M350 320 Q450 350 550 400 L650 350 Q550 300 450 280 Z" fill="#00bcd4" opacity="0.9" />
              
              {Array.from({ length: 20 }).map((_, i) => {
                const threshold = (i / 20) * 100;
                if (impactValue < threshold) return null;
                const cols = 5;
                const u = i % cols;
                const v = Math.floor(i / cols);
                const x = 400 + (u - 2) * 65 + (v - 1.5) * -65;
                const y = 220 + (u - 2) * 32 + (v - 1.5) * 32;
                return <Tree key={i} x={x} y={y} />;
              })}
            </svg>
          </div>
        </section>

        {/* --- Dynamic Contact Form System --- */}
        <section style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Form Type Selector */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginBottom: '4rem',
            background: 'white',
            padding: '0.75rem',
            borderRadius: '100px',
            width: 'fit-content',
            margin: '0 auto 5rem auto',
            border: '1.5px solid #f3f4f6'
          }}>
            {[
              { id: 'pilot', label: 'Request a Pilot' },
              { id: 'inspection', label: 'Request Inspection' },
              { id: 'complaint', label: 'Complaint' }
            ].map((option) => (
              <button 
                key={option.id}
                onClick={() => setFormType(option.id as any)}
                style={{
                  padding: '1rem 2.5rem',
                  borderRadius: '100px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: formType === option.id ? 'var(--dark-green)' : 'transparent',
                  color: formType === option.id ? 'white' : 'var(--text-light)'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Form Container */}
          <div style={{ 
            background: 'white', 
            padding: '5rem', 
            borderRadius: '48px', 
            position: 'relative',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 850, color: '#1a3c34', marginBottom: '3.5rem', letterSpacing: '-0.02em', textAlign: 'center' }}>
              {formType === 'pilot' ? 'Pilot Inquiries' : formType === 'inspection' ? 'Inspection Booking' : 'Lodge a Complaint'}
            </h3>
            {renderForm()}
          </div>
        </section>
      </main>

      <style>{`
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .input-group label {
          font-size: 0.95rem;
          fontWeight: 800;
          color: #1a3c34;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .input-group input, .input-group textarea {
          padding: 1.25rem;
          border-radius: 16px;
          border: 1.5px solid #f3f4f6;
          outline: none;
          background: #f9fafb;
          font-size: 1.05rem;
          transition: all 0.3s ease;
        }
        .input-group input:focus, .input-group textarea:focus {
          border-color: var(--primary-green);
          background: white;
          box-shadow: 0 0 0 4px rgba(163, 230, 53, 0.1);
        }
        .impact-slider::-webkit-slider-thumb {
          appearance: none;
          width: 44px;
          height: 44px;
          background: white;
          border: 8px solid var(--primary-green);
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
