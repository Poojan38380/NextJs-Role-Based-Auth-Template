"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { MoreVertical } from "lucide-react";
import { approveUsers } from "../_actions/changeUserStatus";
import { toast } from "sonner";

const AllUserActions = ({
  userId,
  account_status,
}: {
  userId: string;
  account_status: string;
}) => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.user_role === "ADMIN";

  const handleActivate = async () => {
    const result = await approveUsers(userId, "ACTIVE");
    if (result.success) {
      toast.success("User activated successfully");
    } else {
      toast.error("Failed to activate user");
    }
  };

  const handleDeactivate = async () => {
    const result = await approveUsers(userId, "INACTIVE");
    if (result.success) {
      toast.success("User deactivated successfully");
    } else {
      toast.error("Failed to deactivate user");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View Profile</DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuItem>Edit User</DropdownMenuItem>
            {account_status === "ACTIVE" ? (
              <DropdownMenuItem
                className="text-destructive"
                onClick={handleDeactivate}
              >
                Deactivate
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="text-success"
                onClick={handleActivate}
              >
                Activate
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="text-destructive">
              Delete User
            </DropdownMenuItem> */}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AllUserActions;
