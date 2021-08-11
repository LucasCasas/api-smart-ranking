import { PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ChallengeStatusEnum } from 'src/common/enum/ChallengeStatusEnum';

export class ChallengeStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    ChallengeStatusEnum.Accepted,
    ChallengeStatusEnum.Denied,
    ChallengeStatusEnum.Cancelled,
  ];

  transform(value: any) {
    const status = value.status.toUpperCase();

    if (!this.isValidStatus(status)) {
      throw new BadRequestException(`${status} is not a valid status`);
    }

    return value;
  }

  private isValidStatus(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    // -1 when not found
    return idx !== -1;
  }
}
