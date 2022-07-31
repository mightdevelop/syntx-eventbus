import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    INVITES_EVENTS_SERVICE_NAME,
    InvitesEventsServiceController,
    SearchInvitesEvent,
    InviteEvent,
} from '../../pb/projects-events.pb'
import { InvitesEventsService } from '../services/invites-events.service'
import { from, Observable } from 'rxjs'
import { Empty } from 'src/pb/google/protobuf/empty.pb'

@Controller()
export class InvitesEventsController implements InvitesEventsServiceController {

    @Inject(InvitesEventsService)
    private readonly invitesEventsService: InvitesEventsService

    @GrpcMethod(INVITES_EVENTS_SERVICE_NAME, 'getInviteByIdEvent')
    public getInviteByIdEvent(dto: InviteEvent): Observable<Empty> {
        return from(this.invitesEventsService.onGetInviteByIdEvent(dto))
    }

    @GrpcMethod(INVITES_EVENTS_SERVICE_NAME, 'searchInvitesEvent')
    public searchInvitesEvent(dto: SearchInvitesEvent): Observable<Empty> {
        return from(this.invitesEventsService.onSearchInvitesEvent(dto))
    }

    @GrpcMethod(INVITES_EVENTS_SERVICE_NAME, 'createInviteEvent')
    public createInviteEvent(dto: InviteEvent): Observable<Empty> {
        return from(this.invitesEventsService.onCreateInviteEvent(dto))
    }

    @GrpcMethod(INVITES_EVENTS_SERVICE_NAME, 'deleteInviteByIdEvent')
    public deleteInviteByIdEvent(dto: InviteEvent): Observable<Empty> {
        return from(this.invitesEventsService.onDeleteInviteByIdEvent(dto))
    }

}