import { createServer } from "http"
import getStackFromResources from "../healpers/getStackFromResources"

export interface INeptunOptions {
    /**
     * Adapter of app, node, netlify ...etc
     */
    adapter?: NodeAdapter,
    resources: Array<any & Resource>
}



export interface IStackItem {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE"
}



export class App {

    private resources: Record<string, any & Resource> = {}
    /**
     * 
     * @param {INeptunOptions} options options of netpune app 
     */
    constructor(options: INeptunOptions) {
        const resources = options.resources

        console.log(resources[0])
        // this.resources = options.resources.reduce<Record<string,any & Resource>>(getStackFromResources,  {} as Record<string, any & Resource>)
        // options.adapter && options.adapter.listen(this.resources)
    
    }
}



export  interface Resource {
    GET?(request: Request): Response | Promise<Response>
    POST?(request: Request): Response | Promise<Response>
    PUT?(request: Request): Response | Promise<Response>
    PATCH?(request: Request): Response | Promise<Response>
    DELETE?(request: Request): Response | Promise<Response>
    HEAD?(request: Request): Response | Promise<Response>
    OPTIONS?(request: Request): Response | Promise<Response>
    CONNECT?(request: Request): Response | Promise<Response>
    TRACE?(request: Request): Response | Promise<Response>
}
    

export class Stack {
    public paths: string[] = []
    public method?: Function
}


export class NodeAdapter {
    constructor(private port: number) { }

    listen(resources: Record<string, any & Resource>) {
        createServer(async (req, res) => {

            const path = req.url as string
            const method = req.method as string
            try {
                const response = await resources[path as string]?.[method.toUpperCase()]() as Response
                const body = await response?.json()
                res.end(JSON.stringify(body, null, 2))
            } catch (e) {

                console.log(e)
               // throw new Error()
            }
        }).listen(3000)
    }
}




