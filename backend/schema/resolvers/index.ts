import { IResolvers, IResolversParameter } from "apollo-server-express";
import { Query } from "./QueryResolver";
import { Mutation } from "./MutationResolver";

export const resolvers: IResolvers = {
  Query,
  Mutation,
};
