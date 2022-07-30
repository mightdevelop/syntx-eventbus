import { Injectable } from '@nestjs/common'
import { EntitiesCacheService } from 'src/cache/entities-cache.service'
import { InjectModel } from '@nestjs/mongoose'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { Empty } from 'src/pb/google/protobuf/empty.pb'
import { EventStatus } from 'src/types/event-status.enum'
import { SearchUsersEvent, UserEvent } from 'src/pb/users-events.pb'


@Injectable()
export class UsersEventsService {

    constructor(
        @InjectModel(Event.name)
        private userEventModel: Model<EventDocument>,
        private entitiesCacheService: EntitiesCacheService,
    ) {}


    public async onGetUserByIdEvent(
        { error, user }: UserEvent
    ): Promise<Empty> {
        if (error) {
            this.userEventModel.create({
                name: 'getUserById',
                status: EventStatus.ERROR,
                data: JSON.stringify(user),
                error,
            })
            return {}
        }
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(user, 'User')
        this.userEventModel.create({
            name: 'getUserById',
            status: EventStatus.SUCCESS,
            data: JSON.stringify(user),
        })
        return {}
    }

    public async onSearchUsersEvent(
        { error, users, searchParams }: SearchUsersEvent
    ): Promise<Empty> {
        if (error) {
            this.userEventModel.create({
                name: 'searchUsers',
                status: EventStatus.ERROR,
                data: JSON.stringify({ users, searchParams }),
                error,
            })
            return {}
        }
        this.userEventModel.create({
            name: 'searchUsers',
            status: EventStatus.SUCCESS,
            data: JSON.stringify({ users, searchParams }),
        })
        return {}
    }

    public async onCreateUserEvent(
        { error, user }: UserEvent
    ): Promise<Empty> {
        if (error) {
            this.userEventModel.create({
                name: 'createUser',
                status: EventStatus.ERROR,
                data: JSON.stringify(user),
                error,
            })
            return {}
        }
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(user, 'User')
        this.userEventModel.create({
            name: 'createUser',
            status: EventStatus.SUCCESS,
            data: JSON.stringify(user),
        })
        return {}
    }

    public async onUpdateUserEvent(
        { error, user }: UserEvent
    ): Promise<Empty> {
        if (error) {
            this.userEventModel.create({
                name: 'updateUser',
                status: EventStatus.ERROR,
                data: JSON.stringify(user),
                error,
            })
            return {}
        }
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(user, 'User')
        this.userEventModel.create({
            name: 'updateUser',
            status: EventStatus.SUCCESS,
            data: JSON.stringify(user),
        })
        return {}
    }

    public async onDeleteUserEvent(
        { error, user }: UserEvent
    ): Promise<Empty> {
        if (error) {
            this.userEventModel.create({
                name: 'deleteUser',
                status: EventStatus.ERROR,
                data: JSON.stringify(user),
                error,
            })
            return {}
        }
        this.entitiesCacheService.removeEntityFromCacheAndStoreEvent(user, 'User')
        this.userEventModel.create({
            name: 'deleteUser',
            status: EventStatus.SUCCESS,
            data: JSON.stringify(user),
        })
        return {}
    }

}
