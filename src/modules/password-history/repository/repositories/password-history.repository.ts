import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseRepositoryBase } from 'src/common/database/bases/database.repository';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import {
    PasswordHistoryDoc,
    PasswordHistoryEntity,
} from 'src/modules/password-history/repository/entities/password-history.entity';

@Injectable()
export class PasswordHistoryRepository extends DatabaseRepositoryBase<
    PasswordHistoryEntity,
    PasswordHistoryDoc
> {
    constructor(
        @DatabaseModel(PasswordHistoryEntity.name)
        private readonly passwordHistoryModel: Model<PasswordHistoryEntity>
    ) {
        super(passwordHistoryModel);
    }
}