import * as trpc from '@trpc/server'
import { z } from 'zod'

const data = [
    {
        id: 1,
        name: "User 1"
    },
    {
        id: 2,
        name: "User 2"
    }
]

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
            return data
        }
    })
    .query("createUser", {
        input: z.object({
            name: z.string()
        }),
        output: 
            z.object({
                id: z.number(),
                name: z.string()
            }),
        resolve(request){
            const user = {
                id: data.length + 1,
                name: request.input.name
            }
            data.push(user);
            return user;
        }
    })
    .query("getUser", {
        input: z.object({
            id: z.number()
        }),
        output: 
            z.object({
                id: z.number(),
                name: z.string()
            }).optional(),
        resolve(request){
            const user =  data.find(u => u.id === request.input.id) 
            return user;
        }
    })


export default router;