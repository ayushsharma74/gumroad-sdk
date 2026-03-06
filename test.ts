import { GumroadClient } from "./packages/sdk/src/index.js";

const gr = new GumroadClient({
    accessToken: "nItdv8mpA90BfarcBOU0QjdQoUeech5jkqLkQvSuaRs",
})

gr.products.list().then((products) => {
    console.log(products[0].name);
    
})
