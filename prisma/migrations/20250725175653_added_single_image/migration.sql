/*
  Warnings:

  - You are about to drop the column `bigImg` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `smallImg` on the `Stream` table. All the data in the column will be lost.
  - Added the required column `thumbnail` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "bigImg",
DROP COLUMN "smallImg",
ADD COLUMN     "thumbnail" TEXT NOT NULL;
