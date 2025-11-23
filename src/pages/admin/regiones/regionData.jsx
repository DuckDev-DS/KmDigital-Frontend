export const regionData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Regiones", variant: "h1" },
        { id: 2, content: "Listado de regiones", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Regiones",
        columns: ["id", "nombre", "acciones"],
        service: "regiones",
        data: []
    }
];
