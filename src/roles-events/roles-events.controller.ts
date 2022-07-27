import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    ROLES_EVENTS_SERVICE_NAME,
    RolesEventsServiceController,
    SearchRolesEvent,
    RoleEvent,
    RoleIdAndUserId,
    PermissionsIdsAndRoleId,
    PermissionsIdsAndUserIdAndProjectId,
} from '../pb/roles-events.pb'
import { RolesEventsService } from './roles-events.service'
import { from, Observable } from 'rxjs'
import { Empty } from 'src/pb/google/protobuf/empty.pb'

@Controller()
export class RolesEventsController implements RolesEventsServiceController {

    @Inject(RolesEventsService)
    private readonly rolesEventsService: RolesEventsService

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'getRoleByIdEvent')
    public getRoleByIdEvent(dto: RoleEvent): Observable<Empty> {
        return from(this.rolesEventsService.onGetRoleByIdEvent(dto))
    }

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'searchRolesEvent')
    public searchRolesEvent(dto: SearchRolesEvent): Observable<Empty> {
        return from(this.rolesEventsService.onSearchRolesEvent(dto))
    }

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'createRoleEvent')
    public createRoleEvent(dto: RoleEvent): Observable<Empty> {
        return from(this.rolesEventsService.onCreateRoleEvent(dto))
    }

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'updateRoleEvent')
    public updateRoleEvent(dto: RoleEvent): Observable<Empty> {
        return from(this.rolesEventsService.onUpdateRoleEvent(dto))
    }

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'deleteRoleEvent')
    public deleteRoleEvent(dto: RoleEvent): Observable<Empty> {
        return from(this.rolesEventsService.onDeleteRoleEvent(dto))
    }

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'addRoleToUserEvent')
    public addRoleToUserEvent(dto: RoleIdAndUserId): Observable<Empty> {
        return from(this.rolesEventsService.onAddRoleToUserEvent(dto))
    }

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'removeRoleFromUserEvent')
    public removeRoleFromUserEvent(dto: RoleIdAndUserId): Observable<Empty> {
        return from(this.rolesEventsService.onRemoveRoleFromUserEvent(dto))
    }

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'addPermissionsToUserEvent')
    public addPermissionsToUserEvent(dto: PermissionsIdsAndUserIdAndProjectId): Observable<Empty> {
        return from(this.rolesEventsService.onAddPermissionsToUserEvent(dto))
    }

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'removePermissionsFromUserEvent')
    public removePermissionsFromUserEvent(dto: PermissionsIdsAndUserIdAndProjectId): Observable<Empty> {
        return from(this.rolesEventsService.onRemovePermissionsFromUserEvent(dto))
    }

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'addPermissionsToRoleEvent')
    public addPermissionsToRoleEvent(dto: PermissionsIdsAndRoleId): Observable<Empty> {
        return from(this.rolesEventsService.onAddPermissionsToRoleEvent(dto))
    }

    @GrpcMethod(ROLES_EVENTS_SERVICE_NAME, 'removePermissionsFromRoleEvent')
    public removePermissionsFromRoleEvent(dto: PermissionsIdsAndRoleId): Observable<Empty> {
        return from(this.rolesEventsService.onRemovePermissionsFromRoleEvent(dto))
    }

}