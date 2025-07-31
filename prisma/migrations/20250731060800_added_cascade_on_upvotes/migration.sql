-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_streamId_fkey";

-- AlterTable
ALTER TABLE "Stream" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '1 DAY';

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE CASCADE ON UPDATE CASCADE;
