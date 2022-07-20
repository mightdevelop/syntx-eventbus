import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { EventStatus } from './types/event-status.enum'

export type EventDocument = Event & Document

@Schema({ collection: 'events' })
export class Event {

    @Prop({ required: true })
        name: string

    @Prop({ required: true })
        status: EventStatus

    @Prop({ required: true, default: null, type: String })
        data: string

    @Prop({ required: true, default: Date.now() })
        createdAt: number

    @Prop()
        abortedAt: number

    @Prop()
        error: Error

}

export const EventSchema = SchemaFactory.createForClass(Event)