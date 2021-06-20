import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class PlayerParameterValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    if (!value) {
      throw new BadRequestException(`The ${metadata.data} is required!`);
    }
    return value;
  }
}
