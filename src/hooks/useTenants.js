import { useState, useEffect } from "react";
import { getTenants } from "../api/tenantsService";

export default function useTenants() {
  const [tenants, setTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTenants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTenants();
      setTenants(data);
    } catch (err) {
      setError(err.message || "Failed to load tenants");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTenants();
  }, []);

  //create tenant in state
  const createTenantInState = async (newTenant) => {
    setTenants((prevTenants) => [newTenant, ...prevTenants]);
  };

  // update tenant in the state
  const updateTenantInState = async (updatedTenant) => {
    setTenants((prevTenants) =>
      prevTenants.map((tenant) =>
        tenant.tenantId === updatedTenant.tenantId ? updatedTenant : tenant
      )
    );
  };

  //delete Tenant In State
  const deleteTenantInState = async (tenantId) => {
    setTenants((prevTenants) =>
      prevTenants.filter((tenant) => tenant.tenantId !== tenantId)
    );
  };

  return {
    tenants,
    error,
    isLoading,
    loadTenants,
    updateTenantInState,
    createTenantInState,
    deleteTenantInState,
  };
}
