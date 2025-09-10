const BASE_URL = "https://localhost:7148/api/Tenant";

export async function getTenants() {
  const response = await fetch(BASE_URL);

  if (!response.ok) throw new Error("Failed to fetch tenants data");

  const result = await response.json();

  if (!result.success) throw new Error("Failed to fetch tenatns");
  return result.data;
}

export async function getTenantsById(tenantId) {
  const response = await fetch(`${BASE_URL}/${tenantId}`);
  if (!response.ok) throw new Error("Failed to fetch tenant data ");

  const result = await response.json();
  if (!result.success) throw new Error("Failed to fetch tenant");

  return result.data;
}

export async function createTenant(tenant) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tenant),
  });

  if (!response.ok) throw new Error("Failed to create new Tenant");

  const result = await response.json();
  if (!result.success) throw new Error("Failed to create tenant");

  return result.data;
}

export async function updateTenant(tenantId, tenant) {
  console.log(tenantId, tenant);
  const response = await fetch(`${BASE_URL}/${tenantId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(tenant),
  });

  if (!response.ok) throw new Error("Failed to update the Tenant");

  const result = await response.json();
  if (!result.success) throw new Error("Failed to update tenant");

  return result.data;
}

export async function deleteTenant(tenantId) {
  const response = await fetch(`${BASE_URL}/${tenantId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete the tenant");

  return await response.json();
}
