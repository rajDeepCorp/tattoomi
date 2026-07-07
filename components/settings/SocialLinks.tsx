"use client";

import React, { useState } from "react";
import { toast } from "sonner";

const links = [
  { label: "Facebook", field: "facebook" },
  { label: "Instagram", field: "instagram" },
  { label: "Youtube", field: "youtube" },
  { label: "Twitter", field: "twitter" },
  { label: "LinkedIn", field: "linkedin" },
  { label: "Github", field: "github" },
  { label: "Website", field: "website" },
];

const SocialLinks = () => {
  const [editing, setEditing] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const saveLink = async () => {
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
        toast.error(data.error || "Failed");
        return;
      }

      toast.success("Social link updated");

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
        Add Social Links
      </summary>

      <ul className="relative text-sm mt-2">
        {links.map(({ label, field }) => (
          <li className="text-center" key={field}>
            {editing === field ? (
              <input
                autoFocus
                value={value}
                disabled={loading}
                onChange={(e) => setValue(e.target.value)}
                onBlur={saveLink}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveLink();
                  }

                  if (e.key === "Escape") {
                    setEditing(null);
                    setValue("");
                  }
                }}
                className="outline-none w-full"
              />
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

export default SocialLinks;