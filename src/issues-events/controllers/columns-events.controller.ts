import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    COLUMNS_EVENTS_SERVICE_NAME,
    ColumnsEventsServiceController,
    SearchColumnsEvent,
    ColumnEvent,
} from '../../pb/issues-events.pb'
import { ColumnsEventsService } from '../services/columns-events.service'
import { from, Observable } from 'rxjs'
import { Empty } from 'src/pb/google/protobuf/empty.pb'

@Controller()
export class ColumnsEventsController implements ColumnsEventsServiceController {

    @Inject(ColumnsEventsService)
    private readonly columnsEventsService: ColumnsEventsService

    @GrpcMethod(COLUMNS_EVENTS_SERVICE_NAME, 'getColumnByIdEvent')
    public getColumnByIdEvent(dto: ColumnEvent): Observable<Empty> {
        return from(this.columnsEventsService.onGetColumnByIdEvent(dto))
    }

    @GrpcMethod(COLUMNS_EVENTS_SERVICE_NAME, 'searchColumnsEvent')
    public searchColumnsEvent(dto: SearchColumnsEvent): Observable<Empty> {
        return from(this.columnsEventsService.onSearchColumnsEvent(dto))
    }

    @GrpcMethod(COLUMNS_EVENTS_SERVICE_NAME, 'createColumnEvent')
    public createColumnEvent(dto: ColumnEvent): Observable<Empty> {
        return from(this.columnsEventsService.onCreateColumnEvent(dto))
    }

    @GrpcMethod(COLUMNS_EVENTS_SERVICE_NAME, 'updateColumnEvent')
    public updateColumnEvent(dto: ColumnEvent): Observable<Empty> {
        return from(this.columnsEventsService.onUpdateColumnEvent(dto))
    }

    @GrpcMethod(COLUMNS_EVENTS_SERVICE_NAME, 'deleteColumnEvent')
    public deleteColumnEvent(dto: ColumnEvent): Observable<Empty> {
        return from(this.columnsEventsService.onDeleteColumnEvent(dto))
    }

}