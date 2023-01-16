-- CreateTable
CREATE TABLE `Access` (
    `site_id` INTEGER NOT NULL AUTO_INCREMENT,
    `site_name` VARCHAR(191) NOT NULL,
    `site_admin` VARCHAR(191) NOT NULL,
    `site_ftp` VARCHAR(191) NOT NULL,
    `site_host` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`site_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
