import 'dotenv/config';
import './database/connectDB.js'
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'

//Importacion de las rutas de cadua una de las  rutas
import authRouter from './routes/auth.route.js';
import linkRouter from './routes/link.route.js'
import redirectRouter from './routes/redirect.route.js'

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(cors({
    origin: function(origin, callback){
         if (!origin || whiteList.includes(origin)) {
            return callback(null, origin);
         }

         return callback(
            `Error de CORS origin ${origin} no esta autorizado!!! ❌😡` 
        );
    },
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
//Ejemplo back redirect (opcional)
app.use('/', redirectRouter)
//Lo que se estar ocupando 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/links', linkRouter);

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`👍👍 http://localhost:5000  ${PORT}`));