// test/product.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js'; // Adjust the path if necessary

const MONGO_URI =  process.env.MONGO_URI;
let server;
let testProductId; // To store ID of the created product for testing

// Connect to the test database before tests


// Start the server before running tests
before(done => {
  server = app.listen(3003, done);
});

// Stop the server after tests are done
after(async function() {
  this.timeout(5000);  // Increase timeout to 5 seconds
 

  // Close MongoDB connection and wait for it to finish
  await mongoose.connection.close();
  console.log('MongoDB connection closed');

  // Then close the server
  await new Promise(resolve => server.close(resolve));
});

describe('Product API Tests', () => {

  // Test for creating a product (POST)
  it('should create a product and return status 201', done => {
    request(server)
      .post('/api/products/create')
      .send({ name: 'Test Product', description: 'Test Description', price: 100 })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (!res.body._id) throw new Error('Product ID is missing');
        if (res.body.name !== 'Test Product') throw new Error('Unexpected product name');
        testProductId = res.body._id; // Save the ID for future tests
      })
      .end(done);
  });

  // Test for retrieving all products (GET)
  it('should return status 200 and all products', done => {
    request(server)
      .get('/api/products/getAll')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (!Array.isArray(res.body)) throw new Error('Response is not an array');
        if (res.body.length === 0) throw new Error('No products found');
      })
      .end(done);
  });

  // // Test for retrieving a product by ID (GET)
  it('should return status 200 and the product by ID', done => {
    request(server)
      .get(`/api/products/getById/${testProductId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (res.body._id !== testProductId) throw new Error('Product ID does not match');
        if (res.body.name !== 'Test Product') throw new Error('Unexpected product name');
      })
      .end(done);
  });

  // // Test for updating a product (PUT)
  it('should update a product and return status 200', done => {
    request(server)
      .put(`/api/products/updateById/${testProductId}`)
      .send({ name: 'Updated Product', description: 'Updated Description', price: 150 })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (res.body.name !== 'Updated Product') throw new Error('Unexpected updated product name');
      })
      .end(done);
  });

  // // Test for deleting a product (DELETE)
  it('should delete a product and return status 200', done => {
    request(server)
      .delete(`/api/products/deleteById/${testProductId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (res.body.message !== 'Product deleted successfully') throw new Error('Unexpected response message');
      })
      .end(done);
  });
});
