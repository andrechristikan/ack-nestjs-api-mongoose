import { ENUM_ERROR_STATUS_CODE } from 'src/error/error.constant';
import { IErrors } from 'src/error/error.interface';

export type IErrorKafka = {
    errors?: IErrors[];
    statusCode: ENUM_ERROR_STATUS_CODE;
};
