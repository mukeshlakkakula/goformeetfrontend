"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { trackShipment } from "@/app/Api/tracking";

export default function ShipmentDetails() {
  const { trackingNumber } = useParams();
  const [shipment, setShipment] = useState(null);
  const token = ""; // Replace with actual token
  useEffect(() => {
    async function fetchShipment() {
      const data = await trackShipment(trackingNumber, token);
      setShipment(data);
    }
    fetchShipment();
  }, [trackingNumber]);

  if (!shipment) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">
        Tracking: {shipment.trackingNumber}
      </h1>
      <p className="text-lg">Status: {shipment.status}</p>
      <h2 className="text-xl font-semibold mt-4">Tracking History</h2>
      <ul className="mt-2 space-y-2">
        {shipment.order_data.map((event, index) => (
          <li key={index} className="p-3 bg-gray-200 rounded-lg">
            <span className="font-medium">{event.status}</span> -{" "}
            <span className="text-sm text-gray-600">
              {new Date(event.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
