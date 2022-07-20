import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { join } from 'path'
import { EventBusModule } from './eventbus.module'
import { EVENTBUS_PACKAGE_NAME } from './eventbus.pb'

async function bootstrap() {
    const app = await NestFactory.createMicroservice(
        EventBusModule,
        {
            transport: Transport.GRPC,
            options: {
                url: process.env.APP_URL,
                package: EVENTBUS_PACKAGE_NAME,
                protoPath: join(__dirname, '..', 'node_modules', 'syntx-protos', 'eventbus', 'eventbus.proto'),
                loader: {
                    includeDirs: [ join(__dirname, '..', 'node_modules', 'syntx-protos', 'eventbus') ],
                },
            }
        },
    )
    await app.listen()
    console.log('EventBus service started at ' + process.env.APP_URL)
}
bootstrap()