
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Key, CheckCircle, X, Check } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Validador robusto de contraseñas
const passwordSchema = z
  .string()
  .min(12, { message: "La contraseña debe tener al menos 12 caracteres." })
  .max(128, { message: "La contraseña es demasiado larga." })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Debe incluir al menos una letra mayúscula.",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Debe incluir al menos una letra minúscula.",
  })
  .refine((password) => /\d/.test(password), {
    message: "Debe incluir al menos un número.",
  })
  .refine((password) => /[!@#$%^&*()\-_=+[\]{};:,.<>/?]/.test(password), {
    message: "Debe incluir al menos un símbolo especial (!@#$%^&*()-_=+[]{};:,.<>/?).",
  })
  .refine((password) => {
    const commonPasswords = [
      'password', 'admin', 'administrador', 'prosalud', 'usuario',
      '123456', 'qwerty', 'abcdef', '123456789', 'password123'
    ];
    return !commonPasswords.some(common => password.toLowerCase().includes(common));
  }, {
    message: "No usar palabras comunes como 'password', 'admin' o secuencias simples.",
  })
  .refine((password) => {
    // Verificar que no sea una secuencia simple
    const sequences = ['123456', 'abcdef', 'qwerty', '987654', 'fedcba'];
    return !sequences.some(seq => password.toLowerCase().includes(seq));
  }, {
    message: "Evita secuencias simples como '123456' o 'qwerty'.",
  });

const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, { message: "Confirma tu contraseña." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

// Componente para mostrar los requisitos de contraseña
const PasswordRequirements: React.FC<{ password: string }> = ({ password }) => {
  const requirements = [
    { test: (p: string) => p.length >= 12, text: "Al menos 12 caracteres" },
    { test: (p: string) => /[A-Z]/.test(p), text: "Una letra mayúscula" },
    { test: (p: string) => /[a-z]/.test(p), text: "Una letra minúscula" },
    { test: (p: string) => /\d/.test(p), text: "Un número" },
    { test: (p: string) => /[!@#$%^&*()\-_=+[\]{};:,.<>/?]/.test(p), text: "Un símbolo especial" },
    { 
      test: (p: string) => {
        const commonPasswords = ['password', 'admin', 'administrador', 'prosalud', 'usuario', '123456', 'qwerty', 'abcdef'];
        return !commonPasswords.some(common => p.toLowerCase().includes(common));
      }, 
      text: "Sin palabras comunes" 
    },
  ];

  return (
    <div className="mt-2 space-y-1">
      <p className="text-xs text-gray-600 font-medium">Requisitos de contraseña:</p>
      {requirements.map((req, index) => {
        const isValid = req.test(password);
        return (
          <div key={index} className="flex items-center gap-2 text-xs">
            {isValid ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <X className="w-3 h-3 text-gray-400" />
            )}
            <span className={isValid ? "text-green-600" : "text-gray-500"}>
              {req.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const ResetPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const watchedPassword = form.watch("password");

  useEffect(() => {
    // Verificar si hay parámetros de reseteo en la URL
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    
    if (!accessToken) {
      toast({
        title: "Enlace inválido",
        description: "El enlace de recuperación no es válido o ha expirado.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [searchParams, navigate, toast]);

  const onSubmit = async (values: ResetPasswordValues) => {
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        setIsSuccess(true);
        toast({
          title: "¡Contraseña actualizada!",
          description: "Tu contraseña ha sido restablecida exitosamente.",
          className: "border-green-200 bg-green-50 text-green-800"
        });
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado. Intenta de nuevo más tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  if (isSuccess) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className="w-full bg-white text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="flex justify-center"
        >
          <CheckCircle className="h-16 w-16 text-green-500" />
        </motion.div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-primary-prosalud">¡Contraseña restablecida!</h1>
          <p className="text-muted-foreground">
            Tu contraseña ha sido actualizada exitosamente.
          </p>
          <p className="text-sm text-slate-500">
            Serás redirigido al inicio de sesión en unos segundos...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      className="w-full bg-white"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-prosalud">Restablecer contraseña</h1>
        <p className="text-muted-foreground mt-2">
          Ingresa tu nueva contraseña. Asegúrate de que sea segura.
        </p>
      </motion.div>

      <Form {...form}>
        <motion.form
          variants={itemVariants}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Nueva contraseña
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        {...field}
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        maxLength={128}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                        disabled={isSubmitting}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <PasswordRequirements password={watchedPassword || ""} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar nueva contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        {...field}
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        maxLength={128}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                        disabled={isSubmitting}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Actualizando..." : "Restablecer contraseña"}
            </Button>
          </motion.div>
        </motion.form>
      </Form>
    </motion.div>
  );
};

export default ResetPasswordForm;
