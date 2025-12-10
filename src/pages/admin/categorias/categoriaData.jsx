export const categoriaData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Categorías", variant: "h1" },
        { id: 2, content: "Clasificación de vehículos", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Categorías",
        columns: ["id", "nombre", "acciones"],
        service: "categorias",
        data: []
    }
];
