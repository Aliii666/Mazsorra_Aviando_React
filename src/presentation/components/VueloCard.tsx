import type { Vuelo } from '../../domain/entities/Vuelo';
import { formatFecha, formatPrecio } from '../utils/formatters';

interface VueloCardProps {
  vuelo: Vuelo;
}

export function VueloCard({ vuelo }: VueloCardProps) {
  return (
    <article className="rounded-2xl bg-gradient-to-br from-dark-surface to-dark border border-dark-border p-6 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary-light">
          {vuelo.codigo}
        </span>
        <span className="text-xs uppercase tracking-wide text-gray-400">{vuelo.estado}</span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div>
          <p className="text-2xl font-bold text-white">{vuelo.origen}</p>
          <p className="text-xs text-gray-400">{formatFecha(vuelo.fechaSalida)}</p>
        </div>
        <div className="flex-1 px-2">
          <div className="relative h-px bg-gradient-to-r from-transparent via-primary to-transparent">
            <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{vuelo.destino}</p>
          <p className="text-xs text-gray-400">{formatFecha(vuelo.fechaLlegada)}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-dark-border pt-4">
        <p className="text-xl font-bold text-primary-light">{formatPrecio(vuelo.precio)}</p>
        {vuelo.asientosDisponibles !== undefined && (
          <p className="text-xs text-gray-400">{vuelo.asientosDisponibles} asientos</p>
        )}
      </div>
    </article>
  );
}
