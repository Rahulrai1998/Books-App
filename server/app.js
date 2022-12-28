const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express()


// MOUNTING 'graphqlHTTP' middleware to '/graphql' PATH/ROUTE
app.use('/graphql',graphqlHTTP({
    
}))

app.listen(4000 , ()=>{
    console.log("listening on port 4000")
})
