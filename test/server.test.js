import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/api/server';

chai.use(chaiHttp);
chai.should();

describe('Testing Server', () => {
  describe('GET /', () => {
    it('Server: It should return a message object', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
