export const paisOrigenData = [
    {
        type: "text",
        text: [
        { id: 1, content: "País de Origen", variant: "h1" },
        { id: 2, content: "Gestión de países de origen", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Países de Origen",
        columns: ["id", "nombre", "imagenPaisOrigen", "acciones"],
        service: "pais-origen",
        data: []
    }
];
