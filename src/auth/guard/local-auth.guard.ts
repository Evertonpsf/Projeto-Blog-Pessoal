import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

// aqui cria-se um decorador personalizado extendedno a classe guard que ficara encima do metodo de login
// assim indicado pela classe strategy indo para o 'local'