export const usuarioInputs = [
    { name: "nombre", type: "text", required: true },
    { name: "correo", type: "email", required: true },
    { name: "contrasena", type: "password", required: true },
    { name: "telefono", type: "text", required: true },
    { name: "comuna", type: "select", service: "comunas", required: true },
    { name: "rolUsuario", type: "select", service: "rolesUsuario", required: true }
];
