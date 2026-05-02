import React, { useEffect, useRef, useContext } from 'react';
import { TransitionContext } from '../App';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import SplitText from '../components/SplitText';

gsap.registerPlugin(ScrollTrigger, Draggable);

const getRoleIcon = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes('software') || r.includes('developer') || r.includes('cto') || r.includes('cio')) return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
  if (r.includes('hardware') || r.includes('engineering')) return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
  if (r.includes('r&d') || r.includes('science')) return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>;
  if (r.includes('ceo') || r.includes('cfo') || r.includes('business')) return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
  if (r.includes('marketing') || r.includes('pr')) return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-2a2 2 0 1 1 0-4h2"/><path d="M12 5V3"/><path d="M12 21v-2"/></svg>;
  if (r.includes('qa')) return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
  if (r.includes('hr') || r.includes('ops') || r.includes('operations')) return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>;
};

const TeamCard: React.FC<{ name: string, role: string, description: string, image: string, hasFrame?: boolean }> = ({ name, role, description, image, hasFrame }) => {
  return (
    <div 
      style={{ 
        padding: '2.5rem', 
        borderRadius: '32px', 
        background: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: hasFrame ? '1px solid var(--primary-green)' : '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: hasFrame ? '0 15px 35px rgba(26, 60, 52, 0.08)' : '0 10px 30px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '350px',
        flexShrink: 0,
        margin: '0 1rem',
        transition: 'all 0.4s ease'
      }}
    >
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          overflow: 'hidden', 
          border: hasFrame ? '4px solid #eefdf4' : '4px solid white',
          boxShadow: hasFrame ? '0 10px 20px rgba(26, 60, 52, 0.08)' : '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        {/* Role Icon Badge - Now outside overflow:hidden container */}
        <div style={{
          position: 'absolute',
          bottom: '-2px',
          right: '-2px',
          width: '36px',
          height: '36px',
          background: 'var(--primary-green)',
          color: '#1a3c34',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid white',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          zIndex: 10
        }}>
          {getRoleIcon(role)}
        </div>
      </div>
      
      <h4 style={{ fontSize: '1.4rem', color: '#1a3c34', fontWeight: 700, marginBottom: '0.4rem' }}>{name}</h4>
      <p style={{ color: 'var(--primary-green)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {role}
      </p>
      
      <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', opacity: 0.8 }}>
        {description}
      </p>
 
      <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
        <SocialLink href="#" icon={<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>} />
        <SocialLink href="#" icon={<svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.899-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>} />
      </div>
    </div>
  );
};
const TeamMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<any>(null);

  useGSAP(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const cards = Array.from(marquee.children) as HTMLElement[];

    // This is a robust horizontal loop helper for GSAP
    function horizontalLoop(items: HTMLElement[], config: any) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times: number[] = [],
        widths: number[] = [],
        xPercents: number[] = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        totalWidth: number, curX: number, distanceToStart: number, distanceToLoop: number, item: HTMLElement, i: number;
      
      gsap.set(items, {
        xPercent: (i, target) => {
          widths[i] = parseFloat(gsap.getProperty(target, "width", "px") as string);
          xPercents[i] = parseFloat(gsap.getProperty(target, "xPercent") as string);
          return xPercents[i];
        }
      });
      totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) + (parseFloat(config.paddingRight) || 0);
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
        tl.to(item, { xPercent: gsap.utils.wrap(0, -totalWidth / widths[i] * 100, (curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
          .fromTo(item, { xPercent: gsap.utils.wrap(0, -totalWidth / widths[i] * 100, (curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }

      function toIndex(index: number, vars: any) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        // Pause the auto-play loop, tween to the index, then resume
        tl.pause();
        return gsap.to(tl, {
          time: time,
          ...vars,
          onComplete: () => {
             tl.play();
             vars.onComplete && vars.onComplete();
          }
        });
      }

      tl.next = (vars: any) => toIndex(curIndex + 1, vars);
      tl.prev = (vars: any) => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
      tl.progress(1, true).progress(0, true);
      if (config.reversed) {
        tl.vars.onReverseComplete?.();
        tl.reverse();
      }
      
      return tl;
    }

    // Give time for layout to settle
    const timer = setTimeout(() => {
      loopRef.current = horizontalLoop(cards, {
        speed: 0.8,
        repeat: -1,
        paddingRight: 32
      });
      loopRef.current.play();
    }, 100);

    return () => clearTimeout(timer);
  }, { scope: marqueeRef });

  return (
    <div 
      style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', padding: '2rem 0' }}
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 'max(2rem, calc(50vw - 640px))', 
        right: 'max(2rem, calc(50vw - 640px))',
        transform: 'translateY(-50%)',
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 9999, // Max z-index
        pointerEvents: 'none'
      }}>
        <button 
          onClick={() => loopRef.current?.prev({ duration: 0.8, ease: "power3.inOut" })}
          className="carousel-btn"
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '2px solid white',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a3c34" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={() => loopRef.current?.next({ duration: 0.8, ease: "power3.inOut" })}
          className="carousel-btn"
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '2px solid white',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1a3c34" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <div 
        ref={containerRef}
        style={{ 
          width: '100%', 
          overflow: 'hidden', 
          cursor: 'default'
        }}
      >
        <div 
          ref={marqueeRef}
          style={{ 
            display: 'flex',
            width: 'max-content',
            padding: '2rem 32px'
          }}
        >
          {teamMembers.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
      </div>
      
      <style>{`
        .carousel-btn:hover {
          transform: scale(1.1);
          background: var(--primary-green) !important;
        }
        .carousel-btn:hover stroke {
          stroke: white !important;
        }
      `}</style>
    </div>
  );
};

const SocialLink: React.FC<{ href: string, icon: React.ReactNode }> = ({ href, icon }) => (
  <a 
    href={href} 
    style={{ 
      color: '#1a3c34', 
      opacity: 0.9, 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {icon}
  </a>
);

const SDGCard: React.FC<{ icon: React.ReactNode, title: string, text: string }> = ({ icon, title, text }) => (
  <div style={{ 
    padding: '2.5rem', 
    background: 'white', 
    borderRadius: '32px', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
    border: '1px solid rgba(0,0,0,0.03)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem'
  }}>
    <div style={{ 
      width: '56px', 
      height: '56px', 
      borderRadius: '16px', 
      background: 'rgba(26, 60, 52, 0.05)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: '#1a3c34'
    }}>
      {icon}
    </div>
    <h4 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1a3c34' }}>{title}</h4>
    <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.6 }}>{text}</p>
  </div>
);

const SDGSection: React.FC = () => {
  const { navigateTo } = useContext(TransitionContext);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (wheelRef.current) {
      gsap.to(wheelRef.current, {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} style={{ 
      display: 'grid', 
      gridTemplateColumns: 'minmax(350px, 0.8fr) 1.2fr', 
      gap: '2.5rem', 
      marginBottom: '10rem' 
    }}>
      {/* Left Panel */}
      <div style={{ 
        background: '#1a3c34', 
        borderRadius: '44px', 
        padding: '4rem', 
        color: 'white', 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '600px'
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '2.5rem' }}>
            Sustainable Development Goals
          </h2>
          <button 
            onClick={() => navigateTo('/services')}
            className="btn-sdg btn-roll"
            style={{ 
              background: 'transparent', 
              border: '1px solid rgba(255,255,255,0.4)', 
              height: '56px',
              padding: '0 2.5rem', 
              borderRadius: '100px', 
              color: 'white', 
              fontSize: '1rem', 
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <div className="roll-text" style={{ height: '56px' }}>
              <span style={{ height: '56px', display: 'flex', alignItems: 'center' }}>Learn More</span>
              <span style={{ height: '56px', display: 'flex', alignItems: 'center' }}>Learn More</span>
            </div>
          </button>
        </div>

        {/* Rotating Wheel - "Scattered Parts" style */}
        <div style={{ 
          position: 'absolute', 
          bottom: '-25%', 
          left: '-10%', 
          width: '120%', 
          opacity: 0.3,
          pointerEvents: 'none'
        }}>
          <svg ref={wheelRef} width="100%" height="auto" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 12 }).map((_, i) => (
              <path 
                key={i}
                d={`M250 250 L${250 + 200 * Math.cos(i * 30 * Math.PI / 180)} ${250 + 200 * Math.sin(i * 30 * Math.PI / 180)}`} 
                stroke="#63e635" 
                strokeWidth="40" 
                strokeDasharray="40 20"
                style={{ opacity: (i % 2 === 0 ? 0.6 : 0.3) }}
              />
            ))}
            <circle cx="250" cy="250" r="160" stroke="#63e635" strokeWidth="40" strokeDasharray="80 30" />
            <circle cx="250" cy="250" r="100" stroke="#63e635" strokeWidth="40" strokeDasharray="40 50" />
          </svg>
        </div>
      </div>

      {/* Right Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
        <SDGCard 
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
          title="Climate action" 
          text="Our afforestation projects sequester carbon, making regional ecosystems greener while reducing energy-intensive cooling needs." 
        />
        <SDGCard 
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>}
          title="Greener cities" 
          text="ReVera's modern 4IR technology digitizes plant care, creating a smart database that makes reforestation data-driven and scalable." 
        />
        <SDGCard 
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>}
          title="Life on land" 
          text="The ecosystems we restore create natural habitats for wildlife, increase soil biodiversity, and improve regional human life quality." 
        />
        <SDGCard 
          icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>}
          title="Health & well-being" 
          text="ReVera projects improve local air quality and reduce UV exposure, encouraging a healthier outdoor lifestyle for all communities." 
        />
      </div>
    </section>
  );
};

const teamMembers = [
  {
    name: "Hamza Ahmed",
    role: "CEO",
    description: "Defines vision, mission, and long-term strategy. Leads multi-sector partnerships and representations.",
    image: "/team members/Hamza Ahmed.jpeg"
  },
  {
    name: "Ezz El-Deen Mounis",
    role: "Marketing & Strategy",
    description: "Leads corporate branding, market expansion strategies, and manages educational campaigns.",
    image: "/team members/Ezz.jpeg"
  },
  {
    name: "Belal Hany",
    role: "COO",
    description: "Oversees technical infrastructure, cloud platforms, and maintains data system reliability.",
    image: "/team members/Belal Hany.jpeg"
  },
  {
    name: "Mounir Ahmed Gomaa",
    role: "R&D Lead",
    description: "Leads research on organic water treatment and validates scientific efficiency and safety.",
    image: "/team members/Mouner Ahmed.jpeg"
  },
  {
    name: "Abdelrahman EL-Ganzory",
    role: "Engineering (Hardware)",
    description: "Designs and builds the SIRA physical recycling system and optimizes sensor integration.",
    image: "/team members/Abdelrahman Elganzory.jpeg"
  },
  {
    name: "Youssef Attia",
    role: "CFO",
    description: "Integrates filtration components and focusses on system durability and maintenance.",
    image: "/team members/Youssef Attia.jpeg"
  },
  {
    name: "Mohammed Mahdi",
    role: "CTO",
    description: "Developed the ReVera corporate website and implements real-time analytics.",
    image: "/team members/Mohamed Mahdi.jpeg",
    hasFrame: true
  },
  {
    name: "Yassin Alaa",
    role: "CIO",
    description: "Maintains corporate interfaces and oversees live alert notifications and analytics.",
    image: "/team members/yassine alaa.jpeg"
  },
  {
    name: "Ahmed Haitham",
    role: "QA Lead",
    description: "Validates data accuracy and alert logic while testing system reliability and edge cases.",
    image: "/team members/ahmed haitham.jpeg"
  },
  {
    name: "Ahmed Ibrahim Kansaw",
    role: "Marketing Lead",
    description: "Leads educational campaigns and communicates environmental and financial impact.",
    image: "/team members/Ahmed Ibrahim.jpeg"
  },
  {
    name: "Ahmed Moataz",
    role: "PR & Partnerships",
    description: "Manages media relations and coordinates with government initiatives and NGOs.",
    image: "/team members/Ahmed Moataz.jpeg"
  },
  {
    name: "Yassin Sabry",
    role: "HR & Operations",
    description: "Manages team coordination, internal processes, and oversees recruitment and culture.",
    image: "/team members/yassine sabry .jpeg"
  }
];

const AnimatedPlantBackground: React.FC<{ showBackground?: boolean }> = ({ showBackground = true }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const plants = containerRef.current?.querySelectorAll('.floating-plant');
    plants?.forEach((plant) => {
      gsap.to(plant, {
        y: 'random(-50, 50)',
        x: 'random(-20, 20)',
        rotation: 'random(-15, 15)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: showBackground ? -1 : 5,
      overflow: 'hidden',
      background: showBackground ? '#f8fbf8' : 'transparent',
      pointerEvents: 'none'
    }}>
      {/* Generate 15 + 10 floating plant elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="floating-plant" style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: showBackground ? 0.15 : 0.4,
          color: showBackground ? '#1a3c34' : 'var(--primary-green)',
          transform: `scale(${0.5 + Math.random()})`
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L9.29,18H13L19,21L23,6L17,8M13,16H10.42L8.53,18.11C9.28,15.1 11,12.5 13.9,11C13.25,12.65 13,14.4 13,16Z" />
          </svg>
        </div>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i+15} className="floating-plant" style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: showBackground ? 0.1 : 0.3,
          color: 'var(--primary-green)',
          transform: `scale(${0.4 + Math.random()})`
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,10.8 21.8,9.7 21.4,8.6L19,11L17,9.1L19.5,6.6C17.5,3.8 14.2,2 10.5,2C11,2 11.5,2 12,2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

const ImpactDashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (earthRef.current) {
      gsap.to(earthRef.current, {
        backgroundPosition: '200% center', // Horizontal rotation
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} style={{ 
      width: '100%', 
      height: '850px', 
      position: 'relative', 
      borderRadius: '48px', 
      overflow: 'hidden',
      marginBottom: '10rem',
      backgroundColor: '#050a08',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Real 3D Rotating Earth Sphere Container */}
      <div style={{
        position: 'absolute',
        width: '750px',
        height: '750px',
        borderRadius: '50%',
        zIndex: 1,
        overflow: 'hidden', // Clips the moving texture
        boxShadow: '0 0 100px rgba(99, 230, 53, 0.15)', // Outer atmospheric glow
      }}>
        {/* The Moving Texture */}
        <div 
          ref={earthRef} 
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/earth-texture.jpg)',
            backgroundSize: '210% 100%',
            backgroundPosition: '0% center',
            backgroundRepeat: 'repeat-x',
            transform: 'scale(1.05)', // Slight overscale to ensure coverage
          }} 
        />
        
        {/* Sophisticated Spherical Overlays */}
        {/* 1. Day/Night Master Shadow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, transparent 40%, rgba(0,0,0,0.85) 90%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        {/* 2. Atmospheric Fresnel Halo (Blue-ish edge) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          boxShadow: 'inset 0 0 80px rgba(100,200,255,0.2)',
          borderRadius: '50%',
          zIndex: 3,
          pointerEvents: 'none'
        }} />

        {/* 3. Deep Inset Rim Shadow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          boxShadow: 'inset -30px -30px 60px rgba(0,0,0,0.8), inset 30px 30px 60px rgba(255,255,255,0.05)',
          borderRadius: '50%',
          zIndex: 4,
          pointerEvents: 'none'
        }} />
      </div>

      {/* Floating Mission Card - Now on the left */}
      <div style={{
        position: 'absolute',
        bottom: '4rem',
        left: '4rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '32px',
        padding: '3.5rem',
        maxWidth: '600px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
        zIndex: 10
      }}>
        <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Our mission
        </p>
        <h3 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, color: '#1a3c34', margin: 0 }}>
          Standing as the protectors of our Earth, we restore life to the planet's vital ecosystems and safeguard its future for generations to come.
        </h3>
      </div>

      {/* Stats Card Overlay - On the right */}
      <div style={{
        position: 'absolute',
        bottom: '4rem',
        right: '4rem',
        background: 'rgba(26, 60, 52, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '3rem',
        width: '380px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        zIndex: 10,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {[
          { color: '#63e635', val: '10B', label: 'Trees to be planted' },
          { color: '#74f05b', val: '278', label: 'Tons carbon to be removed' },
          { color: '#9ef58d', val: '40', label: 'M/ha of land to be restored' }
        ].map((stat, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <span style={{ fontSize: '2.8rem', fontWeight: 800, color: stat.color, minWidth: '100px', letterSpacing: '-0.02em' }}>{stat.val}</span>
            <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600, lineHeight: 1.3 }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Atmospheric Glow */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, transparent 30%, #050a08 70%)',
        zIndex: 2,
        pointerEvents: 'none'
      }} />
    </section>
  );
};

