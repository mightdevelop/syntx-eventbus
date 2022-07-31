import { Module } from '@nestjs/common'
import { ProjectsEventsController } from './controllers/projects-events.controller'
import { ProjectsEventsService } from './services/projects-events.service'
import { CacheModule } from 'src/cache/cache.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Event, EventSchema } from 'src/event.schema'
import { InvitesEventsController } from './controllers/invites-events.controller'
import { InvitesEventsService } from './services/invites-events.service'

@Module({
    imports: [
        CacheModule,
        MongooseModule.forFeature([ { name: Event.name, schema: EventSchema, collection: 'events' } ]),
    ],
    controllers: [
        ProjectsEventsController,
        InvitesEventsController,
    ],
    providers: [
        ProjectsEventsService,
        InvitesEventsService,
    ],
})
export class ProjectsEventsModule {}
