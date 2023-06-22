const request = require('supertest');
const User = require('../../models/User');
const app = require('../../../app');

beforeAll(async () => {
    await User.deleteMany();
});

test('User cannot signup with empty username & empty password', async() => {
    await request(app)
        .post('/auth/register')
        .send({
            username: '',
            password: ''
        })
        .expect(400)
});

test('User cannot signup with empty username', async() => {
    await request(app)
        .post('/auth/register')
        .send({
            username: '',
            password: 'Password123'
        })
        .expect(400)
});

test('User cannot signup with username that contains less than 5 characters', async() => {
    await request(app)
        .post('/auth/register')
        .send({
            username: 'guu',
            password: 'Password123'
        })
        .expect(400)
});

test('User cannot signup with a password that contains less than 8 characters', async() => {
    await request(app)
        .post('/auth/register')
        .send({
            username: 'guu876',
            password: 'Pass12$'
        })
        .expect(400)
});

test('User cannot signup with a password that does not include a uppercase character', async() => {
    await request(app)
        .post('/auth/register')
        .send({
            username: 'guu876',
            password: 'password12$'
        })
        .expect(400)
});

test('User cannot signup with a password that does not include a lowercase character', async() => {
    await request(app)
        .post('/auth/register')
        .send({
            username: 'guu876',
            password: 'PASSWORD123$'
        })
        .expect(400)
});

test('User cannot signup with a password that does not include a numerical character', async() => {
    await request(app)
        .post('/auth/register')
        .send({
            username: 'guu876',
            password: 'Password!@#$'
        })
        .expect(400)
});

test('User cannot signup with a password that does not include a special character', async() => {
    await request(app)
        .post('/auth/register')
        .send({
            username: 'guu876',
            password: 'Password123'
        })
        .expect(400)
});

test('User cannot signup with an existing username', async() => {
    await request(app)
        .post('/auth/register')
        .send({
            username: 'guu876',
            password: 'Password123$'
        })
        .expect(200);
    
        await request(app)
        .post('/auth/register')
        .send({
            username: 'guu876',
            password: 'Password123$'
        })
        .expect(400);
});

test('User can successfully register', async() => {
    const response =  await request(app)
                        .post('/auth/register')
                        .send({
                            username: 'guu1876',
                            password: 'Password1234$'
                        })
                        .expect(200);

    expect(response.body._id);

});

test('User can login', async() => {
    const response = await request(app)
                        .post('/auth/login')
                        .send({
                            username: 'guu1876',
                            password: 'Password1234$'
                        })
                        .expect(200);

    const user = await User.findOne({token:response.body.token}).select('-password');
    expect(user.username).toBe('guu1876')

})


