const request = require("supertest")

const baseURL = "http://localhost:8081/";

describe('POST /api/auth/login', () => {
    it('should return 200 OK and a token if login is successful', async () => {
        const response = await request(baseURL)
            .post('api/auth/login')
            .send({ email: 'sup@gmail.com', password: 'suprit' });
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("login successfully");
    });

    it('should return 403 OK and error if password is not correct', async () => {
        const response = await request(baseURL)
            .post('api/auth/login')
            .send({ email: 'sup@gmail.com', password: 'supritiya' });
        
        expect(response.status).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid password");

    });

    it('should return 404 OK and error if password is not correct', async () => {
        const response = await request(baseURL)
            .post('api/auth/login')
            .send({ email: 'suprit@gmail.com', password: 'supritiya' });
        
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("No user Found");

    });
});


