import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">ERP Empresa</h1>
        </div>
        <nav className="mt-4">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
          </Link>
          <Link href="/finanzas">
            <Button variant="ghost" className="w-full justify-start">
              Finanzas
            </Button>
          </Link>
          <Link href="/recursos-humanos">
            <Button variant="ghost" className="w-full justify-start">
              Recursos Humanos
            </Button>
          </Link>
          <Link href="/inventario">
            <Button variant="ghost" className="w-full justify-start">
              Inventario
            </Button>
          </Link>
          <Link href="/proyectos">
            <Button variant="ghost" className="w-full justify-start">
              Pedidos
            </Button>
          </Link>
          <Link href="/configuracion">
            <Button variant="ghost" className="w-full justify-start">
              Configuración
            </Button>
          </Link>
        </nav>
      </div>
      <div className="flex-1 p-8">
        {" "}
        <div>
          <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ventas Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$0</p>
                <p className="text-sm text-gray-500">
                  +$0% desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Nuevos Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-gray-500">+0% desde el mes pasado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-gray-500">0 finalizados este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Empleados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-gray-500">
                  +0 nuevas contrataciones
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Inventario</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-gray-500">
                  0 productos bajo stock mínimo
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Facturas Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-gray-500">$0 por cobrar</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
