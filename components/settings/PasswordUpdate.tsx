"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const PasswordUpdate = () => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updatePassword = async () => {
    if (!oldPassword.trim() || !newPassword.trim()) {
      toast.warning("Please fill both password fields");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.changePassword({
        currentPassword: oldPassword,
        newPassword: newPassword,
      });

      if (error) {
        toast.error(error.message || "Password update failed");
        return;
      }

      toast.success("Password updated successfully");

      setOldPassword("");
      setNewPassword("");
      setEditing(false);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <details className="relative max-w-full min-w-xs shadow shadow-stone-500 px-4 py-2 m-1 rounded-4xl">
      <summary className="relative list-none cursor-pointer font-bold text-center">
        Security
      </summary>

      <ul className="relative text-sm mt-2">
        <li>
          {editing ? (
            <div className="flex flex-col gap-2">
              <input
                autoFocus
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                disabled={loading}
                onChange={(e) => setOldPassword(e.target.value)}
                className="outline-none w-full"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                disabled={loading}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updatePassword();
                  }

                  if (e.key === "Escape") {
                    setEditing(false);
                    setOldPassword("");
                    setNewPassword("");
                  }
                }}
                className="outline-none w-full"
              />

              <button
                type="button"
                disabled={loading}
                onClick={updatePassword}
                className="cursor-pointer"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          ) : (
            <span
              className="cursor-pointer"
              onClick={() => setEditing(true)}
            >
              Update Password
            </span>
          )}
        </li>
      </ul>
    </details>
  );
};

export default PasswordUpdate;