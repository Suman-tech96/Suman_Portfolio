import React from 'react';
import { ProjectImageSlider, SliderImage } from './ProjectImageSlider';

import posDashboardImg from '../../assets/POS_DashBord.png';
import posTableImg from '../../assets/POS_Table.png';
import posMenuImg from '../../assets/Pos_Menu.png';

import erpDashboardImg from '../../assets/ERP_DashBoard.png';
import erpReportImg from '../../assets/ERP_Report.png';

import greenCartImg from '../../assets/GreenCart.png';
import greenCartWorkImg from '../../assets/GreenCart_work.png';

import pingMeImg from '../../assets/Ping_me.png';
import pingMeWorkImg from '../../assets/Ping_Me_work.png';

import emsDashboardImg from '../../assets/Ems_dashbord.png';
import emsLoginImg from '../../assets/Ems_login.png';

import digitalCxoImg from '../../assets/Digital_cxo.jpeg';

interface ProjectMockupProps {
  type: 'pos' | 'erp' | 'grocery' | 'chat' | 'ems' | 'advisory';
  title: string;
  galleryImages?: SliderImage[];
  accentColor?: string;
}

const POS_SLIDES: SliderImage[] = [
  {
    url: posDashboardImg,
    title: 'POS Terminal & Cashier Hub',
    caption: 'Live table billing, KDS tickets & order pipeline',
    badge: 'LIVE CASHIER POS'
  },
  {
    url: posTableImg,
    title: 'Floor Table Management',
    caption: 'Interactive visual dining and takeaway layout',
    badge: 'TABLE STATE'
  },
  {
    url: posMenuImg,
    title: 'Menu & Modifier Config',
    caption: 'Centralized recipe yield and item pricing',
    badge: 'RECIPE YIELD'
  }
];

const ERP_SLIDES: SliderImage[] = [
  {
    url: erpDashboardImg,
    title: 'HDT QM Executive Overview',
    caption: 'Multi-tenant quotation lifecycle, stock analytics & ledger tracking',
    badge: 'HDT QM CORE'
  },
  {
    url: erpReportImg,
    title: 'GST Tax Invoicing & Compliance Engine',
    caption: 'Automated quotation-to-invoice pipeline with HSN/GST ledger compliance',
    badge: 'GST BILLING'
  }
];

const GREENCART_SLIDES: SliderImage[] = [
  {
    url: greenCartImg,
    title: 'Consumer Marketplace Storefront',
    caption: 'High-conversion product catalog and instant cart checkout',
    badge: 'CONSUMER APP'
  },
  {
    url: greenCartWorkImg,
    title: 'Vendor & Rider Logistics Hub',
    caption: 'Multi-party order fulfillment and delivery tracking',
    badge: 'VENDOR PORTAL'
  }
];

const PINGME_SLIDES: SliderImage[] = [
  {
    url: pingMeImg,
    title: 'Chat Messenger Interface',
    caption: 'Instant message dispatch with dark mode UI',
    badge: 'WEBSOCKET STREAM'
  },
  {
    url: pingMeWorkImg,
    title: 'Real-Time Channel Feed',
    caption: 'Full-duplex WebSocket rooms with presence states',
    badge: 'SOCKET.IO'
  }
];

const EMS_SLIDES: SliderImage[] = [
  {
    url: emsDashboardImg,
    title: 'EMS Operations Dashboard',
    caption: 'Centralized employee workforce directory, leave records & attendance tracking',
    badge: 'WORKFORCE SUITE'
  },
  {
    url: emsLoginImg,
    title: 'RBAC Authentication Portal',
    caption: 'Multi-role secure authentication and JWT session management',
    badge: 'AUTH PORTAL'
  }
];

const DIGITALCXO_SLIDES: SliderImage[] = [
  {
    url: digitalCxoImg,
    title: 'DigitalCXOs Strategic Platform',
    caption: 'Minimalist C-suite advisory portal & consultation booking flow',
    badge: 'EXECUTIVE ADVISORY'
  }
];

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ 
  type, 
  title, 
  galleryImages,
  accentColor = '#FF4D00'
}) => {
  switch (type) {
    case 'pos':
      return (
        <ProjectImageSlider
          images={galleryImages && galleryImages.length > 0 ? galleryImages : POS_SLIDES}
          projectTitle={title}
          accentColor="#FF4D00"
        />
      );

    case 'erp':
      return (
        <ProjectImageSlider
          images={galleryImages && galleryImages.length > 0 ? galleryImages : ERP_SLIDES}
          projectTitle={title}
          accentColor="#00F0FF"
        />
      );

    case 'grocery':
      return (
        <ProjectImageSlider
          images={galleryImages && galleryImages.length > 0 ? galleryImages : GREENCART_SLIDES}
          projectTitle={title}
          accentColor="#10B981"
        />
      );

    case 'chat':
      return (
        <ProjectImageSlider
          images={galleryImages && galleryImages.length > 0 ? galleryImages : PINGME_SLIDES}
          projectTitle={title}
          accentColor="#8B5CF6"
        />
      );

    case 'ems':
      return (
        <ProjectImageSlider
          images={galleryImages && galleryImages.length > 0 ? galleryImages : EMS_SLIDES}
          projectTitle={title}
          accentColor="#F59E0B"
        />
      );

    case 'advisory':
    default:
      return (
        <ProjectImageSlider
          images={galleryImages && galleryImages.length > 0 ? galleryImages : DIGITALCXO_SLIDES}
          projectTitle={title}
          accentColor="#3B82F6"
        />
      );
  }
};
