const supertest = require('supertest');
const server = require('./auth-router.js');
const db = require('../database/dbConfig');

describe('/register end point', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should return 201, registration', async () => {
    
  });
});