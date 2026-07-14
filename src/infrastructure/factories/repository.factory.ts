import type { AuthRepository } from '../../domain/ports/AuthRepository';
import type { VueloRepository } from '../../domain/ports/VueloRepository';
import type { PromocionRepository } from '../../domain/ports/PromocionRepository';
import { AxiosAuthRepository } from '../adapters/axios-auth.repository';
import { AxiosVueloRepository } from '../adapters/axios-vuelo.repository';
import { AxiosPromocionRepository } from '../adapters/axios-promocion.repository';
import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase';
import { RegisterUseCase } from '../../application/use-cases/auth/RegisterUseCase';
import { LogoutUseCase } from '../../application/use-cases/auth/LogoutUseCase';
import { GetVuelosUseCase } from '../../application/use-cases/vuelos/GetVuelosUseCase';
import { GetPromocionesUseCase } from '../../application/use-cases/promociones/GetPromocionesUseCase';

const authRepository: AuthRepository = new AxiosAuthRepository();
const vueloRepository: VueloRepository = new AxiosVueloRepository();
const promocionRepository: PromocionRepository = new AxiosPromocionRepository();

export const useCaseFactory = {
  loginUseCase: new LoginUseCase(authRepository),
  registerUseCase: new RegisterUseCase(authRepository),
  logoutUseCase: new LogoutUseCase(authRepository),
  getVuelosUseCase: new GetVuelosUseCase(vueloRepository),
  getPromocionesUseCase: new GetPromocionesUseCase(promocionRepository),
} as const;
