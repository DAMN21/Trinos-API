const request = require('supertest');
const app = require('../app');

describe('GET /user', () => {
  it('Should response hello world-users', async () => {
    const response = await request(app).get('/users');
    expect(response.body.data).toBe('hello world-users');
  });
});
