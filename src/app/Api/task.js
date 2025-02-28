import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000/api/tasks";
const token = Cookies.get("jwt_token");
export const fetchTasks = async () => {
  // Get token from cookies
  if (!token) {
    console.error("JWT Token is missing!");
    return;
  }
  console.log("Using token:", token);
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("tokk", token, response);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addTasks = async (user) => {
  console.log("task", user);
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editTasks = async (id, user) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTasks = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
