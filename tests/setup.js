// Fail tests if console.error is called unexpectedly
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    throw new Error('console.error was called: ' + args.join(' '));
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
