import type { Promocion } from '../entities/Promocion';

export interface PromocionRepository {
  getPromociones(soloActivas?: boolean): Promise<Promocion[]>;
}
