import { useEffect, useState } from "react";
import { getAllCouriers } from "@/app/Api/tracking.js";
import Link from "next/link";
import Cookies from "js-cookie";

function ShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const token = Cookies.get("jwt_token"); // Get JWT token from cookies
  const emailData = Cookies.get("user");
  const user = emailData ? JSON.parse(emailData) : null;
  useEffect(() => {
    async function getShipments() {
      if (!token) {
        console.error("No token found, redirecting to login...");
        window.location.href = "/auth/login"; // Redirect if no token
        return;
      }

      try {
        const data = await getAllCouriers(token);
        const filteredShipments = data.couriers.filter(
          (courier) => courier.user.email === user.email
        );
        setShipments(filteredShipments);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      }
    }
    getShipments();
  }, [token]); // Ensure token is available

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Shipments</h1>
        <ul className="space-y-3">
          {shipments.length > 0 ? (
            shipments.map((shipment, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg">
                <div className="block">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">
                      {shipment.trackingNumber}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        shipment.status === "Delivered"
                          ? "bg-green-200 text-green-700"
                          : shipment.status === "Delayed"
                          ? "bg-red-200 text-red-700"
                          : "bg-blue-200 text-blue-700"
                      }`}
                    >
                      Status {shipment.status}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">
              No shipments found for this {user.email}.
            </p>
          )}
        </ul>
      </div>
    </>
  );
}
export default ShipmentsPage;
