const request = require("supertest")

const baseURL = "http://localhost:8081/";

describe('GET /api/product/get-medicine/:slug', () => {
    it('should return 200 OK and a product', async () => {
        const response = await request(baseURL)
            .get('api/product/get-medicine/Acamprol')
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Single Product Fetched");
    });

});


