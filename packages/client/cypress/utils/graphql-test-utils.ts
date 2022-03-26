interface AliasParams {
  req: any;
  operationName: string;
  reply?: any;
  delay?: number;
}

export function hasOperationName(req: any, operationName: string): boolean {
  return req.body.operationName && req.body.operationName === operationName;
}

export function graphqlApi({
  operationName,
  reply,
  delay,
  req,
}: AliasParams): void {
  if (hasOperationName(req, operationName)) {
    req.alias = operationName;

    if (reply) {
      req.reply(reply);
    }

    if (delay) {
      req.on('response', (res: any) => {
        res.setDelay(delay);
      });
    }
  }
}
