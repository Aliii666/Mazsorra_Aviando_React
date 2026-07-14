import type { Vuelo } from '../entities/Vuelo';
import type { EstadoVuelo } from '../enums/EstadoVuelo';

export interface VueloRepository {
  getVuelos(estado?: EstadoVuelo): Promise<Vuelo[]>;
}
