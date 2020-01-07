const supertest = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig.js');

describe('GET /api/jokes', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });


  it('should return 200 when authorized', async () => {
    const authorization = await supertest(server)
      .post('/api/auth/register')
      .send({ username: 'sunny', password: 'pass' });

    expect(authorization.status).toBe(201);

    const jokes = await supertest(server)
      .get('/api/jokes')
      .set('authorization', authorization.body.token);

    expect(jokes.status).toBe(200);
    expect(jokes.type).toMatch(/json/i);
  });
  
  it('should require auth..', () => {
    return supertest(server)
      .get('/api/jokes')
      .then(res => {
        expect(res.status).toBe(401);
      })
  });
});



