import { Module } from '@nestjs/common'
import { UsersEventsController } from './users-events.controller'
import 'dotenv/config'
import { UsersEventsService } from './users-events.service'
import { CacheModule } from 'src/cache/cache.module'

@Module({
    imports: [ CacheModule ],
    controllers: [ UsersEventsController ],
    providers: [ UsersEventsService ],
})
export class UsersEventsModule {}
