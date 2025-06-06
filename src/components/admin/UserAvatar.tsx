
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/utils/avatarUtils';

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ firstName, lastName, size = 'md' }) => {
  const initials = getInitials(firstName, lastName);
  
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg'
  };

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarFallback className="bg-primary-prosalud text-white font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
