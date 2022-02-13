import { pascalCase } from 'change-case';

interface AliasParams {
  req: any;
  operation: string;
  fixture?: string;
}

export function addFixtureToResponse(req: any, fixture?: string): void {
  if (fixture) {
    req.reply({ fixture });
  }
}

export function hasOperationName(req: any, operationName: string): boolean {
  const { body } = req;
  return body.operationName && body.operationName === operationName;
}

export function aliasQuery({ req, operation, fixture }: AliasParams): void {
  if (hasOperationName(req, operation)) {
    req.alias = `gql${pascalCase(operation)}Query`;
    addFixtureToResponse(req, fixture);
  }
}

export function aliasMutation({ req, operation, fixture }: AliasParams): void {
  if (hasOperationName(req, operation)) {
    req.alias = `gql${pascalCase(operation)}Mutation`;
    addFixtureToResponse(req, fixture);
  }
}
