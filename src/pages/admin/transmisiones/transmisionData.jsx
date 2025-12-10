export const transmisionData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Transmisiones", variant: "h1" },
        { id: 2, content: "Gestión de tipos de transmisión", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Transmisiones",
        columns: ["id", "nombre", "acciones"],
        service: "transmisiones",
        data: []
    }
];
