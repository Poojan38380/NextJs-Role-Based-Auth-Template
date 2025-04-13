"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/send-telegram-message";
import cacheRevalidate from "@/utils/cache-revalidation-helper";
import { Status } from "@prisma/client";

export async function approveUsers(userId: string, newStatus: Status) {
  try {
    const session = await auth();

    if (session?.user.user_role !== "ADMIN") {
      throw new Error("Only admins can approve users.");
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { account_status: newStatus },
    });

    await Promise.all([
      cacheRevalidate({
        routesToRevalidate: ["/dashboard/users"],
        tagsToRevalidate: ["get-all-users-for-table", "get-pending-users"],
      }),
    ]);

    sendTelegramMessage(
      `\n\n Status of User ${user.username} has been changed to ${newStatus} \n\n`
    );

    return { success: true, userId: user.id };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in approveUsers server action: ", error.stack);
    }
    return {
      success: false,
      error: `Failed to approve user : ${error}`,
    };
  }
}
