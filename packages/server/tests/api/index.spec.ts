import App from '@src/app';

describe('API', () => {
  test('API without "host port" should response successful', () => {
    delete process.env.HOST_PORT;
    const { hostPort } = new App();

    expect(hostPort).toEqual(4000);
    expect(process.env.HOST_PORT).toBeUndefined();
  });
});
