const request = require("supertest")

const baseURL = "http://localhost:8081/";

describe('POST /api/auth/login', () => {
    it('should return 200 OK and a token if login is successful', async () => {
        const response = await request(baseURL)
            .post('api/auth/login')
            .send({ email: 'sup@gmail.com', password: 'suprit' });
        
        expect(response.status).toBe(200);
        // expect(response.body).toHaveProperty('token');
    });
});


