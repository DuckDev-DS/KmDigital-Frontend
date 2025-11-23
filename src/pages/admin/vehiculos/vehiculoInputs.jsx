export const vehiculoInputs = [
    { name: "nombre", type: "text", required: true },
    { name: "descripcion", type: "textarea", required: true },
    { name: "precio", type: "number", required: true },
    { name: "anio", type: "number", required: true },
    { name: "kilometraje", type: "number", required: true },
    { name: "estadoVenta", type: "text", required: true },
    { name: "imagenAuto", type: "text", required: false },

    { name: "carroceria", type: "select", service: "carrocerias", required: true },
    { name: "modelo", type: "select", service: "modelos", required: true },
    { name: "categoria", type: "select", service: "categorias", required: true },
    { name: "paisOrigen", type: "select", service: "paisesOrigen", required: true },
    { name: "tipoCombustible", type: "select", service: "tiposCombustibles", required: true },
    { name: "sucursal", type: "select", service: "sucursales", required: true },
    { name: "transmision", type: "select", service: "transmisiones", required: true }
];
