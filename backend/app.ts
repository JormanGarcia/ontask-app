import express from "express";
import { graphqlHTTP } from "express-graphql";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import { env } from "./config";
import { initMongoDB } from "./loaders";
import { usersService } from "./services/users.service";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

initMongoDB();

const UserService = usersService();

app.get("/", async (req, res) => {
  const userNew = await UserService.createUser({
    email: "Jormanj_@outlook.com",
    name: {
      first: "Jorman Garcia",
      last: "Jorman Garcia",
    },
    password: "123456",
  });

  await userNew?.save();

  res.send("User Creado");
});

app.listen(env.Port, () =>
  console.log(`Server is Listening on port: ${env.Port}`)
);
