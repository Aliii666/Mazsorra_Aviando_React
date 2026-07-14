import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, isStaff, logout } = useAuthStore();

  async function handleLogout() {
    await logout();
    navigate('/', { replace: true });
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="border-b border-dark-border bg-dark-surface">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-2xl font-black tracking-tight">
            <span className="text-primary">AVIAN</span>CO
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary-light transition-colors hover:bg-primary hover:text-white"
          >
            Cerrar sesión
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="rounded-2xl bg-gradient-to-r from-primary-dark via-primary to-primary-light p-8 shadow-lg">
          <h1 className="text-3xl font-black">
            Hola, {user?.firstName || user?.username || 'viajero'}
          </h1>
          <p className="mt-2 text-red-100">
            Rol:{' '}
            <span className="rounded-full bg-black/30 px-3 py-1 text-sm font-semibold">
              {isStaff ? 'Staff / Administrador' : 'Cliente'}
            </span>
          </p>
        </section>

        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/vuelos"
            className="rounded-2xl border border-dark-border bg-dark-surface p-6 transition-colors hover:border-primary"
          >
            <h2 className="text-lg font-bold">Vuelos</h2>
            <p className="mt-1 text-sm text-gray-400">Consulta los vuelos disponibles</p>
          </Link>

          <Link
            to="/reservas"
            className="rounded-2xl border border-dark-border bg-dark-surface p-6 transition-colors hover:border-primary"
          >
            <h2 className="text-lg font-bold">Mis reservas</h2>
            <p className="mt-1 text-sm text-gray-400">Gestiona tus reservas de vuelo</p>
          </Link>

          {isStaff && (
            <div className="rounded-2xl border border-primary/50 bg-primary/10 p-6">
              <h2 className="text-lg font-bold text-primary-light">Panel de administración</h2>
              <p className="mt-1 text-sm text-gray-400">
                Crear vuelos, promociones y gestionar reservas (solo staff)
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
