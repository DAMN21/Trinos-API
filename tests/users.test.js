const request = require('supertest');
const app = require('../app');

describe('GET /user', () => {
  it('Should response hello world', async () => {
    const response = await request(app).get('/users');
    expect(response.body.data).toBe('hello world');
  });
});
