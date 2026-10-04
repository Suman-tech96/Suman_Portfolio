import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ProjectItem } from '../../types/portfolio';
import { 
  Play, 
  Pause, 
  Orbit, 
  Radar, 
  Eye, 
  ArrowUpRight, 
  ExternalLink, 
  Zap, 
  CheckCircle2,
  X,
  ArrowRight
} from 'lucide-react';

interface SolarGalaxy3DProps {
  projects: ProjectItem[];
  selectedProject: ProjectItem | null;
  onSelectProject: (project: ProjectItem) => void;
  onOpenCaseStudy: (project: ProjectItem) => void;
}

interface PlanetConfig {
  id: string;
  distance: number;
  size: number;
  speed: number;
  color: number;
  hasRing?: boolean;
  ringColor?: number;
  startAngle: number;
  shortLabel: string;
}

const PLANET_CONFIGS: Record<string, PlanetConfig> = {
  'restaurant-pos': {
    id: 'restaurant-pos',
    distance: 44,
    size: 4.6,
    speed: 0.012,
    color: 0xff4d00,
    hasRing: false,
    startAngle: 0.8,
    shortLabel: '01 POS & KDS',
  },
  'enterprise-erp': {
    id: 'enterprise-erp',
    distance: 72,
    size: 5.6,
    speed: 0.009,
    color: 0x00f0ff,
    hasRing: true,
    ringColor: 0x38bdf8,
    startAngle: 2.1,
    shortLabel: '02 HDT ERP & QM',
  },
  'greencart-platform': {
    id: 'greencart-platform',
    distance: 100,
    size: 5.0,
    speed: 0.007,
    color: 0x10b981,
    hasRing: false,
    startAngle: 3.4,
    shortLabel: '03 GREENCART',
  },
  'pingme-realtime': {
    id: 'pingme-realtime',
    distance: 128,
    size: 6.2,
    speed: 0.0052,
    color: 0x8b5cf6,
    hasRing: true,
    ringColor: 0xc084fc,
    startAngle: 4.7,
    shortLabel: '04 PINGME CHAT',
  },
  'ems-platform': {
    id: 'ems-platform',
    distance: 156,
    size: 5.2,
    speed: 0.0038,
    color: 0xf59e0b,
    hasRing: false,
    startAngle: 5.8,
    shortLabel: '05 EMS PAYROLL',
  },
  'digitalcxos-platform': {
    id: 'digitalcxos-platform',
    distance: 186,
    size: 6.8,
    speed: 0.0028,
    color: 0x3b82f6,
    hasRing: true,
    ringColor: 0x93c5fd,
    startAngle: 1.2,
    shortLabel: '06 DIGITALCXOS',
  },
};

