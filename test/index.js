const chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('../app'),
  faker = require('faker'),
  should = chai.should();

chai.use(chaiHttp);

describe('Init', function () {

  it('Verifica Status', function (done) {
    chai.request(server).get('/').end((err, res) => {
      should.not.exist(err);
      res.should.have.status(200);
      done();
    })
  });

});

// Test a get route...

describe('/Get API test', function () {

  it('Verifica se tem parâmetro', function (done) {
    chai.request(server).get('/post-list').end((err, res) => {
      should.not.exist(err);
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('User id faltou parâmetro!');
      done();
    })
  });

  it('Verifica se api deu sucesso!', function (done) {
    chai.request(server).get('/post-list?user_id=1').end((err, res) => {
      should.not.exist(err);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('userId');
      res.body.should.have.property('title');
      res.body.should.have.property('body');
      done();
    })
  });

});


describe('/POST Test api', function () {

  it('Verifica api sem parâmetro! . False', function (done) {
    chai.request(server).post('/submit-data').send({}).end((err, res) => {
      should.not.exist(err);
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('Erro aconteceu!');
      done();
    })
  });

  it('Verifica api com parâmetro. Successo', function (done) {
    chai.request(server).post('/submit-data').send({
      name: faker.name.firstName(),
      email: faker.internet.email()
    }).end((err, res) => {
      should.not.exist(err);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('Sucesso');
      done();
    })
  });

});
