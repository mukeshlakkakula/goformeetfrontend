"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { updateShipmentStatus, getAllCouriers } from "../Api/tracking";
import Navbar from "@/components/Navbar";

export default function AdminPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [couriers, setCouriers] = useState([]);

  useEffect(() => {
    const userDetails = Cookies.get("user");
    if (userDetails) {
      try {
        const parsedUser = JSON.parse(userDetails);
        setAdminEmail(parsedUser.email);
      } catch (error) {
        console.error("Invalid JSON in cookies:", error);
      }
    }

    // Fetch all couriers
    async function fetchCouriers() {
      const token = Cookies.get("jwt_token");
      const res = await getAllCouriers(token);
      console.log("response", res);
      if (res.couriers) setCouriers(res.couriers);
    }
    fetchCouriers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt_token");
    const data = await updateShipmentStatus(
      trackingNumber,
      status,
      adminEmail,
      token
    );
    setMessage(data.message);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">
          Admin: Update Shipment {adminEmail}
        </h1>
        {message && <p className="text-green-600 mt-2">{message}</p>}

        {/* Shipment Status Update Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <input
            type="text"
            placeholder="Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Status</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Delayed">Delayed</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md"
          >
            Update Status
          </button>
        </form>

        {/* List of Couriers */}
        <h2 className="text-xl font-bold mt-6">Available Shipments</h2>
        <ul className="mt-4">
          {couriers.map((courier, index) => (
            <li key={index} className="border p-4 mb-2">
              <p>
                <strong>Tracking Number:</strong> {courier.trackingNumber}
              </p>
              <p>
                <strong>Status:</strong> {courier.status}
              </p>
              <p>
                <strong>User Email:</strong> {courier.user.email}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
