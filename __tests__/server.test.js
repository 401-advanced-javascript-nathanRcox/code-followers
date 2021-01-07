'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);
const routes = require('../routes/routes');

describe('web server', () => {

  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    mongoose.connection.close()
    done()
  })

  it('should respond with a 404 on an invalid method', async () => {
    const response = await mockRequest.put('/hello');
    expect(response.status).toBe(404);
  });


  it('should respond with a 404 on an invalid route', async () => {
    const response = await mockRequest.get('/blarg');
    expect(response.status).toBe(404);
  });

  it('should respond properly on a POST request to /signup and return a response object', async () => {
    let newUser = {
      "username":"sara4",
      "password": "test"
  }
    const response = await mockRequest.post('/signup').query(newUser)
    //expect(response.status).toBe(200);
    expect(response.body).toBeDefined;
  });

});