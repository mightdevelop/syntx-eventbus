import { Injectable } from '@nestjs/common'
import { EntitiesCacheService } from 'src/cache/entities-cache.service'
import { InjectModel } from '@nestjs/mongoose'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { Empty } from 'src/pb/google/protobuf/empty.pb'
import { EventStatus } from 'src/types/event-status.enum'
import {
    SearchColumnsEvent,
    ColumnEvent,
} from 'src/pb/issues-events.pb'


@Injectable()
export class ColumnsEventsService {

    constructor(
        @InjectModel(Event.name)
        private columnEventModel: Model<EventDocument>,
        private entitiesCacheService: EntitiesCacheService,
    ) {}


    public async onGetColumnByIdEvent(
        { error, column }: ColumnEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(column, 'Column')
        this.columnEventModel.create({
            name: 'getColumnById',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(column),
            error,
        })
        return {}
    }

    public async onSearchColumnsEvent(
        { error, columns, searchParams }: SearchColumnsEvent
    ): Promise<Empty> {
        this.columnEventModel.create({
            name: 'searchColumns',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ columns, searchParams }),
            error,
        })
        return {}
    }

    public async onCreateColumnEvent(
        { error, column }: ColumnEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(column, 'Column')
        this.columnEventModel.create({
            name: 'createColumn',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(column),
            error,
        })
        return {}
    }

    public async onUpdateColumnEvent(
        { error, column }: ColumnEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(column, 'Column')
        this.columnEventModel.create({
            name: 'updateColumn',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(column),
            error,
        })
        return {}
    }

    public async onDeleteColumnEvent(
        { error, column }: ColumnEvent
    ): Promise<Empty> {
        this.entitiesCacheService.removeEntityFromCacheAndStoreEvent(column, 'Column')
        this.columnEventModel.create({
            name: 'deleteColumn',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(column),
            error,
        })
        return {}
    }

}
