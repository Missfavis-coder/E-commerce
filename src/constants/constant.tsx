"use client"
import { useState } from "react";

export default function ProductDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  return (
    <div className="text-[15px] md:text-[16px]">
      <div>
        {expanded ? description : description.slice(0, 60)}
        {description.length > 60 && (
          <span
            onClick={() => setExpanded(!expanded)}
            className="text-black cursor-pointer ml-1 text-sm font-semibold"
          >
            {expanded ? " Read less" : "... Read more"}
          </span>
        )}
      </div>
    </div>
  );
}

