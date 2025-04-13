"use server";

import prisma from "@/lib/prisma";
import { Role, Status } from "@prisma/client";
import { unstable_cache as cache } from "next/cache";

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  telegramNumber: string;
  profilePic: string;
  account_status: Status;
  user_role: Role;
  createdAt: Date;
  updatedAt: Date;
};

async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      telegramNumber: true,
      profilePic: true,
      account_status: true,
      user_role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return users;
}

export const getCachedUsersforTable = cache(
  async () => getAllUsers(),
  ["get-users-for-table"]
);
