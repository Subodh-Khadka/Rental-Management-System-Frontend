import TenantsTable from "../Components/Tenants/TenantsTable";
import useTenants from "../hooks/useTenants";
import useRooms from "../hooks/UseRooms";

export default function TenantPage() {
  const { rooms } = useRooms();

  const {
    tenants,
    updateTenantInState,
    createTenantInState,
    deleteTenantInState,
    error,
    isLoading,
  } = useTenants();

  if (isLoading) return <h1>Loading data...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <TenantsTable
      tenantsData={tenants}
      rooms={rooms}
      onTenantUpdate={updateTenantInState}
      onTenantCreate={createTenantInState}
      onTenantDelete={deleteTenantInState}
      error={error}
    />
  );
}
