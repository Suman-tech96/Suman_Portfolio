import { ProcessStep } from '../types/portfolio';

export const PROCESS_DATA: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Business Scope & Strategy Alignment',
    description: 'We unpack your exact business goals, user personas, operational bottlenecks, and core functional needs to determine the optimal solution architecture without unnecessary bloat.',
    deliverables: ['Requirements specification', 'Technical scope document', 'Milestone & cost roadmap'],
    duration: '2-4 Days',
    outcome: 'Clear functional blueprint & zero scope ambiguity',
    iconName: 'Search'
  },
  {
    number: '02',
    title: 'PLAN & ARCHITECT',
    subtitle: 'System Design & Database Modeling',
    description: 'I map out the data models, API contracts, third-party integration dependencies, security policies, and component hierarchies to build an unshakeable foundation before writing code.',
    deliverables: ['Database schema diagram', 'API endpoint contracts', 'Tech stack & dependency audit'],
    duration: '3-5 Days',
    outcome: 'Modular, future-proof system design',
    iconName: 'Compass'
  },
  {
    number: '03',
    title: 'DESIGN & PROTOTYPE',
    subtitle: 'User Experience & Interactive Interface',
    description: 'Crafting clean, editorial wireframes and responsive UI prototypes prioritizing intuitive navigation, strong visual hierarchy, micro-interactions, and conversion flow.',
    deliverables: ['Responsive design tokens', 'Interactive component states', 'Design alignment sign-off'],
    duration: '4-7 Days',
    outcome: 'Pixel-perfect, production-ready interface mockups',
    iconName: 'Palette'
  },
  {
    number: '04',
    title: 'DEVELOP & ASSEMBLE',
    subtitle: 'Full-Stack Implementation & APIs',
    description: 'Writing maintainable, clean TypeScript code across frontend, backend REST/WebSocket layers, and external service connectors with transparent version-controlled progress demos.',
    deliverables: ['Modern frontend UI', 'Secure backend API services', 'Database migrations & seeders'],
    duration: '1-3 Weeks',
    outcome: 'High-performance, maintainable codebase',
    iconName: 'Code2'
  },
  {
    number: '05',
    title: 'TEST & HARDEN',
    subtitle: 'Rigorous Verification & Quality Assurance',
    description: 'Stress-testing every screen, validating form inputs, inspecting edge cases, benchmarking load times across mobile/desktop, and verifying security permissions.',
    deliverables: ['Cross-browser test passes', 'Mobile responsiveness audit', 'API security & sanitization check'],
    duration: '3-5 Days',
    outcome: 'Zero critical vulnerabilities & reliable UX',
    iconName: 'ShieldCheck'
  },
  {
    number: '06',
    title: 'DEPLOY & LAUNCH',
    subtitle: 'Production Launch & Handover',
    description: 'Configuring DNS, SSL certificates, cloud environments, automated deployment pipelines, and providing thorough video or written onboarding walkthroughs.',
    deliverables: ['Live production deployment', 'Cloud environment configuration', 'Source code & credentials handover'],
    duration: '2-3 Days',
    outcome: 'Seamless zero-downtime go-live',
    iconName: 'Rocket'
  },
  {
    number: '07',
    title: 'SUPPORT & EVOLVE',
    subtitle: 'Post-Launch Stability & Scaling',
    description: 'Remaining actively available for post-launch monitoring, telemetry analysis, performance tuning, version updates, and scaling features as your business grows.',
    deliverables: ['Post-launch warranty', 'Direct developer access', 'Feature iteration roadmap'],
    duration: 'Ongoing',
    outcome: 'Continuous uptime & long-term stability',
    iconName: 'LifeBuoy'
  }
];
