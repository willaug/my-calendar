import { GraphQLScalarType } from 'graphql';
import moment from 'moment';
import validator from 'validator';

export default {
  Timestamp: new GraphQLScalarType({
    name: 'Timestamp',
    description: 'Timestamp custom scalar type',
    serialize: (value: string): string => moment(value).toISOString(),
  }),
  Email: new GraphQLScalarType({
    name: 'Email',
    description: 'Email custom scalar type',
    parseValue: (value: string): string | void => {
      if (!validator.isEmail(value)) throw new Error();
      return value;
    },
  }),
};
