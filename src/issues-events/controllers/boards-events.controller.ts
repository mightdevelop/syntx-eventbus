import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    BOARDS_EVENTS_SERVICE_NAME,
    BoardsEventsServiceController,
    BoardEvent,
} from '../../pb/issues-events.pb'
import { BoardsEventsService } from '../services/boards-events.service'
import { from, Observable } from 'rxjs'
import { Empty } from 'src/pb/google/protobuf/empty.pb'

@Controller()
export class BoardsEventsController implements BoardsEventsServiceController {

    @Inject(BoardsEventsService)
    private readonly boardsEventsService: BoardsEventsService

    @GrpcMethod(BOARDS_EVENTS_SERVICE_NAME, 'getBoardByIdEvent')
    public getBoardByIdEvent(dto: BoardEvent): Observable<Empty> {
        return from(this.boardsEventsService.onGetBoardByIdEvent(dto))
    }

    @GrpcMethod(BOARDS_EVENTS_SERVICE_NAME, 'getBoardByProjectIdEvent')
    public getBoardByProjectIdEvent(dto: BoardEvent): Observable<Empty> {
        return from(this.boardsEventsService.onGetBoardByProjectIdEvent(dto))
    }

    @GrpcMethod(BOARDS_EVENTS_SERVICE_NAME, 'createBoardEvent')
    public createBoardEvent(dto: BoardEvent): Observable<Empty> {
        return from(this.boardsEventsService.onCreateBoardEvent(dto))
    }

    @GrpcMethod(BOARDS_EVENTS_SERVICE_NAME, 'updateBoardEvent')
    public updateBoardEvent(dto: BoardEvent): Observable<Empty> {
        return from(this.boardsEventsService.onUpdateBoardEvent(dto))
    }

    @GrpcMethod(BOARDS_EVENTS_SERVICE_NAME, 'deleteBoardEvent')
    public deleteBoardEvent(dto: BoardEvent): Observable<Empty> {
        return from(this.boardsEventsService.onDeleteBoardEvent(dto))
    }

}