-- DropForeignKey
ALTER TABLE "user_challenge" DROP CONSTRAINT "user_challenge_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_skill" DROP CONSTRAINT "user_skill_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "badges" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "completedChallengesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastActive" TIMESTAMP(3),
ADD COLUMN     "maxStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "answer" INTEGER NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_xp_idx" ON "user"("xp");

-- AddForeignKey
ALTER TABLE "user_skill" ADD CONSTRAINT "user_skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_challenge" ADD CONSTRAINT "user_challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
