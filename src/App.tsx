import React, { useEffect, useRef, useState, useMemo, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import ContactPage from './pages/Contact';
import Blog from './pages/Blog';
import SplitText from './components/SplitText';
import RotatingText from './components/RotatingText';
import ScrollReveal from './components/ScrollReveal';
import AccessibilityWidget from './components/AccessibilityWidget';

gsap.registerPlugin(ScrollTrigger);

// --- Transition Context ---
export const TransitionContext = createContext<{
  isTransitioning: boolean;
  navigateTo: (path: string) => void;
}>({ isTransitioning: false, navigateTo: (_path: string) => {} });

const TreeTransition: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isVisible) setIsActive(true);
  }, [isVisible]);

  useGSAP(() => {
    if (isVisible) {
      gsap.to(leftRef.current, { xPercent: 100, duration: 0.8, ease: 'power4.inOut' });
      gsap.to(rightRef.current, { xPercent: -100, duration: 0.8, ease: 'power4.inOut' });
    } else {
      gsap.to(leftRef.current, { xPercent: 0, duration: 0.7, ease: 'power4.inOut' });
      gsap.to(rightRef.current, { xPercent: 0, duration: 0.7, ease: 'power4.inOut', onComplete: () => setIsActive(false) });
    }
  }, { dependencies: [isVisible], scope: containerRef });

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 999998,
      pointerEvents: isVisible ? 'auto' : 'none',
      display: (isVisible || isActive) ? 'flex' : 'none',
      overflow: 'hidden',
      visibility: (isVisible || isActive) ? 'visible' : 'hidden'
    }}>
      <div ref={leftRef} style={{ 
        width: '50%', height: '100%', position: 'absolute', top: 0, left: '-50%', zIndex: 2 
      }}>
        <img src="/top.png" alt="" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
      </div>
      <div ref={rightRef} style={{ 
        width: '50%', height: '100%', position: 'absolute', top: 0, right: '-50%', zIndex: 1 
      }}>
        <img src="/bottom.png" alt="" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );
};


const SponsorshipSection: React.FC = () => (
  <section style={{ 
    padding: '4rem 0', 
    background: '#f2f8f2', 
    borderTop: '1px solid rgba(0,0,0,0.05)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
    position: 'relative'
  }}>
    <div className="container" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
      gap: '4rem',
      alignItems: 'center',
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        borderRight: '1.5px solid rgba(6, 78, 59, 0.1)',
        paddingRight: '4rem'
      }}>
        <p style={{ 
          textTransform: 'uppercase', 
          letterSpacing: '0.3em', 
          fontSize: '0.75rem', 
          fontWeight: 800, 
          color: 'var(--primary-green-hover)',
          opacity: 0.9
        }}>
          In Collaboration With
        </p>
        <img 
          src="/future tech.png" 
          alt="Future Tech Logo" 
          style={{ 
            height: '200px', 
            width: 'auto',
            objectFit: 'contain',
            borderRadius: '12px'
          }} 
        />
      </div>
      
      <div style={{ position: 'relative' }}>
        <ScrollReveal baseOpacity={0.3} blurStrength={5}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--dark-green)', marginBottom: '1rem' }}>
            Accelerating Environmental Innovation
          </h3>
          <p style={{ 
            fontSize: '1.1rem', 
            lineHeight: 1.7, 
            color: 'var(--text-main)',
            opacity: 0.8,
            fontWeight: 400
          }}>
            ReVera is proudly supported by <span style={{ fontWeight: 700, color: 'var(--dark-green)' }}>Future Tech</span>. 
            Through this exclusive partnership, we leverage advanced computing to optimize our 
            reforestation efforts, ensuring every seed planted is guided by data-driven precision 
            for maximum environmental impact.
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

