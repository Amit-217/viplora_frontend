import { CONSTANTS } from "./constants";

const API_BASE = CONSTANTS.API_BASE_URL;

/* ================= PROJECTS ================= */
export async function fetchProjects() {
  try {
    const response = await fetch(`${API_BASE}/api/projects`);
    if (!response.ok) throw new Error("Failed to fetch projects");
    return response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

/* ================= SERVICES ================= */
export async function fetchServices() {
  try {
    const response = await fetch(`${API_BASE}/api/services`);
    if (!response.ok) throw new Error("Failed to fetch services");
    return response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

/* ================= CONTACT ================= */
export async function submitContact(data: {
  name: string;
  email: string;
  message: string;
  company?: string;
  subject: string;
}) {
  try {
    const response = await fetch(`${API_BASE}/api/contact/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to submit contact form");
    return response.json();
  } catch (error) {
    console.error("Error submitting contact:", error);
    throw error;
  }
}

/* ================= CHAT ================= */
export async function sendChatMessage(
  message: string,
  conversationId?: string
) {
  try {
    const response = await fetch(`${API_BASE}/api/chat/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, conversationId }),
    });

    if (!response.ok) throw new Error("Failed to send message");
    return response.json();
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
}

/* ================= ANALYTICS ================= */
export async function getAnalytics() {
  try {
    const response = await fetch(`${API_BASE}/api/analytics/realtime`);
    if (!response.ok) throw new Error("Failed to fetch analytics");
    return response.json();
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
}
