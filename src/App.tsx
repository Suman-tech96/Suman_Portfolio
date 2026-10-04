import React, { useState, useEffect, useRef } from 'react';
import { WelcomeIntro3D } from './components/intro/WelcomeIntro3D';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { TrustStrip } from './components/trust/TrustStrip';
import { EditorialIntro } from './components/intro/EditorialIntro';
import { ProjectsShowcase } from './components/projects/ProjectsShowcase';
import { ServicesSection } from './components/services/ServicesSection';
import { WhyWorkWithMe } from './components/why/WhyWorkWithMe';
import { ProcessTimeline } from './components/process/ProcessTimeline';
import { AboutSection } from './components/about/AboutSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/animations/CustomCursor';
import { ScrollProgress } from './components/animations/ScrollProgress';
import luzRojaAudio from './assets/Luz Roja.mp3';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedServiceInquiry, setSelectedServiceInquiry] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and manage Luz Roja song playback
  useEffect(() => {
    const audio = new Audio(luzRojaAudio);
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';
    audioRef.current = audio;

    const handleEnded = () => setIsAudioPlaying(false);
    const handlePause = () => setIsAudioPlaying(false);
    const handlePlay = () => setIsAudioPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // High-Performance IntersectionObserver for Active Nav Highlighting
  useEffect(() => {
    const sectionIds = ['hero', 'work', 'services', 'why-me', 'process', 'about', 'experience', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleAmbientAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch(err => {
          console.warn('Audio playback failed or was blocked by browser policy:', err);
        });
    }
  };

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProject = () => {
    scrollToSection('contact');
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceInquiry(serviceTitle);
    scrollToSection('contact');
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip bg-[#000000] text-[#F5F2EB] selection:bg-[#FF4D00] selection:text-black">
      {/* 3D Cinematic Diagonal Unzip Intro */}
      <WelcomeIntro3D />

      {/* Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Viewport Scroll Progress Bar */}
      <ScrollProgress />

      {/* Primary Sticky Header */}
      <Navbar
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={toggleAmbientAudio}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="w-full max-w-full overflow-x-clip">
        {/* Hero Section */}
        <HeroSection
          onExploreWork={() => scrollToSection('work')}
          onStartProject={handleStartProject}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={toggleAmbientAudio}
        />

        {/* Technology Marquee Strip */}
        <TrustStrip />

        {/* Editorial Statement & Capabilities */}
        <EditorialIntro />

        {/* Featured Case Studies & Projects */}
        <ProjectsShowcase onStartProject={handleStartProject} />

        {/* Freelance Services Grid */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Trust & Engineering Advantages */}
        <WhyWorkWithMe />

        {/* 7-Step Development Process */}
        <ProcessTimeline onStartProject={handleStartProject} />

        {/* About Suman Jana */}
        <AboutSection
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={toggleAmbientAudio}
        />

        {/* Professional Experience History */}
        <ExperienceSection />

        {/* High-Conversion Contact & Inquiry Section */}
        <ContactSection initialProjectInquiry={selectedServiceInquiry} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
