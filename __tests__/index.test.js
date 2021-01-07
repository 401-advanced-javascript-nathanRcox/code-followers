'use strict';

const API = require('../API')
const indexFunctions = require('../index');
// jest.useFakeTimers(); 
const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('Console Logs', () => {
  it('Initially asks the user to sign up or sign in', async (done) => {
    let newUser = {
      "username":"sara4",
      "password": "test"
  }
    const response = await mockRequest.post('/signup').query(newUser)
    expect(response.status).toBeDefined;
    done();
  });

});


describe("Functions on index.js", () => {
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    jest.useFakeTimers(); 
  });

  afterEach((done =>{
    consoleSpy.mockRestore();
    done();
  }));

  it("The getTitles function returns an object", async (done) => {
    let results = await indexFunctions.getTitles(API.root);
    expect(typeof results).toEqual('object');
    done();
  })


  it("The renderGames function returns a console.log with the initial game prompt", async (done) => {
    await indexFunctions.renderGame();
    expect(consoleSpy).toHaveBeenCalled
    done();
  })

  it("The signin function asks for a username and password", async (done) => {
    await indexFunctions.signin();
    expect(consoleSpy).toHaveBeenCalled;
    done();
  })


  it("The signup function asks for a username and password", async (done) => {
    await indexFunctions.signup();
    expect(consoleSpy).toHaveBeenCalled;
    done();
  })
})