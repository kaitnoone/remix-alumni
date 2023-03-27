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
    select: { id: true, firstName: true, lastName: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createGraduate({
  email,
  firstName,
  maidenName,
  lastName,
  addressStreet,
  addressCity,
  addressState,
  addressZip,
  graduationYear
}: Pick<Graduate, "firstName" | "maidenName" | "lastName">) {
  return prisma.graduate.create({
    data: {
      email,
      firstName,
      maidenName,
      lastName,
      addressStreet,
      addressCity,
      addressState,
      addressZip,
      graduationYear
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
