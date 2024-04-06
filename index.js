import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import auth from './safe/auth.js';

const host = '0.0.0.0'; // O ip 0.0.0.0 representa todas interfaces de servidor
const porta = 3000; // Porta identifica um programa em execucao

const app = express();

app.use(express.urlencoded({ extended: true })); // biblioteca qs

// Gerencie uma sessao, memoria entre server-user
app.use(session({
        secret: 'SALAD@',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60 * 1000 * 15,
        },
    })
);
app.post('/login', (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha   = requisicao.body.senha;
    if (usuario && senha && usuario === 'vitor' && senha === '123'){
        requisicao.session.usuarioLogado = true;
        resposta.redirect('/index.html');
    }
    else{
        resposta.redirect('/login.html');
    }
})

//O express oferece funcionalidades para permitir que conteúdo estático seja fornecido
app.use(express.static(path.join(process.cwd(), 'public')));

app.use(auth, express.static(path.join(process.cwd(), 'priv')));

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})