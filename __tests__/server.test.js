'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {

  it('should respond with a 404 on an invalid method', async () => {
    const response = await mockRequest.put('/hello');
    expect(response.status).toBe(404);
  });


  it('should respond with a 404 on an invalid route', async () => {
    const response = await mockRequest.get('/blarg');
    expect(response.status).toBe(404);
  });
});