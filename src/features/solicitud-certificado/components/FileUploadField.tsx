
import React, { useRef, useState } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, FieldPath, FieldValues, UseFormSetValue } from 'react-hook-form';
import { Paperclip, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface FileUploadFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  accept?: string;
  description?: string;
  isRequired?: boolean;
  setValue?: UseFormSetValue<TFieldValues>;
}

const FileUploadField = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  accept,
  description,
  isRequired,
  setValue,
}: FileUploadFieldProps<TFieldValues>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFileName(files[0].name);
      onChange(files);
    } else {
      setSelectedFileName('');
      onChange(null);
    }
  };

  const removeSelectedFile = (onChange: (...event: any[]) => void) => {
    setSelectedFileName('');
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          <FormLabel className="flex gap-2">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <div className="flex flex-col gap-2">
              <div className="relative flex items-center">
                <Input
                  type="file"
                  accept={accept}
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, onChange)}
                  className="hidden"
                  {...rest}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleButtonClick}
                  className="flex items-center gap-2 w-full justify-start"
                >
                  <Paperclip className="h-4 w-4" />
                  {selectedFileName ? selectedFileName : 'Seleccionar archivo'}
                </Button>
                {selectedFileName && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSelectedFile(onChange)}
                    className="absolute right-2 h-6 w-6 p-1 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {!selectedFileName && (
                <div
                  className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center text-muted-foreground cursor-pointer"
                  onClick={handleButtonClick}
                >
                  <Upload className="h-8 w-8 mb-2" />
                  <p>Haga clic o arrastre y suelte archivos aquí</p>
                  <p className="text-xs mt-1">{accept?.split(',').join(', ')}</p>
                </div>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileUploadField;
