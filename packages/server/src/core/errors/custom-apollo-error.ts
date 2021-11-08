import { ApolloError } from 'apollo-server-express';

export default class CustomApolloError extends ApolloError {
  public constructor(message: string, code: string) {
    super(message, code);
  }
}
