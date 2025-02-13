"use client";

import { useState } from "react";

export default function TestEmailPage() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSendEmail = async () => {
    setLoading(true);
    setStatus(null);

    try {
      console.log("Sending data:", formData); // Debug log

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setStatus("Email sent successfully!");
      // Clear form
      setFormData({
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: unknown) {
      console.error("Error sending bookmark reminder:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Send Test Email</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="recipient@example.com"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }))
              }
              placeholder="Email subject"
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              placeholder="Your message"
              rows={4}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={handleSendEmail}
            disabled={
              loading ||
              !formData.email ||
              !formData.subject ||
              !formData.message
            }
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>

          {status && (
            <div
              className={`p-2 rounded ${
                status.startsWith("Error")
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
