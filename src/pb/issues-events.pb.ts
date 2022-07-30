/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { Error } from "./common.pb";
import { Timestamp } from "./google/protobuf/timestamp.pb";
import { Empty } from "./google/protobuf/empty.pb";

export const protobufPackage = "eventbus";

export interface Board {
  id?: string | undefined;
  projectId?: string | undefined;
}

export interface BoardEvent {
  error?: Error | undefined;
  board: Board | undefined;
}

export interface Column {
  id?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
  password?: string | undefined;
  salt?: string | undefined;
}

export interface ColumnEvent {
  error?: Error | undefined;
  column: Column | undefined;
}

export interface SearchColumnsParams {
  boardId?: string | undefined;
  columnsIds: string[];
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface SearchColumnsEvent {
  error?: Error | undefined;
  searchParams: SearchColumnsParams | undefined;
  columns: Column[];
}

export interface Issue {
  id?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
  password?: string | undefined;
  salt?: string | undefined;
}

export interface IssueEvent {
  error?: Error | undefined;
  issue: Issue | undefined;
}

export interface SearchIssuesParams {
  columnId?: string | undefined;
  epicId?: string | undefined;
  issuesIds: string[];
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface SearchIssuesEvent {
  error?: Error | undefined;
  searchParams: SearchIssuesParams | undefined;
  issues: Issue[];
}

export interface Epic {
  id?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
  password?: string | undefined;
  salt?: string | undefined;
}

export interface EpicEvent {
  error?: Error | undefined;
  epic: Epic | undefined;
}

export interface SearchEpicsParams {
  columnId?: string | undefined;
  minStartDate?: Timestamp | undefined;
  maxDueDate?: Timestamp | undefined;
  epicsIds: string[];
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface SearchEpicsEvent {
  error?: Error | undefined;
  searchParams: SearchEpicsParams | undefined;
  epics: Epic[];
}

export interface Dependency {
  id?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
  password?: string | undefined;
  salt?: string | undefined;
}

export interface DependencyEvent {
  error?: Error | undefined;
  dependency: Dependency | undefined;
}

export interface SearchDependenciesParams {
  blockingEpicId?: string | undefined;
  blockedEpicId?: string | undefined;
  dependenciesIds: string[];
  limit?: number | undefined;
  offset?: number | undefined;
}

export interface SearchDependenciesEvent {
  error?: Error | undefined;
  searchParams: SearchDependenciesParams | undefined;
  dependencies: Dependency[];
}

export const EVENTBUS_PACKAGE_NAME = "eventbus";

export interface BoardsEventsServiceClient {
  getBoardByIdEvent(request: BoardEvent): Observable<Empty>;

  getBoardByProjectIdEvent(request: BoardEvent): Observable<Empty>;

  createBoardEvent(request: BoardEvent): Observable<Empty>;

  deleteBoardEvent(request: BoardEvent): Observable<Empty>;
}

export interface BoardsEventsServiceController {
  getBoardByIdEvent(request: BoardEvent): void;

  getBoardByProjectIdEvent(request: BoardEvent): void;

  createBoardEvent(request: BoardEvent): void;

