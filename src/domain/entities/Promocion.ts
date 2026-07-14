export interface Promocion {
  id: number;
  titulo: string;
  descripcion: string;
  descuento: number;
  codigo?: string;
  activa: boolean;
  fechaInicio?: string;
  fechaFin?: string;
}
