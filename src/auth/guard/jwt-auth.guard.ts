import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// O guard usamos para decidir quais metodos sao protegidos pelo token, quais metedo terao autenticacao e qual nao teria.