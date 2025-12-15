/*
  Warnings:

  - The `description` column on the `HeroSlide` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `title` on the `Content` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `body` on the `Content` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `title` on the `HeroSlide` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "title",
ADD COLUMN     "title" JSONB NOT NULL,
DROP COLUMN "body",
ADD COLUMN     "body" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "HeroSlide" DROP COLUMN "title",
ADD COLUMN     "title" JSONB NOT NULL,
DROP COLUMN "description",
ADD COLUMN     "description" JSONB;
