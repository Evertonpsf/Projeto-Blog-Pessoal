import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';


describe('Testes dos Modulos Usuario e Auth (e2e)', () => {
  
  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => { // e este comando inicia a aplicação
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: ":memory:",
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {// este comando finaliza a aplicação
    await app.close();
  });

it("01 - Deve Cadastrar um novo Usuário", async () => {// geralmente começamos com deve ...... ai apos deve colocamos o que esperamos que esse teste va checar
  const resposta = await request(app.getHttpServer())

  .post('/usuarios/cadastrar')
  .send({
    nome: 'Root',
    usuario: 'root@root.com',
    senha: 'rootroot',
    foto: '-',
  })
.expect(201);

usuarioId = resposta.body.id;

}) 

it("02 - Não Deve Cadastrar um Usuário Duplicado ", async () => {// geralmente começamos com deve ...... ai apos deve colocamos o que esperamos que esse teste va checar
  await request(app.getHttpServer())
  .post('/usuarios/cadastrar')
  .send({
    nome: 'Root',
    usuario: 'root@root.com',
    senha: 'rootroot',
    foto: '-',
  })
.expect(400);
//usuarioId = resposta.body.id;

}) 

it("03 - Deve Autenticar Um Usuário (Login)", async () => {
  const resposta = await request(app.getHttpServer())
  .post('/usuarios/logar')
  .send({
    usuario: 'root@root.com',
    senha: 'rootroot',
  })
  .expect(200);
  token = resposta.body.token;
})

it("04 - Deve Listar todos os Usuarios", async () => {
  return request(app.getHttpServer())
  .get('/usuarios/all')
  .set('Authorization', `${token}`)
  .expect(200);
  })

  it("05 - Deve Atualizar os dados do Usuarios", async () => {
    console.log(usuarioId);
    const resposta = await request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'ADM do Sistema',
      usuario: 'root@root.com',
      senha: 'rootroot',
      foto: 'foto.jpg',
    })
        .expect(200)
        .then(resposta => {
          expect("ADM do Sistema").toEqual(resposta.body.nome);
        }); // aqui é uma segunda avaliação, se a propriedade nome que esta no corpo da requisicao, realmente recebeu o que eu informei o que mandei gravar.
    })
});
