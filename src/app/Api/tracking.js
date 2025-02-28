export const fetchShipments = async (token) => {
  const res = await fetch("http://localhost:5000/api/courier/shipments", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const trackShipment = async (trackingNumber, token) => {
  const res = await fetch("http://localhost:5000/api/courier/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ trackingNumber }),
  });
  return res.json();
};

export const trackHistory = async (trackingNumber, token) => {
  const res = await fetch("http://localhost:5000/api/courier/history", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ trackingNumber }),
  });

  return res.json();
};

export const getAllCouriers = async (token) => {
  const response = await fetch("http://localhost:5000/api/courier/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch couriers");
  return response.json();
};

export const updateShipmentStatus = async (
  trackingNumber,
  status,
  adminEmail,
  token
) => {
  const res = await fetch("http://localhost:5000/api/courier/update-status", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ trackingNumber, status, adminEmail }),
  });
  return res.json();
};
