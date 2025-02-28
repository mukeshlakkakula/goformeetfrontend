"use client";
import Cookies from "js-cookie";
import TaskManager from "./taskmanager/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ShipmentsPage from "./getAllShipments/page";
export default function Home() {
  const router = useRouter();
  const token = Cookies.get("jwt_token");
  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }
  });
  return (
    <div className="w-full">
      <TaskManager />
      <ShipmentsPage />
    </div>
  );
}
