import { ThemeToggleButton } from "@/components/theme/ThemeSelectorButton";
import InstallAppButton from "../../components/install-app-button";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex  shadow-sm z-10 border-b h-14  items-center ">
        <div className="flex items-center gap-2 px-4 w-full">
          <div className="flex justify-end w-full items-center">
            <div className="flex items-center gap-2">
              <InstallAppButton />
              <ThemeToggleButton />
            </div>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
