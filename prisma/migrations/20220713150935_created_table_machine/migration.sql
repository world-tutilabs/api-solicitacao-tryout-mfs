-- CreateTable
CREATE TABLE `Machine` (
    `id` VARCHAR(191) NOT NULL,
    `model` VARCHAR(250) NOT NULL,
    `id_injection_process` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Machine_id_injection_process_key`(`id_injection_process`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Machine` ADD CONSTRAINT `Machine_id_injection_process_fkey` FOREIGN KEY (`id_injection_process`) REFERENCES `injection_process`(`id_tryout`) ON DELETE RESTRICT ON UPDATE CASCADE;
