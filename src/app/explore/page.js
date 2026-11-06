import ExploreContent from "./ExploreContent";

export default async function ExplorePage({ searchParams }) {
  const params = await searchParams;
  return <ExploreContent initialQuery={params?.q ?? ""} />;
}
