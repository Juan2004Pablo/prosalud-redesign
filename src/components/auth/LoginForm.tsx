
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

const formSchema = z.object({
  emailOrUser: z
    .string()
    .min(1, { message: "El email o usuario es requerido." }),
  password: z.string().min(1, { message: "La contraseña es requerida." }),
});

type LoginFormValues = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUser: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    // TODO: Implement login logic
    console.log("Login submitted:", values);
    // For now, just log to console
  };

  return (
    <div className="bg-card p-6 sm:p-8 rounded-xl shadow-xl w-full">
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
                  <Input placeholder="tu.email@ejemplo.com" {...field} />
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
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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
          <div className="text-right">
            <Link
              to="/recuperar-contrasena" // Placeholder link
              className="text-sm text-primary-prosalud hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Button type="submit" className="w-full bg-primary-prosalud hover:bg-primary-prosalud-dark text-white">
            Iniciar sesión
          </Button>
        </form>
      </Form>
      <p className="mt-8 text-xs text-muted-foreground text-center">
        Al iniciar sesión, aceptas nuestra{" "}
        <Link to="/privacidad" className="underline hover:text-primary-prosalud">
          Política de Privacidad
        </Link>{" "}
        y{" "}
        <Link to="/terminos" className="underline hover:text-primary-prosalud">
          Términos de Servicio
        </Link>
        .
      </p>
    </div>
  );
};

export default LoginForm;
