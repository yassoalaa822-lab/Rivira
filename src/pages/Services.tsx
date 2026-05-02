import React, { useState } from 'react';
import { TransitionContext } from '../App';
import SplitText from '../components/SplitText';

const ServicesPage: React.FC = () => {
  const { navigateTo } = React.useContext(TransitionContext);
  const [serial, setSerial] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 'p1',
      title: 'PureDrp',
      desc: 'A feedback-loop purification system designed for wastewater reuse in Egyptian irrigation using nanofiltration and natural adsorbents.',
      image: '/PureDrp.jpeg',
    },
    {
      id: 'p2',
      title: 'CleanCycle',
      desc: 'Eco-friendly water purification system utilizing three natural filtration stages governed by an ESP32 microcontroller for automated recycling.',
      image: '/cleancycle.png',
    },
    {
      id: 'p3',
      title: 'KEMETRA',
      desc: 'Green hydrogen project optimizing alkaline electrolysis by mitigating gas bubble buildup through air-injection and staggered electrode design.',
      image: '/kemetra.jpeg',
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="services-page" style={{ position: 'relative', minHeight: '100vh', background: '#f8faf9', paddingTop: '160px', paddingBottom: '120px', overflowX: 'hidden' }}>
      <main className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* --- Header --- */}
        <section style={{ maxWidth: '900px', margin: '0 auto 6rem auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(163, 230, 53, 0.1)', color: '#1a3c34', padding: '0.4rem 1.4rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2rem', border: '1px solid rgba(0,0,0,0.05)' }}>
            Technology Portfolio
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', color: '#1a3c34', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            <SplitText 
              text="Future-Proof Ecosystems"
              delay={50}
              from={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
              to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            />
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#1a3c34', opacity: 0.6, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
            <SplitText 
              text="Discover our suite of hardware-software integrations designed for precision environmental management and restoration."
              delay={30}
            />
          </p>
        </section>

        {/* --- Section 1: Flagship (SIRA) --- */}
        <section style={{ marginBottom: '8rem' }}>
          <div style={{
            background: 'white',
            borderRadius: '40px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid #eef2f0',
            boxShadow: '0 40px 100px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: '650px' }}>
              <div style={{ padding: '5rem 4rem', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-green)' }} />
                  <span style={{ color: '#1a3c34', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em' }}>SYSTEMS // FLAGSHIP</span>
                </div>

                <h2 style={{ fontSize: '4.5rem', color: '#1a3c34', fontWeight: 950, margin: '0 0 2rem 0', lineHeight: 1, letterSpacing: '-0.04em' }}>SIRA</h2>
                
                <p style={{ fontSize: '1.1rem', color: '#1a3c34', opacity: 0.7, lineHeight: 1.8, marginBottom: '4rem', maxWidth: '550px' }}>
                  SIRA is Revera’s smart water purification and monitoring system, designed to make water cleaner, safer, and more reliable through an integrated process of filtration, sterilization, and real-time tracking.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', marginBottom: '4rem' }}>
                  {[
                    { label: 'Purity Level', val: '99.9%' },
                    { label: 'Optimization', val: 'Proprietary AI' },
                    { label: 'Performance', val: 'Real-time' },
                    { label: 'Status', val: 'Active' }
                  ].map((s, idx) => (
                    <div key={idx} style={{ borderLeft: '3px solid #f0f4f2', paddingLeft: '1.5rem' }}>
                      <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{s.label}</div>
                      <div style={{ fontSize: '1.25rem', color: '#1a3c34', fontWeight: 800 }}>{s.val}</div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => navigateTo('/contact')}
                  className="btn-get-started btn-roll" 
                  style={{ background: 'var(--primary-green)', color: '#1a3c34', height: '68px', borderRadius: '100px', width: '260px' }}
                >
                  <div className="roll-text" style={{ height: '68px' }}>
                    <span style={{ height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>Inquire unit</span>
                    <span style={{ height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>Inquire unit</span>
                  </div>
                </button>
              </div>

              <div style={{ background: '#f0f4f2', position: 'relative' }}>
                <img src="/sira.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="SIRA Unit" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, white, transparent 20%)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 2: Verification Portal --- */}
        <section style={{ maxWidth: '1000px', margin: '0 auto 10rem auto' }}>
          <div style={{ background: 'white', borderRadius: '48px', padding: '5rem 4rem', border: '1px solid #eef2f0', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#1a3c34', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>Unit Verification</h2>
            <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '3.5rem', maxWidth: '600px', margin: '0 auto' }}>Authentication system for hardware unit performance monitoring.</p>
            
            <div style={{ maxWidth: '450px', margin: '3rem auto 0 auto', position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Serial Number..."
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                style={{ width: '100%', padding: '1.4rem 2.5rem', borderRadius: '100px', border: '1px solid #e5e7eb', fontSize: '1.1rem', outline: 'none', background: '#f9fafb', textAlign: 'center' }}
                className="lab-input"
              />
              <button 
                onClick={() => {
                  if (serial === 'SIRA-982009') {
                    window.location.href = 'https://sira-dashboard.netlify.app';
                  } else {
                    alert('Invalid Serial Number. Please check your unit credentials.');
                  }
                }}
                style={{ width: '100%', background: 'var(--primary-green)', color: '#1a3c34', padding: '1.2rem', borderRadius: '100px', fontWeight: 800, marginTop: '1.5rem', border: 'none', cursor: 'pointer' }} 
                className="lab-btn"
              >
                Verify Connection
              </button>
            </div>
          </div>
        </section>

        {/* --- Section 3: 3D Focus Carousel --- */}
        <section style={{ position: 'relative', marginBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '6rem' }}>
            <h3 style={{ color: '#1a3c34', fontSize: '0.9rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>Active Solutions</h3>
            <div style={{ flex: 1, height: '1px', background: '#eef2f0' }} />
          </div>

          <div style={{ 
            position: 'relative', 
            height: '700px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
          }}>
            {/* Nav Arrows */}
            <button onClick={prevSlide} className="nav-arrow" style={{ left: '0' }} aria-label="Previous">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={nextSlide} className="nav-arrow" style={{ right: '0' }} aria-label="Next">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              perspective: '1500px'
            }}>
              {projects.map((project, idx) => {
                const isCenter = idx === currentIndex;
                const isLeft = (idx === (currentIndex - 1 + projects.length) % projects.length);
                const isRight = (idx === (currentIndex + 1) % projects.length);
                
                let transform = '';
                let opacity = 0;
                let zIndex = 0;

                if (isCenter) {
                  transform = 'translateX(0) scale(1) rotateY(0)';
                  opacity = 1;
                  zIndex = 10;
                } else if (isLeft) {
                  transform = 'translateX(-70%) scale(0.8) rotateY(25deg)';
                  opacity = 0.4;
                  zIndex = 5;
                } else if (isRight) {
                  transform = 'translateX(70%) scale(0.8) rotateY(-25deg)';
                  opacity = 0.4;
                  zIndex = 5;
                } else {
                   transform = 'translateX(0) scale(0.5)';
                   opacity = 0;
                }

                return (
                  <div 
                    key={project.id} 
                    style={{
                      position: 'absolute',
                      width: '750px',
                      height: '550px',
                      background: 'white',
                      border: '1px solid #eef2f0',
                      borderRadius: '40px',
                      padding: '4rem',
                      boxShadow: isCenter ? '0 50px 100px rgba(0,0,0,0.06)' : 'none',
                      transition: 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                      transform,
                      opacity,
                      zIndex,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2.5rem',
                      pointerEvents: isCenter ? 'auto' : 'none'
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', height: '100%' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                         <div style={{ fontSize: '0.75rem', color: 'var(--primary-green)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '0.2em' }}>NODE // 0{idx + 1}</div>
                         <h4 style={{ fontSize: '2.8rem', color: '#1a3c34', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>{project.title}</h4>
                         <p style={{ fontSize: '1.05rem', color: '#6b7280', lineHeight: 1.7, marginBottom: '2.5rem' }}>{project.desc}</p>
                         <button 
                            onClick={() => navigateTo('/contact')}
                            className="btn-outline-nav btn-roll" 
                            style={{ borderColor: 'rgba(26, 60, 52, 0.1)', color: '#1a3c34', height: '60px', width: '220px', borderRadius: '100px' }}
                         >
                            <div className="roll-text" style={{ height: '60px' }}>
                              <span style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>Explore Node</span>
                              <span style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>Inquire Pilot</span>
                            </div>
                         </button>
                      </div>
                      <div style={{ background: '#f8faf9', borderRadius: '24px', overflow: 'hidden', border: '1px solid #eef2f0' }}>
                        {project.image ? (
                           <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.1 }}>
                             <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#104e3b" strokeWidth="1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      
      <style>{`
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: white;
          border: 1px solid #eef2f0;
          color: #1a3c34;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(0,0,0,0.02);
        }
        .nav-arrow:hover {
          background: var(--primary-green);
          border-color: var(--primary-green);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 15px 30px rgba(163, 230, 53, 0.2);
        }
        .btn-outline-nav:hover {
          background: var(--dark-green) !important;
          border-color: var(--dark-green) !important;
        }
        .lab-input:focus {
          border-color: var(--primary-green) !important;
          background: white !important;
          box-shadow: 0 0 0 4px rgba(163, 230, 53, 0.1);
        }
        .lab-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(163, 230, 53, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