const FloatingStats: React.FC<{ top: string; left?: string; right?: string; icon: React.ReactNode; label: string; value: string }> = ({ top, left, right, icon, label, value }) => (
  <div className="glass animate-float" style={{
    position: 'absolute',
    top,
    left,
    right,
    padding: '0.75rem 1rem',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    zIndex: 10,
    boxShadow: 'var(--shadow-md)',
    minWidth: '200px'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      background: 'rgba(163, 230, 53, 0.2)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--dark-green)'
    }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 500 }}>{label}</p>
      <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--dark-green)' }}>{value}</p>
    </div>
  </div>
);

const ImpactSection: React.FC = () => {
  return (
    <section className="container" id="about" style={{ marginBottom: '2rem', padding: '4rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)', // Increased video column width
        gap: '6rem',
        alignItems: 'center'
      }}>
        <div style={{}}>
          <h2 style={{ 
            fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            marginBottom: '2.5rem',
            color: 'var(--dark-green)',
            letterSpacing: '-0.03em'
          }}>
            Pioneering<br />
            <span style={{ color: 'var(--primary-green-hover)' }}>Ecosystem</span><br />
            Recovery
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ 
              fontSize: '1.2rem', 
              lineHeight: 1.6, 
              color: 'var(--text-main)',
              opacity: 0.9,
              fontWeight: 500
            }}>
              ReVera bridges the gap between technology and site-specific reforestation, 
              restoring ecosystems with precision and measurable results.
            </p>
          </div>
          
          <div style={{ marginTop: '3.5rem' }}>
            <NavBtn to="/about" className="btn-get-started btn-roll" style={{ 
              background: 'var(--dark-green)', 
              color: 'white',
              padding: '0 3rem',
              display: 'inline-grid',
              placeItems: 'center',
              height: '72px',
              minWidth: '280px',
              fontSize: '1.1rem',
              borderRadius: '100px'
            }}>
              <div className="roll-text" style={{ height: '72px' }}>
                <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get to know us more</span>
                <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get to know us more</span>
              </div>
            </NavBtn>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ 
            borderRadius: '40px', 
            overflow: 'hidden', 
            boxShadow: '0 40px 100px rgba(0,0,0,0.15)',
            background: '#0a1a12',
            aspectRatio: '16/10', // Slightly taller/larger presence
            width: '100%'
          }}>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/HjOEfTujrQs" 
              title="About ReVera Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              style={{ display: 'block' }}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScrollSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCount = 240;
  
  // Memoize the image paths to avoid recalculations
  const images = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => {
      const frameNum = (i + 1).toString().padStart(3, '0');
      return `/animation/ezgif-frame-${frameNum}.jpg`;
    });
  }, []);

  const preloadedImages = useRef<HTMLImageElement[]>([]);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Load first image to set canvas size
    const img = new Image();
    img.src = images[0];
    img.onload = () => {
      canvas.width = 1920; // 16:9 aspect ratio or matching image resolution
      canvas.height = 1080;
      renderFrame(0);
    };

    // Preload all images
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      preloadedImages.current[index] = img;
    });

    const renderFrame = (index: number) => {
      const img = preloadedImages.current[Math.floor(index)];
      if (img && img.complete) {
        // Clear canvas and draw
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Center cover crop logic
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const airbnb = { frame: 0 };
    const textElements = [
      { frame: 0, text: "The Journey Begins" },
      { frame: 80, text: "Restoring Nature's Balance" },
      { frame: 160, text: "Our Visible Impact" },
      { frame: 220, text: "A Sustainable Legacy" }
    ];

    gsap.to(airbnb, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
      onUpdate: () => {
        renderFrame(airbnb.frame);
        
        const currentNarrative = [...textElements].reverse().find(el => airbnb.frame >= el.frame);
        if (currentNarrative && scrollTextRef.current) {
          if (scrollTextRef.current.innerText !== currentNarrative.text) {
            gsap.to(scrollTextRef.current, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                if (scrollTextRef.current) {
                  scrollTextRef.current.innerText = currentNarrative.text;
                  gsap.to(scrollTextRef.current, { opacity: 1, duration: 0.3 });
                }
              }
            });
          }
        }
      }
    });
  }, { scope: containerRef });

  const scrollTextRef = useRef<HTMLHeadingElement>(null);

  return (
    <div ref={containerRef} style={{ height: '600vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000'
      }}>
        <canvas 
          ref={canvasRef} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            maxWidth: '100vw',
            maxHeight: '100vh'
          }} 
        />
        
        {/* Dark overlay to mask quality and add cinematic depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)', // Deepened to 0.6
          zIndex: 1
        }} />

        {/* Narrative content for extra premium feel */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          pointerEvents: 'none',
          zIndex: 2,
          width: '80%'
        }}>
          <h2
            ref={scrollTextRef}
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 4.5rem)', 
              fontWeight: 700, 
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              marginBottom: '1rem',
              color: 'white',
              opacity: 1
            }}
          >
            The Journey Begins
          </h2>
          <p style={{ opacity: 0.6, fontSize: '1.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll to Witness the Impact
          </p>
        </div>
      </div>
    </div>
  );
};

const CitySequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameCount = 150;
  const isPlaying = useRef(false);

  const currentFrame = (index: number) => 
    `/city/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = 1920;
    canvas.height = 1010;

    const img = new Image();
    img.src = currentFrame(0);
    img.onload = () => context.drawImage(img, 0, 0);

    const updateImage = (index: number) => {
      img.src = currentFrame(index);
      context.drawImage(img, 0, 0);
    };

    // Auto-play when section enters viewport
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%", // Start early so it's moving when seen
      onEnter: () => {
        if (isPlaying.current) return;
        isPlaying.current = true;
        
        const obj = { frame: 0 };
        gsap.to(obj, {
          frame: frameCount - 1,
          duration: 3, // 3 seconds to play the full sequence
          ease: "none",
          onUpdate: () => {
            updateImage(Math.floor(obj.frame));
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ width: '100%', height: 'auto', borderRadius: '40px', overflow: 'hidden', background: '#0a1a12', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
    </div>
  );
};

const Hero: React.FC = () => (
  <div className="hero-content animate-fade-in" style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    textAlign: 'center', 
    marginBottom: '4rem' 
  }}>
    <SplitText
      text="Planting a better future"
      tag="h1"
      className="hero-title"
      textAlign="center"
      delay={40}
      duration={1.5}
      ease="power4.out"
      rootMargin="200px" // Ensure it triggers early even if scrolled slightly
      from={{ opacity: 0, y: 80, rotateX: 30 }}
      to={{ opacity: 1, y: 0, rotateX: 0 }}
      style={{
        fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
        fontWeight: 700,
        color: 'var(--dark-green)',
        marginBottom: '1.5rem',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        width: '100%'
      }}
    />
    
    <NavBtn to="/contact" className="btn-get-started btn-roll" style={{ background: 'var(--primary-green)', color: 'var(--dark-green)', height: '72px', width: '240px', display: 'inline-grid', placeItems: 'center', borderRadius: '100px' }}>
      <div className="roll-text" style={{ height: '72px' }}>
        <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Started</span>
        <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Started</span>
      </div>
    </NavBtn>
  </div>
);

const LocationSection: React.FC = () => (
  <section className="container" id="location" style={{ marginBottom: '8rem', marginTop: '4rem' }}>
    <div className="glass" style={{
      borderRadius: '40px',
      padding: '4rem',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)', // Enlarged the map column
      gap: '4rem',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.4)',
    }}>
      <div className="location-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
          fontWeight: 700, 
          color: 'var(--dark-green)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        }}>
          Find Us in <br />Sadat City
        </h2>
        <p style={{ 
          fontSize: '1.15rem', 
          lineHeight: 1.7, 
          color: 'var(--text-main)',
          opacity: 0.8
        }}>
          Visit us at Sadat STEM School. We are located in the heart of Sadat City, 
          working on the next generation of environmental engineering solutions. 
          Our headquarters is situated within the innovative STEM campus.
        </p>
        <div style={{ marginTop: '1rem' }}>
          <a 
            href="https://maps.app.goo.gl/Rwrbn4aq7VCuVkUN9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-get-started btn-roll" 
            style={{ 
              display: 'inline-flex',
              background: 'var(--primary-green)', 
              color: 'var(--dark-green)',
              textDecoration: 'none',
              height: '72px'
            }}
          >
            <div className="roll-text" style={{ height: '72px' }}>
              <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Directions</span>
              <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Directions</span>
            </div>
          </a>
        </div>
      </div>
      
      <div style={{ 
        height: '600px', // Increased from 450px
        borderRadius: '30px', 
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        border: '1px solid var(--glass-border)',
        position: 'relative',
        zIndex: 1
      }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1152!2d30.5464425!3d30.3804964!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14589706cf9f1209%3A0x7d1a09246c720f5!2sSadat%20STEM%20School!5e0!3m2!1sen!2seg!4v1713137549421!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
);

const SocialIcon: React.FC<{ href: string; color: string; children: React.ReactNode }> = ({ href, color, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={href} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.95)',
        color: isHovered ? color : '#1a3c34',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transform: isHovered ? 'translateY(-3px)' : 'none'
      }}
    >
      {children}
    </a>
  );
};

const Footer: React.FC = () => (
  <footer style={{ 
    position: 'relative',
    height: '100vh',
    minHeight: '800px',
    backgroundImage: 'url(/footer.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#1a3c34',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '6rem'
  }}>
    {/* Wavy Section Divider */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      overflow: 'hidden',
      lineHeight: 0,
      zIndex: 2
    }}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '80px' }}>
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V0H1200V95.83C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#FFFFFF"></path>
      </svg>
    </div>

    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem' }}>
      <h2 style={{ 
        fontFamily: '"EB Garamond", serif', 
        fontSize: 'clamp(3rem, 7vw, 5.5rem)', 
        fontWeight: 400, 
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        lineHeight: 1.1,
        color: '#1a3c34',
        margin: 0,
        marginTop: '5rem'
      }}>
        FOR A<br />SUSTAINABLE<br />FUTURE
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <img 
          src="/revera logo.png" 
          alt="ReVera Logo" 
          style={{ height: '140px', objectFit: 'contain', filter: 'brightness(0.3)' }} 
        />
        
        {/* Social Icons - Now highly visible by default */}
        <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1rem' }}>
          <SocialIcon href="#instagram" color="#E4405F">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </SocialIcon>
          <SocialIcon href="#twitter" color="#1DA1F2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-2 1-3.3 1.3a3.5 3.5 0 0 0-5.4 3.4c-3.1-.2-5.8-1.6-7.7-3.9a3.5 3.5 0 0 0 1.1 4.7 3.5 3.5 0 0 1-1.6-.4v.1a3.5 3.5 0 0 0 2.8 3.4 3.5 3.5 0 0 1-1.6.1 3.5 3.5 0 0 0 3.2 2.4 7 7 0 0 1-4.4 1.5c-.3 0-.6 0-.9-.1a10 10 0 0 0 5.4 1.6c6.5 0 10-5.4 10-10v-.5A7.2 7.2 0 0 0 22 4z"></path></svg>
          </SocialIcon>
          <SocialIcon href="#facebook" color="#1877F2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </SocialIcon>
          <SocialIcon href="https://www.youtube.com/@Revera-c8l" color="#FF0000">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          </SocialIcon>
        </div>
        {/* Copyright Sentence */}
        <p style={{ 
          marginTop: '2rem', 
          fontSize: '0.85rem', 
          opacity: 1, 
          color: 'rgb(251, 254, 254)',
          letterSpacing: '0.05em',
          fontWeight: 600
        }}>
          &copy; {new Date().getFullYear()} ReVera Engineering. All Rights Reserved. Preserving our planet for future generations.
        </p>
      </div>
    </div>
  </footer>
);

const LandingPage: React.FC = () => {
  return (
    <>
      <main>
        {/* SECTION 1: Welcoming Splash */}
        <section style={{ width: '100%', height: '100vh', position: 'relative', background: '#050a08', overflow: 'hidden' }}>
          <video 
            src="/background.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              opacity: 0.45 
            }} 
          />
          
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            zIndex: 10,
            width: '95%'
          }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              fontWeight: 900, 
              letterSpacing: '-0.04em',
              marginBottom: '1rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3em',
              lineHeight: 1
            }}>
              <span style={{ color: 'white' }}>Our</span>
              <RotatingText
                texts={['Mission', 'Impact', 'Innovation', 'Ecosystems', 'Sustainability', 'Future']}
                mainClassName="overflow-hidden justify-center inline-flex items-center"
                staggerFrom="last"
                initial={{ y: "150%" }}
                animate={{ y: 0 }}
                exit={{ y: "-150%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={4000} // Slower for better readability
                splitBy="characters"
                auto
                loop // This prop makes it infinite
                style={{ 
                  backgroundColor: 'var(--primary-green)',
                  color: 'white',
                  padding: '0 0.8em',
                  borderRadius: '0.3em',
                  height: '1.2em',
                  verticalAlign: 'middle',
                  display: 'inline-flex',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}
              />
            </h1>
            <SplitText
              text="Engineering the Lungs of Tomorrow"
              className="split-heading-hero"
              delay={80}
              from={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
              to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              ease="power3.out"
              rootMargin="-50px"
              style={{ 
                letterSpacing: '0.6em', 
                textTransform: 'uppercase', 
                fontSize: '0.9rem', 
                opacity: 0.8, 
                fontWeight: 700, 
                marginTop: '2rem',
                color: 'white'
              }}
            />
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10
          }}>
            <div className="animate-float" style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--primary-green), transparent)', margin: '0 auto' }} />
          </div>
        </section>

        {/* SECTION 2: About Us (ImpactSection) */}
        <div style={{ paddingTop: '2rem' }}>
          <ScrollReveal>
            <ImpactSection />
          </ScrollReveal>
        </div>

        {/* SECTION 3: Hero (Planting a better future) */}
        <div className="container" style={{ padding: '0 0 4rem 0', position: 'relative' }}>
          <ScrollReveal>
            <Hero />
          </ScrollReveal>

          <div className="visual-area animate-fade-in" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            paddingBottom: '4rem',
            animationDelay: '0.2s'
          }}>
            <CitySequence />

            <FloatingStats 
              top="10%" 
              left="-5%" 
              label="Carbon Removal Rate" 
              value="2.3 tCO2/year"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20" /><circle cx="12" cy="12" r="10" /></svg>}
            />

            <FloatingStats 
              top="15%" 
              right="-5%" 
              label="Air Quality Improved" 
              value="6 g/year"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m8 17 4 4 4-4" /></svg>}
            />
          </div>
        </div>

        {/* SECTION 4: Scroll Sequence (Frame by Frame) */}
        <div className="scroll-sequence-section">
          <ScrollSequence />
        </div>

        <SponsorshipSection />
        
        <div style={{ height: '8rem' }} /> {/* Extra breathing room */}
        
        {/* --- SIRA Flagship Project Section --- */}
        <section className="container" id="sira" style={{ marginBottom: '8rem' }}>
          <ScrollReveal>
            <div style={{
              background: 'transparent',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
              minHeight: '650px',
            }}>
                <div style={{ padding: '5rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '2px', background: 'var(--primary-green)' }} />
                    <span style={{ color: 'var(--primary-green)', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Flagship Project</span>
                  </div>
                  
                  <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--dark-green)', fontWeight: 950, lineHeight: 1, margin: 0, letterSpacing: '-0.04em' }}>
                    SIRA
                  </h2>
                  
                  <h3 style={{ fontSize: '1.6rem', color: '#1a3c34', fontWeight: 700, lineHeight: 1.4, opacity: 0.9 }}>
                    Advanced Intelligent Water Management Systems
                  </h3>
                  
                  <p style={{ fontSize: '1.2rem', color: '#334155', lineHeight: 1.8, fontWeight: 500 }}>
                    Responsible for pioneering the future of liquid life, SIRA integrates real-time GIS mapping 
                    with automated filtration tech to ensure sustainable water security across the MENA region.
                  </p>
                  
                  <div style={{ marginTop: '1rem' }}>
                    <NavBtn to="/services" className="btn-get-started btn-roll" style={{ 
                      background: 'var(--dark-green)', 
                      color: 'white',
                      padding: '0 3.5rem',
                      height: '72px',
                      borderRadius: '100px',
                      fontWeight: 700
                    }}>
                      <div className="roll-text" style={{ height: '72px' }}>
                        <span style={{ height: '72px', display: 'flex', alignItems: 'center' }}>Explore Services</span>
                        <span style={{ height: '72px', display: 'flex', alignItems: 'center' }}>Explore Services</span>
                      </div>
                    </NavBtn>
                  </div>
                </div>
              
              <div style={{ position: 'relative', overflow: 'hidden', padding: '2rem' }}>
                <img 
                  src="/sira.jpg" 
                  alt="SIRA Water Facility" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: '40px',
                    filter: 'brightness(0.95) contrast(1.05)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                
                {/* Subtle over-image accent */}
                <div style={{
                  position: 'absolute',
                  top: '4rem',
                  right: '4rem',
                  width: '80px',
                  height: '80px',
                  borderTop: '2px solid var(--primary-green)',
                  borderRight: '2px solid var(--primary-green)',
                  pointerEvents: 'none'
                }} />
              </div>
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal>
          <LocationSection />
        </ScrollReveal>
      </main>
    </>
  );
};

const NavBtn: React.FC<{ to: string; children: React.ReactNode; className?: string; style?: React.CSSProperties } & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ to, children, className, style, ...rest }) => {
  const { navigateTo } = useContext(TransitionContext);
  return (
    <button 
      onClick={() => navigateTo(to)} 
      className={className} 
      style={{ 
        background: 'none', 
        border: 'none', 
        padding: 0, 
        font: 'inherit', 
        color: 'inherit', 
        cursor: 'pointer', 
        pointerEvents: 'auto',
        ...style 
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isTransparent, setIsTransparent] = useState(isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIsTransparent(false);
      return;
    }

    const handleScroll = () => {
      // ScrollSequence is 600vh. We stay transparent roughly until it finishes.
      const sequenceEnd = window.innerHeight * 5.7;
      setIsTransparent(window.scrollY < sequenceEnd);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Use existing "dark page" logic for home page colors (white text)
  const isDarkPage = isHomePage;
  const themeColor = isDarkPage ? 'white' : '#1a3c34';

  return (
    <nav style={{
      position: isHomePage ? 'absolute' : 'fixed',
      top: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      borderRadius: '100px',
      padding: '0.75rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 999999,
      opacity: 1,
      pointerEvents: 'auto',
      background: isTransparent 
        ? 'transparent' 
        : (isHomePage ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)'),
      backdropFilter: isTransparent ? 'none' : 'blur(15px)',
      WebkitBackdropFilter: isTransparent ? 'none' : 'blur(15px)',
      border: isTransparent 
        ? '1px solid transparent'
        : `1px solid ${isHomePage ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
      boxShadow: (isTransparent || isHomePage) ? 'none' : '0 10px 30px rgba(0,0,0,0.03)',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      color: themeColor
    }}>
      <NavBtn 
        to="/"
        style={{ pointerEvents: 'auto' }}
      >
        <img 
          src="/revera logo.png" 
          alt="Revera Logo" 
          style={{ 
            width: 'auto', 
            height: '90px', 
            objectFit: 'contain', 
            transition: 'all 0.4s ease',
            marginTop: '-22.5px',
            marginBottom: '-22.5px',
            position: 'relative',
            zIndex: 10,
            transform: 'scale(1)',
            filter: isHomePage 
              ? 'brightness(0) invert(1)'
              : 'none',
            pointerEvents: 'none' // Let button handle events
          }} 
        />
      </NavBtn>
      
      <div className="nav-links" style={{ 
        display: 'flex', 
        gap: '2.5rem', 
        fontSize: '0.95rem', 
        fontWeight: 600,
        color: themeColor
      }}>
        <NavBtn to="/" className="nav-link-item" style={{ color: themeColor, opacity: 0.8 }}>Home</NavBtn>
        <NavBtn to="/about" className="nav-link-item" style={{ color: themeColor, opacity: 0.8 }}>About Us</NavBtn>
        <NavBtn to="/services" className="nav-link-item" style={{ color: themeColor, opacity: 0.8 }}>Services</NavBtn>
        <NavBtn to="/blog" className="nav-link-item" style={{ color: themeColor, opacity: 0.8 }}>Blog</NavBtn>
      </div>

      <NavBtn to="/contact" className="btn-outline-nav btn-roll" style={{ 
        borderColor: themeColor,
        color: themeColor,
        display: 'inline-grid',
        placeItems: 'center',
        padding: '0 1.5rem',
        height: '42px',
        borderRadius: '100px',
        border: `1px solid ${themeColor}`,
        overflow: 'hidden'
      }}>
        <div className="roll-text" style={{ height: '42px' }}>
          <span style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Started</span>
          <span style={{ height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Get Started</span>
        </div>
      </NavBtn>
    </nav>
  );
};

