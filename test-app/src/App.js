import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCirclePause, FaCirclePlay, FaGithub, FaLinkedin } from 'react-icons/fa6';
import DestinationContent from './space/DestinationContent';
import Starfield from './space/Starfield';
import { destinations, profile } from './space/content';
import { locale } from './space/locale';
import './App.scss';

const motionQuery = '(prefers-reduced-motion: reduce)';
const socialIcons = { GitHub: FaGithub, LinkedIn: FaLinkedin };

function getDestination() {
  const hash = window.location.hash.slice(1);
  return destinations.find(({ id, route }) => id === hash || route === hash);
}

function Planet({ destination, active, hidden, language, onNavigate }) {
  const { id, route, x, y } = destination;
  const [label] = destination[language];
  return (
    <a
      className={`planet planet--${id}`}
      href={`#${route || id}`}
      style={{ '--x': `${x}%`, '--y': `${y}%` }}
      aria-current={active ? 'location' : undefined}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      onClick={(event) => onNavigate(event, destination)}
    >
      <span className="planet-art" aria-hidden="true">
        <span className="planet-surface" />
        <span className="planet-ring" />
      </span>
      <span className="planet-label">{label}</span>
    </a>
  );
}

function App() {
  const [destination, setDestination] = useState(getDestination);
  const [language, setLanguage] = useState(() => {
    try {
      return window.localStorage.getItem('portfolio-language') === 'ar' ? 'ar' : 'en';
    } catch {
      return 'en';
    }
  });
  const copy = locale[language];
  const [motionOverride, setMotionOverride] = useState(null);
  const [prefersReduced, setPrefersReduced] = useState(() => window.matchMedia?.(motionQuery).matches ?? false);
  const headingRef = useRef(null);
  const moveFocus = useRef(false);
  const paused = motionOverride ?? prefersReduced;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.title = `${copy.name} — ${copy.portfolio}`;
    try {
      window.localStorage.setItem('portfolio-language', language);
    } catch {
      // The language switch works for the current visit when storage is unavailable.
    }
  }, [copy, language]);

  useEffect(() => {
    function readLocation() {
      setDestination(getDestination());
    }

    window.addEventListener('hashchange', readLocation);
    window.addEventListener('popstate', readLocation);
    const motion = window.matchMedia?.(motionQuery);
    const updateMotion = (event) => setPrefersReduced(event.matches);
    motion?.addEventListener('change', updateMotion);
    return () => {
      window.removeEventListener('hashchange', readLocation);
      window.removeEventListener('popstate', readLocation);
      motion?.removeEventListener('change', updateMotion);
    };
  }, []);

  useEffect(() => {
    if (moveFocus.current) {
      window.scrollTo(0, 0);
      headingRef.current?.focus({ preventScroll: true });
      moveFocus.current = false;
    }
  }, [destination]);

  function navigate(event, next) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (next === destination) return;
    moveFocus.current = true;
    const hash = next?.route || next?.id || 'home';
    window.history.pushState(null, '', `#${hash}`);
    setDestination(next);
  }

  const camera = destination ? {
    '--target-x': `${50 - destination.x}%`,
    '--target-y': `${48 - destination.y}%`,
    '--origin-x': `${destination.x}%`,
    '--origin-y': `${destination.y}%`,
  } : undefined;

  return (
    <div className={`observatory ${paused ? 'motion-paused' : ''} ${destination ? 'has-destination' : ''}`}>
      <div className="deep-space" aria-hidden="true" />
      <Starfield paused={paused} />
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={(event) => navigate(event)} aria-label={`${copy.name}, ${copy.home}`}>
          <span className="wordmark-symbol" aria-hidden="true">✧</span>
          <span>{copy.name}</span>
        </a>
        <nav className="site-navigation" aria-label={copy.navigation}>
          <a href="#home" aria-current={!destination ? 'location' : undefined} onClick={(event) => navigate(event)}>{copy.home}</a>
          {destinations.map((item) => (
            <a
              key={item.id}
              href={`#${item.route || item.id}`}
              aria-current={destination === item ? 'location' : undefined}
              onClick={(event) => navigate(event, item)}
            >
              {item[language][0]}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <button className="language-toggle" type="button" lang={language === 'ar' ? 'en' : 'ar'} onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}>
            {copy.language}
          </button>
          <button
            className="motion-toggle"
            type="button"
            onClick={() => setMotionOverride(!paused)}
            aria-label={paused ? copy.play : copy.pause}
            title={paused ? copy.play : copy.pause}
          >
            {paused ? <FaCirclePlay /> : <FaCirclePause />}
          </button>
        </div>
      </header>

      <main className="observatory-main">
        <div className="intro">
          {destination ? (
            <section className="destination-panel" key={destination.id} aria-labelledby="destination-title">
              <a className="back-link" href="#home" onClick={(event) => navigate(event)}><FaArrowLeft /> {copy.starMap}</a>
              <h1 id="destination-title" tabIndex={-1} ref={headingRef}>{destination[language][1]}</h1>
              <DestinationContent destination={destination.id} language={language} copy={copy} />
            </section>
          ) : (
            <section className="home-intro" aria-labelledby="home-title">
              <p className="intro-eyebrow"><span aria-hidden="true" /> {copy.portfolio}</p>
              <p className="intro-hello">{copy.hello}</p>
              <h1 id="home-title" tabIndex={-1} ref={headingRef}>
                {copy.firstName}<br />
                <em>{copy.lastName}</em>
              </h1>
              {copy.intro.map((paragraph) => <p className="intro-description" key={paragraph}>{paragraph}</p>)}
              <a className="primary-action" href="#projects1" onClick={(event) => navigate(event, destinations[2])}>
                {copy.explore} <FaArrowRight />
              </a>
            </section>
          )}
        </div>

        <section className="atlas" aria-label={copy.starMap}>
          <div className="atlas-heading"><span aria-hidden="true">✦</span> {copy.starMap}</div>
          {!destination && <p className="atlas-hint">{copy.mapHint}</p>}
          <div className="camera" style={camera}>
            <div className="orbits" aria-hidden="true"><i /><i /><i /><i /><b /></div>
            {destinations.map((item) => (
              <Planet key={item.id} destination={item} active={destination === item} hidden={Boolean(destination && destination !== item)} language={language} onNavigate={navigate} />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p><span aria-hidden="true">✧</span> {copy.location}</p>
        <div className="social-links" aria-label={copy.social}>
          {profile.links.map(({ label, href }) => {
            const Icon = socialIcons[label];
            return <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"><Icon /></a>;
          })}
        </div>
      </footer>
    </div>
  );
}

export default App;
