
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

// Enhanced validation schema with stronger security requirements
const formSchema = z.object({
  emailOrUser: z
    .string()
    .min(1, { message: "El email o usuario es requerido." })
    .max(100, { message: "El email o usuario es demasiado largo." })
    .refine((val) => {
      // Basic validation for email format or username
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
      return emailRegex.test(val) || usernameRegex.test(val);
    }, { message: "Formato de email o usuario inválido." }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .max(128, { message: "La contraseña es demasiado larga." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
      message: "La contraseña debe contener al menos una mayúscula, una minúscula y un número." 
    }),
});

type LoginFormValues = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [loginAttempts, setLoginAttempts] = React.useState(0);
  const maxLoginAttempts = 3;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUser: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    // Security: Rate limiting for login attempts
    if (loginAttempts >= maxLoginAttempts) {
      form.setError("root", { 
        message: "Demasiados intentos fallidos. Intenta de nuevo más tarde." 
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Security: Simulate secure login process
      // TODO: Implement actual authentication with Supabase
      console.log("Secure login attempt for:", values.emailOrUser);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just show that authentication should be implemented
      form.setError("root", { 
        message: "Autenticación pendiente de implementación. Contacta con soporte." 
      });
      
      setLoginAttempts(prev => prev + 1);
    } catch (error) {
      // Security: Don't expose internal error details
      form.setError("root", { 
        message: "Error en el servidor. Intenta de nuevo más tarde." 
      });
      setLoginAttempts(prev => prev + 1);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Security: Clear form data on unmount
  React.useEffect(() => {
    return () => {
      form.reset();
    };
  }, [form]);

  return (
    <div className="w-full bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-prosalud">Inicia sesión</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenido, ingresa tus datos para continuar.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="emailOrUser"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email o usuario</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="tu.email@ejemplo.com" 
                    {...field} 
                    autoComplete="username"
                    disabled={isSubmitting}
                    maxLength={100}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      autoComplete="current-password"
                      disabled={isSubmitting}
                      maxLength={128}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      disabled={isSubmitting}
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Security: Show login attempts warning */}
          {loginAttempts > 0 && loginAttempts < maxLoginAttempts && (
            <div className="text-sm text-amber-600">
              Intento {loginAttempts} de {maxLoginAttempts}. 
              {maxLoginAttempts - loginAttempts} intentos restantes.
            </div>
          )}

          {/* Display form-level errors */}
          {form.formState.errors.root && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {form.formState.errors.root.message}
            </div>
          )}

          <div className="text-left">
            <Link
              to="/recuperar-contrasena"
              className="text-sm text-primary-prosalud hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
            disabled={isSubmitting || loginAttempts >= maxLoginAttempts}
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
