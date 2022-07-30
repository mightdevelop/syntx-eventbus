import { Injectable } from '@nestjs/common'
import { EntitiesCacheService } from 'src/cache/entities-cache.service'
import { InjectModel } from '@nestjs/mongoose'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { Empty } from 'src/pb/google/protobuf/empty.pb'
import { EventStatus } from 'src/types/event-status.enum'
import {
    SearchEpicsEvent,
    EpicEvent,
} from 'src/pb/issues-events.pb'


@Injectable()
export class EpicsEventsService {

    constructor(
        @InjectModel(Event.name)
        private epicEventModel: Model<EventDocument>,
        private entitiesCacheService: EntitiesCacheService,
    ) {}


    public async onGetEpicByIdEvent(
        { error, epic }: EpicEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(epic, 'Epic')
        this.epicEventModel.create({
            name: 'getEpicById',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(epic),
            error,
        })
        return {}
    }

    public async onSearchEpicsEvent(
        { error, epics, searchParams }: SearchEpicsEvent
    ): Promise<Empty> {
        this.epicEventModel.create({
            name: 'searchEpics',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ epics, searchParams }),
            error,
        })
        return {}
    }

    public async onCreateEpicEvent(
        { error, epic }: EpicEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(epic, 'Epic')
        this.epicEventModel.create({
            name: 'createEpic',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(epic),
            error,
        })
        return {}
    }

    public async onUpdateEpicEvent(
        { error, epic }: EpicEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(epic, 'Epic')
        this.epicEventModel.create({
            name: 'updateEpic',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(epic),
            error,
        })
        return {}
    }

    public async onDeleteEpicEvent(
        { error, epic }: EpicEvent
    ): Promise<Empty> {
        this.entitiesCacheService.removeEntityFromCacheAndStoreEvent(epic, 'Epic')
        this.epicEventModel.create({
            name: 'deleteEpic',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(epic),
            error,
        })
        return {}
    }

}
