
import React from 'react';
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ImagePreviewDialogProps {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  imageAlt?: string;
}

const ImagePreviewDialog: React.FC<ImagePreviewDialogProps> = ({ selectedImage, setSelectedImage, imageAlt = "Vista ampliada" }) => {
  return (
    <Dialog open={!!selectedImage} onOpenChange={(isOpen) => { if (!isOpen) setSelectedImage(null); }}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] max-h-[90vh] p-2 bg-white flex items-center justify-center">
        {selectedImage && (
          <img 
            loading="lazy"
            src={selectedImage} 
            alt={imageAlt} 
            className="w-auto h-auto max-w-full max-h-[calc(90vh-4rem)] object-contain rounded-md"
          />
        )}
        <DialogClose asChild className="absolute top-2 right-2 sm:top-3 sm:right-3">
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;
