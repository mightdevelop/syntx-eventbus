import { Module } from '@nestjs/common'
import { IssuesEventsController } from './controllers/issues-events.controller'
import { IssuesEventsService } from './services/issues-events.service'
import { CacheModule } from 'src/cache/cache.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Event, EventSchema } from 'src/event.schema'
import { BoardsEventsController } from './controllers/boards-events.controller'
import { ColumnsEventsController } from './controllers/columns-events.controller'
import { EpicsEventsController } from './controllers/epics-events.controller'
import { DependenciesEventsController } from './controllers/dependencies-events.controller'
import { BoardsEventsService } from './services/boards-events.service'
import { ColumnsEventsService } from './services/columns-events.service'
import { DependenciesEventsService } from './services/dependencies-events.service'
import { EpicsEventsService } from './services/epics-events.service'

@Module({
    imports: [
        CacheModule,
        MongooseModule.forFeature([ { name: Event.name, schema: EventSchema, collection: 'events' } ]),
    ],
    controllers: [
        IssuesEventsController,
        BoardsEventsController,
        ColumnsEventsController,
        EpicsEventsController,
        DependenciesEventsController,
    ],
    providers: [
        IssuesEventsService,
        BoardsEventsService,
        ColumnsEventsService,
        EpicsEventsService,
        DependenciesEventsService,
    ],
})
export class IssuesEventsModule {}
