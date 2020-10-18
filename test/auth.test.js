/* eslint-disable linebreak-style */
const request = require('supertest');
const { app, mongoose } = require('../app.js');

beforeAll((done) => {
  if (mongoose.connection.collections.users) {
    mongoose.connection.collections.users.deleteMany({}, () => {
      done();
    });
  }
});
describe('POST /', () => {
  it('should Fail', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send({ email: 'test@gmail.com', password: 'ert' })
      .expect(500, done);
  });
});

describe('POST /api/v1/users/login', () => {
  it('User login should fail', (done) => {
    request(app)
      .post('/api/v1/user/login')
      .send({ email: 'test@gmail.com', password: 'not' })
      .expect(500, done);
  });
});

describe('POST /api/v1/user/signup', () => {
  it('should create a user account', (done) => {
    const data = {
      email: 'test@gmail.com',
      password: 'mesaround19',
      confirmPassword: 'mesaround19',
      firstname: 'Alfred',
      lastname: 'Johnson',
      mobile: '098765456',
    };
    request(app)
      .post('/api/v1/user/signup')
      .send(data)
      .expect(201, done);
  });
});

describe('POST /api/v1/user/login', () => {
  it('should login a user', (done) => {
    const data = {
      email: 'test@gmail.com',
      password: 'mesaround19',
    };
    request(app)
      .post('/api/v1/user/login')
      .send(data)
      .expect(200, done);
  });
});
