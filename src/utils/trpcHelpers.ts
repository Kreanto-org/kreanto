import type { PrismaClient } from "@prisma/client";
import type { User } from "next-auth";

// Check if a designer has sent a message request to a specific printer
export const checkRequested = async (
  prisma: PrismaClient,
  user: User,
  recipientId: string
) => {
  if (user.printerProfile) return false; // Printers can't make messages

  const chat_exists = await prisma.chat.findFirst({
    where: {
      printer_id: recipientId,
      members: { some: { id: user.id } },
    },
    select: { members: true },
  });

  return !!chat_exists && chat_exists.members.length === 1;
};

// Check if a chat exists with both people in it
export const checkConnected = async (
  prisma: PrismaClient,
  user: User,
  id: string
) => {
  if (user.printerProfile) return false; // Printers can't make messages

  const chat_exists = await prisma.chat.findFirst({
    where: {
      printer_id: undefined,
      members: { some: { AND: [{ id: user.id }, { id: id }] } },
    },
    select: { members: true },
  });

  return !!chat_exists;
};

// Check if current user can access a certain chat
export const canAccess = async (
  prisma: PrismaClient,
  user: User,
  id: string
) => {
  const members = await prisma.chat.findUnique({
    where: { id: id },
    select: {
      members: { where: { id: user.id } },
    },
  });
  return (members?.members.length ?? 0) > 0;
};
