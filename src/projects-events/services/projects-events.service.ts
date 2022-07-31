import { Injectable } from '@nestjs/common'
import { EntitiesCacheService } from 'src/cache/entities-cache.service'
import { InjectModel } from '@nestjs/mongoose'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { Empty } from 'src/pb/google/protobuf/empty.pb'
import { EventStatus } from 'src/types/event-status.enum'
import {
    SearchProjectsEvent,
    ProjectEvent,
    IsUserProjectParticipantEvent,
    AddOrRemoveUserFromProjectEvent,
} from 'src/pb/projects-events.pb'


@Injectable()
export class ProjectsEventsService {

    constructor(
        @InjectModel(Event.name)
        private projectEventModel: Model<EventDocument>,
        private entitiesCacheService: EntitiesCacheService,
    ) {}


    public async onGetProjectByIdEvent(
        { error, project }: ProjectEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(project, 'Project')
        this.projectEventModel.create({
            name: 'getProjectById',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(project),
            error,
        })
        return {}
    }

    public async onSearchProjectsEvent(
        { error, projects, searchParams }: SearchProjectsEvent
    ): Promise<Empty> {
        this.projectEventModel.create({
            name: 'searchProjects',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ projects, searchParams }),
            error,
        })
        return {}
    }

    public async onIsUserProjectParticipantEvent(
        { error, bool, projectId, userId }: IsUserProjectParticipantEvent
    ): Promise<Empty> {
        this.projectEventModel.create({
            name: 'isUserProjectParticipant',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ bool, projectId, userId }),
            error,
        })
        return {}
    }

    public async onCreateProjectEvent(
        { error, project }: ProjectEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(project, 'Project')
        this.projectEventModel.create({
            name: 'createProject',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(project),
            error,
        })
        return {}
    }

    public async onUpdateProjectEvent(
        { error, project }: ProjectEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(project, 'Project')
        this.projectEventModel.create({
            name: 'updateProject',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(project),
            error,
        })
        return {}
    }

    public async onDeleteProjectEvent(
        { error, project }: ProjectEvent
    ): Promise<Empty> {
        this.entitiesCacheService.removeEntityFromCacheAndStoreEvent(project, 'Project')
        this.projectEventModel.create({
            name: 'deleteProject',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(project),
            error,
        })
        return {}
    }

    public async onAddUserToProject(
        { error, projectId, userId }: AddOrRemoveUserFromProjectEvent
    ): Promise<Empty> {
        this.projectEventModel.create({
            name: 'addUserToProject',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ projectId, userId }),
            error,
        })
        return {}
    }

    public async onRemoveUserFromProject(
        { error, projectId, userId }: AddOrRemoveUserFromProjectEvent
    ): Promise<Empty> {
        this.projectEventModel.create({
            name: 'removeUserFromProject',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ projectId, userId }),
            error,
        })
        return {}
    }

}
