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
import { getInventario, createProducto } from "@/helpers/queries";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Producto = {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
};

type Inputs = {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
};

export default function Inventario() {
  const [inventario, setInventario] = useState<any[]>([]);

  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    getInventario().then((data) => setInventario([data]));
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await createProducto(data);
    setInventario([response["paginas"]["inventario"]]);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Inventario</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {inventario[0] ? inventario[0].totalProductos : 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Valor Total del Inventario</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {inventario[0] ? inventario[0].valorTotalInventario : 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Productos con Bajo Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {inventario[0] ? inventario[0].productosBajoStock : 0}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Agregar Nuevo Producto</CardTitle>
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
              />
            </div>
            <div>
              <Label htmlFor="categoria">Categoría</Label>
              <Input
                {...register("categoria")}
                type="text"
                id="categoria"
                name="categoria"
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                {...register("stock")}
                id="stock"
                name="stock"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="precio">Precio</Label>
              <Input
                {...register("precio")}
                id="precio"
                name="precio"
                type="number"
                step="0.01"
              />
            </div>
            <Button type="submit">Agregar Producto</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventario[0]
                ? inventario[0].productos.map((producto: Producto) => (
                    <TableRow key={producto.id}>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.categoria}</TableCell>
                      <TableCell>{producto.stock}</TableCell>
                      <TableCell className="text-right">
                        {producto.precio}
                      </TableCell>
                      <TableCell>
                        <Button variant="destructive">Eliminar</Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
              <TableRow>
                <TableCell>Ejemplo Producto</TableCell>
                <TableCell>Ejemplo Categoría</TableCell>
                <TableCell>0</TableCell>
                <TableCell className="text-right">$0.00</TableCell>
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
