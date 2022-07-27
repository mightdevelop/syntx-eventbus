import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import {
    AddPermissionsToUserRequest,
    Bool,
    CACHE_PACKAGE_NAME,
    DoesUserHavePermissionRequest,
    ENTITIES_CACHE_SERVICE_NAME,
    PermissionsCacheServiceClient,
    RemovePermissionsFromRoleRequest,
    RemovePermissionsFromUserRequest,
    RemoveRolesFromUserRequest,
    RoleId,
} from 'src/cache/cache.pb'
import { firstValueFrom } from 'rxjs'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { EventStatus } from 'src/types/event-status.enum'


@Injectable()
export class PermissionsCacheService {

    constructor(
        @InjectModel(Event.name)
        private cacheEventModel: Model<EventDocument>,
    ) {}

    private permissionsCacheService: PermissionsCacheServiceClient

    @Inject(CACHE_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.permissionsCacheService = this.client.getService<PermissionsCacheServiceClient>(ENTITIES_CACHE_SERVICE_NAME)
    }

    public async doesUserHavePermission(
        dto: DoesUserHavePermissionRequest,
    ): Promise<Bool> {
        const bool = await firstValueFrom(this.permissionsCacheService.doesUserHavePermission(dto))
            .catch(() => {
                this.createEvent('doesUserHavePermission', false)
                return { bool: false }
            })
        return bool
    }

    public async addPermissionToUserInProject(
        dto: AddPermissionsToUserRequest,
    ): Promise<void> {
        firstValueFrom(this.permissionsCacheService.addPermissionToUserInProject(dto))
            .then(
                () => this.createEvent('addPermissionToUserInProject', true, dto),
                () => this.createEvent('addPermissionToUserInProject', false, dto)
            )
    }

    public async removePermissionsFromUser(
        dto: RemovePermissionsFromUserRequest,
    ): Promise<void> {
        firstValueFrom(this.permissionsCacheService.removePermissionsFromUser(dto))
            .then(
                () => this.createEvent('removePermissionsFromUser', true, dto),
                () => this.createEvent('removePermissionsFromUser', false, dto)
            )
    }

    public async removePermissionsFromRole(
        dto: RemovePermissionsFromRoleRequest,
    ): Promise<void> {
        firstValueFrom(this.permissionsCacheService.removePermissionsFromRole(dto))
            .then(
                () => this.createEvent('removePermissionsFromRole', true, dto),
                () => this.createEvent('removePermissionsFromRole', false, dto)
            )
    }

    public async removeRolesFromUser(
        dto: RemoveRolesFromUserRequest,
    ): Promise<void> {
        firstValueFrom(this.permissionsCacheService.removeRolesFromUser(dto))
            .then(
                () => this.createEvent('removeRolesFromUser', true, dto),
                () => this.createEvent('removeRolesFromUser', false, dto)
            )
    }

    public async deleteRole(
        dto: RoleId,
    ): Promise<void> {
        firstValueFrom(this.permissionsCacheService.deleteRole(dto))
            .then(
                () => this.createEvent('deleteRole', true, dto),
                () => this.createEvent('deleteRole', false, dto)
            )
    }



    private async createEvent(
        name: string,
        success: boolean,
        data?: any,
    ) {
        this.cacheEventModel.create({
            name,
            status: success ? EventStatus.SUCCESS : EventStatus.ERROR,
            data: JSON.stringify(data),
        })
    }

}
