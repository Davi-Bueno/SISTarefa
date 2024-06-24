const bcrypt = require('bcrypt');

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.passwordHash = null;
        this.createdAt = new Date();
        this.updatedAt = this.createdAt; // No momento da criação, updatedAt é igual a createdAt
        this.accessLevel = 'COMMON'; // Nível de acesso padrão
    }

    async setPassword(password) {
        const saltRounds = 10;
        this.passwordHash = await bcrypt.hash(password, saltRounds);
    }

    async authenticate(password) {
        return await bcrypt.compare(password, this.passwordHash);
    }

    update(data) {
        this.name = data.name || this.name;
        this.email = data.email || this.email;
        this.accessLevel = data.accessLevel || this.accessLevel;
        this.updatedAt = new Date();
    }

    // Métodos adicionais conforme necessário para operações específicas do usuário
}

module.exports = User;
