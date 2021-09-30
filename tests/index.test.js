const request = require('supertest');
const app = require('../app');

describe('GET /index', () => {
  it('Should response hello world-index', async () => {
    const response = await request(app).get('/');
    expect(response.body.data).toBe('Hello World-index');
  });
});
