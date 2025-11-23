export const comunaData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Comunas", variant: "h1" },
        { id: 2, content: "Listado de comunas por región", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Comunas",
        columns: ["id", "nombre", "region", "acciones"],
        service: "comunas",
        data: []
    }
];
