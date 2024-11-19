"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProyectos, createProyecto } from "@/helpers/queries";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Pedidos = {
  id: string;
  nombre: string;
  cliente: string;
  estado: string;
  fechaLimite: string;
};

enum EnumEstado {
  enProgreso = "En progreso",
  completado = "Completado",
}

type Inputs = {
  nombre: string;
  cliente: string;
  estado: string;
  fechaLimite: string;
};

export default function Proyectos() {
  const [proyectos, setProyectos] = useState<any[]>([]);
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  useEffect(() => {
    getProyectos().then((data) => {
      setProyectos([data]);
    });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    createProyecto(data).then(() => {
      getProyectos().then((data) => {
        console.log(data);

        setProyectos([data]);
      });
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Pedidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {proyectos[0] ? proyectos[0].totalProyectos : 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pedidos en Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {proyectos[0] ? proyectos[0].proyectosEnProgreso : 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Completados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {proyectos[0] ? proyectos[0].proyectosCompletados : 0}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agregar Nuevo Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="nombre">Nombre del Pedido</Label>
              <Input
                {...register("nombre")}
                type="text"
                id="nombre"
                name="nombre"
                required
              />
            </div>
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                {...register("cliente")}
                type="text"
                id="cliente"
                name="cliente"
                required
              />
            </div>
            <div>
              <Label htmlFor="estado">Estado</Label>
              <Select
                onValueChange={(value) => setValue("estado", value)} // Actualiza el estado con React Hook Form
                defaultValue="En progreso" // Valor inicial
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En progreso">En progreso</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fecha_limite">Fecha Límite</Label>
              <Input
                {...register("fechaLimite")}
                id="fechaLimite"
                name="fechaLimite"
                type="date"
                required
              />
            </div>
            <Button type="submit">Agregar Pedido</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proyectos[0]
                ? proyectos[0].proyectos.map((pedido: Pedidos) => (
                    <TableRow key={pedido.id}>
                      <TableCell>{pedido.nombre}</TableCell>
                      <TableCell>{pedido.cliente}</TableCell>
                      <TableCell>{pedido.estado}</TableCell>
                      <TableCell>{pedido.fechaLimite}</TableCell>
                      <TableCell>
                        <Button variant="destructive">Eliminar</Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
              <TableRow>
                <TableCell>Pedido Ejemplo</TableCell>
                <TableCell>Cliente Ejemplo</TableCell>
                <TableCell>En progreso</TableCell>
                <TableCell>12/12/2024</TableCell>
                <TableCell>
                  <Button variant="destructive">Eliminar</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
