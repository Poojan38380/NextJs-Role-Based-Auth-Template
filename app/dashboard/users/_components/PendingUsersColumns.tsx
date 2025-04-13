"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "../_actions/getAllUsers";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";
import { formatDateYYMMDDHHMM } from "@/lib/format-date";
import { Badge } from "@/components/ui/badge";

export const PendingUsersColumns: ColumnDef<User>[] = [
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
    header: "Account Status",
    accessorKey: "account_status",

    cell: ({ row }) => {
      const accountStatus: string = row.getValue("account_status");

      const getBadgeVariant = (accountStatus: string) => {
        if (accountStatus === "ACTIVE") return "success";
        if (accountStatus === "INACTIVE") return "destructive";
        if (accountStatus === "PENDING") return "warning";
        return "default";
      };

      return (
        <Badge variant={getBadgeVariant(accountStatus)}>{accountStatus}</Badge>
      );
    },
  },

  {
    header: "User Role",
    accessorKey: "user_role",
    cell: ({ row }) => {
      const userRole: string = row.getValue("user_role");

      const getBadgeVariant = (userRole: string) => {
        if (userRole === "ADMIN") return "default";
        if (userRole === "ACCOUNT_MANAGER") return "outline";
        return "outline";
      };

      return <Badge variant={getBadgeVariant(userRole)}>{userRole}</Badge>;
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
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      return (
        <span className="text-muted-foreground">
          {formatDateYYMMDDHHMM(createdAt)}
        </span>
      );
    },
  },
];
