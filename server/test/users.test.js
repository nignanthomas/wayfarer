import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import UserModel from '../api/v1/models/userModel';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);


describe('Users Tests', () => {
  let token = '';
  before((done) => {
    chai
      .request(app)
      .get('/get-token')
      .end((err, res) => {
        const result = JSON.parse(res.text);
        token = result.token;
        done();
      });
  });
  it('GET /api/v1/users should get all users', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.match(/success/);
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('GET /api/v1/users/:id Should get a specific user (User just created)', (done) => {
    const user = {
      email: 'nignanthomas@gmail.com',
      first_name: 'Thomas',
      last_name: 'Nignan',
      password: 'qwerty',
      is_admin: true,
    };
    const userId = UserModel.createUser(user).id;
    chai
      .request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.status.should.match(/success/);
        res.body.data.should.be.a('object');
        done();
      });
  });

  it('GET /api/v1/users/:id Should not get a specific user (User 11 that does not exist)', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/11')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.match(/error/);
        done();
      });
  });

  it('GET /api/v1/users/:id Should not get a specific user (User \'a\' that does not exist)', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/a')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.status.should.match(/error/);
        done();
      });
  });


// TO BE ACTIVATED LATER IF I WANT TO UPDATE/DELETE A USER
  // it('PATCH /api/v1/users/:id Should update a given user', (done) => {
  //   const user = {
  //     id: User.getAllUsers().length + 1,
  //     email: 'nignanthomas@gmail.com',
  //     first_name: 'Thomas',
  //     last_name: 'Nignan',
  //     password: 'qwerty',
  //   };
  //   const userId = User.createUser(user).id;
  //   chai
  //     .request(app)
  //     .patch(`/api/v1/users/${userId}`)
  //     .send({
  //       email: 'nstcephas@gmail.com',
  //       first_name: 'Cephas',
  //       last_name: 'Thomasson',
  //       password: 'qwerty12345',
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a('object');
  //       done();
  //     });
  // });
  //
  // it('DELETE /api/v1/users/:id Should delete a given user', (done) => {
  //   const user = {
  //     id: User.getAllUsers().length + 1,
  //     email: 'nignanthomas@gmail.com',
  //     first_name: 'Thomas',
  //     last_name: 'Nignan',
  //     password: 'qwerty',
  //   };
  //   const userId = User.createUser(user).id;
  //   chai
  //     .request(app)
  //     .delete(`/api/v1/users/${userId}`)
  //     .end((err, res) => {
  //       res.should.have.status(204);
  //       res.boody.should.be.a('object');
  //       done();
  //     });
  // });
});
