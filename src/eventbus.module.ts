import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import 'dotenv/config'
import { UsersEventsModule } from './users-events/users-events.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [ `@${process.env.NODE_ENV}.env`, '@.env' ],
            isGlobal: true,
        }),
        UsersEventsModule,
    ],
})
export class EventBusModule {}
