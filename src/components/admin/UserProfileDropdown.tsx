
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Key } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { getInitialsFromEmail } from '@/utils/avatarUtils';
import { useAuth } from '@/context/AuthContext';
import ChangePasswordDialog from './ChangePasswordDialog';
import UpdateProfileDialog from './UpdateProfileDialog';

interface UserProfileDropdownProps {
  userEmail?: string;
  userName?: string;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ 
  userEmail = 'admin@prosalud.com', 
  userName = 'Administrador' 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  const { logout } = useAuth();

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await logout();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente.",
        variant: "default",
        className: "border-green-200 bg-green-50 text-green-800"
      });
      navigate('/auth/login');
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al cerrar sesión.",
        variant: "destructive"
      });
    }
  };

  const handleChangePassword = () => {
    setIsOpen(false);
    setShowChangePassword(true);
  };

  const handleUpdateProfile = () => {
    setIsOpen(false);
    setShowUpdateProfile(true);
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary-prosalud text-white font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleUpdateProfile} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Actualizar perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleChangePassword} className="cursor-pointer">
            <Key className="mr-2 h-4 w-4" />
            <span>Cambiar contraseña</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleLogout} 
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangePasswordDialog
        open={showChangePassword}
        onOpenChange={setShowChangePassword}
      />

      <UpdateProfileDialog
        open={showUpdateProfile}
        onOpenChange={setShowUpdateProfile}
      />
    </>
  );
};

export default UserProfileDropdown;
