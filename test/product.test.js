/* eslint-disable linebreak-style */
const request = require('supertest');
const { app, mongoose } = require('../app.js');
const Category = require('../models/Category');

function cleanUpDatabase() {
  if (mongoose.connection.collections.categories) {
    mongoose.connection.collections.categories.deleteMany({}, () => {
    });
  }
}

afterAll(() => {
  cleanUpDatabase();
});
describe('POST /api/v1/product', () => {
  it('should return 500', (done) => {
    request(app)
      .post('/api/v1/product')
      .send({ name: 'product1', price: 200, categoryId: '456' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, done);
  });
});

it('should create a new category', (done) => {
  request(app)
    .post('/api/v1/category')
    .send({ name: 'category' })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201, done);
});
