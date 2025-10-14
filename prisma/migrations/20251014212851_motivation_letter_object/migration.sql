/*
  Warnings:

  - You are about to drop the column `motivationLetterDate` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `motivationLetter` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "motivationLetterDate",
DROP COLUMN "motivationLetter",
ADD COLUMN     "motivationLetter" JSONB NOT NULL;
