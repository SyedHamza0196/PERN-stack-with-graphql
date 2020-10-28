const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const path = require("path");
const PORT = process.env.PORT || 4000;

const app = express();

// allow cross server request
app.use(cors()); 

if (process.env.NODE_ENV === "production") {
    // serve static content
    app.use(express.static(path.join(__dirname, "client/build")));
  }

// middleware
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

// catchall method
// app.get("*", (req,res) => {
//     res.sendFile(path.join(__dirname, "client/build/index.html"))
// });

app.listen(PORT, () => {
    console.log("server on port ${PORT}")
});