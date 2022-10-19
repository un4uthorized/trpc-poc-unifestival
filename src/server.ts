import * as trpc from '@trpc/server/adapters/express'
import express from 'express';
import router from './router';
import { expressHandler } from "trpc-playground/handlers/express"

const endpoint = "/trpc"
const playground = "/playground"
const PORT = 3000;

const run = async () => {
    const app = express();

    app.use(express.json())
    
    app.use(endpoint, trpc.createExpressMiddleware({
        router
    }))

    app.use(
        playground,
        await expressHandler({
            trpcApiEndpoint: endpoint,
            playgroundEndpoint: playground,
            router
        })
    )

    app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`))
}


run();