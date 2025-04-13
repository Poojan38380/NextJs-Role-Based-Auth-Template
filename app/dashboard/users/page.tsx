import React from "react";
import { getCachedUsersforTable } from "./_actions/getAllUsers";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const AllUsersPage = async () => {
  const users = await getCachedUsersforTable();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">All Users</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default AllUsersPage;
