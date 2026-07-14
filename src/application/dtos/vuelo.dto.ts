export interface VueloDto {
  id: number;
  codigo?: string;
  numero_vuelo?: string;
  origen?: string;
  destino?: string;
  fecha_salida?: string;
  fecha_llegada?: string;
  precio?: number | string;
  estado?: string;
  asientos_disponibles?: number;
}

export interface PromocionDto {
  id: number;
  titulo?: string;
  nombre?: string;
  descripcion?: string;
  descuento?: number | string;
  codigo?: string;
  activa?: boolean;
  fecha_inicio?: string;
  fecha_fin?: string;
}

// La API puede devolver una lista plana o paginada estilo DRF ({ results: [...] })
export type ListResponseDto<T> = T[] | { results?: T[] };

export function unwrapList<T>(data: ListResponseDto<T>): T[] {
  if (Array.isArray(data)) return data;
  return data.results ?? [];
}
