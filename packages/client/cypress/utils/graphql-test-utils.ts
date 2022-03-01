import { pascalCase } from 'change-case';

interface AliasParams {
  req: any;
  operation: string;
  fixture?: string;
  delay?: number;
}

export function addFixtureToResponse(req: any, fixture?: string): void {
  if (fixture) {
    req.reply({ fixture });
  }
}

export function addDelay(req: any, delay?: number): void {
  if (delay) {
    req.on('response', (res: any) => {
      res.setDelay(delay);
    });
  }
}

export function hasOperationName(req: any, operationName: string): boolean {
  const { body } = req;
  return body.operationName && body.operationName === operationName;
}

export function aliasQuery({
  req,
  operation,
  fixture,
  delay,
}: AliasParams): void {
  if (hasOperationName(req, operation)) {
    req.alias = `gql${pascalCase(operation)}Query`;

    addDelay(req, delay);
    addFixtureToResponse(req, fixture);
  }
}

export function aliasMutation({
  req,
  operation,
  fixture,
  delay,
}: AliasParams): void {
  if (hasOperationName(req, operation)) {
    req.alias = `gql${pascalCase(operation)}Mutation`;

    addDelay(req, delay);
    addFixtureToResponse(req, fixture);
  }
}
