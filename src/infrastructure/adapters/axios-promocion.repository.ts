import type { Promocion } from '../../domain/entities/Promocion';
import type { PromocionRepository } from '../../domain/ports/PromocionRepository';
import {
  unwrapList,
  type ListResponseDto,
  type PromocionDto,
} from '../../application/dtos/vuelo.dto';
import { axiosClient } from '../http/axios-client';

function mapPromocion(dto: PromocionDto): Promocion {
  return {
    id: dto.id,
    titulo: dto.titulo ?? dto.nombre ?? 'Promoción',
    descripcion: dto.descripcion ?? '',
    descuento: Number(dto.descuento ?? 0),
    codigo: dto.codigo,
    activa: dto.activa ?? true,
    fechaInicio: dto.fecha_inicio,
    fechaFin: dto.fecha_fin,
  };
}

export class AxiosPromocionRepository implements PromocionRepository {
  async getPromociones(soloActivas = true): Promise<Promocion[]> {
    const { data } = await axiosClient.get<ListResponseDto<PromocionDto>>('/promociones/', {
      params: soloActivas ? { activa: true } : undefined,
    });
    return unwrapList(data).map(mapPromocion);
  }
}
