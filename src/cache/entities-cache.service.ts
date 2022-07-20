import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import {
    Cache,
    CACHE_PACKAGE_NAME,
    EntitiesCacheServiceClient,
    ENTITIES_CACHE_SERVICE_NAME,
    EntityKey,
} from 'src/cache/cache.pb'
import { firstValueFrom } from 'rxjs'
import { EventStatus } from 'src/types/event-status.enum'
import { Event, EventDocument } from 'src/event.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'


@Injectable()
export class EntitiesCacheService {

    constructor(
        @InjectModel(Event.name)
        private cacheEventModel: Model<EventDocument>,
    ) {}

    private entitiesCacheService: EntitiesCacheServiceClient

    @Inject(CACHE_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.entitiesCacheService = this.client.getService<EntitiesCacheServiceClient>(ENTITIES_CACHE_SERVICE_NAME)
    }

    public async getEntityByKey(
        entityKey: EntityKey,
    ): Promise<Cache> {
        return firstValueFrom(this.entitiesCacheService.getEntityByKey(entityKey))
    }



    private async sendEntityToCache(
        entity: any,
        entityName: string,
    ) {
        return firstValueFrom(this.entitiesCacheService.setEntityByKey({
            entityKey: {
                entityName,
                entityId: entity.id,
            },
            jsonData: JSON.stringify(entity),
        }))
    }

    private async createSetEntityByKeyEvent(
        success: boolean,
        data: any,
    ) {
        this.cacheEventModel.create({
            name: 'setEntityByKey',
            status: success ? EventStatus.SUCCESS : EventStatus.ERROR,
            data: JSON.stringify(data),
        })
    }

    public async sendEntityToCacheAndStoreCacheEvent(
        entity: any,
        entityName: string,
    ): Promise<void> {
        this.sendEntityToCache(entity, entityName)
            .then(
                () => this.createSetEntityByKeyEvent(true, entity),
                () => this.createSetEntityByKeyEvent(false, entity)
            )
    }



    private async removeEntityFromCache(
        entityKey: EntityKey,
    ) {
        return firstValueFrom(this.entitiesCacheService.delEntityByKey(entityKey))
    }

    private async createDelEntityByKeyEvent(
        success: boolean,
        data: any,
    ) {
        this.cacheEventModel.create({
            name: 'delEntityByKey',
            status: success ? EventStatus.SUCCESS : EventStatus.ERROR,
            data: JSON.stringify(data),
        })
    }

    public async removeEntityFromCacheAndStoreEvent(
        entity: any,
        entityName: string,
    ): Promise<void> {
        this.removeEntityFromCache({ entityName, entityId: entity.id })
            .then(
                () => this.createDelEntityByKeyEvent(true, entity),
                () => this.createDelEntityByKeyEvent(false, entity)
            )
    }

}
