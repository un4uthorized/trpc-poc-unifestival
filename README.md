pnpm init

install ts `pnpm add -D typescript tsx `

create `src/server.ts`  and add log

create dev script `dev: tsx watch src/server.ts`

install express `pnpm add express`

install express types  `pnpm add -D @types/express

inside server.ts write:

```
import express from 'express';

  

const app = express();

  

app.use("/", (req, res) => {

res.send("Unifestival!")

})

  

app.listen(3000, () => console.log("Server is running..."))

```

install trpc `pnpm add @trpc/server`

add package in first line 

`import * as trpc from '@trpc/server/adapters/express'`

add json resolver after app const 

`app.use(express.json())`

create const trpc endpoint  after json resolver

`const endpoint = "/trpc"`

instace of trpc 

```
app.use(endpoint, trpc.createExpressMiddleware({

router

}))
```

create `src/router.ts`

install zod `pnpm add zod`

add code in `src/router.ts`

```
import * as trpc from '@trpc/server'

import { z } from 'zod'

  

const router = trpc

	.router()

	.query("getUsers", {

		output: z.array(

					z.object({

						id: z.number(),

						name: z.string()

					})

			),

		resolve(){

			return [

					{

						id: 1,

						name: "Miguel"

					}

			]

		}

})

  
  
export default router;
```


install package 
`pnpm add trpc-playground`

in `src/server.ts` add code: 

```
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
```
