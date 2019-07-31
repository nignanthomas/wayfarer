import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('Sign In', () => {
  it('POST /api/v1/auth/signin Should log in a user', (done) => {
    const user = {
      email: 'nignanthomas@gmail.com',
      password: 'qwerty',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});
