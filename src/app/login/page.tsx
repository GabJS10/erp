"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"; // Asegúrate de importar correctamente tus componentes desde ShadCN

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUsuario } from "@/helpers/queries";
type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    console.log(data);

    const response = await getUsuario(data.email, data.password);
    const user = response.find((user: any) => user.email === data.email);

    if (!user) {
      alert("Credenciales incorrectas");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: user.email,
        id: user.id,
        rol: user.rol,
        nombre: user.nombre,
      })
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">
            Iniciar Sesión
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu correo"
                  {...register("email", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "El formato del correo es inválido",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Regístrate aquí
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
