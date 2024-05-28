import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a sigup request', () => {
    const signup_email = 'test1@test.com';
    const signup_password = 'test1';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: signup_email, password: signup_password })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(signup_email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const signup_email = 'test1@test.com';
    const signup_password = 'test1';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: signup_email, password: signup_password })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(signup_email);
    expect(body.id).toBeDefined();
  });
});
