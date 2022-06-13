-- CreateTable
CREATE TABLE `client` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `client_code` VARCHAR(250) NOT NULL,

    UNIQUE INDEX `client_code`(`client_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedstock` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `code_feedstock` VARCHAR(250) NOT NULL DEFAULT '0',
    `description` VARCHAR(250) NOT NULL DEFAULT '0',

    UNIQUE INDEX `code_feedstock`(`code_feedstock`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `injection_process` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_tryout` INTEGER UNSIGNED NOT NULL,
    `id_process` INTEGER UNSIGNED NOT NULL,
    `id_labor` INTEGER UNSIGNED NULL,
    `id_mold` INTEGER UNSIGNED NOT NULL,
    `id_machine` INTEGER UNSIGNED NOT NULL,
    `comments_pcp` VARCHAR(50) NULL,
    `last_update_pcp` DATETIME(0) NULL,
    `author_pcp` VARCHAR(50) NULL,
    `status_pcp` INTEGER NULL,
    `machine` VARCHAR(50) NOT NULL,
    `mold` VARCHAR(50) NOT NULL,

    INDEX `id_labor`(`id_labor`),
    INDEX `id_tryou`(`id_tryout`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labor` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `labor` JSON NOT NULL,
    `id_process` INTEGER UNSIGNED NOT NULL,

    INDEX `id_process`(`id_process`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peripheral` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `peripheral` JSON NOT NULL,
    `id_process` INTEGER UNSIGNED NOT NULL,

    INDEX `id_process`(`id_process`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `process` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name_process` VARCHAR(250) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(250) NOT NULL DEFAULT '0',
    `code_product` VARCHAR(250) NOT NULL DEFAULT '0',
    `id_feedstock` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `client` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    UNIQUE INDEX `code_product`(`code_product`),
    INDEX `FK__client`(`client`),
    INDEX `FK__feedstock`(`id_feedstock`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sap` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `code_sap` VARCHAR(250) NOT NULL DEFAULT '0',
    `id_product` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    UNIQUE INDEX `code_sap`(`code_sap`),
    INDEX `FK__product`(`id_product`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tryout` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `code_sap` VARCHAR(250) NOT NULL,
    `product_description` VARCHAR(250) NOT NULL,
    `client` INTEGER UNSIGNED NOT NULL,
    `date` DATE NULL,
    `reason` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `status` INTEGER UNSIGNED NULL DEFAULT 2,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `injection_process` ADD CONSTRAINT `FK_tryout_process_injection` FOREIGN KEY (`id_tryout`) REFERENCES `tryout`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peripheral` ADD CONSTRAINT `FK_proccess_injection_peripheral` FOREIGN KEY (`id_process`) REFERENCES `injection_process`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `FK__client` FOREIGN KEY (`client`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `FK__feedstock` FOREIGN KEY (`id_feedstock`) REFERENCES `feedstock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sap` ADD CONSTRAINT `FK__product` FOREIGN KEY (`id_product`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
