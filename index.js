import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import auth from './safe/auth.js';

const host='0.0.0.0'; //O ip 0.0.0.0 reprcesenta todas interfaces de servidor
const porta = 3000; //Porta identifica um programa em execucao

const app = express();

app.use(express.urlencoded( { extended: true } ));//Permite o uso do req.body

//Gerencie uma sessao, memoria entre server-user
app.use(session({
    secret: 'TESTE',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 15
    }
}));

app.post('/login', (req, res)=>{
    const user  = req.body.user;
    const senha = req.body.senha;
    if (user && senha && user === 'Vitor' && senha === '123'){
        req.session.userlogg = true;
        res.redirect('/priv/ingresso.html')
    }
    else{
        res.redirect('/a/login.html')
    }
})

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(auth, express.static(path.join(process.cwd(), 'priv')));

app.use(express.static('./public'));

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})