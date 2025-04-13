import React from "react";
import { getCachedUsersforTable } from "./_actions/getAllUsers";
import { DataTable } from "./_components/data-table";
import { AllUsersColumns } from "./_components/AllUsersColumns";
import { auth } from "@/lib/auth";
import { PendingUsersColumns } from "./_components/PendingUsersColumns";
import { getCachedPendingUsers } from "./_actions/getPendingUsers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BackButton from "../_components/sidebar/back-button";

const AllUsersPage = async () => {
  const users = await getCachedUsersforTable();
  const pendingUsers = await getCachedPendingUsers();

  const session = await auth();

  return (
    <Card className="border-none  shadow-none bg-background ">
      <CardHeader>
        <BackButton title="Users" />
      </CardHeader>
      <CardContent className="px-0 md:px-6">
        {session?.user?.user_role === "ADMIN" && pendingUsers.length > 0 && (
          <div className="mb-4 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Pending Users</h2>
            <DataTable columns={PendingUsersColumns} data={pendingUsers} />
          </div>
        )}
        <div className="mb-4 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">All Users</h2>
          <DataTable columns={AllUsersColumns} data={users} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AllUsersPage;
