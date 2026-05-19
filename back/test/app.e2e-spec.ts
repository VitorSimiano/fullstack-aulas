
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { afterAll, beforeAll, describe, it } from '@jest/globals';

describe('Tasks (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); 
    await app.init();
  });
  it('/tasks (POST) - Deve retornar 400 ao enviar título vazio', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ title: '', description: 'Nova Task', extraField: 'Campo Extra' }) // Enviando um campo extra para testar o whitelist
      .expect(400); // O teste vai FALHAR aqui (receberá 201)
  });
  afterAll(async () => {
    await app.close();
  });
});
