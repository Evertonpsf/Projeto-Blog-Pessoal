import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder() //  Cria a const config que receberá a execução do Método DocumentBuilder(), responsável por construir o Swagger. Dentro deste Método serão enviados alguns parâmetros.
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Everton Figueiredo","https://github.com/Evertonpsf/Projeto-Blog-Pessoal","pinheiroe49@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'; // TZ = Time Zone, essa configuracao e para arrumar a hora de brasilia, fusuorario

  app.useGlobalPipes(new ValidationPipe()); // essa biblioteca(ValidationPipe) usa-se para validar as requisicoes http, assim aplica-se em todo codigo, ouseja, global. Em todas as rotas http


  app.enableCors(); // vem de crosorigens, aqui estamos ativando o cors.Habilitando requisisões de outros servidores.  Se isso nao estiver ativado o front-end nao consegue conversar com o back-end, se estivermos o front e o banck em servidores diferente e esse cores não estiver ativado não tem como o front e o back se encontrar, isso se ativar para que aceitem servidores diferentes.


  await app.listen(process.env.PORT || 4000); // Aqui é a porta  que usamos para acessar apos o localhost.
}
bootstrap();
