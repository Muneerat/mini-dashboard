// Mock authentication using localStorage

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

const AUTH_KEY = "saas_dashboard_auth";

export const authService = {
  login: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const user: User = {
            id: crypto.randomUUID(),
            email,
            name: email.split("@")[0],
          };
          localStorage.setItem(AUTH_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    });
  },

  logout: (): Promise<void> => {
    return new Promise((resolve) => {
      localStorage.removeItem(AUTH_KEY);
      resolve();
    });
  },

  getUser: (): User | null => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  updateProfile: (updates: Partial<User>): Promise<User> => {
    return new Promise((resolve, reject) => {
      const user = authService.getUser();
      if (!user) {
        reject(new Error("Not authenticated"));
        return;
      }
      const updated = { ...user, ...updates };
      localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
      resolve(updated);
    });
  },
};
