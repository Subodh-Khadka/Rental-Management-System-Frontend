const BASE_URL = "https://localhost:7148/api/chargeTemplate";

export async function getChargeTemplates() {
  const response = await fetch(BASE_URL);
  //   console.log("response:", response);

  if (!response.ok) {
    throw new Error("Failed to fetch charge templates");
  }

  const result = await response.json();
  //   console.log("result:", result);

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch charge templates");
  }
  return result.data;
}

export async function getChargeTemplateById(chargeTemplateId) {
  const response = await fetch(`${BASE_URL}/${chargeTemplateId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch charge templates");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to get charge templates");
  }

  return result.data;
}

export async function createChargeTemplate(chargeTemplate) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(chargeTemplate),
  });

  if (!response.ok) {
    throw new Error("failed to create  charge template");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to create rent charge template");
  }

  return result.data;
}

export async function updateChargeTemplate(chargeTemplateId, chargeTemplate) {
  const response = await fetch(`${BASE_URL}/${chargeTemplateId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(chargeTemplate),
  });

  if (!response.ok) {
    throw new Error("failed to update charge template");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to update charge template");
  }

  return result.data;
}

export async function deleteChargeTemplate(chargeTemplateId) {
  const response = await fetch(`${BASE_URL}/${chargeTemplateId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("failed to delete charge Template");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || "failed to delete charge template");
  }
  return result.data;
}
