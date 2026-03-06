import { GumroadClient } from "./packages/sdk/src/index.js";

const gr = new GumroadClient({
    accessToken: "nItdv8mpA90BfarcBOU0QjdQoUeech5jkqLkQvSuaRs",
})

const products = await gr.sales.list({
    
});
console.log(products);