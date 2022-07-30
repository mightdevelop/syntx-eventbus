import { Injectable } from '@nestjs/common'
import { EntitiesCacheService } from 'src/cache/entities-cache.service'
import { InjectModel } from '@nestjs/mongoose'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { Empty } from 'src/pb/google/protobuf/empty.pb'
import { EventStatus } from 'src/types/event-status.enum'
import {
    BoardEvent,
} from 'src/pb/issues-events.pb'


@Injectable()
export class BoardsEventsService {

    constructor(
        @InjectModel(Event.name)
        private boardEventModel: Model<EventDocument>,
        private entitiesCacheService: EntitiesCacheService,
    ) {}


    public async onGetBoardByIdEvent(
        { error, board }: BoardEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(board, 'Board')
        this.boardEventModel.create({
            name: 'getBoardById',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(board),
            error,
        })
        return {}
    }

    public async onGetBoardByProjectIdEvent(
        { error, board }: BoardEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(board, 'Board')
        this.boardEventModel.create({
            name: 'getBoardByProjectId',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(board),
            error,
        })
        return {}
    }

    public async onCreateBoardEvent(
        { error, board }: BoardEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(board, 'Board')
        this.boardEventModel.create({
            name: 'createBoard',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(board),
            error,
        })
        return {}
    }

    public async onUpdateBoardEvent(
        { error, board }: BoardEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(board, 'Board')
        this.boardEventModel.create({
            name: 'updateBoard',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(board),
            error,
        })
        return {}
    }

    public async onDeleteBoardEvent(
        { error, board }: BoardEvent
    ): Promise<Empty> {
        this.entitiesCacheService.removeEntityFromCacheAndStoreEvent(board, 'Board')
        this.boardEventModel.create({
            name: 'deleteBoard',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(board),
            error,
        })
        return {}
    }

}
