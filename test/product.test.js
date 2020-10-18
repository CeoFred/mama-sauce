/* eslint-disable linebreak-style */
const request = require('supertest');
const { app, mongoose } = require('../app.js');

// beforeAll((done) => {
//   const { connection } = mongoose;
//   connection.once('open', () => {
//     console.log('MongoDB connected successfully');
//     connection.db.listCollections().toArray((err, names) => {
//       if (err) {
//         console.log(err);
//       } else {
//         for (let i = 0; i < names.length; i++) {
//           console.log(names[i].name);
//           if ((names[i].name === 'product')) {
//             connection.db.dropCollection('product', () => {
//               done();
//             });
//           }
//         }
//       }
//     });
//   });
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
