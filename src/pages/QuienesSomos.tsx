import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import BannerSection from '@/components/quienes-somos/BannerSection';
import HeroSection from '@/components/quienes-somos/HeroSection';
import DescriptionSection from '@/components/quienes-somos/DescriptionSection';
import MissionVisionSection from '@/components/quienes-somos/MissionVisionSection';
import ValuesSection from '@/components/quienes-somos/ValuesSection';
import PrinciplesSection from '@/components/quienes-somos/PrinciplesSection';
import OrganizationalStructureSection from '@/components/quienes-somos/OrganizationalStructureSection';

// Removed BadgeCheck, Handshake, Shield, Users, Scale, HandHelping, Briefcase, Ban, Library, Megaphone, ClipboardCheck, HeartHandshake, Target, Eye, Flag, ArrowDownCircle,
// Info, Building2, UserCircle, Users2, ShieldCheck, ClipboardList, BriefcaseBusiness, Cog, UserCog, Network, Workflow, UserSquare, FileText, Calculator, UsersRound, Laptop, ShieldQuestion,
// Award as they are now imported within their respective components.

// Removed valoresData and principiosData as they are moved to their respective components.

const QuienesSomos: React.FC = () => {

  const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Removed statsData as it's moved to DescriptionSection.tsx

  return (
    <MainLayout>
      <BannerSection />
      <HeroSection handleScrollToSection={handleScrollToSection} />
      <DescriptionSection />
      <MissionVisionSection />
      <ValuesSection />
      <PrinciplesSection />
      <OrganizationalStructureSection />
    </MainLayout>
  );
};

export default QuienesSomos;
