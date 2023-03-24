/*
  Warnings:

  - Added the required column `planId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    CONSTRAINT "Reviews_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reviews" ("comment", "id", "rating") SELECT "comment", "id", "rating" FROM "Reviews";
DROP TABLE "Reviews";
ALTER TABLE "new_Reviews" RENAME TO "Reviews";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
