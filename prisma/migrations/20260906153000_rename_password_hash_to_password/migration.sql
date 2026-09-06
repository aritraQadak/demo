-- AlterTable: Rename column passwordHash to password
ALTER TABLE "User" RENAME COLUMN "passwordHash" TO "password";
