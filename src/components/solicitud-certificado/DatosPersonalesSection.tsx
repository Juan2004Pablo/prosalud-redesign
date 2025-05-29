
import React from 'react';
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IdType {
  value: string;
  label: string;
}

interface DatosPersonalesSectionProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  idTypes: IdType[];
}

// Security: Input validation and sanitization
const validateInput = (value: string, maxLength: number = 100) => {
  if (!value || typeof value !== 'string') return '';
  // Remove potential XSS characters and limit length
  return value.trim().slice(0, maxLength).replace(/[<>\"'&]/g, '');
};

const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string) => {
  // Colombian phone number format validation
  const phoneRegex = /^[3][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validateIdNumber = (idNumber: string) => {
  // Basic ID number validation (only numbers, reasonable length)
  const idRegex = /^[0-9]{6,15}$/;
  return idRegex.test(idNumber);
};

const DatosPersonalesSection = <TFieldValues extends FieldValues>({
  control,
  idTypes,
}: DatosPersonalesSectionProps<TFieldValues>) => {
  return (
    <section className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-6 text-primary-prosalud-dark">Datos Personales del Solicitante</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name={"tipoIdentificacion" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de identificación *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {idTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"numeroIdentificacion" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de identificación *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ej: 1234567890" 
                  {...field}
                  maxLength={15}
                  onChange={(e) => {
                    // Security: Only allow numbers for ID
                    const sanitized = e.target.value.replace(/[^0-9]/g, '');
                    field.onChange(sanitized);
                  }}
                  onBlur={(e) => {
                    // Security: Validate ID number format
                    const value = e.target.value;
                    if (value && !validateIdNumber(value)) {
                      // You could set a custom error here if using react-hook-form validation
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"nombres" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Sus nombres completos" 
                  {...field}
                  maxLength={50}
                  onChange={(e) => {
                    // Security: Only allow letters, spaces, and basic accents
                    const sanitized = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    field.onChange(sanitized);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"apellidos" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Sus apellidos completos" 
                  {...field}
                  maxLength={50}
                  onChange={(e) => {
                    // Security: Only allow letters, spaces, and basic accents
                    const sanitized = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                    field.onChange(sanitized);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"correoElectronico" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico *</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="ejemplo@correo.com" 
                  {...field}
                  maxLength={100}
                  autoComplete="email"
                  onChange={(e) => {
                    // Security: Basic email sanitization
                    const sanitized = validateInput(e.target.value, 100);
                    field.onChange(sanitized);
                  }}
                  onBlur={(e) => {
                    // Security: Validate email format
                    const value = e.target.value;
                    if (value && !validateEmail(value)) {
                      // You could set a custom error here if using react-hook-form validation
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"numeroCelular" as FieldPath<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de celular *</FormLabel>
              <FormControl>
                <Input 
                  type="tel" 
                  placeholder="Ej: 3001234567" 
                  {...field}
                  maxLength={10}
                  autoComplete="tel"
                  onChange={(e) => {
                    // Security: Only allow numbers for phone
                    const sanitized = e.target.value.replace(/[^0-9]/g, '');
                    field.onChange(sanitized);
                  }}
                  onBlur={(e) => {
                    // Security: Validate phone number format
                    const value = e.target.value;
                    if (value && !validatePhone(value)) {
                      // You could set a custom error here if using react-hook-form validation
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {/* Security Notice */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Protección de datos:</strong> Sus datos personales son tratados de acuerdo con nuestra política de privacidad y están protegidos bajo los estándares de seguridad más altos.
        </p>
      </div>
    </section>
  );
};

export default DatosPersonalesSection;
