"use client";
import InstallAppButton from "@/components/install-app-button";
import { ThemeToggleButton } from "@/components/theme/ThemeSelectorButton";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const DashHeader = () => {
  return (
    <header className="flex  shadow-sm z-10 border-b h-14  items-center ">
      <div className="flex items-center gap-2 px-4 w-full">
        <div className="flex justify-end w-full items-center">
          <div className="flex items-center gap-2">
            <InstallAppButton />
            <ThemeToggleButton />
            <Button
              title="Logout"
              variant="destructive"
              size="sm"
              onClick={() => signOut()}
            >
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
