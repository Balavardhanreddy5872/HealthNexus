import Redis from 'ioredis';
const client = new Redis({
    host:'redis-11609.c264.ap-south-1-1.ec2.redns.redis-cloud.com' ,
    port:11609,
    password: 'ZuLKlsT30e6vMsdm0m5hVanT3o7IEeAo'
})

// const client = createClient({
//     password: 'ZuLKlsT30e6vMsdm0m5hVanT3o7IEeAo',
//     socket: {
//         host: 'redis-11609.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
//         port: 11609
//     }
// });

// await client.del('products');

export {client}