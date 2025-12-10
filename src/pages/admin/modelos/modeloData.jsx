export const modeloData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Modelos", variant: "h1" },
        { id: 2, content: "Administración de modelos por marca", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Modelos",
        columns: ["id", "nombre", "marca", "acciones"],
        service: "modelos",
        data: []
    }
];
