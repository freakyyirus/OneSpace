-- AlterTable
ALTER TABLE "proof_objects" ADD COLUMN IF NOT EXISTS "verificationStatus" TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE "proof_objects" ADD COLUMN IF NOT EXISTS "urlHash" TEXT;
