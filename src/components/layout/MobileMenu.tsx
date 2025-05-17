
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { menuItems } from './menuConfig'; // Changed from mobileNavItems to menuItems
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

interface MobileMenuProps {
  onClose: () => void;
  activeLinkClass: string;
  inactiveLinkClass: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, activeLinkClass, inactiveLinkClass }) => {
  return (
    <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg z-40 max-h-[80vh] overflow-y-auto">
      <nav className="flex flex-col px-4 py-3">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/2bf2da56-4967-4a17-8849-9efab8759375.png" 
            alt="ProSalud Logo" 
            className="h-12" 
          />
        </div>

        <Accordion type="multiple" className="w-full">
          {menuItems.map((item) => { // Changed from mobileNavItems to menuItems
            // If the item has submenu items from menuConfig
            if (item.submenu) {
              return (
                <AccordionItem key={item.name} value={item.name} className="border-b">
                  <AccordionTrigger className="py-3 px-2 hover:bg-primary-prosalud-light hover:text-primary-prosalud flex items-center">
                    <div className="flex items-center space-x-2">
                      <item.icon size={20} className="text-primary-prosalud" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-7 space-y-1 py-2">
                      {item.submenu?.map((subItem) => {
                        // Check if this subItem has its own submenu (it's a category header)
                        if (subItem.submenu) {
                          return (
                            <Accordion type="multiple" key={subItem.name} className="w-full border-0">
                              <AccordionItem value={subItem.name} className="border-0">
                                <AccordionTrigger className="py-2 px-2 hover:bg-primary-prosalud-light hover:text-primary-prosalud text-sm">
                                  <span className="font-medium">{subItem.name}</span>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="ml-4 space-y-1 py-1">
                                    {subItem.submenu.map((nestedItem) => (
                                      <NavLink
                                        key={nestedItem.name}
                                        to={nestedItem.path || "#"}
                                        onClick={onClose}
                                        className={({ isActive }) => 
                                          `${isActive ? activeLinkClass : inactiveLinkClass} block px-2 py-2 rounded-md text-sm`
                                        }
                                      >
                                        {nestedItem.name}
                                      </NavLink>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          );
                        } else {
                          // Regular direct link subItem
                          return (
                            <NavLink
                              key={subItem.name}
                              to={subItem.path || "#"} // subItem.path might be undefined for nested headers
                              onClick={onClose}
                              className={({ isActive }) => 
                                `${isActive ? activeLinkClass : inactiveLinkClass} block px-2 py-2 rounded-md text-sm`
                              }
                            >
                              {subItem.name}
                            </NavLink>
                          );
                        }
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            } else {
              // For direct links without submenu (item.path will exist here based on MenuItemType)
              return (
                <NavLink
                  key={item.name}
                  to={item.path} // item.path is guaranteed by TopLevelMenuItemDirectLink type
                  onClick={onClose}
                  className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} flex items-center space-x-2 px-2 py-3 rounded-md text-base font-medium border-b`}
                >
                  <item.icon size={20} className="text-primary-prosalud" />
                  <span>{item.name}</span>
                </NavLink>
              );
            }
          })}
        </Accordion>
      </nav>
    </div>
  );
};

export default MobileMenu;
