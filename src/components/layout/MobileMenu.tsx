
import React from 'react';
import { NavLink } from 'react-router-dom';
import { mobileNavItems } from './menuConfig';

interface MobileMenuProps {
  onClose: () => void;
  activeLinkClass: string;
  inactiveLinkClass: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, activeLinkClass, inactiveLinkClass }) => {
  return (
    <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg py-4 z-40">
      <nav className="flex flex-col space-y-4 px-4">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium`}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;