const ScrollToTop: React.FC<{ lenis: Lenis | null }> = ({ lenis }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button 
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '3rem',
        right: '3rem',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.05)',
        color: '#1a3c34',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 2000,
        opacity: show ? 1 : 0,
        visibility: show ? 'visible' : 'hidden',
        transform: `translateY(${show ? '0' : '20px'}) scale(${show ? '1' : '0.8'})`,
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        pointerEvents: show ? 'auto' : 'none'
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
};

const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (path: string) => {
    if (location.pathname === path || isTransitioning) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      navigate(path);
      window.scrollTo(0, 0);
      setTimeout(() => setIsTransitioning(false), 500); // Reset state after transition starts clearing
    }, 850); // Full closing duration + small buffer
  };

  return (
    <TransitionContext.Provider value={{ navigateTo, isTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
};

// Services page integrated

const MainLayout: React.FC<{ lenis: Lenis | null }> = ({ lenis }) => {
  const { isTransitioning } = useContext(TransitionContext);
  return (
    <>
      <Navbar />
      <AccessibilityWidget />
      <TreeTransition isVisible={isTransitioning} /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={
          <div className="page-wrapper animate-fade-in">
            <AboutPage />
          </div>
        } />
        <Route path="/services" element={
          <div className="page-wrapper animate-fade-in">
            <ServicesPage />
          </div>
        } />
        <Route path="/contact" element={
          <div className="page-wrapper animate-fade-in">
            <ContactPage />
          </div>
        } />
        <Route path="/blog" element={
          <div className="page-wrapper animate-fade-in">
            <Blog />
          </div>
        } />
      </Routes>
      <Footer />
      <ScrollToTop lenis={lenis} />
    </>
  );
};

const App: React.FC = () => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    setLenis(lenisInstance);

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event('resize'));
    }, 1500);

    return () => {
      lenisInstance.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <BrowserRouter>
      <TransitionProvider>
        <div className="app" style={{ position: 'relative' }}>
          <MainLayout lenis={lenis} />

          {/* Global Cinematic Vibe */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '100vh',
            background: 'radial-gradient(circle at 50% 0%, rgba(163, 230, 53, 0.05) 0%, transparent 70%)',
            zIndex: -1,
            pointerEvents: 'none'
          }}></div>
        </div>
      </TransitionProvider>
    </BrowserRouter>
  );
};

export default App;
