// // Theme management with localStorage persistence

// const THEME_KEY = "saas_dashboard_theme";

// export type Theme = "light" | "dark";

// export const themeService = {
//   getTheme: (): Theme => {
//     const stored = localStorage.getItem(THEME_KEY) as Theme;
//     if (stored) return stored;
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   },

//   setTheme: (theme: Theme): void => {
//     localStorage.setItem(THEME_KEY, theme);
//     document.documentElement.classList.toggle("dark", theme === "dark");
//   },

//   initTheme: (): void => {
//     const theme = themeService.getTheme();
//     document.documentElement.classList.toggle("dark", theme === "dark");
//   },
// };
// lib/theme.ts
const THEME_KEY = "saas_dashboard_theme";

export type Theme = "light" | "dark";

export const themeService = {
  getTheme: (): Theme => {
    // Check if we're in the browser
    if (typeof window === "undefined") return "light";

    const stored = localStorage.getItem(THEME_KEY) as Theme;
    if (stored) return stored;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  },

  setTheme: (theme: Theme): void => {
    // Check if we're in the browser
    if (typeof window === "undefined") return;

    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  },

  initTheme: (): void => {
    // Check if we're in the browser
    if (typeof window === "undefined") return;

    const theme = themeService.getTheme();
    document.documentElement.classList.toggle("dark", theme === "dark");
  },
};
