import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Vuelo } from '../../../domain/entities/Vuelo';
import { useCaseFactory } from '../../../infrastructure/factories/repository.factory';
import { useAuthStore } from '../../store/authStore';
import { VueloCard } from '../../components/VueloCard';
import { Spinner } from '../../components/Spinner';

export function VuelosPage() {
  const isStaff = useAuthStore((state) => state.isStaff);
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    useCaseFactory.getVuelosUseCase
      .execute()
      .then((data) => {
        if (!cancelado) setVuelos(data);
      })
      .catch(() => {
        if (!cancelado) setError('No se pudieron cargar los vuelos');
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="border-b border-dark-border bg-dark-surface">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/dashboard" className="text-sm font-semibold text-gray-300 hover:text-white">
            ← Volver al panel
          </Link>
          {isStaff && (
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary-dark">
              + Nuevo vuelo
            </button>
          )}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-black">
          Todos los <span className="text-primary">vuelos</span>
        </h1>

        {loading && (
          <div className="mt-10 flex justify-center">
            <Spinner />
          </div>
        )}

        {error && (
          <p className="mt-6 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm text-primary-light">
            {error}
          </p>
        )}

        {!loading && !error && vuelos.length === 0 && (
          <p className="mt-6 text-gray-400">No hay vuelos registrados.</p>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vuelos.map((vuelo) => (
            <VueloCard key={vuelo.id} vuelo={vuelo} />
          ))}
        </div>
      </main>
    </div>
  );
}
