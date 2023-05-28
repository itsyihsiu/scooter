import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { DATE_OF_MANUFACTURE_FORMAT, YEAR_OLD } from 'src/utils/constants';
import { inYears, isValidDate } from 'src/utils/date';

@Injectable()
export class ValidateDateOfManufacturePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // console.log(
    //   inYears(value.dateOfManufacture, DATE_OF_MANUFACTURE_FORMAT, 10),
    // );

    if (!isValidDate(value.dateOfManufacture, DATE_OF_MANUFACTURE_FORMAT)) {
      throw new BadRequestException(
        `Invalid date string. It should be '${DATE_OF_MANUFACTURE_FORMAT}'`,
      );
    }

    if (
      !inYears(value.dateOfManufacture, DATE_OF_MANUFACTURE_FORMAT, YEAR_OLD)
    ) {
      throw new BadRequestException(
        `Date of manufacture shold not older then ${YEAR_OLD} or after today.`,
      );
    }

    return value;
  }
}
