import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    ISSUES_EVENTS_SERVICE_NAME,
    IssuesEventsServiceController,
    SearchIssuesEvent,
    IssueEvent,
} from '../../pb/issues-events.pb'
import { IssuesEventsService } from '../services/issues-events.service'
import { from, Observable } from 'rxjs'
import { Empty } from 'src/pb/google/protobuf/empty.pb'

@Controller()
export class IssuesEventsController implements IssuesEventsServiceController {

    @Inject(IssuesEventsService)
    private readonly issuesEventsService: IssuesEventsService

    @GrpcMethod(ISSUES_EVENTS_SERVICE_NAME, 'getIssueByIdEvent')
    public getIssueByIdEvent(dto: IssueEvent): Observable<Empty> {
        return from(this.issuesEventsService.onGetIssueByIdEvent(dto))
    }

    @GrpcMethod(ISSUES_EVENTS_SERVICE_NAME, 'searchIssuesEvent')
    public searchIssuesEvent(dto: SearchIssuesEvent): Observable<Empty> {
        return from(this.issuesEventsService.onSearchIssuesEvent(dto))
    }

    @GrpcMethod(ISSUES_EVENTS_SERVICE_NAME, 'createIssueEvent')
    public createIssueEvent(dto: IssueEvent): Observable<Empty> {
        return from(this.issuesEventsService.onCreateIssueEvent(dto))
    }

    @GrpcMethod(ISSUES_EVENTS_SERVICE_NAME, 'updateIssueEvent')
    public updateIssueEvent(dto: IssueEvent): Observable<Empty> {
        return from(this.issuesEventsService.onUpdateIssueEvent(dto))
    }

    @GrpcMethod(ISSUES_EVENTS_SERVICE_NAME, 'deleteIssueEvent')
    public deleteIssueEvent(dto: IssueEvent): Observable<Empty> {
        return from(this.issuesEventsService.onDeleteIssueEvent(dto))
    }

}