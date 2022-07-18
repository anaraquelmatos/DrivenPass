/*
  Warnings:

  - You are about to drop the column `label` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `cards` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `credentials` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `wifis` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `wifis` table. All the data in the column will be lost.
  - Changed the type of `type` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "type" AS ENUM ('credit', 'debit', 'creditAndDebit');

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "label",
DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "type" "type" NOT NULL;

-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "label",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "wifis" DROP COLUMN "label",
DROP COLUMN "name";
