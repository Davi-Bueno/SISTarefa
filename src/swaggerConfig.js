const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Tarefas',
            version: '1.0.0',
            description: 'Documentação da API de Tarefas',
        },
    },
    apis: ['./routes/*.js'], // Arquivos que contêm as rotas da API
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
