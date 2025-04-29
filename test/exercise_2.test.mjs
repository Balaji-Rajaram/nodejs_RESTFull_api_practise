import request from 'supertest';
import app from '../server.js'; // Adjust the path if necessary
import mongoose  from 'mongoose';
let server;
let testItemId; // To store ID of the created item for testing

// Start the server before running tests
before(done => {
  server = app.listen(3002, done);
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

describe('Item API Tests', () => {

  // Test for creating an item (POST)
  it('should create an item and return status 201', done => {
    request(server)
      .post('/api/items/create')
      .send({ name: 'Test Item', description: 'Test Description', price: 100 })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (!res.body.id) throw new Error('Item ID is missing');
        if (res.body.name !== 'Test Item') throw new Error('Unexpected item name');
        testItemId = res.body.id; // Save the ID for future tests
      })
      .end(done);
  });

  // Test for retrieving all items (GET)
  it('should return status 200 and all items', done => {
    request(server)
      .get('/api/items/getAll')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (!Array.isArray(res.body)) throw new Error('Response is not an array');
        if (res.body.length === 0) throw new Error('No items found');
      })
      .end(done);
  });

  // // Test for retrieving an item by ID (GET)
  it('should return status 200 and the item by ID', done => {
    request(server)
      .get(`/api/items/getById/${testItemId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (res.body.id !== testItemId) throw new Error('Item ID does not match');
        if (res.body.name !== 'Test Item') throw new Error('Unexpected item name');
      })
      .end(done);
  });

  // // Test for updating an item (PUT)
  it('should update an item and return status 200', done => {
    request(server)
      .put(`/api/items/UpdateById/${testItemId}`)
      .send({ name: 'Updated Item', description: 'Updated Description', price: 150 })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (res.body.name !== 'Updated Item') throw new Error('Unexpected updated item name');
      })
      .end(done);
  });

  // // Test for deleting an item (DELETE)
  it('should delete an item and return status 200', done => {
    request(server)
      .delete(`/api/items/DeleteById/${testItemId}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (res.body.message !== 'Item deleted successfully') throw new Error('Unexpected response message');
      })
      .end(done);
  });
});
