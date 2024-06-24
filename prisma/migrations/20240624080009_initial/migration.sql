-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `senhaHash` VARCHAR(191) NOT NULL,
    `usuarioAcesso` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nivelAcesso` VARCHAR(191) NOT NULL,
    `dataModificacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_usuarioAcesso_key`(`usuarioAcesso`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
