import {
    Inject,
    Injectable,
    NotFoundException,
    PipeTransform,
    Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IRequestApp } from 'src/common/request/interfaces/request.interface';
import { ENUM_SESSION_STATUS_CODE_ERROR } from 'src/modules/session/enums/session.status-code.enum';
import { SessionDoc } from 'src/modules/session/repository/entities/session.entity';
import { SessionService } from 'src/modules/session/services/session.service';

@Injectable({ scope: Scope.REQUEST })
export class SessionActiveParsePipe implements PipeTransform {
    constructor(
        @Inject(REQUEST) protected readonly request: IRequestApp,
        private readonly sessionService: SessionService
    ) {}

    async transform(value: string): Promise<SessionDoc> {
        const { user } = this.request;

        const session = await this.sessionService.findOneActiveByIdAndUser(
            value,
            user._id
        );
        if (!session) {
            throw new NotFoundException({
                statusCode: ENUM_SESSION_STATUS_CODE_ERROR.NOT_FOUND,
                message: 'session.error.notFound',
            });
        }

        return session;
    }
}
