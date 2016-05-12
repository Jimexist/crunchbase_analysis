const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
app
  .use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
  }))
  .listen(3000, () => {
    console.log('GraphQL server running on http:// localhost:3000/graphql');
  });
