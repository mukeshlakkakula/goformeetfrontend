"use client";

import { trackHistory } from "@/app/Api/tracking.js";

import Cookies from "js-cookie";
import Navbar from "@/components/Navbar";

export default function ShipmentsPage() {
  const token = Cookies.get("jwt_token");
  console.log("jwt", token);

  const dummyCouriers = [
    { trackingNumber: "123456", status: "In Transit" },
    { trackingNumber: "789012", status: "Delivered" },
    { trackingNumber: "345678", status: "Delayed" },
  ];

  const addToHistory = async (trackingNumber) => {
    await trackHistory(trackingNumber, token);
    alert(`Tracking number ${trackingNumber} added to history!`);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Shipments</h1>

        <h2 className="text-xl font-bold mt-6">Dummy Couriers</h2>
        <ul className="space-y-3">
          {dummyCouriers.map((courier) => (
            <li
              key={courier.trackingNumber}
              className="p-4 bg-gray-100 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">
                  {courier.trackingNumber}
                </span>
                <button
                  onClick={() => addToHistory(courier.trackingNumber)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add to History
                </button>{" "}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
