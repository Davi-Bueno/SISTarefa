const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const { getCurrentDate } = require('../utils/dateUtils');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes'); // Rota de autenticação

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON parsing
app.use(express.json());

// Configuração do EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rota principal
app.get('/', (req, res) => {
    const currentDate = getCurrentDate();
    res.render('index', { link: '/api-docs', loadedAt: currentDate });
});

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas de usuários
app.use('/users', userRoutes);

// Rotas de projetos
app.use('/projects', projectRoutes);

// Rotas de tarefas
app.use('/tasks', taskRoutes);

// Rota de autenticação
app.use('/auth', authRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
