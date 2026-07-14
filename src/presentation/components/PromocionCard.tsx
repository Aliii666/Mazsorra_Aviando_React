import type { Promocion } from '../../domain/entities/Promocion';

interface PromocionCardProps {
  promocion: Promocion;
}

export function PromocionCard({ promocion }: PromocionCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark via-primary to-primary-light p-6 shadow-lg transition-transform hover:-translate-y-1">
      <span className="absolute -right-4 -top-4 text-8xl font-black text-white/10 select-none">
        %
      </span>
      <p className="text-3xl font-black text-white">-{promocion.descuento}%</p>
      <h3 className="mt-2 text-lg font-bold text-white">{promocion.titulo}</h3>
      <p className="mt-1 text-sm text-red-100">{promocion.descripcion}</p>
      {promocion.codigo && (
        <p className="mt-4 inline-block rounded-lg bg-black/30 px-3 py-1 font-mono text-sm text-white">
          {promocion.codigo}
        </p>
      )}
    </article>
  );
}
