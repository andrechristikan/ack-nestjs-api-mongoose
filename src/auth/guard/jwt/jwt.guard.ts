import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ResponseService } from 'src/response/response.service';
import { Response } from 'src/response/response.decorator';
import { IResponse } from 'src/response/response.interface';
import { Logger as LoggerService } from 'winston';
import { Logger } from 'src/logger/logger.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(
        @Response() private readonly responseService: ResponseService,
        @Logger() private readonly logger: LoggerService
    ) {
        super();
    }

    handleRequest<TUser = any>(
        err: Record<string, any>,
        user: TUser,
        info: string
    ): TUser {
        if (err || !user) {
            this.logger.error('AuthJwtGuardError', {
                class: 'JwtGuard',
                function: 'handleRequest',
                description: info,
                error: { ...err }
            });

            throw new UnauthorizedException(
                this.responseService.error('http.clientError.unauthorized')
            );
        }

        return user;
    }
}
