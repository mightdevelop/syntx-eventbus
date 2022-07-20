/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { UserEvent, SearchUsersEvent } from "./users-events.pb";

export const protobufPackage = "eventbus";

export interface Event {
  event?:
    | { $case: "userEvent"; userEvent: UserEvent }
    | { $case: "searchUsersEvent"; searchUsersEvent: SearchUsersEvent };
}

export interface EventId {
  eventId: string;
}

export interface SearchEventsParams {
  email?: string | undefined;
  username?: string | undefined;
  eventsIds: string[];
  limit?: number | undefined;
  offset?: number | undefined;
}

export const EVENTBUS_PACKAGE_NAME = "eventbus";

export interface EventBusServiceClient {
  getEventById(request: EventId): Observable<Event>;

  searchEvents(request: SearchEventsParams): Observable<Event>;
}

export interface EventBusServiceController {
  getEventById(request: EventId): Promise<Event> | Observable<Event> | Event;

  searchEvents(request: SearchEventsParams): Observable<Event>;
}

export function EventBusServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getEventById", "searchEvents"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("EventBusService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("EventBusService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const EVENT_BUS_SERVICE_NAME = "EventBusService";

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
