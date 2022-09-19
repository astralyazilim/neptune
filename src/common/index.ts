
import "reflect-metadata"
import { autoInjectable, Lifecycle, scoped, singleton } from "tsyringe"
import {  Resource as _Resource } from "../core"
export const serviceScope = Lifecycle
export function Resource(path: string | RegExp) {
   
    return function <T extends { new(...args: (any & _Resource)[]): _Resource }>(constructor: T) {
        @autoInjectable()
        @singleton()
        class resource extends constructor implements _Resource {
             path=path
        }

        return resource
    }
}




export function Service(scope: number) {
   
    return function <T extends { new(...args: any[]): {}}>(constructor: T) {
        @scoped(scope)
        class service extends constructor {
           
        }

        return service
    }
}