const About: React.FC = () => {
  const { navigateTo } = useContext(TransitionContext);
  const teamRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    const cards = teamRef.current?.querySelectorAll('.team-card-trigger');
    if (cards) {
      // Set initial state
      gsap.set(cards, { y: 60, opacity: 0, scale: 0.9 });

      ScrollTrigger.batch(cards, {
        onEnter: (batch) => gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2, // Significant stagger within the row
          ease: 'power3.out',
          overwrite: true
        }),
        start: 'top 85%',
      });
    }
  }, { scope: teamRef });

  return (
    <div className="about-page" style={{ position: 'relative', minHeight: '100vh', background: 'transparent' }}>
      <AnimatedPlantBackground />

      <main className="container" style={{ paddingTop: '160px' }}>
        {/* --- Hero Section --- */}
        <section style={{ 
          maxWidth: '1100px', 
          margin: '0 auto 6rem auto', 
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          color: '#1a3c34' 
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', 
            color: '#1a3c34',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            <SplitText 
              text="Take control of your carbon footprint"
              delay={50}
              from={{ opacity: 0, transform: 'translate3d(0,30px,0)' }}
              to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            />
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', 
            lineHeight: 1.6, 
            color: '#1a3c34',
            opacity: 0.9,
            maxWidth: '720px',
          }}>
            <SplitText 
              text="ReVera helps you connect with high-quality, data-driven restoration projects that capture carbon and use site-specific technology to guarantee permanent, measurable impact."
              delay={30}
              from={{ opacity: 0, transform: 'translate3d(0,20px,0)' }}
              to={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            />
          </p>
        </section>

        {/* --- Impact Dashboard Section --- */}
        <ImpactDashboard />

        {/* --- Who We Are Video --- */}
        <section style={{ 
          maxWidth: '1000px', 
          margin: '0 auto 10rem auto',
          position: 'relative'
        }}>
          <div style={{
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRadius: '48px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.06)'
          }}>
            <div style={{ 
              width: '100%', 
              aspectRatio: '16/9', 
              background: '#0a1a12', 
              borderRadius: '32px', 
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/HjOEfTujrQs?autoplay=0&controls=1&rel=0" 
                title="Our Story" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0 }}
              ></iframe>
              
              {/* Overlay with label */}
              <div style={{ 
                position: 'absolute', 
                bottom: '2rem', 
                left: '2rem', 
                background: 'rgba(5, 10, 8, 0.7)', 
                backdropFilter: 'blur(10px)',
                padding: '0.75rem 1.5rem',
                borderRadius: '100px',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1px solid rgba(255,255,255,0.1)',
                pointerEvents: 'none'
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-green)', boxShadow: '0 0 10px var(--primary-green)' }} />
                OUR STORY
              </div>
            </div>
          </div>
        </section>

        {/* --- Team Section --- */}
        <section ref={teamRef} style={{ marginBottom: '10rem', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 700, color: '#1a3c34', marginBottom: '1rem' }}>Leadership & Innovation</h2>
            <p style={{ color: '#4b5563', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Meet the dedicated team behind ReVera's mission.</p>
          </div>

          <TeamMarquee />
        </section>

        {/* --- SDG Section --- */}
        <SDGSection />

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', marginBottom: '8rem' }}>
          <div style={{ 
            padding: '4rem', 
            borderRadius: '44px', 
            background: 'rgba(255, 255, 255, 0.96)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ color: '#1a3c34', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 700 }}>Our Mission</h3>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.15rem' }}>
              We exist to bridge the gap between abstract carbon offsets and real-world results. 
              By utilizing advanced sensors and machine learning, we turn reforestation into a transparent, engineered science.
            </p>
          </div>
          <div style={{ 
            padding: '4rem', 
            borderRadius: '44px', 
            background: 'rgba(255, 255, 255, 0.96)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.04)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.04)'
          }}>
            <h3 style={{ color: '#1a3c34', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 700 }}>Our Technology</h3>
            <p style={{ color: '#4b5563', lineHeight: 1.8, fontSize: '1.15rem' }}>
              From robotic precision planting to real-time biomass monitoring, our site-specific 
              approach ensures that every seedling has the highest possible chance of reaching maturity.
            </p>
          </div>
        </section>

        {/* --- Local Navigation --- */}
        <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <button 
            onClick={() => navigateTo('/')} 
            className="btn-get-started btn-roll" 
            style={{ 
              background: '#1a3c34', 
              color: 'white',
              padding: '0 3.5rem',
              display: 'inline-grid',
              placeItems: 'center',
              height: '72px',
              borderRadius: '100px',
              cursor: 'pointer'
            }}
          >
            <div className="roll-text" style={{ height: '72px' }}>
              <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Return to home</span>
              <span style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Return to home</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default About;
