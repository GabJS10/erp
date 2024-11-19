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
import { getFinanzas, createTransaccion } from "@/helpers/queries";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
type Transaccion = {
  id: number;
  descripcion: string;
  monto: number;
  fecha: string;
};

type Inputs = {
  descripcion: string;
  monto: number;
  fecha: string;
};
export default function Finanzas() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getFinanzas().then((res) => {
      console.log(res);

      setData([res]);
    });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const descriptions = ["ingreso", "gasto"];
    if (!descriptions.includes(data.descripcion)) {
      alert("Descripcion no valida: ingreso o gasto");
      return;
    }

    const response = await createTransaccion(data);

    setData([response["paginas"]["finanzas"]]);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Finanzas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Balance Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data[0]?.balance}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ingresos del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {data[0]?.totalIngresos}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gastos del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              {data[0]?.totalGastos}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agregar Nueva Transacción</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                {...register("fecha")}
                id="fecha"
                name="fecha"
                type="date"
                required
              />
            </div>
            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Input
                {...register("descripcion")}
                id="descripcion"
                name="descripcion"
                required
              />
            </div>
            <div>
              <Label htmlFor="monto">Monto</Label>
              <Input
                {...register("monto")}
                id="monto"
                name="monto"
                type="number"
                step="0.01"
                required
              />
            </div>
            <Button type="submit">Agregar Transacción</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Transacciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data[0]?.transacciones.map((transaccion: Transaccion) => (
                <TableRow key={transaccion.id}>
                  <TableCell>{transaccion.fecha}</TableCell>
                  <TableCell>{transaccion.descripcion}</TableCell>
                  <TableCell className="text-right">
                    {transaccion.monto}
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive">Eliminar</Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
                <TableCell className="text-right">--</TableCell>
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