export const SolarGalaxy3D: React.FC<SolarGalaxy3DProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  onOpenCaseStudy,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [cameraMode, setCameraMode] = useState<'orbital' | 'topdown' | 'horizon'>('orbital');
  const [activePopupProject, setActivePopupProject] = useState<ProjectItem | null>(null);

  // High performance mutable refs to avoid any React re-renders or scene tear-downs
  const isPlayingRef = useRef(true);
  const speedRef = useRef(1.0);
  const cameraModeRef = useRef<'orbital' | 'topdown' | 'horizon'>('orbital');
  const targetCameraPos = useRef(new THREE.Vector3(0, 135, 215));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const activeProjectIdRef = useRef<string | null>(null);
  const hoveredPlanetIdRef = useRef<string | null>(null);

  isPlayingRef.current = isPlaying;
  speedRef.current = speedMultiplier;
  cameraModeRef.current = cameraMode;
  activeProjectIdRef.current = activePopupProject?.id || selectedProject?.id || null;

  useEffect(() => {
    if (cameraMode === 'orbital') {
      targetCameraPos.current.set(0, 135, 215);
      targetLookAt.current.set(0, 0, 0);
    } else if (cameraMode === 'topdown') {
      targetCameraPos.current.set(0, 250, 1);
      targetLookAt.current.set(0, 0, 0);
    } else if (cameraMode === 'horizon') {
      targetCameraPos.current.set(0, 20, 230);
      targetLookAt.current.set(0, 10, 0);
    }
  }, [cameraMode]);

  useEffect(() => {
    if (selectedProject) {
      setActivePopupProject(selectedProject);
    }
  }, [selectedProject]);

  // Main Three.js Scene Lifecycle — Runs ONCE on mount
  useEffect(() => {
    const container = mountRef.current;
    const labelsContainer = labelsContainerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 600;

    // --- Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 2000);
    camera.position.set(0, 135, 215);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x222233, 1.8);
    scene.add(ambientLight);

    const sunPointLight = new THREE.PointLight(0xff9900, 4.2, 700, 0.7);
    sunPointLight.position.set(0, 0, 0);
    scene.add(sunPointLight);

    const fillLight = new THREE.DirectionalLight(0x00f0ff, 0.65);
    fillLight.position.set(100, 90, 80);
    scene.add(fillLight);

    // --- Spiral Galaxy Starfield ---
    const starCount = 2200;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);
    const starPalette = [
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#00F0FF'),
      new THREE.Color('#FF4D00'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#F59E0B'),
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), 0.55) * 380;
      const arms = 3;
      const armOffset = (i % arms) * ((2 * Math.PI) / arms);
      const spin = r * 0.014;
      const angle = armOffset + spin + (Math.random() - 0.5) * 0.85;

      starPos[i3] = Math.cos(angle) * r;
      starPos[i3 + 1] = (Math.random() - 0.5) * (45 + (380 - r) * 0.08);
      starPos[i3 + 2] = Math.sin(angle) * r;

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      starCols[i3] = col.r;
      starCols[i3 + 1] = col.g;
      starCols[i3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // --- Central Sun (Innovation Nexus Core) ---
    const sunGroup = new THREE.Group();
    const sunGeo = new THREE.SphereGeometry(12, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Inner Corona
    const innerCoronaGeo = new THREE.SphereGeometry(16, 32, 32);
    const innerCoronaMat = new THREE.MeshBasicMaterial({
      color: 0xff8800,
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const innerCorona = new THREE.Mesh(innerCoronaGeo, innerCoronaMat);
    sunGroup.add(innerCorona);

    // Outer Flare
    const outerFlareGeo = new THREE.SphereGeometry(22, 32, 32);
    const outerFlareMat = new THREE.MeshBasicMaterial({
      color: 0xffbb00,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const outerFlare = new THREE.Mesh(outerFlareGeo, outerFlareMat);
    sunGroup.add(outerFlare);
    scene.add(sunGroup);

    // --- Orbital System Setup ---
    interface PlanetEntry {
      id: string;
      project: ProjectItem;
      config: PlanetConfig;
      group: THREE.Group;
      mesh: THREE.Mesh;
      glowMesh: THREE.Mesh;
      orbitLine: THREE.Line;
      orbitHitMesh: THREE.Mesh;
      currentAngle: number;
      labelDom: HTMLElement | null;
    }

    const planetEntries: PlanetEntry[] = [];
    const interactiveMeshes: THREE.Object3D[] = [];

    // Reset labels container
    if (labelsContainer) {
      labelsContainer.innerHTML = '';
    }

    // 1. Create Sun Center Label (Perfect 3D Center Projection)
    let sunLabelDom: HTMLElement | null = null;
    if (labelsContainer) {
      sunLabelDom = document.createElement('div');
      sunLabelDom.className = 'absolute pointer-events-none select-none z-10 transition-transform duration-75';
      sunLabelDom.style.transform = 'translate3d(-50%, 20px, 0)';
      sunLabelDom.innerHTML = `
        <div class="flex flex-col items-center justify-center">
          <div class="px-2.5 py-0.5 rounded-full bg-black/85 backdrop-blur-md border border-[#FF4D00]/50 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,77,0,0.45)]">
            <span class="h-1.5 w-1.5 rounded-full bg-[#FF4D00] animate-pulse"></span>
            <span class="text-[8px] font-mono text-zinc-200 uppercase tracking-widest font-bold">
              INNOVATION CORE
            </span>
          </div>
        </div>
      `;
      labelsContainer.appendChild(sunLabelDom);
    }

    // 2. Setup Planets & Orbit Tracks
    projects.forEach((proj, pIdx) => {
      const fallbackConfig: PlanetConfig = {
        id: proj.id,
        distance: 44 + pIdx * 28,
        size: 5.0,
        speed: 0.012 / (1 + pIdx * 0.35),
        color: parseInt(proj.accentColor.replace('#', '0x'), 16) || 0xff4d00,
        startAngle: (pIdx * (2 * Math.PI)) / projects.length,
        shortLabel: `0${pIdx + 1} ${proj.title.substring(0, 10).toUpperCase()}`,
      };

      const cfg = PLANET_CONFIGS[proj.id] || fallbackConfig;

      // Visible Orbit Path Line
      const orbitCurve = new THREE.EllipseCurve(0, 0, cfg.distance, cfg.distance, 0, 2 * Math.PI, false, 0);
      const orbitPoints = orbitCurve.getPoints(140);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      orbitGeo.rotateX(Math.PI / 2);
      const orbitLineMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.22,
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitLineMat);
      scene.add(orbitLine);

      // Hit Mesh for Orbit Track
      const orbitHitGeo = new THREE.RingGeometry(cfg.distance - 2.5, cfg.distance + 2.5, 64);
      orbitHitGeo.rotateX(Math.PI / 2);
      const orbitHitMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide,
      });
      const orbitHitMesh = new THREE.Mesh(orbitHitGeo, orbitHitMat);
      orbitHitMesh.userData = { projectId: proj.id, project: proj, isOrbit: true };
      scene.add(orbitHitMesh);
      interactiveMeshes.push(orbitHitMesh);

      // Planet Mesh Group
      const pGroup = new THREE.Group();

      // Planet Sphere Core
      const pGeo = new THREE.SphereGeometry(cfg.size, 32, 32);
      const pMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.35,
        roughness: 0.3,
        metalness: 0.25,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.userData = { projectId: proj.id, project: proj, isPlanet: true };
      pGroup.add(pMesh);
      interactiveMeshes.push(pMesh);

      // Planet Atmosphere Aura
      const pGlowGeo = new THREE.SphereGeometry(cfg.size * 1.35, 24, 24);
      const pGlowMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
      });
      const pGlowMesh = new THREE.Mesh(pGlowGeo, pGlowMat);
      pGroup.add(pGlowMesh);

      // Optional Planetary Ring
      if (cfg.hasRing && cfg.ringColor) {
        const ringGeo = new THREE.RingGeometry(cfg.size * 1.5, cfg.size * 2.4, 36);
        ringGeo.rotateX(Math.PI / 2.2);
        const ringMat = new THREE.MeshBasicMaterial({
          color: cfg.ringColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.55,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        pGroup.add(ringMesh);
      }

      scene.add(pGroup);

      // Create Fast DOM Pin
      let labelDom: HTMLElement | null = null;
      if (labelsContainer) {
        labelDom = document.createElement('div');
        labelDom.className = 'absolute pointer-events-auto cursor-pointer transition-transform duration-100 select-none z-20';
        labelDom.style.transform = 'translate3d(-50%, -100%, 0)';
        labelDom.style.display = 'none';
        labelDom.innerHTML = `
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider backdrop-blur-md border bg-[#101016]/80 text-zinc-300 border-white/10 shadow-lg hover:border-white/40 hover:scale-105 transition-all">
            <span class="h-2 w-2 rounded-full" style="background-color: ${proj.accentColor}; box-shadow: 0 0 6px ${proj.accentColor};"></span>
            <span>${cfg.shortLabel}</span>
          </div>
        `;
        labelDom.addEventListener('click', (e) => {
          e.stopPropagation();
          setActivePopupProject(proj);
          onSelectProject(proj);
        });
        labelsContainer.appendChild(labelDom);
      }

      planetEntries.push({
        id: proj.id,
        project: proj,
        config: cfg,
        group: pGroup,
        mesh: pMesh,
        glowMesh: pGlowMesh,
        orbitLine,
        orbitHitMesh,
        currentAngle: cfg.startAngle,
        labelDom,
      });
    });

    // --- Interactive Mouse & Raycaster ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.x = (clientX / rect.width) * 2 - 1;
      mouse.y = -(clientY / rect.height) * 2 + 1;

      mouseParallaxX = mouse.x;
      mouseParallaxY = mouse.y;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        hoveredPlanetIdRef.current = hit.userData?.projectId || null;
        container.style.cursor = 'pointer';
      } else {
        hoveredPlanetIdRef.current = null;
        container.style.cursor = 'grab';
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const proj = hit.userData?.project as ProjectItem;
        if (proj) {
          setActivePopupProject(proj);
          onSelectProject(proj);
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('click', handleClick);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // --- High Performance 60FPS RAF Loop ---
    let clock = new THREE.Clock();
    let animId: number;
    const tempVec = new THREE.Vector3();
    const sunPosVec = new THREE.Vector3(0, 0, 0);

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const elapsedTime = clock.getElapsedTime();

      // Starfield Rotation
      starField.rotation.y += 0.0003;

      // Sun Core Pulse & Spin
      sunMesh.rotation.y += 0.003;
      innerCorona.rotation.z += 0.002;
      outerFlare.rotation.y -= 0.0015;
      const sunPulse = 1 + Math.sin(elapsedTime * 2.2) * 0.035;
      sunGroup.scale.set(sunPulse, sunPulse, sunPulse);

      // Project Sun Position to 2D Screen for Accurate Label
      if (sunLabelDom) {
        sunPosVec.set(0, 0, 0);
        sunPosVec.project(camera);
        const sunScreenX = ((sunPosVec.x + 1) * width) / 2;
        const sunScreenY = ((-sunPosVec.y + 1) * height) / 2;
        sunLabelDom.style.left = `${sunScreenX}px`;
        sunLabelDom.style.top = `${sunScreenY}px`;
      }

      const activeId = activeProjectIdRef.current;
      const hoveredId = hoveredPlanetIdRef.current;

      // Planet Orbit Progression
      planetEntries.forEach((pe) => {
        if (isPlayingRef.current) {
          pe.currentAngle += pe.config.speed * speedRef.current;
          pe.group.position.x = Math.cos(pe.currentAngle) * pe.config.distance;
          pe.group.position.z = Math.sin(pe.currentAngle) * pe.config.distance;
          pe.group.rotation.y += 0.015;
        }

        const isSelected = activeId === pe.id;
        const isHovered = hoveredId === pe.id;

        // Dynamic Glow & Orbit Highlighting directly on GPU materials
        if (isSelected || isHovered) {
          pe.glowMesh.scale.set(1.4, 1.4, 1.4);
          (pe.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.9;
          (pe.orbitLine.material as THREE.LineBasicMaterial).opacity = 0.85;
          (pe.orbitLine.material as THREE.LineBasicMaterial).color.setHex(pe.config.color);
        } else {
          pe.glowMesh.scale.set(1.0, 1.0, 1.0);
          (pe.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.35;
          (pe.orbitLine.material as THREE.LineBasicMaterial).opacity = 0.22;
        }

        // Update Direct DOM Floating Badge Position
        if (pe.labelDom) {
          pe.group.getWorldPosition(tempVec);
          tempVec.y += pe.config.size + 4.5;
          tempVec.project(camera);

          const isBehind = tempVec.z > 1;
          const screenX = ((tempVec.x + 1) * width) / 2;
          const screenY = ((-tempVec.y + 1) * height) / 2;

          if (!isBehind && screenX > 20 && screenX < width - 20 && screenY > 20 && screenY < height - 20) {
            pe.labelDom.style.display = 'block';
            pe.labelDom.style.left = `${screenX}px`;
            pe.labelDom.style.top = `${screenY}px`;
            if (isSelected || isHovered) {
              pe.labelDom.style.zIndex = '35';
              pe.labelDom.style.transform = 'translate3d(-50%, -100%, 0) scale(1.1)';
            } else {
              pe.labelDom.style.zIndex = '20';
              pe.labelDom.style.transform = 'translate3d(-50%, -100%, 0) scale(1.0)';
            }
          } else {
            pe.labelDom.style.display = 'none';
          }
        }
      });

      // Camera Damping and Smooth Parallax
      const targetX = targetCameraPos.current.x + mouseParallaxX * 25;
      const targetY = targetCameraPos.current.y + mouseParallaxY * 18;
      const targetZ = targetCameraPos.current.z;

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.position.z += (targetZ - camera.position.z) * 0.04;

      camera.lookAt(targetLookAt.current);

      renderer.render(scene, camera);
    };

    renderLoop();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries & Materials
      starGeo.dispose();
      starMat.dispose();
      sunGeo.dispose();
      sunMat.dispose();
      innerCoronaGeo.dispose();
      innerCoronaMat.dispose();
      outerFlareGeo.dispose();
      outerFlareMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // Run once on mount!

  return (
    <div className="relative w-full rounded-3xl bg-[#09090D] border border-white/[0.1] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
      
      {/* 3D WebGL Canvas Layer */}
      <div 
        ref={mountRef} 
        className="w-full h-[540px] sm:h-[620px] lg:h-[700px] bg-transparent relative z-0 cursor-grab active:cursor-grabbing"
      />

      {/* Direct Hardware-Accelerated Floating Label DOM Pins Container */}
      <div 
        ref={labelsContainerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-10"
      />

      {/* Cyber Reticle Guides Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      {/* Top Floating Telemetry & Control Deck */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Live Simulation Badge */}
        <div className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#101016]/85 backdrop-blur-md border border-white/[0.1] shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4D00]" />
          </span>
          <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase font-bold">
            ORBITAL SIMULATION // CLICK ANY ORBIT TO INSPECT
          </span>
        </div>

        {/* Orbit Kinetics Controls Deck */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-xl bg-[#101016]/85 backdrop-blur-md border border-white/[0.1] shadow-lg">
          
          {/* Pause / Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#FF4D00] text-black shadow-[0_0_12px_rgba(255,77,0,0.4)]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span className="hidden sm:inline">{isPlaying ? 'ORBIT ACTIVE' : 'PAUSED'}</span>
          </button>

          {/* Speed Multipliers */}
          <div className="flex items-center bg-white/[0.04] p-0.5 rounded-lg">
            {[1.0, 2.0, 4.0].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeedMultiplier(spd)}
                className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  speedMultiplier === spd
                    ? 'bg-white/20 text-[#00F0FF]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {spd}X
              </button>
            ))}
          </div>

          {/* Camera View Angle Presets */}
          <div className="hidden md:flex items-center gap-1 border-l border-white/10 pl-1.5 ml-1">
            <button
              onClick={() => setCameraMode('orbital')}
              title="3D Orbital Perspective"
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                cameraMode === 'orbital'
                  ? 'bg-white/15 text-[#FF4D00]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Orbit className="h-3.5 w-3.5" />
              <span className="text-[10px]">3D</span>
            </button>
            <button
              onClick={() => setCameraMode('topdown')}
              title="Top-Down Radar 90°"
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                cameraMode === 'topdown'
                  ? 'bg-white/15 text-[#00F0FF]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Radar className="h-3.5 w-3.5" />
              <span className="text-[10px]">90°</span>
            </button>
            <button
              onClick={() => setCameraMode('horizon')}
              title="Horizon View"
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                cameraMode === 'horizon'
                  ? 'bg-white/15 text-emerald-400'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="text-[10px]">Horizon</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- REAL-TIME HOLOGRAPHIC PROJECT POPUP (When an Orbit or Planet is Clicked) --- */}
      {activePopupProject && (
        <div className="absolute top-20 right-4 sm:right-6 max-w-sm sm:max-w-md w-[calc(100%-2rem)] z-30 pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0E0E14]/95 backdrop-blur-xl border border-white/[0.15] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
            
            {/* Top accent glow beam */}
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: activePopupProject.accentColor }}
            />

            {/* Header with Close */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#FF4D00]">
                  {activePopupProject.chapter}
                </span>
                <span className="text-zinc-600 font-mono">•</span>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  {activePopupProject.category}
                </span>
              </div>
              <button
                onClick={() => setActivePopupProject(null)}
                className="h-6 w-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Project Title & Tagline */}
            <h3 className="font-display font-bold text-base sm:text-lg text-white leading-snug">
              {activePopupProject.title}
            </h3>
            <p className="text-zinc-300 text-xs font-light mt-1.5 line-clamp-2 leading-relaxed">
              {activePopupProject.tagline}
            </p>

            {/* Major Features Preview */}
            <div className="mt-3 space-y-1">
              {activePopupProject.majorFeatures.slice(0, 2).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-1.5 text-[11px] text-zinc-400 font-light">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Chips */}
            <div className="mt-3 flex flex-wrap gap-1">
              {activePopupProject.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[9px] font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
              {activePopupProject.techStack.length > 4 && (
                <span className="px-1.5 py-0.5 rounded bg-white/[0.02] text-[9px] font-mono text-zinc-500">
                  +{activePopupProject.techStack.length - 4} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center gap-2">
              <button
                onClick={() => onOpenCaseStudy(activePopupProject)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF4D00] to-[#FF7A00] hover:from-[#FF5D1A] hover:to-[#FF9000] text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,77,0,0.4)] hover:scale-[1.02] active:scale-98 cursor-pointer"
              >
                <span>Launch Deep Case Study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              {activePopupProject.liveUrl && (
                <a
                  href={activePopupProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-emerald-400 hover:text-white transition-colors"
                  title="Open Live Deployment"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Planetary Array Dock: 6 Clickable Project Celestial Bodies */}
      <div className="relative z-20 w-full p-4 sm:p-6 bg-gradient-to-t from-[#09090D] via-[#09090D]/90 to-transparent border-t border-white/[0.08]">
        
        {/* Dock Header */}
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-300">
            <Zap className="h-3.5 w-3.5 text-[#FF4D00]" />
            <span className="uppercase font-bold tracking-wider">Planetary Array Inspector</span>
            <span className="text-zinc-500">• Click any orbit/planet to inspect</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-[10px]">
            <span>6 ACTIVE ORBITS</span>
            <span>/</span>
            <span className="text-[#00F0FF]">LIVE CELESTIAL PROJECTION</span>
          </div>
        </div>

        {/* 6 Planet Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {projects.map((proj, idx) => {
            const isSelected = activePopupProject?.id === proj.id;

            return (
              <div
                key={proj.id}
                onClick={() => {
                  setActivePopupProject(proj);
                  onSelectProject(proj);
                }}
                className={`group flex flex-col justify-between p-3 sm:p-3.5 rounded-xl transition-all duration-300 cursor-pointer border relative overflow-hidden ${
                  isSelected
                    ? 'bg-white/[0.08] border-[#FF4D00] shadow-[0_0_20px_rgba(255,77,0,0.3)] scale-[1.02]'
                    : 'bg-[#121218]/80 hover:bg-[#161620] border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Accent glow line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: proj.accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 group-hover:text-white">
                      ORBIT 0{idx + 1}
                    </span>
                    <div 
                      className="h-2 w-2 rounded-full shadow-[0_0_8px_currentColor]"
                      style={{ backgroundColor: proj.accentColor, color: proj.accentColor }}
                    />
                  </div>

                  <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-[#FF4D00] transition-colors leading-snug line-clamp-2">
                    {proj.title}
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-400 mt-1 truncate">
                    {proj.category}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono">
                  <span className="text-zinc-500">{proj.year}</span>
                  <span className="text-[#00F0FF] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    INSPECT <ArrowUpRight className="h-2.5 w-2.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
