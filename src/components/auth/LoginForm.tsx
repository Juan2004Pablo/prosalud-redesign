
"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/AuthContext"

// Enhanced validation schema with stronger security requirements
const formSchema = z.object({
  emailOrUser: z
    .string()
    .min(1, { message: "El email o usuario es requerido." })
    .max(100, { message: "El email o usuario es demasiado largo." })
    .refine(
      (val) => {
        // Basic validation for email format or username
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const usernameRegex = /^[a-zA-Z0-9_.-]+$/
        return emailRegex.test(val) || usernameRegex.test(val)
      },
      { message: "Formato de email o usuario inválido." },
    ),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .max(128, { message: "La contraseña es demasiado larga." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "La contraseña debe contener al menos una mayúscula, una minúscula y un número.",
    }),
})

type LoginFormValues = z.infer<typeof formSchema>

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [loginAttempts, setLoginAttempts] = React.useState(0)
  const maxLoginAttempts = 3
  
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()
  const { login } = useAuth()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUser: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    if (loginAttempts >= maxLoginAttempts) {
      form.setError("root", {
        message: "Demasiados intentos fallidos. Intenta de nuevo más tarde.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await login(values.emailOrUser, values.password)

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente en el panel administrativo.",
      })

      const from = (location.state as any)?.from?.pathname || '/admin'
      navigate(from, { replace: true })
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Credenciales inválidas o error de autenticación.'
      form.setError("root", { message })
      setLoginAttempts((prev) => prev + 1)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Security: Clear form data on unmount
  React.useEffect(() => {
    return () => {
      form.reset()
    }
  }, [form])

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 10, duration: 0.3 },
    },
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={formVariants} className="w-full bg-white">
      <motion.div variants={itemVariants} className="text-center my-6">
        <Link to="/" className="inline-block">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src="/images/logo_prosalud.webp"
            alt="ProSalud Logo"
            className="h-16 w-auto mx-auto lg:mx-0"
          />
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-prosalud">Inicia sesión</h1>
        <p className="text-muted-foreground mt-2">Bienvenido, ingresa tus datos para continuar.</p>
        <p className="text-xs text-slate-500 mt-2">
          Demo: admin@prosalud.com / ProSalud2024
        </p>
      </motion.div>
      <Form {...form}>
        <motion.form variants={formVariants} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="emailOrUser"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tu@correo.com"
                      {...field}
                      autoComplete="email"
                      disabled={isSubmitting}
                      maxLength={100}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
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
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Security: Show login attempts warning */}
          {loginAttempts > 0 && loginAttempts < maxLoginAttempts && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-amber-600"
            >
              Intento {loginAttempts} de {maxLoginAttempts}.{maxLoginAttempts - loginAttempts} intentos restantes.
            </motion.div>
          )}

          {/* Display form-level errors */}
          {form.formState.errors.root && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200"
            >
              {form.formState.errors.root.message}
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="text-left">
            <Link to="/auth/forgot-password" className="text-sm text-primary-prosalud hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full bg-primary-prosalud hover:bg-primary-prosalud-dark text-white"
              disabled={isSubmitting || loginAttempts >= maxLoginAttempts}
            >
              {isSubmitting ? (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                  Iniciando sesión...
                </motion.span>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </motion.div>
        </motion.form>
      </Form>
    </motion.div>
  )
}

export default LoginForm
