import { auth } from "@/lib/auth";

export default async function AccountsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user.status !== "ACTIVE") {
    return (
      <div className="flex mt-10 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">
            You are not authorized to access this page.
          </h1>
          <p className="text-sm text-muted-foreground">
            Ask the admin to activate your account first.
          </p>
          <p className="text-sm text-muted-foreground">
            After activation, log in once again.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
