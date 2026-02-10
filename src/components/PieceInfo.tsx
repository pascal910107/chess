import Link from 'next/link';

interface PieceInfoProps {
  slug: string;
  name: string;
  symbol: string;
  description: string;
}

export default function PieceInfo({ slug, name, symbol, description }: PieceInfoProps) {
  return (
    <Link
      href={`/learn/pieces/${slug}`}
      className="block p-6 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border hover:border-primary/50"
    >
      <div className="flex items-center gap-4">
        <span className="text-5xl">{symbol}</span>
        <div>
          <h3 className="text-xl font-semibold text-foreground">{name}</h3>
          <p className="text-muted-foreground text-sm mt-1">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
