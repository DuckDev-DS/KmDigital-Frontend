export const vehiculoData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Vehículos", variant: "h1" },
        { id: 2, content: "Administración completa de vehículos", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Vehículos",
        columns: [
        "id", "nombre", "precio", "anio", "kilometraje",
        "estadoVenta", "modelo", "categoria", "acciones"
        ],
        service: "vehiculos",
        data: []
    }
];
