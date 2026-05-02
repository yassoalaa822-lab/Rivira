import React, { useState, useEffect, useRef } from 'react';
import './AccessibilityWidget.css';

const AccessibilityWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Profiles
    const [seizureSafe, setSeizureSafe] = useState(false);
    const [keyboardNav, setKeyboardNav] = useState(false);
    const [blindMode, setBlindMode] = useState(false);
    const [visionImpaired, setVisionImpaired] = useState(false);
    const [adhdFriendly, setAdhdFriendly] = useState(false);
    const [cognitiveDisability, setCognitiveDisability] = useState(false);

    // Content Adjustments
    const [scalingActive, setScalingActive] = useState(false);
    const [fontActive, setFontActive] = useState(false);
    const [titlesActive, setTitlesActive] = useState(false);
    const [linksActive, setLinksActive] = useState(false);
    const [fontSize, setFontSize] = useState(100);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | null>(null);

    // Orientation & Colors
    const [muteActive, setMuteActive] = useState(false);
    const [hideImgActive, setHideImgActive] = useState(false);
    const [readModeActive, setReadModeActive] = useState(false);
    const [guideActive, setGuideActive] = useState(false);
    const [maskActive, setMaskActive] = useState(false);
    const [stopAnimActive, setStopAnimActive] = useState(false);
    const [hoverActive, setHoverActive] = useState(false);
    const [focusActive, setFocusActive] = useState(false);
    const [cursorBlackActive, setCursorBlackActive] = useState(false);
    const [cursorWhiteActive, setCursorWhiteActive] = useState(false);
    const [contrast, setContrast] = useState<'dark' | 'light' | 'high' | 'mono' | null>(null);

    const guideLineRef = useRef<HTMLDivElement>(null);
    const readingBarRef = useRef<HTMLDivElement>(null);

    // Handle Reset
    const handleReset = () => {
        setSeizureSafe(false);
        setKeyboardNav(false);
        setBlindMode(false);
        setVisionImpaired(false);
        setAdhdFriendly(false);
        setCognitiveDisability(false);
        setScalingActive(false);
        setFontActive(false);
        setTitlesActive(false);
        setLinksActive(false);
        setFontSize(100);
        setLineHeight(1.5);
        setLetterSpacing(0);
        setAlignment(null);
        setMuteActive(false);
        setHideImgActive(false);
        setReadModeActive(false);
        setGuideActive(false);
        setMaskActive(false);
        setStopAnimActive(false);
        setHoverActive(false);
        setFocusActive(false);
        setCursorBlackActive(false);
        setCursorWhiteActive(false);
        setContrast(null);
        
        // Clean up body classes and styles
        document.body.className = document.body.className.split(' ').filter(c => !c.startsWith('ac-')).join(' ');
        document.documentElement.style.fontSize = '';
        document.body.style.zoom = '1';
        document.body.style.lineHeight = '';
        document.body.style.letterSpacing = '';
        document.body.style.textAlign = '';
        document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, div').forEach(el => {
            (el as HTMLElement).style.lineHeight = '';
            (el as HTMLElement).style.letterSpacing = '';
            (el as HTMLElement).style.textAlign = '';
        });
        window.speechSynthesis.cancel();
    };

    // Apply classes and styles to body
    useEffect(() => {
        const body = document.body;
        
        // Profiles
        body.classList.toggle('ac-seizure-safe', seizureSafe);
        body.classList.toggle('ac-keyboard-nav', keyboardNav);
        body.classList.toggle('ac-blind-mode', blindMode);
        body.classList.toggle('ac-visual-impaired', visionImpaired);
        body.classList.toggle('ac-adhd', adhdFriendly);
        body.classList.toggle('ac-cognitive', cognitiveDisability);

        // Content
        body.classList.toggle('ac-readable-font', fontActive);
        body.classList.toggle('ac-highlight-titles', titlesActive || cognitiveDisability);
        body.classList.toggle('ac-highlight-links', linksActive || cognitiveDisability);
        body.style.zoom = scalingActive || visionImpaired ? '1.1' : '1';
        
        if (fontSize !== 100) document.documentElement.style.fontSize = `${fontSize}%`;
        else document.documentElement.style.fontSize = '';
        
        if (lineHeight !== 1.5 || letterSpacing !== 0) {
            body.classList.add('ac-text-adjusted');
            document.documentElement.style.setProperty('--ac-line-height', lineHeight.toString());
            document.documentElement.style.setProperty('--ac-letter-spacing', `${letterSpacing}px`);
        } else {
            body.classList.remove('ac-text-adjusted');
            document.documentElement.style.removeProperty('--ac-line-height');
            document.documentElement.style.removeProperty('--ac-letter-spacing');
        }

        if (alignment) {
            body.classList.add('ac-align-adjusted');
            document.documentElement.style.setProperty('--ac-text-align', alignment);
        } else {
            body.classList.remove('ac-align-adjusted');
            document.documentElement.style.removeProperty('--ac-text-align');
        }
        // Colors
        body.classList.remove('ac-dark-contrast', 'ac-light-contrast', 'ac-high-contrast', 'ac-grayscale');
        if (contrast === 'dark') body.classList.add('ac-dark-contrast');
        if (contrast === 'light') body.classList.add('ac-light-contrast');
        if (contrast === 'high') body.classList.add('ac-high-contrast');
        if (contrast === 'mono') body.classList.add('ac-grayscale');

        // Orientation
        body.classList.toggle('ac-hide-images', hideImgActive);
        body.classList.toggle('ac-read-mode', readModeActive);
        body.classList.toggle('ac-highlight-hover', hoverActive);
        body.classList.toggle('ac-highlight-focus', focusActive);
        body.classList.toggle('ac-cursor-black', cursorBlackActive);
        body.classList.toggle('ac-cursor-white', cursorWhiteActive);

        // Seizure Safe / Stop Anim
        if (seizureSafe || stopAnimActive) body.classList.add('ac-seizure-safe');

        // Keyboard Nav logic
        if (keyboardNav) {
            document.querySelectorAll('a, button, input, select, textarea, [role="button"]').forEach(el => {
                if (!el.getAttribute('tabindex')) el.setAttribute('tabindex', '0');
            });
        }

        // Mute logic
        document.querySelectorAll('audio, video').forEach(el => {
            (el as HTMLMediaElement).muted = muteActive;
        });

    }, [seizureSafe, keyboardNav, blindMode, visionImpaired, adhdFriendly, cognitiveDisability, 
        fontActive, titlesActive, linksActive, scalingActive, fontSize, lineHeight, letterSpacing, alignment,
        contrast, hideImgActive, readModeActive, hoverActive, focusActive, cursorBlackActive, cursorWhiteActive, stopAnimActive, muteActive]);

    // Global Listeners (Mouse Move for Guide/Mask, Mouse Over for TTS)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (guideActive && guideLineRef.current) {
                guideLineRef.current.style.top = `${e.clientY}px`;
            }
            if ((adhdFriendly || maskActive) && readingBarRef.current) {
                readingBarRef.current.style.top = `${e.clientY - 75}px`;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            if (blindMode) {
                const target = e.target as HTMLElement;
                if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A', 'BUTTON', 'SPAN', 'LI'].includes(target.tagName)) {
                    const text = target.getAttribute('aria-label') || target.getAttribute('alt') || target.innerText;
                    if (text && text.trim().length > 0) {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(text);
                        window.speechSynthesis.speak(utterance);
                    }
                }
            }
        };

        if (guideActive || adhdFriendly || maskActive) {
            document.addEventListener('mousemove', handleMouseMove);
        }
        if (blindMode) {
            document.addEventListener('mouseover', handleMouseOver);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [guideActive, adhdFriendly, maskActive, blindMode]);

    return (
        <div id="accessibility-widget">
            {/* Mask for ADHD */}
            <div id="ac-reading-bar" ref={readingBarRef} style={{ display: adhdFriendly || maskActive ? 'block' : 'none' }}></div>
            {/* Reading Guide Line */}
            <div id="ac-guide-line" ref={guideLineRef} style={{ display: guideActive ? 'block' : 'none' }}></div>

            {/* Float Button */}
            <button 
                id="accessibility-widget-btn" 
                aria-label="Accessibility Menu"
                onClick={() => setIsOpen(!isOpen)}
                style={{ 
                    cursor: 'pointer', 
                    pointerEvents: 'auto',
                    zIndex: 1000000,
                    position: 'fixed' // Ensure it has a position for z-index to work
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>
            </button>

            {/* Panel */}
            <div 
                id="accessibility-panel" 
                className={isOpen ? 'open' : ''}
                style={{
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                    visibility: isOpen ? 'visible' : 'hidden'
                }}
            >
                <div className="ac-header">
                    <h2>Accessibility Adjustments</h2>
                    <div className="ac-header-actions">
                        <button className="ac-btn-small" onClick={handleReset}>Reset Settings</button>
                        <button className="ac-btn-small" onClick={() => setIsOpen(false)}>Hide Interface</button>
                    </div>
                </div>
                
                <div className="ac-search">
                    <input type="text" placeholder="Unclear content? Search in dictionary..." />
                </div>

                <div className="ac-content">
                    {/* Profile Section */}
                    <div className="ac-section">
                        <div className="ac-section-title">Choose the right accessibility profile for you</div>
                        
                        {[
                            { id: 'seizure', label: 'Seizure Safe Profile', desc: 'Clear flashes & reduces color', state: seizureSafe, setter: setSeizureSafe },
                            { id: 'keyboard', label: 'Keyboard Navigation Profile', desc: 'Enables keyboard navigation support', state: keyboardNav, setter: setKeyboardNav },
                            { id: 'blind', label: 'Blind Users (Screen Reader)', desc: 'Optimizes website for screen readers', state: blindMode, setter: setBlindMode },
                            { id: 'vision', label: 'Vision Impaired Profile', desc: 'Enhances website\'s visuals', state: visionImpaired, setter: setVisionImpaired },
                            { id: 'adhd', label: 'ADHD Friendly Profile', desc: 'More focus & fewer distractions', state: adhdFriendly, setter: setAdhdFriendly },
                            { id: 'cognitive', label: 'Cognitive Disability Profile', desc: 'Assists with reading & focusing', state: cognitiveDisability, setter: setCognitiveDisability }
                        ].map(profile => (
                            <div className="ac-profile-item" key={profile.id}>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{profile.label}</div>
                                    <div style={{ fontSize: '11px', color: '#666' }}>{profile.desc}</div>
                                </div>
                                <label className="ac-toggle">
                                    <input type="checkbox" checked={profile.state} onChange={(e) => profile.setter(e.target.checked)} />
                                    <span className="ac-slider round">
                                        <span className="on-label">ON</span>
                                        <span className="off-label">OFF</span>
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Content Adjustments */}
                    <div className="ac-section">
                        <div className="ac-section-title">Content Adjustments</div>
                        <div className="ac-grid">
                            <div className={`ac-card ${scalingActive ? 'active' : ''}`} onClick={() => setScalingActive(!scalingActive)}>
                                <div className="ac-card-icon">⤡</div>
                                <div className="ac-card-label">Content Scaling</div>
                            </div>
                            
                            <div className={`ac-card ${fontActive ? 'active' : ''}`} onClick={() => setFontActive(!fontActive)}>
                                <div className="ac-card-icon">A≡</div>
                                <div className="ac-card-label">Readable Font</div>
                            </div>

                            <div className={`ac-card ${titlesActive ? 'active' : ''}`} onClick={() => setTitlesActive(!titlesActive)}>
                                <div className="ac-card-icon">T</div>
                                <div className="ac-card-label">Highlight Titles</div>
                            </div>

                            <div className={`ac-card ${linksActive ? 'active' : ''}`} onClick={() => setLinksActive(!linksActive)}>
                                <div className="ac-card-icon">🔗</div>
                                <div className="ac-card-label">Highlight Links</div>
                            </div>
                            
                             <div className="ac-card">
                                <div className="ac-card-icon">🔍</div>
                                <div className="ac-card-label">Text Magnifier</div>
                            </div>

                            <div className="ac-card">
                                 <div className="ac-card-icon">A↕</div>
                                 <div className="ac-card-label">Adjust Font Sizing</div>
                                 <div className="ac-control-group">
                                    <button className="ac-control-btn" onClick={() => setFontSize(prev => Math.max(50, prev - 10))}>-</button>
                                    <span className="ac-control-val">{fontSize}%</span>
                                    <button className="ac-control-btn" onClick={() => setFontSize(prev => prev + 10)}>+</button>
                                 </div>
                            </div>

                            <div className="ac-card">
                                 <div className="ac-card-icon">↕</div>
                                 <div className="ac-card-label">Line Height</div>
                                 <div className="ac-control-group">
                                    <button className="ac-control-btn" onClick={() => setLineHeight(prev => Math.max(1.0, prev - 0.1))}>-</button>
                                    <span className="ac-control-val">{lineHeight.toFixed(1)}</span>
                                    <button className="ac-control-btn" onClick={() => setLineHeight(prev => prev + 0.1)}>+</button>
                                 </div>
                            </div>

                            <div className="ac-card">
                                 <div className="ac-card-icon">↔</div>
                                 <div className="ac-card-label">Letter Spacing</div>
                                 <div className="ac-control-group">
                                    <button className="ac-control-btn" onClick={() => setLetterSpacing(prev => Math.max(0, prev - 0.5))}>-</button>
                                    <span className="ac-control-val">{letterSpacing}</span>
                                    <button className="ac-control-btn" onClick={() => setLetterSpacing(prev => prev + 0.5)}>+</button>
                                 </div>
                            </div>

                            <div className={`ac-card ${alignment === 'left' ? 'active' : ''}`} onClick={() => setAlignment(alignment === 'left' ? null : 'left')}>
                                <div className="ac-card-icon">⇤</div>
                                <div className="ac-card-label">Align Left</div>
                            </div>
                            <div className={`ac-card ${alignment === 'center' ? 'active' : ''}`} onClick={() => setAlignment(alignment === 'center' ? null : 'center')}>
                                <div className="ac-card-icon">⇥⇤</div>
                                <div className="ac-card-label">Align Center</div>
                            </div>
                            <div className={`ac-card ${alignment === 'right' ? 'active' : ''}`} onClick={() => setAlignment(alignment === 'right' ? null : 'right')}>
                                <div className="ac-card-icon">⇥</div>
                                <div className="ac-card-label">Align Right</div>
                            </div>
                        </div>
                    </div>

                    {/* Orientation Adjustments */}
                    <div className="ac-section">
                        <div className="ac-section-title">Orientation Adjustments</div>
                        <div className="ac-grid">
                            <div className={`ac-card ${muteActive ? 'active' : ''}`} onClick={() => setMuteActive(!muteActive)}>
                                <div className="ac-card-icon">🔇</div>
                                <div className="ac-card-label">Mute Sounds</div>
                            </div>
                            <div className={`ac-card ${hideImgActive ? 'active' : ''}`} onClick={() => setHideImgActive(!hideImgActive)}>
                                <div className="ac-card-icon">🖼️</div>
                                <div className="ac-card-label">Hide Images</div>
                            </div>
                             <div className={`ac-card ${readModeActive ? 'active' : ''}`} onClick={() => setReadModeActive(!readModeActive)}>
                                <div className="ac-card-icon">📄</div>
                                <div className="ac-card-label">Read Mode</div>
                            </div>

                            <div className={`ac-card ${guideActive ? 'active' : ''}`} onClick={() => setGuideActive(!guideActive)}>
                                <div className="ac-card-icon">T</div>
                                <div className="ac-card-label">Reading Guide</div>
                            </div>

                             <div className="ac-card" style={{ gridColumn: 'span 2' }}>
                                <div className="ac-card-icon">🔗</div>
                                <div className="ac-card-label">Useful Links</div>
                                 <select 
                                    style={{ width: '80%', marginTop: '5px', padding: '2px' }} 
                                    onChange={(e) => { if(e.target.value) window.location.href=e.target.value; }}
                                 >
                                    <option value="">Select an option</option>
                                    <option value="/">Home</option>
                                    <option value="#content">Skip to Content</option>
                                </select>
                            </div>

                            <div className={`ac-card ${stopAnimActive ? 'active' : ''}`} onClick={() => setStopAnimActive(!stopAnimActive)}>
                                <div className="ac-card-icon">⚡</div>
                                <div className="ac-card-label">Stop Animations</div>
                            </div>
                             <div className={`ac-card ${maskActive ? 'active' : ''}`} onClick={() => setMaskActive(!maskActive)}>
                                <div className="ac-card-icon">⚏</div>
                                <div className="ac-card-label">Reading Mask</div>
                            </div>
                             <div className={`ac-card ${hoverActive ? 'active' : ''}`} onClick={() => setHoverActive(!hoverActive)}>
                                <div className="ac-card-icon">#</div>
                                <div className="ac-card-label">Highlight Hover</div>
                            </div>
                             <div className={`ac-card ${focusActive ? 'active' : ''}`} onClick={() => setFocusActive(!focusActive)}>
                                <div className="ac-card-icon">◎</div>
                                <div className="ac-card-label">Highlight Focus</div>
                            </div>
                            <div className={`ac-card ${cursorBlackActive ? 'active' : ''}`} onClick={() => { setCursorBlackActive(!cursorBlackActive); setCursorWhiteActive(false); }}>
                                <div className="ac-card-icon">👆</div>
                                <div className="ac-card-label">Big Black Cursor</div>
                            </div>
                             <div className={`ac-card ${cursorWhiteActive ? 'active' : ''}`} onClick={() => { setCursorWhiteActive(!cursorWhiteActive); setCursorBlackActive(false); }}>
                                <div className="ac-card-icon">👆🏻</div>
                                <div className="ac-card-label">Big White Cursor</div>
                            </div>
                        </div>
                    </div>

                    {/* Color Adjustments */}
                    <div className="ac-section">
                        <div className="ac-section-title">Color Adjustments</div>
                        <div className="ac-grid">
                            <div className={`ac-card ${contrast === 'dark' ? 'active' : ''}`} onClick={() => setContrast(contrast === 'dark' ? null : 'dark')}>
                                <div className="ac-card-icon">🌙</div>
                                <div className="ac-card-label">Dark Contrast</div>
                            </div>
                            <div className={`ac-card ${contrast === 'light' ? 'active' : ''}`} onClick={() => setContrast(contrast === 'light' ? null : 'light')}>
                                <div className="ac-card-icon">☀</div>
                                <div className="ac-card-label">Light Contrast</div>
                            </div>
                            <div className={`ac-card ${contrast === 'high' ? 'active' : ''}`} onClick={() => setContrast(contrast === 'high' ? null : 'high')}>
                                <div className="ac-card-icon">◑</div>
                                <div className="ac-card-label">High Contrast</div>
                            </div>
                             <div className={`ac-card ${contrast === 'mono' ? 'active' : ''}`} onClick={() => setContrast(contrast === 'mono' ? null : 'mono')}>
                                <div className="ac-card-icon">💧</div>
                                <div className="ac-card-label">Monochrome</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ac-footer">
                    Web Accessibility By ReVera
                </div>
            </div>
        </div>
    );
};

export default AccessibilityWidget;
