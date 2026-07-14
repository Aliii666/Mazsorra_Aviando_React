// Formas "crudas" que devuelve la API (snake_case, campos alternativos según backend).
export interface UserDto {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
}

export interface AuthResponseDto {
  // el token puede venir como access (JWT), token o key según la config del backend
  access?: string;
  token?: string;
  key?: string;
  user?: UserDto;
  usuario?: UserDto;
  // algunos backends devuelven los datos del usuario en la raíz
  id?: number;
  username?: string;
  email?: string;
  is_staff?: boolean;
}
