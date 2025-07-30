-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '1 DAY';

-- CreateIndex
CREATE INDEX "Stream_expiresAt_idx" ON "Stream"("expiresAt");
