require('dotenv').config();

const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Segurança
app.use(helmet({
    contentSecurityPolicy: false
}));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos públicos
app.use(express.static(path.join(__dirname, 'public')));

// Processamento de dados
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Página inicial
app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Tech Next Pro'
    });
});

// Páginas
app.get('/servicos', (req, res) => {
    res.render('servicos', {
        titulo: 'Serviços | Tech Next Pro'
    });
});

app.get('/produtos', (req, res) => {
    res.render('produtos', {
        titulo: 'Produtos | Tech Next Pro'
    });
});

app.get('/sites', (req, res) => {
    res.render('sites', {
        titulo: 'Criação de Sites | Tech Next Pro'
    });
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio', {
        titulo: 'Portfólio | Tech Next Pro'
    });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', {
        titulo: 'Sobre | Tech Next Pro'
    });
});

app.get('/contato', (req, res) => {
    res.render('contato', {
        titulo: 'Contato | Tech Next Pro'
    });
});

// 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

// Inicialização
app.listen(PORT, () => {
    console.log('');
    console.log('======================================');
    console.log('       TECH NEXT PRO');
    console.log('       Servidor funcionando!');
    console.log(`       http://localhost:${PORT}`);
    console.log('======================================');
    console.log('');
});
