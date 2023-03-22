-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `image_filesize` INTEGER NULL,
    `image_extension` VARCHAR(191) NULL,
    `image_width` INTEGER NULL,
    `image_height` INTEGER NULL,
    `image_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `profilePhoto_filesize` INTEGER NULL,
    `profilePhoto_extension` VARCHAR(191) NULL,
    `profilePhoto_width` INTEGER NULL,
    `profilePhoto_height` INTEGER NULL,
    `profilePhoto_id` VARCHAR(191) NULL,
    `labels` VARCHAR(191) NOT NULL DEFAULT '',
    `bioPhoto_filesize` INTEGER NULL,
    `bioPhoto_extension` VARCHAR(191) NULL,
    `bioPhoto_width` INTEGER NULL,
    `bioPhoto_height` INTEGER NULL,
    `bioPhoto_id` VARCHAR(191) NULL,
    `bioHeader` VARCHAR(191) NOT NULL DEFAULT '',
    `bioProfile` JSON NOT NULL,
    `degree` ENUM('Intern', 'Junior', 'Middle', 'Senior', 'Lead') NULL,
    `birth` DATETIME(3) NULL,
    `experience` VARCHAR(191) NOT NULL DEFAULT '',
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `freelancer` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `description` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Image_projects` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Image_projects_AB_unique`(`A`, `B`),
    INDEX `_Image_projects_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Project_tags` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Project_tags_AB_unique`(`A`, `B`),
    INDEX `_Project_tags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Image_projects` ADD CONSTRAINT `_Image_projects_A_fkey` FOREIGN KEY (`A`) REFERENCES `Image`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Image_projects` ADD CONSTRAINT `_Image_projects_B_fkey` FOREIGN KEY (`B`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Project_tags` ADD CONSTRAINT `_Project_tags_A_fkey` FOREIGN KEY (`A`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Project_tags` ADD CONSTRAINT `_Project_tags_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
