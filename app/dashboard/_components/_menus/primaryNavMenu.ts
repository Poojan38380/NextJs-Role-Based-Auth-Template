import { Role } from "@prisma/client";
import { AtSign, LucideIcon, SquareTerminal, UsersRound } from "lucide-react";

interface NavItem {
  title: string;
  url: string;
  visibilty?: Role;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    visibilty?: Role;
  }[];
}

export const PrimaryNavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Overview",
        url: "/dashboard",
      },
    ],
  },
  {
    title: "Accounts",
    url: "/dashboard/created-accounts",
    isActive: true,
    icon: AtSign,
    items: [
      {
        title: "All Accounts",
        url: "/dashboard/accounts",
        visibilty: Role.ACCOUNT_MANAGER,
      },
      {
        title: "Create new",
        url: "/dashboard/accounts/new",
        visibilty: Role.ACCOUNT_MANAGER,
      },
      {
        title: "Categories",
        url: "/dashboard/accounts/categories",
        visibilty: Role.ACCOUNT_MANAGER,
      },
    ],
  },

  {
    title: "Users",
    url: "#",
    icon: UsersRound,

    items: [
      {
        title: "All Users",
        url: "/dashboard/users",
      },
      {
        title: "Refer a friend",
        url: "/dashboard/users/referral",
        visibilty: Role.ACCOUNT_MANAGER,
      },
    ],
  },
];
