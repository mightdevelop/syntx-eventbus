import { Injectable } from '@nestjs/common'
import { EntitiesCacheService } from 'src/cache/entities-cache.service'
import { InjectModel } from '@nestjs/mongoose'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { Empty } from 'src/pb/google/protobuf/empty.pb'
import { EventStatus } from 'src/types/event-status.enum'
import {
    SearchRolesEvent,
    RoleEvent,
    RoleIdAndUserId,
    PermissionsIdsAndRoleId,
    PermissionsIdsAndUserIdAndProjectId,
} from 'src/pb/roles-events.pb'
import { PermissionsCacheService } from 'src/cache/permissions-cache.service'
// import { PermissionsCacheService } from 'src/cache/permissions-cache.service'


@Injectable()
export class RolesEventsService {

    constructor(
        @InjectModel(Event.name)
        private roleEventModel: Model<EventDocument>,
        private entitiesCacheService: EntitiesCacheService,
        private permissionsCacheService: PermissionsCacheService,
    ) {}


    public async onGetRoleByIdEvent(
        { error, role }: RoleEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(role, 'Role')
        this.roleEventModel.create({
            name: 'getRoleById',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(role),
            error,
        })
        return {}
    }

    public async onSearchRolesEvent(
        { error, roles, searchParams }: SearchRolesEvent
    ): Promise<Empty> {
        this.roleEventModel.create({
            name: 'searchRoles',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ roles, searchParams }),
            error,
        })
        return {}
    }

    public async onCreateRoleEvent(
        { error, role }: RoleEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(role, 'Role')
        this.roleEventModel.create({
            name: 'createRole',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(role),
            error,
        })
        return {}
    }

    public async onUpdateRoleEvent(
        { error, role }: RoleEvent
    ): Promise<Empty> {
        this.entitiesCacheService.sendEntityToCacheAndStoreCacheEvent(role, 'Role')
        this.roleEventModel.create({
            name: 'updateRole',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(role),
            error,
        })
        return {}
    }

    public async onDeleteRoleEvent(
        { error, role }: RoleEvent
    ): Promise<Empty> {
        this.entitiesCacheService.removeEntityFromCacheAndStoreEvent(role, 'Role')
        this.roleEventModel.create({
            name: 'deleteRole',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify(role),
            error,
        })
        this.permissionsCacheService.deleteRole({ roleId: role.id })
        return {}
    }

    public async onAddRoleToUserEvent(
        { error, roleId, userId }: RoleIdAndUserId
    ): Promise<Empty> {
        this.roleEventModel.create({
            name: 'addRoleToUser',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ roleId, userId }),
            error,
        })
        return {}
    }

    public async onRemoveRoleFromUserEvent(
        { error, roleId, userId }: RoleIdAndUserId
    ): Promise<Empty> {
        this.roleEventModel.create({
            name: 'removeRoleFromUser',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ roleId, userId }),
            error,
        })
        this.permissionsCacheService.removeRolesFromUser({ rolesIds: [ roleId ], userId })
        return {}
    }

    public async onAddPermissionsToUserEvent(
        { error, userId, permissionsIds, projectId }: PermissionsIdsAndUserIdAndProjectId
    ): Promise<Empty> {
        this.roleEventModel.create({
            name: 'addPermissionsToUser',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ userId, permissionsIds, projectId }),
            error,
        })
        return {}
    }

    public async onRemovePermissionsFromUserEvent(
        { error, userId, permissionsIds, projectId }: PermissionsIdsAndUserIdAndProjectId
    ): Promise<Empty> {
        this.roleEventModel.create({
            name: 'removePermissionsFromUser',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ userId, permissionsIds, projectId }),
            error,
        })
        this.permissionsCacheService.removePermissionsFromUser({ userId, permissionsIds })
        return {}
    }

    public async onAddPermissionsToRoleEvent(
        { error, roleId, permissionsIds }: PermissionsIdsAndRoleId
    ): Promise<Empty> {
        this.roleEventModel.create({
            name: 'addPermissionsToRole',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ roleId, permissionsIds }),
            error,
        })
        return {}
    }

    public async onRemovePermissionsFromRoleEvent(
        { error, roleId, permissionsIds }: PermissionsIdsAndRoleId
    ): Promise<Empty> {
        this.roleEventModel.create({
            name: 'removePermissionsFromRole',
            status: error ? EventStatus.ERROR : EventStatus.SUCCESS,
            data: JSON.stringify({ roleId, permissionsIds }),
            error,
        })
        this.permissionsCacheService.removePermissionsFromRole({ roleId, permissionsIds })
        return {}
    }

}
