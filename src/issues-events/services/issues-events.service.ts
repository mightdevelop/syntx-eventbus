import { Injectable } from '@nestjs/common'
import { EntitiesCacheService } from 'src/cache/entities-cache.service'
import { InjectModel } from '@nestjs/mongoose'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { Empty } from 'src/pb/google/protobuf/empty.pb'
import { EventStatus } from 'src/types/event-status.enum'
import {
    SearchIssuesEvent,
    IssueEvent,
} from 'src/pb/issues-events.pb'


@Injectable()
export class IssuesEventsService {

    constructor(
        @InjectModel(Event.name)
        private issueEventModel: Model<EventDocument>,
        private entitiesCacheService: EntitiesCacheService,
    ) {}


    public async onGetIssueByIdEvent(
        { error, issue }: IssueEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(issue, 'Issue')
        this.issueEventModel.create({
            name: 'getIssueById',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(issue),
            error,
        })
        return {}
    }

    public async onSearchIssuesEvent(
        { error, issues, searchParams }: SearchIssuesEvent
    ): Promise<Empty> {
        this.issueEventModel.create({
            name: 'searchIssues',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ issues, searchParams }),
            error,
        })
        return {}
    }

    public async onCreateIssueEvent(
        { error, issue }: IssueEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(issue, 'Issue')
        this.issueEventModel.create({
            name: 'createIssue',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(issue),
            error,
        })
        return {}
    }

    public async onUpdateIssueEvent(
        { error, issue }: IssueEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(issue, 'Issue')
        this.issueEventModel.create({
            name: 'updateIssue',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(issue),
            error,
        })
        return {}
    }

    public async onDeleteIssueEvent(
        { error, issue }: IssueEvent
    ): Promise<Empty> {
        this.entitiesCacheService.removeEntityFromCacheAndStoreEvent(issue, 'Issue')
        this.issueEventModel.create({
            name: 'deleteIssue',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(issue),
            error,
        })
        return {}
    }

}
