export const usuarioData = [
    {
        type: "text",
        text: [
        { id: 1, content: "Usuarios", variant: "h1" },
        { id: 2, content: "Administración de usuarios del sistema", variant: "p" }
        ]
    },
    {
        type: "table",
        title: "Listado de Usuarios",
        columns: ["id", "nombre", "correo", "telefono", "comuna", "rolUsuario", "acciones"],
        service: "usuarios",
        data: []
    }
];
