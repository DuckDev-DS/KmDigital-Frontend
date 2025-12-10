export const carritoData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Carritos", variant: "h1" },
        { id: 2, content: "Carritos asignados a usuarios", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Carritos",
        columns: ["id", "usuario", "vehiculo", "acciones"],
        service: "carritos",
        data: []
    }
];
