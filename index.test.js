const AfipServices = require('./index')

test('Afip basic test', done => {
  services = new AfipServices()
  const result = services.fe().then(res => {
    console.log(res)
    done();
  }).catch(error => {
    console.log(error)
    done(error);
  });
});