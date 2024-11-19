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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getEmpleados as getTheEmpleados,
  getDepartamentos as getTheDepartamentos,
  createEmpleado,
} from "@/helpers/queries";
import { useForm, SubmitHandler, set } from "react-hook-form";

type Inputs = {
  nombre: string;
  posicion: string;
  departamento: string;
  fechaInicio: string;
  salario: number;
};
export default function RecursosHumanos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [nuevasContrataciones, setNuevasContrataciones] = useState(0);

  useEffect(() => {
    const getEmpleados = async () => {
      const data = await getTheEmpleados();

      setEmpleados(data);
    };

    const getDepartamentos = async () => {
      const data = await getTheDepartamentos();

      setDepartamentos(data);
    };

    getEmpleados();
    getDepartamentos();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const departamentos = [
      "finanzas",
      "pedidos",
      "recursos_humanos",
      "inventario",
    ];
    if (!departamentos.includes(data.departamento)) {
      alert("Departamento no valido");
      return;
    }

    const response = await createEmpleado(data);

    setEmpleados(response["paginas"]["recursos_humanos"]["empleados"]);
    setNuevasContrataciones((prev) => prev + 1);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Recursos Humanos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Empleados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{empleados.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Departamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{departamentos.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nuevas Contrataciones (Último Mes)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{nuevasContrataciones}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agregar Nuevo Empleado</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                {...register("nombre")}
                type="text"
                id="nombre"
                name="nombre"
                required
              />
            </div>
            <div>
              <Label htmlFor="posicion">Posición</Label>
              <Input
                {...register("posicion")}
                type="text"
                id="posicion"
                name="posicion"
                required
              />
            </div>
            <div>
              <Label htmlFor="departamento">Departamento</Label>
              <Input
                {...register("departamento")}
                type="text"
                id="departamento"
                name="departamento"
                required
              />
            </div>
            <div>
              <Label htmlFor="fecha_inicio">Fecha de Inicio</Label>
              <Input
                {...register("fechaInicio")}
                id="fechaInicio"
                name="fechaInicio"
                type="date"
                required
              />
            </div>
            <div>
              <Label htmlFor="salario">Salario</Label>
              <Input
                {...register("salario")}
                id="salario"
                name="salario"
                type="number"
                required
              />
            </div>
            <Button type="submit">Agregar Empleado</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empleados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Posición</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Fecha de Inicio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empleados.map((empleado, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{empleado["nombre"]}</TableCell>
                    <TableCell>{empleado["posicion"]}</TableCell>
                    <TableCell>{empleado["departamento"]}</TableCell>
                    <TableCell>{empleado["fechaInicio"]}</TableCell>
                    <TableCell>
                      <Button variant="destructive">Eliminar</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell>Ejemplo</TableCell>
                <TableCell>Ejemplo</TableCell>
                <TableCell>Ejemplo</TableCell>
                <TableCell>01/01/2024</TableCell>
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
