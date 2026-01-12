"use client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar, SidebarToggle } from "@/components/sideBar";
import { useTheme } from "@/contexts/themeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardLayoutProps } from "@/types/types";
import { useAuth } from "@/contexts/authContext";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="h-16 border-b border-border flex items-center justify-between px-4 bg-background sticky top-0 z-10">
            <div className="flex gap-1 items-center">
              <SidebarToggle />
              <h1 className="text-lg font-semibold">
                Welcome back, <span className=" capitalize">{displayName}</span>{" "}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {userInitial}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="h-10 w-10" />
                ) : (
                  <Sun className="h-10 w-10" />
                )}
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
