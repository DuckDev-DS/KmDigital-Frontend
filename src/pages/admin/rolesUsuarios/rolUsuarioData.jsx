export const rolUsuarioData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Roles de Usuario", variant: "h1" },
        { id: 2, content: "Gestión de roles", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Roles",
        columns: ["id", "nombre", "acciones"],
        service: "roles-usuario",
        data: []
    }
];
