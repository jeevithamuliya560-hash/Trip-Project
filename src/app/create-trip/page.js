import CreateTripForm from "./CreateTripForm";

export default async function CreateTripPage({ searchParams }) {
  const params = await searchParams;
  return <CreateTripForm initialDestination={params?.destination ?? ""} />;
}
