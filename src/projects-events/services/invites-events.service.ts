import { Injectable } from '@nestjs/common'
import { EntitiesCacheService } from 'src/cache/entities-cache.service'
import { InjectModel } from '@nestjs/mongoose'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { Empty } from 'src/pb/google/protobuf/empty.pb'
import { EventStatus } from 'src/types/event-status.enum'
import {
    SearchInvitesEvent,
    InviteEvent,
} from 'src/pb/projects-events.pb'


@Injectable()
export class InvitesEventsService {

    constructor(
        @InjectModel(Event.name)
        private inviteEventModel: Model<EventDocument>,
        private entitiesCacheService: EntitiesCacheService,
    ) {}


    public async onGetInviteByIdEvent(
        { error, invite }: InviteEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(invite, 'Invite')
        this.inviteEventModel.create({
            name: 'getInviteById',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(invite),
            error,
        })
        return {}
    }

    public async onSearchInvitesEvent(
        { error, invites, searchParams }: SearchInvitesEvent
    ): Promise<Empty> {
        this.inviteEventModel.create({
            name: 'searchInvites',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ invites, searchParams }),
            error,
        })
        return {}
    }

    public async onCreateInviteEvent(
        { error, invite }: InviteEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(invite, 'Invite')
        this.inviteEventModel.create({
            name: 'createInvite',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(invite),
            error,
        })
        return {}
    }

    public async onUpdateInviteEvent(
        { error, invite }: InviteEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(invite, 'Invite')
        this.inviteEventModel.create({
            name: 'updateInvite',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(invite),
            error,
        })
        return {}
    }

    public async onDeleteInviteByIdEvent(
        { error, invite }: InviteEvent
    ): Promise<Empty> {
        this.entitiesCacheService.removeEntityFromCacheAndStoreEvent(invite, 'Invite')
        this.inviteEventModel.create({
            name: 'deleteInvite',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(invite),
            error,
        })
        return {}
    }

}
