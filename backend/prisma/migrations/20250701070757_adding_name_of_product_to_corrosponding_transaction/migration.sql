/*
  Warnings:

  - Added the required column `productName` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" ADD COLUMN     "productName" TEXT NOT NULL;
