// components/settings/Basics.tsx

"use client";

import React, { useState } from "react";
import { toast } from "sonner";

const fields = [
  { label: "Edit Your Name", field: "name", type: "text" },
  { label: "Edit Your DOB", field: "dob", type: "date" },
  { label: "Edit Your Bio", field: "bio", type: "textarea" },
  { label: "Edit Your Address", field: "address", type: "text" },
] as const;

const Basics = () => {
  const [editing, setEditing] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const saveField = async () => {
    if (!editing) return;

    try {
      setLoading(true);

      const res = await fetch("/api/auth/update-social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          field: editing,
          value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Update failed");
        return;
      }

      toast.success("Updated successfully");
      setEditing(null);
      setValue("");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <details className="relative max-w-full min-w-xs shadow shadow-stone-500 px-4 py-2 m-1 rounded-4xl">
      <summary className="relative list-none cursor-pointer font-bold text-center">
        Basic
      </summary>

      <ul className="relative text-sm mt-2">
        {fields.map(({ label, field, type }) => (
          <li key={field}>
            {editing === field ? (
              type === "textarea" ? (
                <textarea
                  autoFocus
                  rows={3}
                  value={value}
                  disabled={loading}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={saveField}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setEditing(null);
                      setValue("");
                    }
                  }}
                  className="outline-none w-full resize-none"
                />
              ) : (
                <input
                  autoFocus
                  type={type}
                  value={value}
                  disabled={loading}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={saveField}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveField();
                    }

                    if (e.key === "Escape") {
                      setEditing(null);
                      setValue("");
                    }
                  }}
                  className="outline-none w-full"
                />
              )
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => {
                  setEditing(field);
                  setValue("");
                }}
              >
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </details>
  );
};

export default Basics;