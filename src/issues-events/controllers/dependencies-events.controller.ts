import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    DEPENDENCIES_EVENTS_SERVICE_NAME,
    DependenciesEventsServiceController,
    SearchDependenciesEvent,
    DependencyEvent,
} from '../../pb/issues-events.pb'
import { DependenciesEventsService } from '../services/dependencies-events.service'
import { from, Observable } from 'rxjs'
import { Empty } from 'src/pb/google/protobuf/empty.pb'

@Controller()
export class DependenciesEventsController implements DependenciesEventsServiceController {

    @Inject(DependenciesEventsService)
    private readonly dependenciesEventsService: DependenciesEventsService

    @GrpcMethod(DEPENDENCIES_EVENTS_SERVICE_NAME, 'getDependencyByIdEvent')
    public getDependencyByIdEvent(dto: DependencyEvent): Observable<Empty> {
        return from(this.dependenciesEventsService.onGetDependencyByIdEvent(dto))
    }

    @GrpcMethod(DEPENDENCIES_EVENTS_SERVICE_NAME, 'searchDependenciesEvent')
    public searchDependenciesEvent(dto: SearchDependenciesEvent): Observable<Empty> {
        return from(this.dependenciesEventsService.onSearchDependenciesEvent(dto))
    }

    @GrpcMethod(DEPENDENCIES_EVENTS_SERVICE_NAME, 'createDependencyEvent')
    public createDependencyEvent(dto: DependencyEvent): Observable<Empty> {
        return from(this.dependenciesEventsService.onCreateDependencyEvent(dto))
    }

    @GrpcMethod(DEPENDENCIES_EVENTS_SERVICE_NAME, 'updateDependencyEvent')
    public updateDependencyEvent(dto: DependencyEvent): Observable<Empty> {
        return from(this.dependenciesEventsService.onUpdateDependencyEvent(dto))
    }

    @GrpcMethod(DEPENDENCIES_EVENTS_SERVICE_NAME, 'deleteDependencyEvent')
    public deleteDependencyEvent(dto: DependencyEvent): Observable<Empty> {
        return from(this.dependenciesEventsService.onDeleteDependencyEvent(dto))
    }

}