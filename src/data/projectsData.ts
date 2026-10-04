import { ProjectItem } from '../types/portfolio';
import posDashboardImg from '../assets/POS_DashBord.png';
import posTableImg from '../assets/POS_Table.png';
import posMenuImg from '../assets/Pos_Menu.png';

import erpDashboardImg from '../assets/ERP_DashBoard.png';
import erpReportImg from '../assets/ERP_Report.png';

import greenCartImg from '../assets/GreenCart.png';
import greenCartWorkImg from '../assets/GreenCart_work.png';

import pingMeImg from '../assets/Ping_me.png';
import pingMeWorkImg from '../assets/Ping_Me_work.png';

import emsDashboardImg from '../assets/Ems_dashbord.png';
import emsLoginImg from '../assets/Ems_login.png';

import digitalCxoImg from '../assets/Digital_cxo.jpeg';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'restaurant-pos',
    num: '01',
    chapter: 'CHAPTER I',
    title: 'Restaurant POS & Kitchen Automation System',
    category: 'Commercial Operations Platform',
    filterCategory: 'Business Systems',
    tagline: 'High-speed Point of Sale with real-time Kitchen Display (KDS), split billing, and multi-branch inventory tracking.',
    clientType: 'Food & Beverage Enterprises',
    year: '2025',
    businessProblem: 'Traditional restaurant cash registers fail during peak rush hours: tickets get lost between dining rooms and the kitchen, order modifications create chaos, and manual inventory tracking causes costly food waste.',
    solution: 'Designed and engineered an end-to-end POS and Kitchen Display System (KDS) powered by real-time WebSocket sync. Staff can manage tables, split bills, issue KOTs with instant kitchen alerting, and automatically decrement inventory based on recipe yields.',
    majorFeatures: [
      'Interactive visual Table Layout with Dine-in, Takeaway & Delivery state management',
      'Dual Kitchen Display System (KDS) & printed Kitchen Order Tickets (KOT)',
      'Automated Recipe Costing and real-time Ingredient Inventory depletion',
      'Split billing, discount codes, multi-payment methods & automated GST/Tax calculation',
      'Multi-branch centralized menu control with custom modifier add-ons',
      'Cash register opening/closing reconciliations with daily audit reports'
    ],
    architectureHighlights: [
      'Event-driven architecture using WebSockets for sub-100ms sync between floor tablets and kitchen screens',
      'Optimistic UI state updates ensuring zero cashier latency during internet blips',
      'Role-based security ensuring servers cannot void checks without manager authorization pin',
      'Normalized relational schema mapping nested menu items, toppings, and raw inventory supplies'
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'Tailwind CSS', 'REST APIs'],
    myRole: 'Lead Full-Stack Architect & Core Developer',
    keyContribution: 'Engineered the real-time KOT routing pipeline, offline-resilient cashier caching, and recipe yield deduction engine.',
    accentColor: '#FF4D00',
    galleryImages: [
      {
        url: posDashboardImg,
        title: 'POS Terminal Dashboard',
        caption: 'Live cashier register and order pipeline',
      },
      {
        url: posTableImg,
        title: 'Floor Table Management',
        caption: 'Interactive visual dining and takeaway layout',
      },
      {
        url: posMenuImg,
        title: 'Menu & Modifier Config',
        caption: 'Centralized recipe yield and item pricing',
      }
    ],
    visualPreview: {
      gradient: 'from-[#FF4D00]/20 via-[#1A100B] to-[#0A0A0C]',
      iconName: 'UtensilsCrossed',
      badgeText: 'MISSION CRITICAL POS',
      uiMockupType: 'pos'
    }
  },
  {
    id: 'enterprise-erp',
    num: '02',
    chapter: 'CHAPTER II',
    title: 'HDT Quotation Management & Multi-Tenant ERP Suite',
    category: 'Business Management Software',
    filterCategory: 'Business Systems',
    tagline: 'Comprehensive business operating system for quotations, HSN/GST billing, supplier purchase cycles, and multi-tenant ledger.',
    clientType: 'Hyper Digitech / B2B Commercial Enterprise',
    year: '2025',
    businessProblem: 'Small and mid-sized enterprises struggle with fragmented spreadsheets for quotation drafting, tax compliance, stock reconciliation, and debt collection, leading to inaccurate invoices and cash flow delays.',
    solution: 'Built HDT QM (Hyper Digitech Quotation Management), an enterprise-grade ERP platform consolidating multi-entity accounting, automated GST/HSN quotation generation, purchase order lifecycles, customer relationship logs, and role-governed user access.',
    majorFeatures: [
      'Instant Quotation to Tax Invoice generator with automated GST/HSN calculation',
      'Multi-tenant tenant isolation with custom company branding and financial year tracking',
      'Comprehensive Inventory Management with minimum-threshold reorder alerts',
      'Purchasing & Supplier Ledger with payment milestone reconciliation',
      'Expense categorisation and real-time gross/net profit reporting dashboards',
      'Role-Based Access Control (Admin, Sales Manager, Accountant, Inventory Officer)'
    ],
    architectureHighlights: [
      'Secure multi-tenant data separation using scoped database query middleware',
      'PDF render pipeline generating print-ready GST invoices with QR code verification in under 500ms',
      'Robust audit logging recording every ledger mutation with timestamp and operator metadata',
      'Asynchronous backup engine with automated schema migration safeguards'
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'JWT'],
    myRole: 'Full-Stack Software Engineer',
    keyContribution: 'Designed the multi-tenant data model, tax calculation engine, and scalable quotation conversion pipeline.',
    accentColor: '#00F0FF',
    galleryImages: [
      {
        url: erpDashboardImg,
        title: 'HDT QM Executive Overview',
        caption: 'Multi-tenant quotation lifecycle, stock analytics & ledger tracking',
      },
      {
        url: erpReportImg,
        title: 'GST Tax Invoicing & Compliance Engine',
        caption: 'Automated quotation-to-invoice pipeline with HSN/GST ledger compliance',
      }
    ],
    visualPreview: {
      gradient: 'from-[#00F0FF]/15 via-[#0A1518] to-[#080808]',
      iconName: 'Building2',
      badgeText: 'HDT QM & ERP CORE',
      uiMockupType: 'erp'
    }
  },
  {
    id: 'greencart-platform',
    num: '03',
    chapter: 'CHAPTER III',
    title: 'GreenCart — Multi-Role Commerce Ecosystem',
    category: 'Full-Stack E-Commerce & Logistics',
    filterCategory: 'Web Apps',
    tagline: 'High-speed grocery marketplace with tri-role portal coordination for customers, store vendors, and delivery fleets.',
    clientType: 'Direct-to-Consumer Grocery Retail',
    year: '2026',
    businessProblem: 'Standard e-commerce templates cannot handle multi-party logistics where consumers need immediate stock updates, sellers need vendor-specific order queues, and drivers need delivery dispatches.',
    solution: 'Engineered a modern grocery commerce platform equipped with tri-party role views (Customer Storefront, Vendor Dashboard, Delivery Agent Portal), instant cart calculation, and responsive inventory sync.',
    majorFeatures: [
      'Customer storefront with search, category filtering, instant cart updates, and address manager',
      'Vendor management panel for product cataloging, pricing overrides, and incoming order validation',
      'Delivery agent dispatch interface with live status toggle (Assigned, Picked Up, Delivered)',
      'Secure JWT authentication with role-enforced routes across all portals',
      'Automated inventory decrementing on payment completion to eliminate stock mismatches'
    ],
    architectureHighlights: [
      'Stateful client architecture using modern React state sync preventing duplicate order submissions',
      'REST API backend built with Express.js utilizing indexed MongoDB queries for rapid product filtering',
      'Modular component system ensuring consistent branding across all 3 portal layouts'
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    myRole: 'Full-Stack Developer',
    keyContribution: 'Developed end-to-end authentication, vendor product cataloging, and responsive checkout workflow.',
    liveUrl: 'https://grocery-delivery-frontend-psi.vercel.app/',
    githubUrl: 'https://github.com/Suman-tech96/Grocery_Delivery_Frontend.git',
    accentColor: '#10B981',
    galleryImages: [
      {
        url: greenCartImg,
        title: 'Consumer Marketplace',
        caption: 'High-conversion product catalog and instant cart checkout',
      },
      {
        url: greenCartWorkImg,
        title: 'Vendor & Rider Portal',
        caption: 'Multi-party order fulfillment and delivery tracking',
      }
    ],
    visualPreview: {
      gradient: 'from-[#10B981]/20 via-[#0C1712] to-[#080808]',
      iconName: 'ShoppingCart',
      badgeText: 'MULTI-ROLE COMMERCE',
      uiMockupType: 'grocery'
    }
  },
  {
    id: 'pingme-realtime',
    num: '04',
    chapter: 'CHAPTER IV',
    title: 'PingMe — Real-Time Messaging & Collaboration Engine',
    category: 'Real-Time Communications',
    filterCategory: 'Real-Time & Backend',
    tagline: 'Ultra-low latency web chat application with WebSocket bi-directional streaming, instant notifications, and presence states.',
    clientType: 'Communication Software',
    year: '2024',
    businessProblem: 'Traditional HTTP polling creates excessive server load, battery drain, and lagging message deliveries, making fluid conversation impossible in team or consumer environments.',
    solution: 'Architected PingMe, a lightweight, responsive messaging application leveraging persistent WebSockets to achieve instantaneous message dispatch, typing indicators, and real-time online status.',
    majorFeatures: [
      'Bidirectional real-time private messaging powered by Socket.IO',
      'Online/offline presence tracking with automatic reconnection handling',
      'Typing state indicators with debounce timers to reduce network packets',
      'Clean, distraction-free modern UI with responsive dark mode layout',
      'Message history persistence with optimized lazy load on channel scroll'
    ],
    architectureHighlights: [
      'Socket room routing ensuring messages are only broadcast to targeted recipient sessions',
      'Graceful socket connection fallback when mobile devices switch between Wi-Fi and Cellular',
      'Sanitized input pipeline protecting against XSS injections across active chat streams'
    ],
    techStack: ['React', 'Socket.IO', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    myRole: 'Full-Stack Developer & Real-Time Specialist',
    keyContribution: 'Built the WebSocket connection lifecycle, chat room management, and message event listeners.',
    liveUrl: 'https://ping-me-frontend-sigma.vercel.app/',
    githubUrl: 'https://github.com/Suman-tech96/Ping_Me_Frontend.git',
    accentColor: '#8B5CF6',
    galleryImages: [
      {
        url: pingMeImg,
        title: 'Chat Messenger Interface',
        caption: 'Instant message dispatch with dark mode UI',
      },
      {
        url: pingMeWorkImg,
        title: 'Real-Time Channel Feed',
        caption: 'Full-duplex WebSocket rooms with presence states',
      }
    ],
    visualPreview: {
      gradient: 'from-[#8B5CF6]/20 via-[#130E1D] to-[#080808]',
      iconName: 'MessageSquare',
      badgeText: 'WEBSOCKET STREAMING',
      uiMockupType: 'chat'
    }
  },
  {
    id: 'ems-platform',
    num: '05',
    chapter: 'CHAPTER V',
    title: 'EMS — Workforce Operations & Payroll Suite',
    category: 'Human Resources & Enterprise Tech',
    filterCategory: 'Business Systems',
    tagline: 'Centralized employee directory, leave management workflows, and automated payroll computation engine.',
    clientType: 'Corporate & Scaling Companies',
    year: '2024',
    businessProblem: 'Disjointed HR communication leads to untracked absences, payroll errors, and compliance risks when managing growing cross-functional teams.',
    solution: 'Built an internal Employee Management System consolidating biometric/attendance logs, tiered leave request approvals, salary structure formulas, and department-level organizational charts.',
    majorFeatures: [
      'Multi-level leave approval hierarchy with instant email status notifications',
      'Automated payroll slip generation factoring allowances, tax deductions, and unpaid days',
      'Employee self-service portal for updating credentials and accessing tax forms',
      'Comprehensive department directory with role-based visibility controls'
    ],
    architectureHighlights: [
      'Normalized schema for salary structures ensuring deterministic calculations',
      'JWT token rotation and role middleware separating HR Admin rights from General Employee access',
      'Exportable CSV and PDF reporting pipelines for external accounting audits'
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST APIs'],
    myRole: 'Full-Stack Engineer',
    keyContribution: 'Engineered the leave approval state machine and payroll computation algorithms.',
    accentColor: '#F59E0B',
    galleryImages: [
      {
        url: emsDashboardImg,
        title: 'EMS Operations Dashboard',
        caption: 'Centralized employee workforce directory, leave records & attendance tracking',
      },
      {
        url: emsLoginImg,
        title: 'RBAC Authentication Portal',
        caption: 'Multi-role secure authentication and JWT session management',
      }
    ],
    visualPreview: {
      gradient: 'from-[#F59E0B]/20 via-[#18130B] to-[#080808]',
      iconName: 'Users',
      badgeText: 'WORKFORCE SUITE',
      uiMockupType: 'ems'
    }
  },
  {
    id: 'digitalcxos-platform',
    num: '06',
    chapter: 'CHAPTER VI',
    title: 'DigitalCXOs — Executive Advisory Portal',
    category: 'Enterprise Content & Advisory',
    filterCategory: 'Web Apps',
    tagline: 'High-conversion business platform facilitating strategic consultations, executive briefings, and thought leadership.',
    clientType: 'Executive Advisory Firm',
    year: '2024',
    businessProblem: 'C-suite advisory services require a prestigious, authoritative digital presence that builds immediate credibility and converts high-value enterprise leads into booked strategy sessions.',
    solution: 'Designed and developed a minimalist, typography-driven enterprise web platform with seamless consultation booking flows, gated whitepaper distribution, and executive profiles.',
    majorFeatures: [
      'Interactive consultation booking workflow with intake questionnaire and calendar integration',
      'Categorized executive insights library with frictionless search and filter capability',
      'Responsive design optimized for corporate desktop viewing and executive mobile browsing',
      'Performance-tuned asset delivery achieving 98+ Google Lighthouse scores'
    ],
    architectureHighlights: [
      'Lightweight headless architecture delivering near-instant page transitions',
      'Enterprise contact form with real-time field validation and anti-spam protection',
      'SEO and Open Graph optimization ensuring pristine link previews on LinkedIn and Slack'
    ],
    techStack: ['React', 'Node.js', 'Tailwind CSS', 'REST APIs', 'Vercel'],
    myRole: 'Frontend & UI Solutions Engineer',
    keyContribution: 'Crafted the editorial UI layout, inquiry intake workflow, and responsive performance optimizations.',
    liveUrl: 'https://digitalcxo.netlify.app/',
    accentColor: '#3B82F6',
    galleryImages: [
      {
        url: digitalCxoImg,
        title: 'DigitalCXOs Strategic Platform',
        caption: 'Minimalist C-suite advisory portal & consultation booking flow',
      }
    ],
    visualPreview: {
      gradient: 'from-[#3B82F6]/20 via-[#0B121A] to-[#080808]',
      iconName: 'Briefcase',
      badgeText: 'STRATEGIC PORTAL',
      uiMockupType: 'advisory'
    }
  }
];
