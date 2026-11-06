import Link from "next/link";

export default function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <div className="destination-image" style={{ background: destination.image }}>
        <span aria-hidden="true">{destination.emoji}</span>
        <span className="destination-tag">{destination.bestFor}</span>
      </div>
      <div className="card-content">
        <p className="eyebrow">{destination.location}</p>
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <Link
          href={`/create-trip?destination=${encodeURIComponent(destination.name)}`}
          className="text-link"
        >
          Plan this trip <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}