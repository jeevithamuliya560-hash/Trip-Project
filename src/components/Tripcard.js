import Link from "next/link";

export default function Tripcard({ trip, onDelete }) {
  const start = new Date(`${trip.startDate}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
  const end = new Date(`${trip.endDate}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="trip-card">
      <div className="trip-card-icon" aria-hidden="true">✦</div>
      <div className="trip-card-main">
        <p className="eyebrow">UPCOMING ADVENTURE</p>
        <h3>{trip.destination}</h3>
        <p>{start} – {end}</p>
        {trip.notes && <p className="trip-note">{trip.notes}</p>}
      </div>
      <div className="trip-card-actions">
        <Link href={`/itinerary?tripId=${encodeURIComponent(trip.id)}`} className="button button-outline">
          View itinerary
        </Link>
        {onDelete && (
          <button className="button button-quiet" onClick={() => onDelete(trip.id)} type="button">
            Remove
          </button>
        )}
      </div>
    </article>
  );
}