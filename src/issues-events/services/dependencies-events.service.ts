import { Injectable } from '@nestjs/common'
import { EntitiesCacheService } from 'src/cache/entities-cache.service'
import { InjectModel } from '@nestjs/mongoose'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { Empty } from 'src/pb/google/protobuf/empty.pb'
import { EventStatus } from 'src/types/event-status.enum'
import {
    SearchDependenciesEvent,
    DependencyEvent,
} from 'src/pb/issues-events.pb'


@Injectable()
export class DependenciesEventsService {

    constructor(
        @InjectModel(Event.name)
        private dependencyEventModel: Model<EventDocument>,
        private entitiesCacheService: EntitiesCacheService,
    ) {}


    public async onGetDependencyByIdEvent(
        { error, dependency }: DependencyEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(dependency, 'Dependency')
        this.dependencyEventModel.create({
            name: 'getDependencyById',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(dependency),
            error,
        })
        return {}
    }

    public async onSearchDependenciesEvent(
        { error, dependencies, searchParams }: SearchDependenciesEvent
    ): Promise<Empty> {
        this.dependencyEventModel.create({
            name: 'searchDependencies',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ dependencies, searchParams }),
            error,
        })
        return {}
    }

    public async onCreateDependencyEvent(
        { error, dependency }: DependencyEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(dependency, 'Dependency')
        this.dependencyEventModel.create({
            name: 'createDependency',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(dependency),
            error,
        })
        return {}
    }

    public async onUpdateDependencyEvent(
        { error, dependency }: DependencyEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(dependency, 'Dependency')
        this.dependencyEventModel.create({
            name: 'updateDependency',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(dependency),
            error,
        })
        return {}
    }

    public async onDeleteDependencyEvent(
        { error, dependency }: DependencyEvent
    ): Promise<Empty> {
        this.entitiesCacheService.removeEntityFromCacheAndStoreEvent(dependency, 'Dependency')
        this.dependencyEventModel.create({
            name: 'deleteDependency',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(dependency),
            error,
        })
        return {}
    }

}
