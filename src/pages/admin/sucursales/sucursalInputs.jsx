export const sucursalInputs = [
    { name: "nombre", type: "text", required: true },
    { name: "direccion", type: "text", required: true },
    { name: "telefono", type: "text", required: true },
    { name: "comuna", type: "select", service: "comunas", required: true }
];
