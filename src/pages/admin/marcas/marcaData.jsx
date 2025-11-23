export const marcaData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Marcas", variant: "h1" },
        { id: 2, content: "Administración de marcas", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Marcas",
        columns: ["id", "nombre", "imagenMarca", "acciones"],
        service: "marcas",
        data: []
    }
];
