const supertest = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('/register end point', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should return 201, registration', async () => {
    const authorization = await supertest(server)
      .post('/api/auth/register')
      .send({ username: 'sunny', password: 'pass' })

    expect(authorization.status).toBe(201)
    
  });

  it('should return json when registered', async () => {
    const auth = await supertest(server)
      .post('/api/auth/register')
      .send({ username: 'sunny', password: 'pass' });

    expect(auth.type).toMatch(/json/i);
  });
});

// api/auth/login
describe('POST, /api/auth/login end point', () => {
  it('should return 200 when logged in', async () => {
    await supertest(server)
      .post('/api/auth/register')
      .send({ username: 'sunny', password: 'pass' });

    const auth = await supertest(server)
      .post('/api/auth/login')
      .send({username: 'sunny', password: 'pass' });

    expect(auth.status).toBe(200);
  });

  it('should return json when logged in', async () => {
    await supertest(server)
      .post('/api/auth/register')
      .send({ username: 'sunny', password: 'pass' });

    const auth = await supertest(server)
      .post('/api/auth/login')
      .send({ username: 'sunny', password: 'pass' });

    expect(auth.type).toMatch(/json/i);
  });
});
  

