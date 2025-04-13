import React from "react";
import { getCachedUsersforTable } from "./_actions/getAllUsers";
import { DataTable } from "./_components/data-table";
import { AllUsersColumns } from "./_components/AllUsersColumns";
import { auth } from "@/lib/auth";
import { PendingUsersColumns } from "./_components/PendingUsersColumns";
import { getCachedPendingUsers } from "./_actions/getPendingUsers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
      <CardContent className="max-768:px-0">
        {session?.user?.user_role === "ADMIN" && (
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
      <CardFooter></CardFooter>
    </Card>
  );
};

export default AllUsersPage;
