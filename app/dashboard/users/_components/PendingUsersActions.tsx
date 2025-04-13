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
import { CheckCircle, MoreVertical, XCircle } from "lucide-react";
import { approveUsers } from "../_actions/changeUserStatus";
import { toast } from "sonner";

const PendingUsersActions = ({ userId }: { userId: string }) => {
  const handleApprove = async () => {
    const result = await approveUsers(userId, "ACTIVE");
    if (result.success) {
      toast.success("User approved successfully");
    } else {
      toast.error("Failed to approve user");
    }
  };

  const handleReject = async () => {
    const result = await approveUsers(userId, "INACTIVE");
    if (result.success) {
      toast.success("User rejected successfully");
    } else {
      toast.error("Failed to reject user");
    }
  };
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-success hover:text-success/80 hover:bg-success/10 cursor-pointer"
        onClick={handleApprove}
      >
        <CheckCircle className="h-4 w-4 mr-1" />
        Approve
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10 cursor-pointer"
        onClick={handleReject}
      >
        <XCircle className="h-4 w-4 mr-1" />
        Reject
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuItem>Edit User</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PendingUsersActions;
