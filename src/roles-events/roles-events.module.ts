import { Module } from '@nestjs/common'
import { RolesEventsController } from './roles-events.controller'
import { RolesEventsService } from './roles-events.service'
import { CacheModule } from 'src/cache/cache.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Event, EventSchema } from 'src/event.schema'

@Module({
    imports: [
        CacheModule,
        MongooseModule.forFeature([ { name: Event.name, schema: EventSchema, collection: 'events' } ]),
    ],
    controllers: [ RolesEventsController ],
    providers: [ RolesEventsService ],
})
export class RolesEventsModule {}
