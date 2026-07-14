import { Link } from 'react-router-dom';

export function ReservasPage() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="border-b border-dark-border bg-dark-surface">
        <nav className="mx-auto flex max-w-6xl items-center px-4 py-4">
          <Link to="/dashboard" className="text-sm font-semibold text-gray-300 hover:text-white">
            ← Volver al panel
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">
          Mis <span className="text-primary">reservas</span>
        </h1>
        <p className="mt-6 rounded-2xl border border-dark-border bg-dark-surface p-8 text-center text-gray-400">
          Módulo de reservas en construcción — próximamente podrás ver y gestionar tus reservas
          aquí.
        </p>
      </main>
    </div>
  );
}
