import React from "react";

/**
 * Universal Next.js Image adapter for Vite/React environments.
 * When used inside Next.js, next/image handles optimized rendering.
 * In Vite/React, this drop-in replacement renders responsive <img> tags
 * supporting all next/image properties (src, alt, fill, priority, etc.).
 */
export default function Image({
  src,
  alt = "",
  fill = false,
  priority = false,
  className = "",
  style = {},
  width,
  height,
  ...props
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      style={{
        ...(fill
          ? {
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              objectFit: "contain",
            }
          : {}),
        ...style,
      }}
      {...props}
    />
  );
}
