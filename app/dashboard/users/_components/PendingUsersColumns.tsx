"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "../_actions/getAllUsers";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { formatDateYYMMDDHHMM } from "@/lib/format-date";
import { Badge } from "@/components/ui/badge";

import PendingUsersActions from "./PendingUsersActions";

export const PendingUsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      const username: string = row.getValue("username");

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={row.original.profilePic} />
            <AvatarFallback className="bg-muted">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="font-medium">{username}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const firstName: string = row.original.firstName;
      const lastName: string = row.original.lastName;

      return (
        <span className="font-medium">
          {firstName} {lastName}
        </span>
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

      const getStatusIcon = (accountStatus: string) => {
        if (accountStatus === "ACTIVE")
          return <CheckCircle className="h-3.5 w-3.5 mr-1" />;
        if (accountStatus === "INACTIVE")
          return <XCircle className="h-3.5 w-3.5 mr-1" />;
        if (accountStatus === "PENDING")
          return <Clock className="h-3.5 w-3.5 mr-1" />;
        return null;
      };

      return (
        <Badge
          variant={getBadgeVariant(accountStatus)}
          className="flex items-center"
        >
          {getStatusIcon(accountStatus)}
          {accountStatus}
        </Badge>
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
    id: "actions",
    cell: ({ row }) => {
      const userId: string = row.original.id;
      return <PendingUsersActions userId={userId} />;
    },
  },
  {
    header: "Contact",
    id: "contact",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-sm">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">{row.original.email}</span>
          </div>
          {row.original.telegramNumber && (
            <div className="flex items-center gap-1 text-sm">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {row.original.telegramNumber}
              </span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      return (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDateYYMMDDHHMM(createdAt)}</span>
        </div>
      );
    },
  },
];
