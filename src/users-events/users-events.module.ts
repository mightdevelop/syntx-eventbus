import { Module } from '@nestjs/common'
import { UsersEventsController } from './users-events.controller'
import { UsersEventsService } from './users-events.service'
import { CacheModule } from 'src/cache/cache.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Event, EventSchema } from 'src/event.schema'

@Module({
    imports: [
        CacheModule,
        MongooseModule.forFeature([ { name: Event.name, schema: EventSchema, collection: 'events' } ]),
    ],
    controllers: [ UsersEventsController ],
    providers: [ UsersEventsService ],
})
export class UsersEventsModule {}
