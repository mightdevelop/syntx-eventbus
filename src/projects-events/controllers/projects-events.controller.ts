import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    PROJECTS_EVENTS_SERVICE_NAME,
    ProjectsEventsServiceController,
    SearchProjectsEvent,
    ProjectEvent,
    IsUserProjectParticipantEvent,
    AddOrRemoveUserFromProjectEvent,
} from '../../pb/projects-events.pb'
import { ProjectsEventsService } from '../services/projects-events.service'
import { from, Observable } from 'rxjs'
import { Empty } from 'src/pb/google/protobuf/empty.pb'

@Controller()
export class ProjectsEventsController implements ProjectsEventsServiceController {

    @Inject(ProjectsEventsService)
    private readonly projectsEventsService: ProjectsEventsService

    @GrpcMethod(PROJECTS_EVENTS_SERVICE_NAME, 'getProjectByIdEvent')
    public getProjectByIdEvent(dto: ProjectEvent): Observable<Empty> {
        return from(this.projectsEventsService.onGetProjectByIdEvent(dto))
    }

    @GrpcMethod(PROJECTS_EVENTS_SERVICE_NAME, 'searchProjectsEvent')
    public searchProjectsEvent(dto: SearchProjectsEvent): Observable<Empty> {
        return from(this.projectsEventsService.onSearchProjectsEvent(dto))
    }

    @GrpcMethod(PROJECTS_EVENTS_SERVICE_NAME, 'isUserProjectParticipantEvent')
    public isUserProjectParticipantEvent(dto: IsUserProjectParticipantEvent): Observable<Empty> {
        return from(this.projectsEventsService.onIsUserProjectParticipantEvent(dto))
    }

    @GrpcMethod(PROJECTS_EVENTS_SERVICE_NAME, 'createProjectEvent')
    public createProjectEvent(dto: ProjectEvent): Observable<Empty> {
        return from(this.projectsEventsService.onCreateProjectEvent(dto))
    }

    @GrpcMethod(PROJECTS_EVENTS_SERVICE_NAME, 'updateProjectEvent')
    public updateProjectEvent(dto: ProjectEvent): Observable<Empty> {
        return from(this.projectsEventsService.onUpdateProjectEvent(dto))
    }

    @GrpcMethod(PROJECTS_EVENTS_SERVICE_NAME, 'deleteProjectEvent')
    public deleteProjectEvent(dto: ProjectEvent): Observable<Empty> {
        return from(this.projectsEventsService.onDeleteProjectEvent(dto))
    }

    @GrpcMethod(PROJECTS_EVENTS_SERVICE_NAME, 'addUserToProject')
    public addUserToProject(dto: AddOrRemoveUserFromProjectEvent): Observable<Empty> {
        return from(this.projectsEventsService.onAddUserToProject(dto))
    }

    @GrpcMethod(PROJECTS_EVENTS_SERVICE_NAME, 'removeUserFromProject')
    public removeUserFromProject(dto: AddOrRemoveUserFromProjectEvent): Observable<Empty> {
        return from(this.projectsEventsService.onRemoveUserFromProject(dto))
    }

}