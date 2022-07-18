import { Inject, Injectable } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import {
    Cache,
    CACHE_PACKAGE_NAME,
    EntitiesCacheServiceClient,
    ENTITIES_CACHE_SERVICE_NAME,
    EntityKey,
    SetEntityByKey,
    Void
} from 'src/cache/cache.pb'
import { firstValueFrom } from 'rxjs'


@Injectable()
export class EntitiesCacheService {

    private entitiesCacheService: EntitiesCacheServiceClient

    @Inject(CACHE_PACKAGE_NAME)
    private readonly client: ClientGrpc

    onModuleInit(): void {
        this.entitiesCacheService = this.client.getService<EntitiesCacheServiceClient>(ENTITIES_CACHE_SERVICE_NAME)
    }

    public async getEntityByKey(entityKey: EntityKey): Promise<Cache> {
        return await firstValueFrom(this.entitiesCacheService.getEntityByKey(entityKey))
    }

    public async setEntityByKey(dto: SetEntityByKey): Promise<Void> {
        await firstValueFrom(this.entitiesCacheService.setEntityByKey({
            entityKey: dto.entityKey,
            jsonData: JSON.stringify(dto.jsonData),
        }))
        return {}
    }

    public async delEntityByKey(entityKey: EntityKey): Promise<Void> {
        await firstValueFrom(this.entitiesCacheService.delEntityByKey(entityKey))
        return {}
    }

}
