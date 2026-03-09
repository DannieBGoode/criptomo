function loadModule(modulePath) {
  jest.resetModules();
  return require(process.cwd() + '/' + modulePath.replace(/^\.\.\//, ''));
}

module.exports = {
  loadModule: loadModule
};
