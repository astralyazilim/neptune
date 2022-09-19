import "reflect-metadata"
import { IStackItem, Resource } from "../core";

import { container  } from "tsyringe";
export default (stack: Record<string, any & Resource>, stackItem: any & Resource) => {
    const item = container.resolve("UserResource")
    
    return { ...stack,  [stackItem.path] : item}

    
}