// "use client";
// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import { authService, User } from "@/lib/auth";

// interface AuthContextType {
//   user: User | null;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   updateProfile: (updates: Partial<User>) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const stored = authService.getUser();
//     setUser(stored);
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     const user = await authService.login(email, password);
//     setUser(user);
//   };

//   const logout = async () => {
//     await authService.logout();
//     setUser(null);
//   };

//   const updateProfile = async (updates: Partial<User>) => {
//     const updated = await authService.updateProfile(updates);
//     setUser(updated);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, isLoading, login, logout, updateProfile }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// }
