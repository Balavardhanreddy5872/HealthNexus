import request from 'supertest';
import app from './server.js';
import { expect } from 'chai';
import mongoose from 'mongoose';

import User from './models/UserModels.js';
import Product from './models/ProductModel.js';

// 1. Test api for register 
describe('POST /api/auth/register', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  it('should return an error if email already exists', async () => {
    const existingUser = new User({
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'existingpassword',
      phone: '1234567890',
      address: 'sricity'
    });
    await existingUser.save();

    const userData = {
      name: 'Test User',
      email: 'existing@example.com',
      password: 'password123',
      phone: '1234567890',
      address: 'sricity'
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(userData);
    expect(res.status).to.equal(200);

    expect(res.body).to.have.property('sucess', false);
    expect(res.body).to.have.property('message', 'User already exists please login');
  });
});

// 2. Test api for all orders 
describe('GET /api/auth/all-orders', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  it('should return all orders when authenticated as admin', async () => {
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: '$2b$10$g.CBYKLanbwPCLFm9cg3CudHAue5DPkAfX5Go9QqXwgf7njtrtV0m',
      phone: '1234567890',
      address: 'Admin Address',
      role: 1
    });
    await adminUser.save();

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjMxMjYzMzE5MmMxZmQ5MDYxNWI5YTIiLCJpYXQiOjE3MTQ2NDA2ODAsImV4cCI6MTcxNTI0NTQ4MH0._aaTpWVSgU2k0N9N8BQvMxBk0NPICiqBRGEntKDJtME";

    const res = await request(app)
      .get('/api/auth/all-orders')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);


    expect(res.body).to.be.an('array');
  });
});

//3. Get all labreports  

describe('GET /api/lab/all-lab', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  it('should return all lab reports when authenticated as admin', async () => {
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin123@example.com',
      password: '$2b$10$g.CBYKLanbwPCLFm9cg3CudHAue5DPkAfX5Go9QqXwgf7njtrtV0m',
      phone: '1234567899',
      address: 'Admin Address',
      role: 1
    });
    await adminUser.save();

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjMxMjYzMzE5MmMxZmQ5MDYxNWI5YTIiLCJpYXQiOjE3MTQ1MDA2NDAsImV4cCI6MTcxNTEwNTQ0MH0.gpqzYcXmARJuE7oxvUpzR9XQhMnSw3fsPvJgh2RtTvY";

    const res = await request(app)
      .get('/api/lab/all-lab')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);


    expect(res.body).to.have.property('lab').that.is.an('array');

  });
});

// 4. get a single product  

describe('GET /api/product/get-medicine/:slug', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  it('should fetch a single product by slug', async () => {
    const res = await request(app)
      .get('/api/product/get-medicine/656c1b529b2a15f4f54a4cbb');

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Single Product Fetched');
    expect(res.body).to.have.property('product');
  });
});

// 4. get a single product  

describe('GET /api/product/get-medicine/:slug', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  it('should fetch a single product by slug', async () => {
    const res = await request(app)
      .get('/api/product/get-medicine/656c1b529b2a15f4f54a4cbb');

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Single Product Fetched');
    expect(res.body).to.have.property('product');
  });
});



// 4. get a single product  

describe('GET /api/product/get-medicine/:slug', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  it('should fetch a single product by slug', async () => {
    const res = await request(app)
      .get('/api/product/get-medicine/656c1b529b2a15f4f54a4cbb');

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Single Product Fetched');
    expect(res.body).to.have.property('product');
  });
});




describe('GET /api/product/get-medicine/:slug', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  it('should fetch a single product by slug', async () => {
    const res = await request(app)
      .get('/api/product/get-medicine/656c1b529b2a15f4f54a4cbb');

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Single Product Fetched');
    expect(res.body).to.have.property('product');
  });
});





describe('GET /api/product/get-medicine/:slug', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  it('should fetch a single product by slug', async () => {
    const res = await request(app)
      .get('/api/product/get-medicine/656c1b529b2a15f4f54a4cbb');

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Single Product Fetched');
    expect(res.body).to.have.property('product');
  });
});





describe('GET /api/product/get-medicine/:slug', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  it('should fetch a single product by slug', async () => {
    const res = await request(app)
      .get('/api/product/get-medicine/656c1b529b2a15f4f54a4cbb');

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Single Product Fetched');
    expect(res.body).to.have.property('product');
  });
});





describe('GET /api/product/get-medicine/:slug', () => {
  before(async () => {
    await mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/shopping?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  });

  it('should fetch a single product by slug', async () => {
    const res = await request(app)
      .get('/api/product/get-medicine/656c1b529b2a15f4f54a4cbb');

    expect(res.status).to.equal(200);

    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('message', 'Single Product Fetched');
    expect(res.body).to.have.property('product');
  });
});


