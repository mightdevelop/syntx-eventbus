import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    EPICS_EVENTS_SERVICE_NAME,
    EpicsEventsServiceController,
    SearchEpicsEvent,
    EpicEvent,
} from '../../pb/issues-events.pb'
import { EpicsEventsService } from '../services/epics-events.service'
import { from, Observable } from 'rxjs'
import { Empty } from 'src/pb/google/protobuf/empty.pb'

@Controller()
export class EpicsEventsController implements EpicsEventsServiceController {

    @Inject(EpicsEventsService)
    private readonly epicsEventsService: EpicsEventsService

    @GrpcMethod(EPICS_EVENTS_SERVICE_NAME, 'getEpicByIdEvent')
    public getEpicByIdEvent(dto: EpicEvent): Observable<Empty> {
        return from(this.epicsEventsService.onGetEpicByIdEvent(dto))
    }

    @GrpcMethod(EPICS_EVENTS_SERVICE_NAME, 'searchEpicsEvent')
    public searchEpicsEvent(dto: SearchEpicsEvent): Observable<Empty> {
        return from(this.epicsEventsService.onSearchEpicsEvent(dto))
    }

    @GrpcMethod(EPICS_EVENTS_SERVICE_NAME, 'createEpicEvent')
    public createEpicEvent(dto: EpicEvent): Observable<Empty> {
        return from(this.epicsEventsService.onCreateEpicEvent(dto))
    }

    @GrpcMethod(EPICS_EVENTS_SERVICE_NAME, 'updateEpicEvent')
    public updateEpicEvent(dto: EpicEvent): Observable<Empty> {
        return from(this.epicsEventsService.onUpdateEpicEvent(dto))
    }

    @GrpcMethod(EPICS_EVENTS_SERVICE_NAME, 'deleteEpicEvent')
    public deleteEpicEvent(dto: EpicEvent): Observable<Empty> {
        return from(this.epicsEventsService.onDeleteEpicEvent(dto))
    }

}