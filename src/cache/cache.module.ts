import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { MongooseModule } from '@nestjs/mongoose'
import 'dotenv/config'
import { join } from 'path'
import { Event, EventSchema } from 'src/event.schema'
import { CACHE_PACKAGE_NAME } from './cache.pb'
import { EntitiesCacheService } from './entities-cache.service'
import { PermissionsCacheService } from './permissions-cache.service'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: CACHE_PACKAGE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '127.0.0.1:50056',
                    package: CACHE_PACKAGE_NAME,
                    protoPath: join(
                        __dirname, '..', '..', 'node_modules', 'syntx-protos', 'cache', 'cache.proto'
                    ),
                }
            }
        ]),
        MongooseModule.forFeature([ { name: Event.name, schema: EventSchema, collection: 'events' } ]),
    ],
    providers: [
        EntitiesCacheService,
        PermissionsCacheService,
    ],
    exports: [
        EntitiesCacheService,
        PermissionsCacheService,
    ],
})
export class CacheModule {}
