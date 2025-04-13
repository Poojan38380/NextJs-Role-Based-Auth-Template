"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "../_actions/getAllUsers";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),

    cell: ({ row }) => {
      const username: string = row.getValue("username");

      return (
        <div className="flex items-center gap-2">
          <Avatar className="">
            <AvatarImage src={row.original.profilePic} />
            <AvatarFallback>
              <UserIcon className="h-5 w-5 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold">{username}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const firstName: string = row.original.firstName;
      const lastName: string = row.original.lastName;

      return (
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {firstName} {lastName}
          </span>
        </div>
      );
    },
  },

  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Telegram Number",
    accessorKey: "telegramNumber",
  },
  {
    header: "Account Status",
    accessorKey: "account_status",
  },
  {
    header: "User Role",
    accessorKey: "user_role",
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
  },
];
