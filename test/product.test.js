/* eslint-disable linebreak-style */
const request = require('supertest');
const { app, mongoose } = require('../app.js');

// beforeAll((done) => {
//   if (mongoose.connection.collections.product) {
//     mongoose.connection.collections.product.deleteMany({}, () => {
//       done();
//     });
//   }
// });
// beforeAll((done) => {
//   if (mongoose.connection.collections.category) {
//     mongoose.connection.collections.category.deleteMany({}, () => {
//       done();
//     });
//   }
// });

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/api/v1/product')
      .expect(200, done);
  });
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

describe('POST /api/v1/category', () => {
  it('should create a new category', (done) => {
    request(app)
      .post('/api/v1/category')
      .send({ name: 'product1' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });
});
