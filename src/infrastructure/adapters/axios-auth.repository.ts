import axios from 'axios';
import type {
  AuthRepository,
  AuthSession,
  LoginCredentials,
  RegisterData,
} from '../../domain/ports/AuthRepository';
import type { User } from '../../domain/entities/User';
import type { AuthResponseDto, UserDto } from '../../application/dtos/auth.dto';
import { AuthException } from '../../domain/exceptions/ApiException';
import { axiosClient } from '../http/axios-client';
import { localTokenStorage } from '../storage/local-token-storage';

function mapUser(dto: UserDto, fallbackUsername: string): User {
  return {
    id: dto.id ?? 0,
    username: dto.username ?? fallbackUsername,
    email: dto.email ?? '',
    firstName: dto.first_name,
    lastName: dto.last_name,
    isStaff: dto.is_staff ?? false,
  };
}

function mapSession(data: AuthResponseDto, fallbackUsername: string): AuthSession {
  const token = data.access ?? data.token ?? data.key;
  if (!token) {
    throw new AuthException('La respuesta del servidor no incluyó un token');
  }
  const rawUser: UserDto = data.user ?? data.usuario ?? data;
  return { token, user: mapUser(rawUser, fallbackUsername) };
}

function toAuthError(error: unknown, fallback: string): AuthException {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as Record<string, unknown> | undefined;
    const detail =
      (typeof data?.detail === 'string' && data.detail) ||
      (typeof data?.error === 'string' && data.error) ||
      (typeof data?.message === 'string' && data.message);
    return new AuthException(detail || fallback, error.response?.status ?? null);
  }
  return new AuthException(fallback);
}

export class AxiosAuthRepository implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    try {
      const { data } = await axiosClient.post<AuthResponseDto>('/auth/login/', credentials);
      const session = mapSession(data, credentials.username);
      localTokenStorage.setToken(session.token);
      localTokenStorage.setUser(session.user);
      return session;
    } catch (error) {
      if (error instanceof AuthException) throw error;
      throw toAuthError(error, 'Credenciales incorrectas');
    }
  }

  async register(data: RegisterData): Promise<AuthSession> {
    try {
      const body = {
        username: data.username,
        email: data.email,
        password: data.password,
        first_name: data.firstName ?? '',
        last_name: data.lastName ?? '',
      };
      const { data: response } = await axiosClient.post<AuthResponseDto>('/auth/registro/', body);
      // Si el registro no devuelve token, iniciamos sesión con las credenciales nuevas.
      if (!response.access && !response.token && !response.key) {
        return this.login({ username: data.username, password: data.password });
      }
      const session = mapSession(response, data.username);
      localTokenStorage.setToken(session.token);
      localTokenStorage.setUser(session.user);
      return session;
    } catch (error) {
      if (error instanceof AuthException) throw error;
      throw toAuthError(error, 'No se pudo completar el registro');
    }
  }

  async logout(): Promise<void> {
    try {
      await axiosClient.post('/auth/logout/');
    } catch {
      // El logout local debe funcionar aunque el servidor falle.
    } finally {
      localTokenStorage.clear();
    }
  }
}