  deleteBoardEvent(request: BoardEvent): void;
}

export function BoardsEventsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getBoardByIdEvent",
      "getBoardByProjectIdEvent",
      "createBoardEvent",
      "deleteBoardEvent",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("BoardsEventsService", method)(
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
      GrpcStreamMethod("BoardsEventsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const BOARDS_EVENTS_SERVICE_NAME = "BoardsEventsService";

export interface ColumnsEventsServiceClient {
  getColumnByIdEvent(request: ColumnEvent): Observable<Empty>;

  searchColumnsEvent(request: SearchColumnsEvent): Observable<Empty>;

  createColumnEvent(request: ColumnEvent): Observable<Empty>;

  updateColumnEvent(request: ColumnEvent): Observable<Empty>;

  deleteColumnEvent(request: ColumnEvent): Observable<Empty>;
}

export interface ColumnsEventsServiceController {
  getColumnByIdEvent(request: ColumnEvent): void;

  searchColumnsEvent(request: SearchColumnsEvent): void;

  createColumnEvent(request: ColumnEvent): void;

  updateColumnEvent(request: ColumnEvent): void;

  deleteColumnEvent(request: ColumnEvent): void;
}

export function ColumnsEventsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getColumnByIdEvent",
      "searchColumnsEvent",
      "createColumnEvent",
      "updateColumnEvent",
      "deleteColumnEvent",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("ColumnsEventsService", method)(
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
      GrpcStreamMethod("ColumnsEventsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const COLUMNS_EVENTS_SERVICE_NAME = "ColumnsEventsService";

export interface IssuesEventsServiceClient {
  getIssueByIdEvent(request: IssueEvent): Observable<Empty>;

  searchIssuesEvent(request: SearchIssuesEvent): Observable<Empty>;

  createIssueEvent(request: IssueEvent): Observable<Empty>;

  updateIssueEvent(request: IssueEvent): Observable<Empty>;

  deleteIssueEvent(request: IssueEvent): Observable<Empty>;
}

export interface IssuesEventsServiceController {
  getIssueByIdEvent(request: IssueEvent): void;

  searchIssuesEvent(request: SearchIssuesEvent): void;

  createIssueEvent(request: IssueEvent): void;

  updateIssueEvent(request: IssueEvent): void;

  deleteIssueEvent(request: IssueEvent): void;
}

export function IssuesEventsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getIssueByIdEvent",
      "searchIssuesEvent",
      "createIssueEvent",
      "updateIssueEvent",
      "deleteIssueEvent",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("IssuesEventsService", method)(
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
      GrpcStreamMethod("IssuesEventsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const ISSUES_EVENTS_SERVICE_NAME = "IssuesEventsService";

export interface EpicsEventsServiceClient {
  getEpicByIdEvent(request: EpicEvent): Observable<Empty>;

  searchEpicsEvent(request: SearchEpicsEvent): Observable<Empty>;

  createEpicEvent(request: EpicEvent): Observable<Empty>;

  updateEpicEvent(request: EpicEvent): Observable<Empty>;

  deleteEpicEvent(request: EpicEvent): Observable<Empty>;
}

export interface EpicsEventsServiceController {
  getEpicByIdEvent(request: EpicEvent): void;

  searchEpicsEvent(request: SearchEpicsEvent): void;

  createEpicEvent(request: EpicEvent): void;

  updateEpicEvent(request: EpicEvent): void;

  deleteEpicEvent(request: EpicEvent): void;
}

export function EpicsEventsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getEpicByIdEvent",
      "searchEpicsEvent",
      "createEpicEvent",
      "updateEpicEvent",
      "deleteEpicEvent",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("EpicsEventsService", method)(
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
      GrpcStreamMethod("EpicsEventsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const EPICS_EVENTS_SERVICE_NAME = "EpicsEventsService";

export interface DependenciesEventsServiceClient {
  getDependencyByIdEvent(request: DependencyEvent): Observable<Empty>;

  searchDependenciesEvent(request: SearchDependenciesEvent): Observable<Empty>;

  createDependencyEvent(request: DependencyEvent): Observable<Empty>;

  deleteDependencyEvent(request: DependencyEvent): Observable<Empty>;
}

export interface DependenciesEventsServiceController {
  getDependencyByIdEvent(request: DependencyEvent): void;

  searchDependenciesEvent(request: SearchDependenciesEvent): void;

  createDependencyEvent(request: DependencyEvent): void;

  deleteDependencyEvent(request: DependencyEvent): void;
}

export function DependenciesEventsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getDependencyByIdEvent",
      "searchDependenciesEvent",
      "createDependencyEvent",
      "deleteDependencyEvent",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("DependenciesEventsService", method)(
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
      GrpcStreamMethod("DependenciesEventsService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const DEPENDENCIES_EVENTS_SERVICE_NAME = "DependenciesEventsService";

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
