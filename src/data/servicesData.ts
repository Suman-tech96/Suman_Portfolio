import { ServiceItem } from '../types/portfolio';

export const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    title: 'Website Development',
    shortDesc: 'Bespoke, high-performance web destinations crafted with editorial typography, smooth animations, and conversion-focused architecture.',
    typicalProblem: 'Templates look generic, load slowly, fail on mobile, and fail to turn visitors into qualified inquiries.',
    whatIDeliver: [
      'Custom responsive UI tailored to your specific brand identity',
      'Sub-second page speeds with Core Web Vitals optimization',
      'Interactive micro-animations and smooth scroll choreography',
      'Full semantic SEO architecture and Open Graph metadata'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    icon: 'Globe'
  },
  {
    number: '02',
    title: 'Full-Stack Web Applications',
    shortDesc: 'End-to-end custom software built from scratch to turn complex operational workflows into dependable digital products.',
    typicalProblem: 'Off-the-shelf software has restrictive feature limits, recurring per-seat fees, and fails to fit your exact business process.',
    whatIDeliver: [
      'Tailored frontend UI connected to secure custom backend APIs',
      'Robust state management and real-time data synchronization',
      'Multi-device responsiveness with zero layout jitter',
      'Production deployment on cloud infrastructure (Vercel, AWS)'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    icon: 'Layers'
  },
  {
    number: '03',
    title: 'Backend & API Development',
    shortDesc: 'Resilient, high-throughput RESTful & WebSocket backends engineered for security, data consistency, and low latency.',
    typicalProblem: 'Fragile APIs, slow response times under load, poor database querying, and lack of systematic error logging.',
    whatIDeliver: [
      'Clean modular MVC / service-repository architectural design',
      'Role-based JWT authentication and rate-limiting security',
      'Comprehensive error handling and structured request logging',
      'Well-documented endpoints ready for frontend or mobile consumption'
    ],
    technologies: ['Node.js', 'Express.js', 'Postman', 'JWT', 'REST'],
    icon: 'Server'
  },
  {
    number: '04',
    title: 'Business Software & Custom ERPs',
    shortDesc: 'Centralized operational hubs combining quotations, invoicing, stock tracking, customer logs, and financial ledgers.',
    typicalProblem: 'Departments working in siloed Excel files leading to quotation discrepancies, stock inaccuracies, and lost revenue.',
    whatIDeliver: [
      'Multi-tenant or dedicated single-tenant data isolation',
      'Automated GST/tax invoice & quotation generation pipeline',
      'Threshold-based inventory alert triggers and supplier ledgers',
      'Granular role-based permissions (Admin, Accountant, Staff)'
    ],
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript'],
    icon: 'Building2'
  },
  {
    number: '05',
    title: 'Restaurant POS & Kitchen Systems',
    shortDesc: 'Fast, mission-critical dining management combining floor tables, Kitchen Display Systems (KDS), and inventory decrementing.',
    typicalProblem: 'Order miscommunications between dining rooms and kitchen, paper ticket chaos during rushes, and inventory theft/waste.',
    whatIDeliver: [
      'Real-time Kitchen Display System (KDS) & KOT printing sync',
      'Visual table mapping for Dine-in, Takeaway, and Delivery orders',
      'Recipe-level inventory depletion on every billing transaction',
      'Daily cash drawer reconciliations and tax reporting summaries'
    ],
    technologies: ['React', 'Socket.IO', 'Node.js', 'MongoDB', 'Express'],
    icon: 'UtensilsCrossed'
  },
  {
    number: '06',
    title: 'Admin Dashboards & Internal Tools',
    shortDesc: 'Clean, actionable control panels giving leadership and team members real-time oversight of key business metrics.',
    typicalProblem: 'Teams wasting hours manually assembling reports and lacking intuitive interfaces to manage day-to-day data.',
    whatIDeliver: [
      'Interactive data charts with real-time filtering and export capability',
      'CRUD data management with optimistic UI and undo actions',
      'Activity audit logs recording operator modifications',
      'High-density, distraction-free modern dark/light UI'
    ],
    technologies: ['React', 'Tailwind CSS', 'Chart.js', 'Express.js'],
    icon: 'LayoutDashboard'
  },
  {
    number: '07',
    title: 'E-Commerce Platform Development',
    shortDesc: 'Frictionless digital storefronts with rapid shopping carts, multi-role vendor tools, and secure checkout conversions.',
    typicalProblem: 'High cart abandonment due to cumbersome checkout steps, poor mobile speeds, and disjointed inventory updates.',
    whatIDeliver: [
      'Optimistic cart states with immediate coupon code recalculation',
      'Multi-tier portals for Customers, Store Vendors, and Couriers',
      'Payment gateway integration (Razorpay, Stripe) with webhook verification',
      'Automated transactional emails and order tracking notifications'
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Razorpay'],
    icon: 'ShoppingCart'
  },
  {
    number: '08',
    title: 'API & Third-Party Integrations',
    shortDesc: 'Connecting your existing digital infrastructure with payment gateways, SMS/WhatsApp engines, CRMs, and AI services.',
    typicalProblem: 'Systems operating as disconnected islands requiring manual copy-pasting of data between different SaaS tools.',
    whatIDeliver: [
      'Secure payment processing with automated webhooks and refund handlers',
      'Transactional WhatsApp, SMS, and Email delivery triggers',
      'OpenAI and LLM workflow integrations for automated processing',
      'Resilient retry mechanisms for external network resilience'
    ],
    technologies: ['REST APIs', 'Webhooks', 'Razorpay', 'Twilio', 'OpenAI'],
    icon: 'Webhook'
  },
  {
    number: '09',
    title: 'Database & Backend Architecture',
    shortDesc: 'Scalable data modeling, query optimization, indexing strategies, and automated backup routines for business data.',
    typicalProblem: 'Database queries slowing down as customer records grow, risking downtime or corrupted relational associations.',
    whatIDeliver: [
      'Normalized schema design avoiding redundant data write locks',
      'Compound index optimization cutting query latencies significantly',
      'Data backup and migration scripts ensuring zero loss during upgrades',
      'Aggregation pipelines for rapid analytics and reporting calculations'
    ],
    technologies: ['MongoDB', 'PostgreSQL', 'Mongoose', 'Redis', 'Node.js'],
    icon: 'Database'
  },
  {
    number: '10',
    title: 'Digital Marketing & Growth Support',
    shortDesc: 'Technical foundation for growth: analytics instrumentation, conversion rate optimization, Google Business setup, and lead funnels.',
    typicalProblem: 'Building a great website that gets zero targeted traffic or fails to track which campaigns generate paying customers.',
    whatIDeliver: [
      'Google Analytics 4 & Meta Pixel event tracking configuration',
      'Google Business Profile integration and local search optimization',
      'High-converting landing page variants with clear value triggers',
      'Speed optimization ensuring maximum ad quality scores'
    ],
    technologies: ['GA4', 'Google Business', 'Technical SEO', 'Conversion UX'],
    icon: 'TrendingUp'
  }
];
