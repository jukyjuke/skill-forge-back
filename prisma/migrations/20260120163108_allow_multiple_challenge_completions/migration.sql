-- DropIndex
DROP INDEX "user_challenge_userId_challengeId_key";

-- CreateIndex
CREATE INDEX "user_challenge_userId_challengeId_idx" ON "user_challenge"("userId", "challengeId");
