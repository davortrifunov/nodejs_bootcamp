-- CreateTable
CREATE TABLE "PlansWithUsers" (
    "userId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "planId"),
    CONSTRAINT "PlansWithUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlansWithUsers_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
