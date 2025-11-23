export const sucursalData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Sucursales", variant: "h1" },
        { id: 2, content: "Administración de sucursales", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Sucursales",
        columns: ["id", "nombre", "direccion", "telefono", "comuna", "acciones"],
        service: "sucursales",
        data: []
    }
];
