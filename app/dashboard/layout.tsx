import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashHeader from "./_components/dash-header";
import { AppSidebar } from "./_components/sidebar/admin-sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-auto   ">
        <DashHeader></DashHeader>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
