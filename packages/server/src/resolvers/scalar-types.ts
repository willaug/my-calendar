import { GraphQLScalarType } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';
import moment from 'moment';
import validator from 'validator';

export default {
  Upload: GraphQLUpload,
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
  IP: new GraphQLScalarType({
    name: 'IP',
    description: 'IP custom scalar type',
    parseValue: (value: string): string | void => {
      if (!validator.isIP(value)) throw new Error();
      return value;
    },
  }),
};
