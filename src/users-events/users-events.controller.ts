import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    USERS_EVENTS_SERVICE_NAME,
    UsersEventsServiceController,
    SearchUsersEvent,
    UserEvent,
} from '../pb/users-events.pb'
import { UsersEventsService } from './users-events.service'
import { from, Observable } from 'rxjs'
import { Empty } from 'src/pb/google/protobuf/empty.pb'

@Controller()
export class UsersEventsController implements UsersEventsServiceController {

    @Inject(UsersEventsService)
    private readonly usersEventsService: UsersEventsService

    @GrpcMethod(USERS_EVENTS_SERVICE_NAME, 'getUserByIdEvent')
    public getUserByIdEvent(dto: UserEvent): Observable<Empty> {
        return from(this.usersEventsService.onGetUserByIdEvent(dto))
    }

    @GrpcMethod(USERS_EVENTS_SERVICE_NAME, 'searchUsersEvent')
    public searchUsersEvent(dto: SearchUsersEvent): Observable<Empty> {
        return from(this.usersEventsService.onSearchUsersEvent(dto))
    }

    @GrpcMethod(USERS_EVENTS_SERVICE_NAME, 'createUserEvent')
    public createUserEvent(dto: UserEvent): Observable<Empty> {
        return from(this.usersEventsService.onCreateUserEvent(dto))
    }

    @GrpcMethod(USERS_EVENTS_SERVICE_NAME, 'updateUserEvent')
    public updateUserEvent(dto: UserEvent): Observable<Empty> {
        return from(this.usersEventsService.onUpdateUserEvent(dto))
    }

    @GrpcMethod(USERS_EVENTS_SERVICE_NAME, 'deleteUserEvent')
    public deleteUserEvent(dto: UserEvent): Observable<Empty> {
        return from(this.usersEventsService.onDeleteUserEvent(dto))
    }

}