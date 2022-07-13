-- CreateTable
CREATE TABLE `homologation_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(250) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `homologation` (
    `id` VARCHAR(191) NOT NULL,
    `fk_solicitation` VARCHAR(191) NOT NULL,
    `created_user` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `homologation_user` JSON NULL,
    `homologation_at` DATETIME(3) NULL,
    `comment` VARCHAR(191) NULL,
    `fk_homologation_status` INTEGER NOT NULL,

    UNIQUE INDEX `homologation_fk_solicitation_key`(`fk_solicitation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `solicitation_tryout` (
    `id` VARCHAR(191) NOT NULL,
    `number_tryout` INTEGER NOT NULL AUTO_INCREMENT,
    `code_sap` VARCHAR(250) NOT NULL,
    `desc_product` VARCHAR(250) NOT NULL,
    `client` VARCHAR(250) NOT NULL,
    `programmed_date` DATETIME(3) NOT NULL,
    `reason` VARCHAR(250) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `solicitation_tryout_number_tryout_key`(`number_tryout`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `injection_process` (
    `id` VARCHAR(191) NOT NULL,
    `id_tryout` VARCHAR(191) NOT NULL,
    `proc_technician` JSON NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `injection_process_id_tryout_key`(`id_tryout`),
    INDEX `id_tryou`(`id_tryout`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedstock` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    `kg` DOUBLE NOT NULL,
    `id_process_injection` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `feedstock_id_process_injection_key`(`id_process_injection`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labor` (
    `id` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    `id_injection_process` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `labor_id_injection_process_key`(`id_injection_process`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mold` (
    `id` VARCHAR(191) NOT NULL,
    `number_cavity` INTEGER NOT NULL,
    `desc_mold` VARCHAR(250) NOT NULL,
    `id_injection_process` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `mold_id_injection_process_key`(`id_injection_process`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `homologation` ADD CONSTRAINT `homologation_fk_homologation_status_fkey` FOREIGN KEY (`fk_homologation_status`) REFERENCES `homologation_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `homologation` ADD CONSTRAINT `homologation_fk_solicitation_fkey` FOREIGN KEY (`fk_solicitation`) REFERENCES `solicitation_tryout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `injection_process` ADD CONSTRAINT `injection_process_id_tryout_fkey` FOREIGN KEY (`id_tryout`) REFERENCES `solicitation_tryout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedstock` ADD CONSTRAINT `feedstock_id_process_injection_fkey` FOREIGN KEY (`id_process_injection`) REFERENCES `injection_process`(`id_tryout`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labor` ADD CONSTRAINT `labor_id_injection_process_fkey` FOREIGN KEY (`id_injection_process`) REFERENCES `injection_process`(`id_tryout`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mold` ADD CONSTRAINT `mold_id_injection_process_fkey` FOREIGN KEY (`id_injection_process`) REFERENCES `injection_process`(`id_tryout`) ON DELETE RESTRICT ON UPDATE CASCADE;
