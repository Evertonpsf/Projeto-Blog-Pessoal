import { ApiProperty } from "@nestjs/swagger"

export class UsuarioLogin {

    @ApiProperty() 
    public usuario: string

    @ApiProperty() 
    public senha: string

}
//a Classe UsuarioLogin não tenha o papel de criar uma Tabela no Banco de dados, precisamos "decorar" os Atributos com o decorator @ApiProperty(),
// porquê esta Classe é utilizada no endpoint /logar.