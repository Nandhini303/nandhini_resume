import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, ArrowDownRight, ArrowRight, Compass, ShieldAlert, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';
import Parallax from './Parallax';
import nandhiniProfile from '../assets/nandhini-profile.png';
import { useContent } from '../context/ContentProvider';
import { WordRotator } from '../theme/Modifiers';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ease = [0.16, 1, 0.3, 1];
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.1 + i * 0.08, ease } }),
};

const Hero = () => {
  const { settings } = useContent();
  const hero = settings.hero || {};
  const animationStyle = settings.theme?.layout?.animationStyle || 'default';

  const story = hero.story || [];
  const credentials = hero.credentials || [];
  const ticker = hero.ticker || [];
  const socials = hero.socials || {};
  const hiddenFields = hero.hiddenFields || [];
  const isVisible = (field) => !hiddenFields.includes(field);

  // ─── LAYOUT A: JOY RUSH (Playful Candy & Floaters) ───
  if (animationStyle === 'joyrush') {
    return (
      <section id="hero" data-edit-id="hero.section" data-edit-name="Hero" data-edit-kind="section" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-36 pb-12 bg-[#FDF7EE]">
        {/* Floating background clouds/bubbles */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-[20%] left-[10%] w-24 h-24 rounded-full bg-[#37B5A8]/10 blur-xl" />
          <motion.div animate={{ y: [0, 15, 0], x: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute bottom-[20%] right-[10%] w-32 h-32 rounded-full bg-[#E64B5A]/15 blur-xl" />
          <motion.div animate={{ y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} className="absolute top-[60%] left-[80%] w-16 h-16 rounded-full bg-yellow-300/20 blur-lg" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 text-center flex flex-col items-center">
          {/* Eyebrow badge */}
          {isVisible('badge') && (
            <motion.div custom={0} variants={rise} initial="hidden" animate="show" data-edit-id="hero.badge" data-edit-name="Hero · Badge" data-edit-kind="text" data-edit-path="hero.badge" className="px-5 py-2 rounded-full bg-[#E64B5A] text-[#FFF3F6] border-2 border-[#2C0E1E] shadow-[3px_3px_0px_#2C0E1E] text-xs font-bold uppercase tracking-wider">
              {hero.badge}
            </motion.div>
          )}

          {/* Heading */}
          <h1 data-edit-id="hero.headline" data-edit-name="Hero · Headline" data-edit-kind="heading" className="mt-8 font-display font-black text-black leading-[0.9] text-[clamp(2.75rem,8vw,5rem)] text-transform-lowercase">
            {(hero.headline || []).map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
            {isVisible('headlineAccent') && (
              <span data-edit-id="hero.accent" data-edit-name="Hero · Accent word" data-edit-kind="text" data-edit-path="hero.headlineAccent" className="block italic text-[#37B5A8] mt-2">{hero.headlineAccent}</span>
            )}
          </h1>

          {/* Subtitle */}
          {isVisible('subtitle') && (
            <p data-edit-id="hero.subtitle" data-edit-name="Hero · Subtitle" data-edit-kind="text" data-edit-path="hero.subtitle" className="mt-8 max-w-xl text-base sm:text-lg text-[#2C0E1E]/80 leading-relaxed font-semibold">
              {hero.subtitle?.replace(/<[^>]*>/g, '')}
            </p>
          )}

          {/* Visual Profile Avatar Bubble */}
          {isVisible('profileImage') && (
            <div className="relative mt-10 w-44 h-44 rounded-full border-4 border-[#2C0E1E] shadow-[6px_6px_0px_#2C0E1E] overflow-hidden bg-white">
              <img
                data-edit-id="hero.profileImage" data-edit-name="Hero · Profile image" data-edit-kind="image" data-edit-path="hero.profileImage"
                src={hero.profileImage || nandhiniProfile}
                alt={hero.name || 'Nandhini C'}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Button Stepper CTAs */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {isVisible('primaryCta') && (
              <a
                href={hero.primaryCta?.href || '#projects'}
                data-edit-id="hero.primaryCta" data-edit-name="Hero · Primary button" data-edit-kind="button" data-edit-path="hero.primaryCta.label"
                className="custom-element-button px-8 py-3.5 border-3 border-[#2C0E1E] text-black font-bold uppercase rounded-full shadow-[4px_4px_0px_#2C0E1E] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#2C0E1E] transition-all"
              >
                {hero.primaryCta?.label || 'View selected work'}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ─── LAYOUT B: K95 MINIMAL (Monochrome & Lines) ───
  if (animationStyle === 'k95') {
    return (
      <section id="hero" data-edit-id="hero.section" data-edit-name="Hero" data-edit-kind="section" className="relative min-h-screen flex flex-col justify-between pt-36 pb-12 bg-[#FAFAFA] text-[#111111] font-mono">
        {/* Hairline structural grids */}
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none -z-10">
          <div className="border-r border-line h-full" />
          <div className="border-r border-line h-full" />
          <div className="border-r border-line h-full" />
          <div className="h-full" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-5 flex flex-col justify-center flex-1">
          <div className="grid lg:grid-cols-4 gap-6 items-start">
            <div className="lg:col-span-1 text-xs space-y-4">
              <div>[01] INDEX</div>
              <div className="text-black/50">BRAND & DIGITAL DIGITAL EXPERT PORTFOLIO</div>
              {isVisible('badge') && (
                <div data-edit-id="hero.badge" data-edit-name="Hero · Badge" data-edit-kind="text" data-edit-path="hero.badge" className="underline">{hero.badge}</div>
              )}
            </div>

            <div className="lg:col-span-3">
              <h1 data-edit-id="hero.headline" data-edit-name="Hero · Headline" data-edit-kind="heading" className="font-display font-bold text-4xl sm:text-7xl uppercase tracking-tighter leading-none">
                {(hero.headline || []).map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
                {isVisible('headlineAccent') && (
                  <span data-edit-id="hero.accent" data-edit-name="Hero · Accent word" data-edit-kind="text" data-edit-path="hero.headlineAccent" className="block text-accent italic">{hero.headlineAccent}</span>
                )}
              </h1>

              {isVisible('subtitle') && (
                <p data-edit-id="hero.subtitle" data-edit-name="Hero · Subtitle" data-edit-kind="text" data-edit-path="hero.subtitle" className="mt-8 max-w-lg text-sm text-[#111111]/70 leading-relaxed uppercase">
                  {hero.subtitle?.replace(/<[^>]*>/g, '')}
                </p>
              )}

              <div className="mt-8 flex gap-4">
                {isVisible('primaryCta') && (
                  <a
                    href={hero.primaryCta?.href || '#projects'}
                    data-edit-id="hero.primaryCta" data-edit-name="Hero · Primary button" data-edit-kind="button" data-edit-path="hero.primaryCta.label"
                    className="custom-element-button px-6 py-2.5 border border-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all"
                  >
                    {hero.primaryCta?.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-5 flex justify-between items-end text-[10px] border-t border-line pt-6">
          <span>NANDHINI C PORTFOLIO Selected Works</span>
          <span>© 2026 EDITION</span>
        </div>
      </section>
    );
  }

  // ─── LAYOUT C: JULIEN CALOT ART ───
  if (animationStyle === 'juliencalot') {
    return (
      <section id="hero" data-edit-id="hero.section" data-edit-name="Hero" data-edit-kind="section" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-36 pb-12 bg-[#F4F1EC] text-[#1A1A1A]">
        <div className="w-full max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            {isVisible('badge') && (
              <span data-edit-id="hero.badge" data-edit-name="Hero · Badge" data-edit-kind="text" data-edit-path="hero.badge" className="text-xs uppercase tracking-[0.2em] text-[#FF2A54] font-bold">
                {hero.badge}
              </span>
            )}
            <h1 data-edit-id="hero.headline" data-edit-name="Hero · Headline" data-edit-kind="heading" className="mt-6 font-display font-extrabold text-5xl sm:text-8xl italic tracking-tight leading-none">
              {(hero.headline || []).map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
              {isVisible('headlineAccent') && (
                <span data-edit-id="hero.accent" data-edit-name="Hero · Accent word" data-edit-kind="text" data-edit-path="hero.headlineAccent" className="block text-[#FF2A54] not-italic font-black mt-2">{hero.headlineAccent}</span>
              )}
            </h1>

            {isVisible('subtitle') && (
              <p data-edit-id="hero.subtitle" data-edit-name="Hero · Subtitle" data-edit-kind="text" data-edit-path="hero.subtitle" className="mt-6 max-w-md text-base text-black/60 leading-relaxed font-mono">
                {hero.subtitle?.replace(/<[^>]*>/g, '')}
              </p>
            )}

            <div className="mt-8">
              {isVisible('primaryCta') && (
                <a
                  href={hero.primaryCta?.href || '#projects'}
                  data-edit-id="hero.primaryCta" data-edit-name="Hero · Primary button" data-edit-kind="button" data-edit-path="hero.primaryCta.label"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] text-white hover:bg-[#FF2A54] transition-all text-sm font-bold"
                >
                  {hero.primaryCta?.label} <ArrowRight size={16} />
                </a>
              )}
            </div>
          </div>

          {isVisible('profileImage') && (
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-96 rounded-2xl overflow-hidden border border-black/10 shadow-2xl">
                <img
                  data-edit-id="hero.profileImage" data-edit-name="Hero · Profile image" data-edit-kind="image" data-edit-path="hero.profileImage"
                  src={hero.profileImage || nandhiniProfile}
                  alt={hero.name || 'Nandhini C'}
                  className="w-full h-full object-cover filter saturate-125"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ─── LAYOUT D: DEPOLUXE (Brutalist Cinematic) ───
  if (animationStyle === 'depoluxe') {
    return (
      <section id="hero" data-edit-id="hero.section" data-edit-name="Hero" data-edit-kind="section" className="relative min-h-screen flex flex-col justify-center items-center bg-[#0B0B0B] text-[#E8E4DC] px-5 py-24 text-center">
        {/* Fullscreen muted video background layer */}
        {isVisible('videoSrc') && (
          <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
            <video
              src={hero.videoSrc || '/hero-animation.mp4'}
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          {isVisible('badge') && (
            <span data-edit-id="hero.badge" data-edit-name="Hero · Badge" data-edit-kind="text" data-edit-path="hero.badge" className="text-xs uppercase tracking-[0.3em] text-[#E8E4DC]/60 font-semibold mb-6">
              {hero.badge}
            </span>
          )}

          <h1 data-edit-id="hero.headline" data-edit-name="Hero · Headline" data-edit-kind="heading" className="font-display font-extrabold text-3xl sm:text-6xl uppercase tracking-[0.1em] leading-tight">
            {(hero.headline || []).map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
            {isVisible('headlineAccent') && (
              <span data-edit-id="hero.accent" data-edit-name="Hero · Accent word" data-edit-kind="text" data-edit-path="hero.headlineAccent" className="block text-white italic tracking-widest mt-2">{hero.headlineAccent}</span>
            )}
          </h1>

          {isVisible('subtitle') && (
            <p data-edit-id="hero.subtitle" data-edit-name="Hero · Subtitle" data-edit-kind="text" data-edit-path="hero.subtitle" className="mt-8 max-w-xl text-sm text-[#E8E4DC]/70 uppercase tracking-widest leading-loose">
              {hero.subtitle?.replace(/<[^>]*>/g, '')}
            </p>
          )}

          <div className="mt-10">
            {isVisible('primaryCta') && (
              <a
                href={hero.primaryCta?.href || '#projects'}
                data-edit-id="hero.primaryCta" data-edit-name="Hero · Primary button" data-edit-kind="button" data-edit-path="hero.primaryCta.label"
                className="custom-element-button px-10 py-4 border border-[#E8E4DC] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#E8E4DC] hover:text-[#0B0B0B] transition-all"
              >
                {hero.primaryCta?.label}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ─── LAYOUT E: RADIAN (Neon Hazard Sports) ───
  if (animationStyle === 'radian') {
    return (
      <section id="hero" data-edit-id="hero.section" data-edit-name="Hero" data-edit-kind="section" className="relative min-h-screen flex flex-col justify-center bg-black text-white overflow-hidden pt-36 pb-12">
        {/* Full-width neon lines background */}
        <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_center,rgba(243,208,22,0.06)_0%,transparent_60%)]" />

        <div className="w-full max-w-7xl mx-auto px-5 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            {isVisible('badge') && (
              <span data-edit-id="hero.badge" data-edit-name="Hero · Badge" data-edit-kind="text" data-edit-path="hero.badge" className="inline-block px-3 py-1 bg-[#F3D016] text-black font-mono text-xs font-bold uppercase tracking-widest mb-6">
                {hero.badge}
              </span>
            )}

            <h1 data-edit-id="hero.headline" data-edit-name="Hero · Headline" data-edit-kind="heading" className="font-display font-black uppercase text-5xl sm:text-8xl tracking-tighter leading-[0.85]">
              {(hero.headline || []).map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
              {isVisible('headlineAccent') && (
                <span data-edit-id="hero.accent" data-edit-name="Hero · Accent word" data-edit-kind="text" data-edit-path="hero.headlineAccent" className="block text-[#F3D016]">{hero.headlineAccent}</span>
              )}
            </h1>

            {isVisible('subtitle') && (
              <p data-edit-id="hero.subtitle" data-edit-name="Hero · Subtitle" data-edit-kind="text" data-edit-path="hero.subtitle" className="mt-8 max-w-md text-sm sm:text-base text-white/60 leading-relaxed font-mono">
                {hero.subtitle?.replace(/<[^>]*>/g, '')}
              </p>
            )}

            <div className="mt-8">
              {isVisible('primaryCta') && (
                <a
                  href={hero.primaryCta?.href || '#projects'}
                  data-edit-id="hero.primaryCta" data-edit-name="Hero · Primary button" data-edit-kind="button" data-edit-path="hero.primaryCta.label"
                  className="custom-element-button inline-flex items-center gap-2 px-8 py-3.5 bg-[#F3D016] text-black font-bold uppercase hover:shadow-[0_0_15px_#F3D016] transition-all text-xs tracking-wider"
                >
                  {hero.primaryCta?.label}
                </a>
              )}
            </div>
          </div>

          {isVisible('videoSrc') && (
            <div className="lg:col-span-5 flex justify-center relative">
              {/* GPS meta display box */}
              <div className="absolute top-4 right-4 z-20 font-mono text-[9px] text-[#F3D016] bg-black/60 px-2 py-1 rounded border border-[#F3D016]/20">
                COORD: 54.3439°N 7.6321°W
              </div>
              
              <div className="w-full max-w-sm aspect-square bg-[#111111] border-2 border-[#F3D016] p-2 relative">
                <video
                  src={hero.videoSrc || '/hero-animation.mp4'}
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ─── DEFAULT PORTFOLIO HERO ───
  return (
    <section id="hero" data-edit-id="hero.section" data-edit-name="Hero" data-edit-kind="section" className="relative min-h-dvh flex flex-col justify-center overflow-hidden pt-36 sm:pt-40 pb-12">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(120% 90% at 85% 10%, color-mix(in srgb, var(--color-accent) 10%, transparent) 0%, transparent 55%)' }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(120%_100%_at_50%_0%,black_35%,transparent_80%)]"
      />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="lg:col-span-7">
          {isVisible('badge') && (
            <motion.div custom={0} variants={rise} initial="hidden" animate="show">
              <div data-edit-id="hero.badge" data-edit-name="Hero · Badge" data-edit-kind="text" data-edit-path="hero.badge" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-surface/70 backdrop-blur text-xs sm:text-sm font-medium text-ink-soft">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {hero.badge}
              </div>
            </motion.div>
          )}

          <h1 data-edit-id="hero.headline" data-edit-name="Hero · Headline" data-edit-kind="heading" className="mt-6 font-display font-extrabold text-ink leading-[0.92] tracking-tight text-[clamp(2.75rem,7vw,5.5rem)]">
            {(hero.headline || []).map((line, i) => (
              <motion.span key={i} custom={i + 1} variants={rise} initial="hidden" animate="show" className="block">{line}</motion.span>
            ))}
            {isVisible('headlineAccent') && (
              <motion.span custom={(hero.headline || []).length + 1} variants={rise} initial="hidden" animate="show" className="block">
                <span data-edit-id="hero.accent" data-edit-name="Hero · Accent word" data-edit-kind="text" data-edit-path="hero.headlineAccent" className="italic font-medium text-accent">{hero.headlineAccent}</span>
              </motion.span>
            )}
          </h1>

          {isVisible('subtitle') && (
            <motion.p
              data-edit-id="hero.subtitle" data-edit-name="Hero · Subtitle" data-edit-kind="text" data-edit-path="hero.subtitle"
              custom={4} variants={rise} initial="hidden" animate="show"
              className="mt-6 max-w-lg text-base sm:text-lg text-ink-soft leading-relaxed"
              dangerouslySetInnerHTML={{ __html: hero.subtitle }}
            />
          )}

          {isVisible('story') && story.length > 0 && (
            <motion.div custom={5} variants={rise} initial="hidden" animate="show" className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3">
              {story.map((s, i) => (
                <React.Fragment key={s.k}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 backdrop-blur pl-2 pr-3.5 py-1.5">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-bg text-[11px] font-mono font-bold">{s.k}</span>
                    <span className="text-xs sm:text-sm font-medium text-ink-soft">{s.label}</span>
                  </div>
                  {i < story.length - 1 && <ArrowRight size={16} className="text-ink-soft/40 shrink-0" aria-hidden />}
                </React.Fragment>
              ))}
            </motion.div>
          )}

          <motion.div custom={6} variants={rise} initial="hidden" animate="show" className="mt-9 flex flex-wrap items-center gap-4">
            {isVisible('primaryCta') && (
              <MagneticButton
                href={hero.primaryCta?.href || '#projects'}
                data-edit-id="hero.primaryCta" data-edit-name="Hero · Primary button" data-edit-kind="button" data-edit-path="hero.primaryCta.label"
                className="group gap-2 rounded-full bg-ink text-bg px-8 py-4 text-base font-semibold shadow-[0_10px_30px_-10px_rgba(9,9,11,0.5)] hover:bg-accent hover:text-ink transition-colors duration-300"
              >
                {hero.primaryCta?.label || 'View selected work'}
                <ArrowDownRight size={19} className="group-hover:translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </MagneticButton>
            )}
            {isVisible('secondaryCta') && (
              <MagneticButton
                href={hero.secondaryCta?.href || '/resume.pdf'} download strength={0.25}
                data-edit-id="hero.secondaryCta" data-edit-name="Hero · Secondary button" data-edit-kind="button" data-edit-path="hero.secondaryCta.label"
                className="gap-2 rounded-full border border-ink/15 bg-surface/70 backdrop-blur px-8 py-4 text-base font-semibold text-ink hover:border-ink/40 transition-colors duration-300"
              >
                {hero.secondaryCta?.label || 'Download résumé'}
                <ArrowUpRight size={17} />
              </MagneticButton>
            )}
          </motion.div>

          <motion.div custom={7} variants={rise} initial="hidden" animate="show" className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            {isVisible('credentials') && credentials.length > 0 && (
              <>
                <div className="flex items-center gap-6 sm:gap-8">
                  {credentials.map((c) => (
                    <div key={c.label}>
                      <div className="font-display font-extrabold text-2xl sm:text-3xl text-ink tabular-nums leading-none">{c.value}</div>
                      <div className="mt-1 text-[11px] sm:text-xs text-ink-soft">{c.label}</div>
                    </div>
                  ))}
                </div>
                <div className="hidden sm:block h-10 w-px bg-line" />
              </>
            )}
            <div className="flex items-center gap-5 text-ink-soft">
              {socials.github && <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors"><GithubIcon /></a>}
              {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><LinkedinIcon /></a>}
              {socials.email && <a href={`mailto:${socials.email}`} className="hover:text-danger transition-colors"><Mail size={20} /></a>}
            </div>
          </motion.div>
        </div>

        {(isVisible('videoSrc') || isVisible('profileImage')) && (
          <Parallax speed={60} className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.25 }}>
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative mx-auto max-w-md">
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/25 via-indigo-300/20 to-transparent blur-3xl" />
                
                {isVisible('videoSrc') && (
                  <div className="relative rounded-[1.75rem] border border-line bg-surface p-2 shadow-[0_40px_90px_-30px_rgba(9,9,11,0.4)]">
                    <video
                      data-edit-id="hero.videoSrc" data-edit-name="Hero · Video" data-edit-kind="image" data-edit-path="hero.videoSrc"
                      className="w-full rounded-[1.35rem] aspect-square object-cover bg-ink"
                      src={hero.videoSrc || '/hero-animation.mp4'}
                      autoPlay muted loop playsInline preload="auto"
                    />
                    {(isVisible('videoCaption') || isVisible('videoSubCaption')) && (
                      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl bg-surface/85 backdrop-blur px-4 py-2.5 border border-line">
                        {isVisible('videoCaption') && <span data-edit-id="hero.videoCaption" data-edit-name="Hero · Video caption" data-edit-kind="text" data-edit-path="hero.videoCaption" className="font-display font-semibold text-ink text-sm">{hero.videoCaption || 'Data · in motion'}</span>}
                        {isVisible('videoSubCaption') && <span data-edit-id="hero.videoSubCaption" data-edit-name="Hero · Video subcaption" data-edit-kind="text" data-edit-path="hero.videoSubCaption" className="text-xs text-ink-soft font-mono">{hero.videoSubCaption || 'SQL · Python · BI'}</span>}
                      </div>
                    )}
                  </div>
                )}
                
                {isVisible('profileImage') && (isVisible('name') || isVisible('role')) && (
                  <div className="absolute -top-5 -left-5 sm:-left-8 flex items-center gap-3 rounded-2xl bg-surface/90 backdrop-blur border border-line shadow-[0_20px_45px_-20px_rgba(9,9,11,0.5)] pl-2 pr-4 py-2">
                    <div className="relative shrink-0">
                      <div className="absolute -inset-[3px] rounded-full" style={{ background: 'conic-gradient(from 0deg, var(--color-primary), #6366F1, #a5b4fc, var(--color-primary))' }} />
                      <img
                        data-edit-id="hero.profileImage" data-edit-name="Hero · Profile image" data-edit-kind="image" data-edit-path="hero.profileImage"
                        src={hero.profileImage || nandhiniProfile}
                        alt={hero.name || 'Nandhini C'}
                        className="relative h-14 w-14 rounded-full object-cover border-2 border-surface"
                        style={{ objectPosition: '50% 22%' }}
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-500 border-2 border-surface" />
                    </div>
                    <div className="leading-tight">
                      {isVisible('name') && <p data-edit-id="hero.profileName" data-edit-name="Hero · Profile name" data-edit-kind="text" data-edit-path="hero.name" className="font-display font-bold text-ink text-sm">{hero.name || 'Nandhini C'}</p>}
                      {isVisible('role') && <p data-edit-id="hero.profileRole" data-edit-name="Hero · Profile role" data-edit-kind="text" data-edit-path="hero.role" className="text-[11px] text-ink-soft font-mono">{hero.role || 'IT Student'}</p>}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </Parallax>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10 mt-14 border-y border-line bg-surface/50 backdrop-blur py-3.5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="flex w-max animate-marquee">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6 text-sm font-mono uppercase tracking-wider text-ink-soft">
              {t}
              <span className="h-1 w-1 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
