-- AlterTable
ALTER TABLE `Image` ADD COLUMN `label` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Project` ADD COLUMN `preview_extension` VARCHAR(191) NULL,
    ADD COLUMN `preview_filesize` INTEGER NULL,
    ADD COLUMN `preview_height` INTEGER NULL,
    ADD COLUMN `preview_id` VARCHAR(191) NULL,
    ADD COLUMN `preview_width` INTEGER NULL;
