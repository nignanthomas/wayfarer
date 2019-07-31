import chai from 'chai';
import chaiHttp from 'chai-http';
import uuid from 'uuid';
import app from '../api/server';
import User from '../api/v1/models/userModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);


describe('Users Tests', () => {
  it('GET /api/v1/users should get all users', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/users/:id Should get a specific user', (done) => {
    const user = {
      id: uuid.v4(),
      email: 'nignanthomas@gmail.com',
      first_name: 'Thomas',
      last_name: 'Nignan',
      password: 'qwerty',
      is_admin: true,
    };
    const userId = User.createUser(user).id;
    chai
      .request(app)
      .get(`/api/v1/users/${userId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('PATCH /api/v1/users/:id Should update a given user', (done) => {
    const user = {
      id: uuid.v4(),
      email: 'nignanthomas@gmail.com',
      first_name: 'Thomas',
      last_name: 'Nignan',
      password: 'qwerty',
    };
    const userId = User.createUser(user).id;
    chai
      .request(app)
      .patch(`/api/v1/users/${userId}`)
      .send({
        id: uuid.v4(),
        email: 'nstcephas@gmail.com',
        first_name: 'Cephas',
        last_name: 'Thomasson',
        password: 'qwerty12345',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('DELETE /api/v1/users/:id Should delete a given user', (done) => {
    const user = {
      id: uuid.v4(),
      email: 'nignanthomas@gmail.com',
      first_name: 'Thomas',
      last_name: 'Nignan',
      password: 'qwerty',
    };
    const userId = User.createUser(user).id;
    chai
      .request(app)
      .delete(`/api/v1/users/${userId}`)
      .end((err, res) => {
        res.should.have.status(204);
        res.boody.should.be.a('object');
        done();
      });
  });
});
