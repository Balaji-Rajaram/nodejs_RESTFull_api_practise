// test/api.test.js

import request from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';
let server;

// Start the server before running tests
before(done => {
  server = app.listen( 3100, done);
});

// Stop the server after tests are done
after(async function() {
  this.timeout(5000);  // Increase timeout to 5 seconds

  console.log("everything is done rocky");

  // Close MongoDB connection and wait for it to finish
  await mongoose.connection.close();
  console.log('MongoDB connection closed');

  // Then close the server
  await new Promise(resolve => server.close(resolve));
});

describe('Simple API Tests', () => {

  // Test for a GET request
  it('should return status 200 and a response message on GET /', done => {
    request(server)
      .get('/api/simpleApi')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (res.body.message !== 'Response from GET method') throw new Error('Unexpected response message');
      })
      .end(done);
  });

  // Test for a POST request
  it('should return status 200 and a response message on POST /', async () => {
    const res = await request(server)
      .post('/api/simpleApi')
      .send({ message: 'Response from POST method' })
      .expect(200)
      .expect('Content-Type', /json/);
    
    if (res.body.message !== 'Response from POST method') {
      throw new Error('Unexpected response message');
    }
  });
  
  it('should return status 200 and a response message on POST /', done => {
    request(server) 
      .post('/api/simpleApi')
      .send({message:'Response from POST method'})
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (res.body.message !== 'Response from POST method') throw new Error('Unexpected response message');
      })
      .end(done);
  });

  // Test for a GET request with parameters
  it('should return status 200 and a response message on PUT /', done => {
    request(server)
      .put('/api/simpleApi')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        if (res.body.message !== 'Response from PUT method') throw new Error('Unexpected response message');
      })
      .end(done);
  });

  // // Test for a DELETE request
  it('should return status 200 and a response message on DELETE /', done => {
    request(server)
      .put('/api/simpleApi')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
  });

});
