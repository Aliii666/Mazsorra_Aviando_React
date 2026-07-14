import type { EstadoVuelo } from '../enums/EstadoVuelo';

export interface Vuelo {
  id: number;
  codigo: string;
  origen: string;
  destino: string;
  fechaSalida: string;
  fechaLlegada: string;
  precio: number;
  estado: EstadoVuelo;
  asientosDisponibles?: number;
}
