/*
  Warnings:

  - You are about to drop the column `description` on the `notes` table. All the data in the column will be lost.
  - Added the required column `annotation` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notes" DROP COLUMN "description",
ADD COLUMN     "annotation" VARCHAR(1000) NOT NULL;
