import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class TaskDto {
   @IsString({ message: 'O título deve ser um texto' })
   @IsNotEmpty({ message: 'O título é obrigatório' })
   @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
   title!: string
   @IsString({ message: 'A descrição deve ser um texto' })
   description!: string;
}
