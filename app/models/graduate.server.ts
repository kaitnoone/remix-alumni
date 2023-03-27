import type { Graduate } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Graduate } from "@prisma/client";

export function getGraduate({
  id,
}: Pick<Graduate, "id"> & {
  id: Graduate["id"];
}) {
  return prisma.graduate.findFirst({
    select: { id: true },
    where: { id },
  });
}

export function getGraduateListItems() {
  return prisma.graduate.findMany({
    select: { id: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createGraduate({
  firstName,
  lastName,
}: Pick<Graduate, "firstName" | "lastName">) {
  return prisma.graduate.create({
    data: {
      firstName,
      lastName,
    },
  });
}

// export function deleteGraduate({
//   id,
//   userId,
// }: Pick<Note, "id"> & { userId: User["id"] }) {
//   return prisma.note.deleteMany({
//     where: { id, userId },
//   });
// }
