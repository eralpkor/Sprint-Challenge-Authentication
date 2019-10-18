const supertest = require('supertest');
const server = require('./server.js');


describe('GET /', () => {
  it('should return http 200', async () => {
    const response = await supertest(server).get('/')

    expect(response.status).toEqual(200);
  });
});