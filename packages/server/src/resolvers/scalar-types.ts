import { GraphQLUpload } from 'graphql-upload';
import { GraphQLScalarType } from 'graphql';
import validator from 'validator';

export default {
  Upload: GraphQLUpload,
  HexadecimalColor: new GraphQLScalarType({
    name: 'HexadecimalColor',
    description: 'HexadecimalColor custom scalar type',
    parseValue: (value: string): string | void => {
      if (!validator.isHexColor(value)) throw new Error();
      return value;
    },
  }),
  Timestamp: new GraphQLScalarType({
    name: 'Timestamp',
    description: 'Timestamp custom scalar type',
    parseValue: (value: string): string | void => {
      if (!validator.isISO8601(value)) throw new Error();
      return value;
    },
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
    description: 'IPV4 or IPV6',
    parseValue: (value: string): string | void => {
      if (!validator.isIP(value)) throw new Error();
      return value;
    },
  }),
};
