import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @ApiExcludeEndpoint()
  @Get()
  async redirect(@Res() resposta: any) {
    return resposta.redirect('/swagger');
  }
}
//O decorator @Get()  que esta na linha 09 mapeia todas as Requisições HTTP GET, enviadas para o endereço local da minha maquina