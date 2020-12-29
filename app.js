const data = require('./vehiculos.json');

class Vehiculo {
    constructor(marca = '', modelo = '', precio = 0.0) {
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.precioFormatted = '$' + Intl.NumberFormat('es-AR', { style: 'decimal', minimumFractionDigits: 2 }).format(this.precio);
    }

    toString() {
        return `Marca: ${this.marca} // Modelo: ${this.modelo}`;
    }
}

class Auto extends Vehiculo {
    constructor(marca = '', modelo = '', precio = 0.0, puertas = 0) {
        super(marca, modelo, precio);
        this.puertas = puertas;
    }

    toString() {
        return super.toString() + ` // Puertas: ${this.puertas} // Precio: ${this.precioFormatted}`;
    }
}

class Moto extends Vehiculo {
    constructor(marca = '', modelo = '', precio = 0.0, cilindrada = 0) {
        super(marca, modelo, precio);
        this.cilindrada = cilindrada;
    }

    toString() {
        return super.toString() + ` // Cilindrada: ${this.cilindrada}cc // Precio: ${this.precioFormatted}`;
    }
}

/**
 * Esta funcion devuelve una lista de vehiculos por tipo
 */
function inicializarListaVehiculos() {
    return data.map(v => {
        if (v.cilindrada) {
            return new Moto(v.marca, v.modelo, v.precio, v.cilindrada);
        } else {
            return new Auto(v.marca, v.modelo, v.precio, v.puertas);
        }
    })
}

/**
 * Este metodo ordena una lista de vehiculos de mayor a menor usando su precio
 * @param {Array[Vehiculo]} vehiculos lista de vehiculos
 */
function ordenarMayorMenorPorPrecio(vehiculos) {
    return vehiculos.sort((a, b) => {
        return b.precio - a.precio;
    });
}

/**
 * Este metodo devuelve un vehiculo que contenga la letra 'Y' en el campo modelo
 * @param {*} vehiculos lista de Vehiculos
 */
function obtenerVehiculoContieneLetraY(vehiculos) {
    return vehiculos.find(v => v.modelo.includes('Y'));
}

function iniciaPrograma() {
    let vehiculos = inicializarListaVehiculos();
    vehiculos.forEach(v => console.info(v.toString()));
    vehiculos = ordenarMayorMenorPorPrecio(vehiculos);
    console.info('=============================');
    console.info(`Vehículo más caro: ${vehiculos[0].marca} ${vehiculos[0].modelo}`);
    console.info(`Vehículo más barato: ${vehiculos[vehiculos.length - 1].marca} ${vehiculos[vehiculos.length - 1].modelo}`);
    let vehiculoY = obtenerVehiculoContieneLetraY(vehiculos);
    console.info(`Vehículo que contiene en el modelo la letra 'Y': ${vehiculoY.marca} ${vehiculoY.modelo} ${vehiculoY.precioFormatted}`);
    console.info('=============================');
    console.info('Vehículos ordenados por precio de mayor a menor:');
    vehiculos.forEach(v => console.info(`${v.marca} ${v.modelo}`));
}

try {
    iniciaPrograma();
} catch (e) {
    console.error('Ocurrio un error al ejecutar el programa', e);
}