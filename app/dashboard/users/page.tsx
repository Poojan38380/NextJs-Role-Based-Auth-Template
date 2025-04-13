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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import BackButton from "../_components/sidebar/back-button";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, UserCheck } from "lucide-react";

const AllUsersPage = async () => {
  const users = await getCachedUsersforTable();
  const pendingUsers = await getCachedPendingUsers();
  const session = await auth();
  const isAdmin = session?.user?.user_role === "ADMIN";

  return (
    <div className="flex flex-col gap-6 md:p-6  px-0 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BackButton title="Users" />
          <Badge variant="outline" className="ml-2">
            {users.length} Total Users
          </Badge>
          {isAdmin && pendingUsers.length > 0 && (
            <Badge variant="warning" className="ml-2">
              {pendingUsers.length} Pending
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 ">
        {isAdmin && pendingUsers.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl font-bold">
                  Pending Users
                </CardTitle>
                {pendingUsers.length > 0 && (
                  <Badge variant="warning" className="ml-2">
                    {pendingUsers.length}
                  </Badge>
                )}
              </div>
              <CardDescription>
                Review and approve pending user registration requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingUsers.length > 0 ? (
                <DataTable columns={PendingUsersColumns} data={pendingUsers} />
              ) : (
                <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                  <UserCheck className="h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No pending users</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    There are no pending user requests at the moment.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl font-bold">All Users</CardTitle>
            </div>
            <CardDescription>
              Manage and view all registered users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={AllUsersColumns} data={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllUsersPage;
