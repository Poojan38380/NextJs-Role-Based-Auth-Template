import DashHeader from "./_components/dash-header";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashHeader></DashHeader>
      {children}
    </>
  );
}
