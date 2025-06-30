/*
  Warnings:

  - You are about to drop the column `productId` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `product` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_productId_fkey";

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "productId",
ADD COLUMN     "product" TEXT NOT NULL;
