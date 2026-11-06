import ItineraryContent from "./ItineraryContent";

export default async function ItineraryPage({ searchParams }) {
  const params = await searchParams;
  return <ItineraryContent tripId={params?.tripId ?? ""} />;
}
