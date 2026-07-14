import type { Vuelo } from '../../domain/entities/Vuelo';
import { EstadoVuelo } from '../../domain/enums/EstadoVuelo';
import type { VueloRepository } from '../../domain/ports/VueloRepository';
import { unwrapList, type ListResponseDto, type VueloDto } from '../../application/dtos/vuelo.dto';
import { axiosClient } from '../http/axios-client';

const ESTADOS_VALIDOS = new Set<string>(Object.values(EstadoVuelo));

function mapVuelo(dto: VueloDto): Vuelo {
  const estado = dto.estado ?? EstadoVuelo.Programado;
  return {
    id: dto.id,
    codigo: dto.codigo ?? dto.numero_vuelo ?? `AV-${dto.id}`,
    origen: dto.origen ?? '',
    destino: dto.destino ?? '',
    fechaSalida: dto.fecha_salida ?? '',
    fechaLlegada: dto.fecha_llegada ?? '',
    precio: Number(dto.precio ?? 0),
    estado: ESTADOS_VALIDOS.has(estado) ? (estado as EstadoVuelo) : EstadoVuelo.Programado,
    asientosDisponibles: dto.asientos_disponibles,
  };
}

export class AxiosVueloRepository implements VueloRepository {
  async getVuelos(estado?: EstadoVuelo): Promise<Vuelo[]> {
    const { data } = await axiosClient.get<ListResponseDto<VueloDto>>('/vuelos/', {
      params: estado ? { estado } : undefined,
    });
    return unwrapList(data).map(mapVuelo);
  }
}
