"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DestinationCard from "@/components/DestinationCard";
import Tripcard from "@/components/Tripcard";
import { destinations } from "@/data/tripData";
import { useTripContext } from "@/context/TripContext";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { trips, ready } = useTripContext();
  const upcomingTrip = trips
    .slice()
    .sort((first, second) => first.startDate.localeCompare(second.startDate))[0];

  function searchDestinations(event) {
    event.preventDefault();
    router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <main className="page-container">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h1>Take the scenic route.</h1>
          <p className="hero-description">
            Find a place that feels like you, then bring every part of your trip together.
          </p>
          <form className="search-section" onSubmit={searchDestinations}>
            <label className="visually-hidden" htmlFor="home-search">Search destinations</label>
            <span aria-hidden="true">⌕</span>
            <input
              id="home-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Where would you like to go?"
              value={query}
            />
            <button className="button button-primary" type="submit">Explore</button>
          </form>
          <div className="hero-links">
            <Link href="/create-trip" className="text-link">Create a trip <span aria-hidden="true">→</span></Link>
            <span>Thoughtful plans, better journeys.</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Illustration of a mountain getaway" role="img">
          <div className="hero-sun" />
          <div className="hero-mountain hero-mountain-back" />
          <div className="hero-mountain hero-mountain-front" />
          <div className="hero-postcard">
            <span>GO WHERE</span>
            <strong>you feel<br />most alive</strong>
            <span className="postcard-mark">TRIPMATE · EST. FOR THE JOURNEY</span>
          </div>
          <span className="hero-art-caption">Find your somewhere.</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A FEW PLACES TO BEGIN</p>
            <h2>Somewhere wonderful</h2>
          </div>
          <Link className="text-link" href="/explore">All destinations <span aria-hidden="true">→</span></Link>
        </div>
        <div className="destination-grid">
          {destinations.map((destination) => (
            <DestinationCard destination={destination} key={destination.id} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR PLANS, ALL TOGETHER</p>
            <h2>A trip to look forward to</h2>
          </div>
          <Link className="text-link" href="/trips">View my trips <span aria-hidden="true">→</span></Link>
        </div>
        {ready && upcomingTrip ? (
          <Tripcard trip={upcomingTrip} />
        ) : (
          <div className="empty-state">
            <p>Your next adventure is waiting to be planned.</p>
            <Link className="button button-primary" href="/create-trip">Start a trip</Link>
          </div>
        )}
      </section>

      <section className="feature-strip">
        <span className="feature-symbol" aria-hidden="true">✦</span>
        <div>
          <p className="eyebrow">ONE LITTLE PLACE FOR EVERYTHING</p>
          <h2>From the first idea to the way home.</h2>
        </div>
        <div className="feature-links">
          <Link href="/transport">Transport</Link>
          <Link href="/stays">Stays</Link>
          <Link href="/food">Food</Link>
          <Link href="/budget">Budget</Link>
        </div>
      </section>
    </main>
  );
}
