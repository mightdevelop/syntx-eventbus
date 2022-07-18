import { Injectable } from '@nestjs/common'
import {
    SearchUsersEvent,
    User,
    Void,
} from './users-events.pb'
import { EntitiesCacheService } from 'src/cache/entities-cache.service'


@Injectable()
export class UsersEventsService {

    private entitiesCacheService: EntitiesCacheService

    public async onGetUserByIdEvent(user: User): Promise<Void> {
        await this.entitiesCacheService.setEntityByKey({
            entityKey: {
                entityName: 'User',
                entityId: user.id,
            },
            jsonData: JSON.stringify(user),
        })
        return {}
    }

    public async onSearchUsersEvent(dto: SearchUsersEvent): Promise<Void> {
        return {}
    }

    public async onCreateUserEvent(user: User): Promise<Void> {
        await this.entitiesCacheService.setEntityByKey({
            entityKey: {
                entityName: 'User',
                entityId: user.id,
            },
            jsonData: JSON.stringify(user),
        })
        return {}
    }

    public async onUpdateUserEvent(user: User): Promise<Void> {
        await this.entitiesCacheService.setEntityByKey({
            entityKey: {
                entityName: 'User',
                entityId: user.id,
            },
            jsonData: JSON.stringify(user),
        })
        return {}
    }

    public async onDeleteUserEvent(user: User): Promise<Void> {
        await this.entitiesCacheService.delEntityByKey({
            entityName: 'User',
            entityId: user.id,
        })
        return {}
    }

}
