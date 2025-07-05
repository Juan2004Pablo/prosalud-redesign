
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';

interface AdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  actions?: React.ReactNode;
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl'
};

const AdminModal: React.FC<AdminModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = 'lg',
  actions,
  showCloseButton = true
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${sizeClasses[size]} max-h-[90vh] overflow-y-auto bg-white`}>
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-gray-900">
                {title}
              </DialogTitle>
              {description && (
                <DialogDescription className="text-sm text-gray-600 mt-2">
                  {description}
                </DialogDescription>
              )}
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Separator />
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {children}
        </div>
        
        {actions && (
          <>
            <Separator />
            <div className="flex flex-wrap gap-3 pt-4">
              {actions}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminModal;
