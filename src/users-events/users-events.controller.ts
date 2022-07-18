import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    USERS_EVENTS_SERVICE_NAME,
    UsersEventsServiceController,
    User,
    SearchUsersEvent,
    Void
} from './users-events.pb'
import { UsersEventsService } from './users-events.service'
import { from, Observable } from 'rxjs'

@Controller()
export class UsersEventsController implements UsersEventsServiceController {

    @Inject(UsersEventsService)
    private readonly usersEventsService: UsersEventsService

    @GrpcMethod(USERS_EVENTS_SERVICE_NAME, 'getUserByIdEvent')
    public getUserByIdEvent(dto: User): Observable<Void> {
        return from(this.usersEventsService.onGetUserByIdEvent(dto))
    }

    @GrpcMethod(USERS_EVENTS_SERVICE_NAME, 'searchUsersEvent')
    public searchUsersEvent(dto: SearchUsersEvent): Observable<Void> {
        return from(this.usersEventsService.onSearchUsersEvent(dto))
    }

    @GrpcMethod(USERS_EVENTS_SERVICE_NAME, 'createUserEvent')
    public createUserEvent(dto: User): Observable<Void> {
        return from(this.usersEventsService.onCreateUserEvent(dto))
    }

    @GrpcMethod(USERS_EVENTS_SERVICE_NAME, 'updateUserEvent')
    public updateUserEvent(dto: User): Observable<Void> {
        return from(this.usersEventsService.onUpdateUserEvent(dto))
    }

    @GrpcMethod(USERS_EVENTS_SERVICE_NAME, 'deleteUserEvent')
    public deleteUserEvent(dto: User): Observable<Void> {
        return from(this.usersEventsService.onDeleteUserEvent(dto))
    }

}