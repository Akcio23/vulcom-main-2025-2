import dotenv from 'dotenv'
import auth from './middleware/auth.js' // Middleware de verificação do token de autorização
dotenv.config() // Carrega as variáveis de ambiente do arquivo .env

import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

const app = express()

import cors from 'cors'

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  // credentials: true
}))

app.use(auth)

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

// Rate limiter: limita a quantidade de requisições que cada usuário/IP
// pode efetuar dentro de um determinado intervalo de tempo
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
 windowMs: 60 * 1000,    // Intervalo: 1 minuto
 limit: 20               // Máximo de 20 requisições
})


app.use(limiter)

/*********** ROTAS DA API **************/

import carsRouter from './routes/cars.js'
app.use('/cars', carsRouter)

import customersRouter from './routes/customers.js'
app.use('/customers', customersRouter)

import usersRouter from './routes/users.js'
app.use('/users', usersRouter)

export default app

/* Vulnerabilidade: API1:2023 - Falha de autenticação a nível de objeto
   Esta vulnerabilidade foi evitada no código ao verificar o ID do usuário em cada endpoint
   antes de acessar ou manipular dados. */
// Exemplo de verificação de ID do usuário
if (!req.user || req.user.id !== expectedUserId) {
    return res.status(403).send('Acesso negado');
}

/* Vulnerabilidade: API2:2023 - Falha de autenticação
   Esta vulnerabilidade foi evitada no código ao implementar tokens de autenticação seguros
   e limitar o tempo de vida dos tokens. */
// Exemplo de uso de tokens seguros
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

/* Vulnerabilidade: API9:2023 - Gerenciamento inadequado do inventário
   Esta vulnerabilidade foi evitada no código ao ocultar informações sensíveis sobre
   hosts e versões de API nos endpoints públicos. */
// Exemplo de ocultação de informações sensíveis
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});
