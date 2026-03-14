import { CSSProperties } from "react";

// Common border radius values
const radius = {
  sm: "8px",
  md: "10px",
  lg: "12px",
  xl: "16px",
  full: "20px",
};

// Common colors
const colors = {
  text: {
    primary: "#1e1b4b",
    secondary: "#4b5563",
    muted: "#6b7280",
  },
  border: "#e5e7eb",
  white: "#ffffff",
  error: "#dc2626",
  errorBg: "#fee2e2",
  purple: "#8b5cf6",
};

// Common shadows
const shadows = {
  sm: "0 1px 3px rgba(0,0,0,0.1)",
  md: "0 2px 8px rgba(0,0,0,0.08)",
  lg: "0 4px 15px rgba(0,0,0,0.1)",
  purple: "0 4px 15px rgba(139, 92, 246, 0.3)",
};

// Shared button base style
export const buttonBase: CSSProperties = {
  padding: "10px 18px",
  borderRadius: radius.md,
  fontSize: "0.875rem",
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  whiteSpace: "nowrap",
  transition: "all 0.2s ease",
};

// Shared input base style
export const inputBase: CSSProperties = {
  padding: "10px 14px",
  background: colors.white,
  border: "none",
  borderRadius: radius.md,
  fontSize: "0.875rem",
  color: colors.text.primary,
  outline: "none",
  boxShadow: shadows.sm,
  minWidth: 0,
};

// Shared card/container base
export const cardBase: CSSProperties = {
  borderRadius: radius.xl,
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
};

// Flexbox helpers
export const flex = {
  row: {
    display: "flex",
    alignItems: "center",
  } as CSSProperties,
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as CSSProperties,
  col: {
    display: "flex",
    flexDirection: "column",
  } as CSSProperties,
};

// Export all for direct use
export const tokens = {
  radius,
  colors,
  shadows,
};
