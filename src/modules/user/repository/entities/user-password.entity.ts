import { DatabaseMongoUUIDEntityAbstract } from 'src/common/database/abstracts/mongo/entities/database.mongo.uuid.entity.abstract';
import {
    DatabaseEntity,
    DatabaseProp,
    DatabaseSchema,
} from 'src/common/database/decorators/database.decorator';
import { IDatabaseDocument } from 'src/common/database/interfaces/database.interface';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';

export const UserPasswordDatabaseName = 'userpasswords';

@DatabaseEntity({ collection: UserPasswordDatabaseName })
export class UserPasswordEntity extends DatabaseMongoUUIDEntityAbstract {
    @DatabaseProp({
        required: true,
        index: true,
        trim: true,
        type: String,
        ref: UserEntity.name,
    })
    user: string;

    @DatabaseProp({
        required: true,
        type: String,
    })
    password: string;
}

export const UserPasswordSchema = DatabaseSchema(UserPasswordEntity);
export type UserPasswordDoc = IDatabaseDocument<UserPasswordEntity>;