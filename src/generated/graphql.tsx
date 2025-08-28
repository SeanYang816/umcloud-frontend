import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: any; output: any }
}

export enum CommandCode {
  AbortFirmwareUpdate = 'ABORT_FIRMWARE_UPDATE',
  AbortLocalContentUpdate = 'ABORT_LOCAL_CONTENT_UPDATE',
  AliveCheck = 'ALIVE_CHECK',
  ChangeNtpdAddress = 'CHANGE_NTPD_ADDRESS',
  ChangeUploadDelay = 'CHANGE_UPLOAD_DELAY',
  ChangeUrl1_2 = 'CHANGE_URL1_2',
  CheckLocalStorage = 'CHECK_LOCAL_STORAGE',
  EnableTelnet = 'ENABLE_TELNET',
  GetInfo = 'GET_INFO',
  GetPlayingInfo = 'GET_PLAYING_INFO',
  GetPlayingStatus = 'GET_PLAYING_STATUS',
  Reboot = 'REBOOT',
  RemoveLocalBackupLog = 'REMOVE_LOCAL_BACKUP_LOG',
  Reset = 'RESET',
  ResetStreamingUrl = 'RESET_STREAMING_URL',
  ServerTime = 'SERVER_TIME',
  UpdateFirmware = 'UPDATE_FIRMWARE',
  UsbPortControl = 'USB_PORT_CONTROL',
}

export enum Comparator {
  Between = 'BETWEEN',
  Contains = 'CONTAINS',
  Equals = 'EQUALS',
  Gte = 'GTE',
  Lte = 'LTE',
  NotEqual = 'NOT_EQUAL',
}

export type ConfigLog = {
  __typename?: 'ConfigLog'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  detail?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  item?: Maybe<Scalars['String']['output']>
  operator?: Maybe<Scalars['String']['output']>
  status?: Maybe<Scalars['String']['output']>
}

export type CreateGroupDto = {
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  name: Scalars['String']['input']
  thingCategoryIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export type CreateLocationDto = {
  address?: InputMaybe<Scalars['String']['input']>
  city?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  groupIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  groupName?: InputMaybe<Scalars['String']['input']>
  number?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
  storeNameId: Scalars['String']['input']
  thingMac?: InputMaybe<Scalars['String']['input']>
}

export type CreateProjectDto = {
  name: Scalars['String']['input']
}

export type CreateProjectFlowDto = {
  name: Scalars['String']['input']
  parentId: Scalars['Int']['input']
  things: Array<InputMaybe<Scalars['Int']['input']>>
}

export type CreateRoleDto = {
  name: Scalars['String']['input']
  permissions: Array<InputMaybe<PermissionInput>>
}

export type CreateThingCategoryDto = {
  name: Scalars['String']['input']
  thingIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export type CreateUserDto = {
  displayName: Scalars['String']['input']
  email: Scalars['String']['input']
  password: Scalars['String']['input']
  roleId: Scalars['Int']['input']
}

export type DebugLog = {
  __typename?: 'DebugLog'
  content?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  customContent?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
}

export type DeviceLog = {
  __typename?: 'DeviceLog'
  content?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  eventType?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
}

export type FilteringInputType = {
  comparator: Comparator
  key: Scalars['String']['input']
  value: Scalars['String']['input']
}

export type FirmwareFile = {
  __typename?: 'FirmwareFile'
  createdAt: Scalars['DateTime']['output']
  creator: User
  filename: Scalars['String']['output']
  id: Scalars['ID']['output']
}

export type FirmwareUpgradeSchedule = {
  __typename?: 'FirmwareUpgradeSchedule'
  createdAt: Scalars['DateTime']['output']
  endDate: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  startDate: Scalars['DateTime']['output']
  things?: Maybe<Array<Maybe<Thing>>>
  updatedAt: Scalars['DateTime']['output']
}

export type FirmwareUpgradeScheduleDto = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  thingIds?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type Group = {
  __typename?: 'Group'
  id: Scalars['ID']['output']
  locations?: Maybe<Array<Location>>
  mediaSyncPath?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  thingCategories?: Maybe<Array<ThingCategory>>
  users?: Maybe<Array<User>>
}

export type ListOptions = {
  filtering?: InputMaybe<Array<InputMaybe<FilteringInputType>>>
  ordering?: InputMaybe<OrderingInputType>
  pagination?: InputMaybe<PaginationInputType>
}

export type Location = {
  __typename?: 'Location'
  address?: Maybe<Scalars['String']['output']>
  city?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  groups?: Maybe<Array<Maybe<Group>>>
  id: Scalars['ID']['output']
  number?: Maybe<Scalars['String']['output']>
  phone?: Maybe<Scalars['String']['output']>
  storeNameId: Scalars['String']['output']
  things?: Maybe<Array<Maybe<Thing>>>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type LocationSortOrder = {
  orderId: OrderId
  sortOrder: SortOrder
}

export type MediaSyncScheduleDto = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  syncPath?: InputMaybe<Scalars['String']['input']>
  thingIds?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type MediaSynchronizationSchedule = {
  __typename?: 'MediaSynchronizationSchedule'
  createdAt: Scalars['DateTime']['output']
  endDate: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  scope?: Maybe<Scalars['String']['output']>
  startDate: Scalars['DateTime']['output']
  syncPath?: Maybe<Scalars['String']['output']>
  things?: Maybe<Array<Maybe<Thing>>>
  updatedAt: Scalars['DateTime']['output']
}

export type MediaUploadLog = {
  __typename?: 'MediaUploadLog'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  media: Scalars['String']['output']
  uploader: Scalars['String']['output']
}

export type Message = {
  __typename?: 'Message'
  attributeCode?: Maybe<Scalars['Int']['output']>
  attributeValue?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  mac?: Maybe<Scalars['String']['output']>
  timestamp?: Maybe<Scalars['DateTime']['output']>
  topic?: Maybe<Scalars['String']['output']>
}

export type Mutation = {
  __typename?: 'Mutation'
  archiveThing?: Maybe<Scalars['Int']['output']>
  changePassword?: Maybe<Scalars['Int']['output']>
  changeStoreName?: Maybe<Thing>
  createGroup?: Maybe<Group>
  createLocation?: Maybe<Location>
  createProject?: Maybe<Project>
  createProjectFlow?: Maybe<ProjectFlow>
  createRole?: Maybe<Role>
  createThingCategory?: Maybe<ThingCategory>
  createUser?: Maybe<User>
  deleteFirmwareUpgradeSchedule?: Maybe<Scalars['Int']['output']>
  deleteGroup?: Maybe<Scalars['Int']['output']>
  deleteLocation?: Maybe<Scalars['Int']['output']>
  deleteMediaSyncSchedule?: Maybe<Scalars['Int']['output']>
  deleteProject?: Maybe<Scalars['Int']['output']>
  deleteProjectFlow?: Maybe<Scalars['Int']['output']>
  deleteRole?: Maybe<Scalars['Int']['output']>
  deleteThingCategory?: Maybe<Scalars['Int']['output']>
  deleteUser?: Maybe<Scalars['Int']['output']>
  executeCommand?: Maybe<Scalars['Boolean']['output']>
  firmwareUpdate?: Maybe<Scalars['Int']['output']>
  noop?: Maybe<Scalars['Int']['output']>
  scheduleFirmwareUpdate?: Maybe<FirmwareUpgradeSchedule>
  scheduleMediaSynchronization?: Maybe<MediaSynchronizationSchedule>
  scheduleProjectSynchronization?: Maybe<Scalars['Int']['output']>
  syncMedia?: Maybe<Scalars['Int']['output']>
  syncProjects?: Maybe<Scalars['Int']['output']>
  unregisterThing?: Maybe<Scalars['Int']['output']>
  updateFirmwareUpgradeSchedule?: Maybe<FirmwareUpgradeSchedule>
  updateGroup?: Maybe<Group>
  updateLocation?: Maybe<Location>
  updateMediaSyncSchedule?: Maybe<MediaSynchronizationSchedule>
  updateNotification?: Maybe<Notification>
  updateProject?: Maybe<Project>
  updateProjectFlow?: Maybe<ProjectFlow>
  updateRole?: Maybe<Role>
  updateThingAlias?: Maybe<Thing>
  updateThingCategory?: Maybe<ThingCategory>
  updateUser?: Maybe<User>
}

export type MutationArchiveThingArgs = {
  id: Scalars['ID']['input']
  reason?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type MutationChangePasswordArgs = {
  newPassword?: InputMaybe<Scalars['String']['input']>
  oldPassword?: InputMaybe<Scalars['String']['input']>
}

export type MutationChangeStoreNameArgs = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationCreateGroupArgs = {
  group: CreateGroupDto
}

export type MutationCreateLocationArgs = {
  location: CreateLocationDto
}

export type MutationCreateProjectArgs = {
  dto: CreateProjectDto
}

export type MutationCreateProjectFlowArgs = {
  dto?: InputMaybe<CreateProjectFlowDto>
}

export type MutationCreateRoleArgs = {
  role: CreateRoleDto
}

export type MutationCreateThingCategoryArgs = {
  thingCategory: CreateThingCategoryDto
}

export type MutationCreateUserArgs = {
  user: CreateUserDto
}

export type MutationDeleteFirmwareUpgradeScheduleArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteGroupArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteLocationArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteMediaSyncScheduleArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteProjectFlowArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteRoleArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteThingCategoryArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input']
}

export type MutationExecuteCommandArgs = {
  command: CommandCode
  input?: InputMaybe<Scalars['String']['input']>
  thingIds?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type MutationFirmwareUpdateArgs = {
  thingIds?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type MutationScheduleFirmwareUpdateArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  thingIds?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type MutationScheduleMediaSynchronizationArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  syncPath?: InputMaybe<Scalars['String']['input']>
  syncStorage?: InputMaybe<Scalars['Int']['input']>
  thingIds?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type MutationScheduleProjectSynchronizationArgs = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  projectIds: Array<InputMaybe<Scalars['ID']['input']>>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  syncStorage: SyncStorage
}

export type MutationSyncMediaArgs = {
  syncPath?: InputMaybe<Scalars['String']['input']>
  syncStorage?: InputMaybe<Scalars['Int']['input']>
  thingIds?: InputMaybe<Array<Scalars['ID']['input']>>
}

export type MutationSyncProjectsArgs = {
  projectIds: Array<InputMaybe<Scalars['ID']['input']>>
  syncStorage: SyncStorage
}

export type MutationUnregisterThingArgs = {
  id: Scalars['ID']['input']
}

export type MutationUpdateFirmwareUpgradeScheduleArgs = {
  id: Scalars['ID']['input']
  schedule?: InputMaybe<FirmwareUpgradeScheduleDto>
}

export type MutationUpdateGroupArgs = {
  group: UpdateGroupDto
  id: Scalars['ID']['input']
}

export type MutationUpdateLocationArgs = {
  id: Scalars['ID']['input']
  location: UpdateLocationDto
}

export type MutationUpdateMediaSyncScheduleArgs = {
  id: Scalars['ID']['input']
  schedule?: InputMaybe<MediaSyncScheduleDto>
}

export type MutationUpdateNotificationArgs = {
  id: Scalars['ID']['input']
  notification?: InputMaybe<UpdateNotificationDto>
}

export type MutationUpdateProjectArgs = {
  dto: UpdateProjectDto
  id: Scalars['ID']['input']
}

export type MutationUpdateProjectFlowArgs = {
  dto?: InputMaybe<UpdateProjectFlowDto>
  id: Scalars['ID']['input']
}

export type MutationUpdateRoleArgs = {
  id: Scalars['ID']['input']
  role: UpdateRoleDto
}

export type MutationUpdateThingAliasArgs = {
  alias: Scalars['String']['input']
  mac: Scalars['String']['input']
  serialNumber: Scalars['String']['input']
}

export type MutationUpdateThingCategoryArgs = {
  id: Scalars['ID']['input']
  thingCategory: UpdateThingCategoryDto
}

export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input']
  user?: InputMaybe<UpdateUserDto>
}

export type Notification = {
  __typename?: 'Notification'
  changeDescription?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description: Scalars['String']['output']
  id: Scalars['ID']['output']
  status: NotificationStatusEnum
  thing?: Maybe<Thing>
}

export enum NotificationStatusEnum {
  Done = 'done',
  InProgress = 'inProgress',
  Pending = 'pending',
}

export enum OrderId {
  Group = 'group',
  Inf = 'inf',
  Ip = 'ip',
  LocationId = 'locationId',
  LocationName = 'locationName',
  Mac = 'mac',
  OnlineStatus = 'onlineStatus',
}

export type OrderingInputType = {
  id: Scalars['String']['input']
  sortOrder: SortOrder
}

export type PaginatedConfigLogResponse = {
  __typename?: 'PaginatedConfigLogResponse'
  list: Array<ConfigLog>
  total: Scalars['Int']['output']
}

export type PaginatedDebugLogResponse = {
  __typename?: 'PaginatedDebugLogResponse'
  list: Array<DebugLog>
  total: Scalars['Int']['output']
}

export type PaginatedDeviceLogResponse = {
  __typename?: 'PaginatedDeviceLogResponse'
  list: Array<DeviceLog>
  total: Scalars['Int']['output']
}

export type PaginatedGroupsResponse = {
  __typename?: 'PaginatedGroupsResponse'
  list: Array<Group>
  total: Scalars['Int']['output']
}

export type PaginatedLocationsResponse = {
  __typename?: 'PaginatedLocationsResponse'
  list: Array<Location>
  total: Scalars['Int']['output']
}

export type PaginatedMediaUploadLogResponse = {
  __typename?: 'PaginatedMediaUploadLogResponse'
  list: Array<MediaUploadLog>
  total: Scalars['Int']['output']
}

export type PaginatedMessagesResponse = {
  __typename?: 'PaginatedMessagesResponse'
  list: Array<Message>
  total: Scalars['Int']['output']
}

export type PaginatedNotificationsResponse = {
  __typename?: 'PaginatedNotificationsResponse'
  list: Array<Notification>
  total: Scalars['Int']['output']
}

export type PaginatedProjectFlowsResponse = {
  __typename?: 'PaginatedProjectFlowsResponse'
  list: Array<ProjectFlow>
  total: Scalars['Int']['output']
}

export type PaginatedProjectsResponse = {
  __typename?: 'PaginatedProjectsResponse'
  list: Array<Project>
  total: Scalars['Int']['output']
}

export type PaginatedRolesResponse = {
  __typename?: 'PaginatedRolesResponse'
  list: Array<Role>
  total: Scalars['Int']['output']
}

export type PaginatedThingCategoriesResponse = {
  __typename?: 'PaginatedThingCategoriesResponse'
  list: Array<ThingCategory>
  total: Scalars['Int']['output']
}

export type PaginatedThingsResponse = {
  __typename?: 'PaginatedThingsResponse'
  list: Array<Thing>
  total: Scalars['Int']['output']
}

export type PaginatedUsersResponse = {
  __typename?: 'PaginatedUsersResponse'
  list: Array<User>
  total: Scalars['Int']['output']
}

export type PaginationInputType = {
  pageIndex: Scalars['Float']['input']
  pageSize: Scalars['Float']['input']
}

export type Permission = {
  __typename?: 'Permission'
  permissionId: Scalars['String']['output']
  status: Scalars['Int']['output']
}

export type PermissionInput = {
  id: Scalars['ID']['input']
  status: Scalars['Int']['input']
}

export type Project = {
  __typename?: 'Project'
  flows?: Maybe<Array<Maybe<ProjectFlow>>>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type ProjectFlow = {
  __typename?: 'ProjectFlow'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  parentId: Scalars['Int']['output']
  things?: Maybe<Array<Maybe<Thing>>>
}

export type Query = {
  __typename?: 'Query'
  firmwareLatest?: Maybe<FirmwareFile>
  firmwareThings?: Maybe<ThingsForFirmware>
  firmwareUpgradeSchedules?: Maybe<Array<Maybe<FirmwareUpgradeSchedule>>>
  group?: Maybe<Group>
  groups?: Maybe<PaginatedGroupsResponse>
  location?: Maybe<Location>
  locations?: Maybe<PaginatedLocationsResponse>
  me?: Maybe<User>
  mediaSyncSchedules?: Maybe<Array<Maybe<MediaSynchronizationSchedule>>>
  mediaThings?: Maybe<ThingsForMedia>
  mediaUploadLogs?: Maybe<PaginatedMediaUploadLogResponse>
  notifications?: Maybe<PaginatedNotificationsResponse>
  project?: Maybe<Project>
  projectFlow?: Maybe<ProjectFlow>
  projectFlows?: Maybe<PaginatedProjectFlowsResponse>
  projects?: Maybe<PaginatedProjectsResponse>
  roles?: Maybe<PaginatedRolesResponse>
  thing?: Maybe<Thing>
  thingCategories?: Maybe<PaginatedThingCategoriesResponse>
  thingCategory?: Maybe<ThingCategory>
  thingLessLocations?: Maybe<Array<Maybe<Location>>>
  things?: Maybe<PaginatedThingsResponse>
  user?: Maybe<User>
  users?: Maybe<PaginatedUsersResponse>
}

export type QueryGroupArgs = {
  id: Scalars['ID']['input']
}

export type QueryGroupsArgs = {
  options?: InputMaybe<ListOptions>
}

export type QueryLocationArgs = {
  id: Scalars['ID']['input']
}

export type QueryLocationsArgs = {
  filterString?: InputMaybe<Scalars['String']['input']>
  groupIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  ordering?: InputMaybe<LocationSortOrder>
  pagination?: InputMaybe<PaginationInputType>
  storeNameId?: InputMaybe<Scalars['String']['input']>
  thingINF?: InputMaybe<Array<InputMaybe<ThingInf>>>
  thingIP?: InputMaybe<Scalars['String']['input']>
  thingMAC?: InputMaybe<Scalars['String']['input']>
  thingStatus?: InputMaybe<ThingStatus>
}

export type QueryMediaUploadLogsArgs = {
  flowId: Scalars['Int']['input']
  options?: InputMaybe<ListOptions>
}

export type QueryNotificationsArgs = {
  options?: InputMaybe<ListOptions>
}

export type QueryProjectArgs = {
  id: Scalars['ID']['input']
}

export type QueryProjectFlowArgs = {
  id: Scalars['ID']['input']
}

export type QueryProjectFlowsArgs = {
  filterString?: InputMaybe<Scalars['String']['input']>
  pagination?: InputMaybe<PaginationInputType>
  parentId: Scalars['Int']['input']
}

export type QueryProjectsArgs = {
  filterString?: InputMaybe<Scalars['String']['input']>
  pagination?: InputMaybe<PaginationInputType>
}

export type QueryRolesArgs = {
  options?: InputMaybe<ListOptions>
}

export type QueryThingArgs = {
  id: Scalars['ID']['input']
}

export type QueryThingCategoriesArgs = {
  options?: InputMaybe<ListOptions>
}

export type QueryThingCategoryArgs = {
  id: Scalars['ID']['input']
}

export type QueryThingsArgs = {
  filterString?: InputMaybe<Scalars['String']['input']>
  ordering?: InputMaybe<OrderingInputType>
  pagination?: InputMaybe<PaginationInputType>
  region?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<Scalars['String']['input']>
}

export type QueryUserArgs = {
  id: Scalars['ID']['input']
}

export type QueryUsersArgs = {
  options?: InputMaybe<ListOptions>
}

export type Role = {
  __typename?: 'Role'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  permissions?: Maybe<Array<Maybe<Permission>>>
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum SyncStorage {
  External = 'External',
  Internal = 'Internal',
}

export type Thing = {
  __typename?: 'Thing'
  alias?: Maybe<Scalars['String']['output']>
  archiveReason?: Maybe<Scalars['String']['output']>
  archiveTitle?: Maybe<Scalars['String']['output']>
  archivedAt?: Maybe<Scalars['DateTime']['output']>
  authorizeExpireAt?: Maybe<Scalars['DateTime']['output']>
  board?: Maybe<Scalars['String']['output']>
  channel2ghz?: Maybe<Scalars['Int']['output']>
  channel5ghz1?: Maybe<Scalars['Int']['output']>
  channel5ghz2?: Maybe<Scalars['Int']['output']>
  configLogs?: Maybe<PaginatedConfigLogResponse>
  cpuUsage?: Maybe<Scalars['Float']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  debugLogs?: Maybe<PaginatedDebugLogResponse>
  deviceLogs?: Maybe<PaginatedDeviceLogResponse>
  firmwareUpgradeDate?: Maybe<Scalars['DateTime']['output']>
  firmwareVersion?: Maybe<Scalars['String']['output']>
  groups?: Maybe<Array<Maybe<Group>>>
  id: Scalars['ID']['output']
  isArchived: Scalars['Boolean']['output']
  isAuthorized: Scalars['Boolean']['output']
  isOnline: Scalars['Boolean']['output']
  lastContactDate?: Maybe<Scalars['DateTime']['output']>
  localIp?: Maybe<Scalars['String']['output']>
  mac: Scalars['String']['output']
  memoryUsage?: Maybe<Scalars['Float']['output']>
  model?: Maybe<Scalars['String']['output']>
  ownerId?: Maybe<Scalars['Int']['output']>
  publicIp?: Maybe<Scalars['String']['output']>
  rxBytes?: Maybe<Scalars['Float']['output']>
  serialNumber: Scalars['String']['output']
  tenantId?: Maybe<Scalars['Int']['output']>
  thingType: ThingType
  txBytes?: Maybe<Scalars['Float']['output']>
  upTime?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type ThingCategory = {
  __typename?: 'ThingCategory'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  things?: Maybe<Array<Maybe<Thing>>>
  updatedAt: Scalars['DateTime']['output']
}

export enum ThingInf {
  Ethernet = 'ethernet',
  Lte = 'lte',
  Unknown = 'unknown',
  Wifi = 'wifi',
}

export enum ThingStatus {
  All = 'all',
  Offline = 'offline',
  Online = 'online',
}

export enum ThingType {
  Ap = 'AP',
  Router = 'Router',
}

export type ThingsForFirmware = {
  __typename?: 'ThingsForFirmware'
  all?: Maybe<Array<Maybe<Thing>>>
  notUpToDate?: Maybe<Array<Maybe<Thing>>>
  withGroup?: Maybe<Array<Maybe<Thing>>>
}

export type ThingsForMedia = {
  __typename?: 'ThingsForMedia'
  all?: Maybe<Array<Maybe<Thing>>>
  withGroup?: Maybe<Array<Maybe<Thing>>>
}

export type UpdateGroupDto = {
  locationIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  mediaSyncPath?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  thingCategoryIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export type UpdateLocationDto = {
  address?: InputMaybe<Scalars['String']['input']>
  city?: InputMaybe<Scalars['String']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  number?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
  storeNameId?: InputMaybe<Scalars['String']['input']>
}

export type UpdateNotificationDto = {
  changeDescription?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<NotificationStatusEnum>
}

export type UpdateProjectDto = {
  name?: InputMaybe<Scalars['String']['input']>
}

export type UpdateProjectFlowDto = {
  name: Scalars['String']['input']
  things: Array<InputMaybe<Scalars['Int']['input']>>
}

export type UpdateRoleDto = {
  name: Scalars['String']['input']
  permissions: Array<InputMaybe<PermissionInput>>
}

export type UpdateThingCategoryDto = {
  name: Scalars['String']['input']
  thingIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export type UpdateUserDto = {
  displayName?: InputMaybe<Scalars['String']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  roleId?: InputMaybe<Scalars['Int']['input']>
}

export type User = {
  __typename?: 'User'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  creator: User
  displayName: Scalars['String']['output']
  email: Scalars['String']['output']
  groups?: Maybe<Array<Maybe<Group>>>
  id: Scalars['ID']['output']
  role: Role
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type ChangePasswordMutationVariables = Exact<{
  oldPass: Scalars['String']['input']
  newPass: Scalars['String']['input']
}>

export type ChangePasswordMutation = {
  __typename?: 'Mutation'
  changePassword?: number | null
}

export type UpdateThingAliasMutationVariables = Exact<{
  mac: Scalars['String']['input']
  serialNumber: Scalars['String']['input']
  alias: Scalars['String']['input']
}>

export type UpdateThingAliasMutation = {
  __typename?: 'Mutation'
  updateThingAlias?: {
    __typename?: 'Thing'
    id: string
    alias?: string | null
  } | null
}

export type ArchiveThingMutationVariables = Exact<{
  id: Scalars['ID']['input']
  reason?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}>

export type ArchiveThingMutation = {
  __typename?: 'Mutation'
  archiveThing?: number | null
}

export type ChangeStoreNameMutationVariables = Exact<{
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}>

export type ChangeStoreNameMutation = {
  __typename?: 'Mutation'
  changeStoreName?: {
    __typename?: 'Thing'
    id: string
    mac: string
    alias?: string | null
    model?: string | null
    isAuthorized: boolean
    isArchived: boolean
    isOnline: boolean
    authorizeExpireAt?: any | null
    archivedAt?: any | null
    archiveReason?: string | null
    archiveTitle?: string | null
    thingType: ThingType
    publicIp?: string | null
    localIp?: string | null
    serialNumber: string
    firmwareVersion?: string | null
    firmwareUpgradeDate?: any | null
    lastContactDate?: any | null
    channel2ghz?: number | null
    channel5ghz1?: number | null
    channel5ghz2?: number | null
    txBytes?: number | null
    rxBytes?: number | null
    cpuUsage?: number | null
    memoryUsage?: number | null
    tenantId?: number | null
    ownerId?: number | null
    upTime?: number | null
    createdAt?: any | null
    updatedAt?: any | null
    debugLogs?: {
      __typename?: 'PaginatedDebugLogResponse'
      total: number
      list: Array<{
        __typename?: 'DebugLog'
        id: string
        content?: string | null
        createdAt?: any | null
        customContent?: string | null
      }>
    } | null
    deviceLogs?: {
      __typename?: 'PaginatedDeviceLogResponse'
      total: number
      list: Array<{
        __typename?: 'DeviceLog'
        id: string
        content?: string | null
        createdAt?: any | null
        eventType?: string | null
      }>
    } | null
    configLogs?: {
      __typename?: 'PaginatedConfigLogResponse'
      total: number
      list: Array<{
        __typename?: 'ConfigLog'
        id: string
        item?: string | null
        createdAt?: any | null
        operator?: string | null
        status?: string | null
        detail?: string | null
      }>
    } | null
  } | null
}

export type GetMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input']
  options: ListOptions
}>

export type GetMessagesQuery = {
  __typename?: 'Query'
  thing?: {
    __typename?: 'Thing'
    id: string
    mac: string
    alias?: string | null
    model?: string | null
    isAuthorized: boolean
    isArchived: boolean
    isOnline: boolean
    authorizeExpireAt?: any | null
    archivedAt?: any | null
    archiveReason?: string | null
    archiveTitle?: string | null
    thingType: ThingType
    publicIp?: string | null
    localIp?: string | null
    serialNumber: string
    firmwareVersion?: string | null
    firmwareUpgradeDate?: any | null
    lastContactDate?: any | null
    channel2ghz?: number | null
    channel5ghz1?: number | null
    channel5ghz2?: number | null
    txBytes?: number | null
    rxBytes?: number | null
    cpuUsage?: number | null
    memoryUsage?: number | null
    tenantId?: number | null
    ownerId?: number | null
    upTime?: number | null
    createdAt?: any | null
    updatedAt?: any | null
    debugLogs?: {
      __typename?: 'PaginatedDebugLogResponse'
      total: number
      list: Array<{
        __typename?: 'DebugLog'
        id: string
        content?: string | null
        createdAt?: any | null
        customContent?: string | null
      }>
    } | null
    deviceLogs?: {
      __typename?: 'PaginatedDeviceLogResponse'
      total: number
      list: Array<{
        __typename?: 'DeviceLog'
        id: string
        content?: string | null
        createdAt?: any | null
        eventType?: string | null
      }>
    } | null
    configLogs?: {
      __typename?: 'PaginatedConfigLogResponse'
      total: number
      list: Array<{
        __typename?: 'ConfigLog'
        id: string
        item?: string | null
        createdAt?: any | null
        operator?: string | null
        status?: string | null
        detail?: string | null
      }>
    } | null
  } | null
}

export type GetThingQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetThingQuery = {
  __typename?: 'Query'
  thing?: {
    __typename?: 'Thing'
    id: string
    mac: string
    alias?: string | null
    model?: string | null
    isAuthorized: boolean
    isArchived: boolean
    authorizeExpireAt?: any | null
    archivedAt?: any | null
    archiveReason?: string | null
    archiveTitle?: string | null
    thingType: ThingType
    publicIp?: string | null
    localIp?: string | null
    serialNumber: string
    firmwareVersion?: string | null
    firmwareUpgradeDate?: any | null
    lastContactDate?: any | null
    channel2ghz?: number | null
    channel5ghz1?: number | null
    channel5ghz2?: number | null
    txBytes?: number | null
    rxBytes?: number | null
    cpuUsage?: number | null
    memoryUsage?: number | null
    tenantId?: number | null
    ownerId?: number | null
    upTime?: number | null
    createdAt?: any | null
    updatedAt?: any | null
    board?: string | null
  } | null
}

export type GetThingsQueryVariables = Exact<{
  region?: InputMaybe<Scalars['String']['input']>
  filterString?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<Scalars['String']['input']>
  ordering?: InputMaybe<OrderingInputType>
  pagination?: InputMaybe<PaginationInputType>
}>

export type GetThingsQuery = {
  __typename?: 'Query'
  things?: {
    __typename?: 'PaginatedThingsResponse'
    total: number
    list: Array<{
      __typename?: 'Thing'
      id: string
      mac: string
      alias?: string | null
      model?: string | null
      isAuthorized: boolean
      isArchived: boolean
      isOnline: boolean
      authorizeExpireAt?: any | null
      archivedAt?: any | null
      archiveReason?: string | null
      archiveTitle?: string | null
      thingType: ThingType
      publicIp?: string | null
      localIp?: string | null
      serialNumber: string
      firmwareVersion?: string | null
      firmwareUpgradeDate?: any | null
      lastContactDate?: any | null
      channel2ghz?: number | null
      channel5ghz1?: number | null
      channel5ghz2?: number | null
      txBytes?: number | null
      rxBytes?: number | null
      cpuUsage?: number | null
      memoryUsage?: number | null
      tenantId?: number | null
      ownerId?: number | null
      upTime?: number | null
      createdAt?: any | null
      updatedAt?: any | null
      board?: string | null
    }>
  } | null
}

export type SendCommandMutationVariables = Exact<{
  code: CommandCode
  input?: InputMaybe<Scalars['String']['input']>
  thingIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
}>

export type SendCommandMutation = {
  __typename?: 'Mutation'
  executeCommand?: boolean | null
}

export type ThingLessLocationsQueryVariables = Exact<{ [key: string]: never }>

export type ThingLessLocationsQuery = {
  __typename?: 'Query'
  thingLessLocations?: Array<{
    __typename?: 'Location'
    id: string
    storeNameId: string
  } | null> | null
}

export type UnregisterThingMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type UnregisterThingMutation = {
  __typename?: 'Mutation'
  unregisterThing?: number | null
}

export const ChangePasswordDocument = gql`
  mutation changePassword($oldPass: String!, $newPass: String!) {
    changePassword(newPassword: $newPass, oldPassword: $oldPass)
  }
`
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      oldPass: // value for 'oldPass'
 *      newPass: // value for 'newPass'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options)
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>
export type ChangePasswordMutationResult =
  Apollo.MutationResult<ChangePasswordMutation>
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>
export const UpdateThingAliasDocument = gql`
  mutation updateThingAlias(
    $mac: String!
    $serialNumber: String!
    $alias: String!
  ) {
    updateThingAlias(mac: $mac, serialNumber: $serialNumber, alias: $alias) {
      id
      alias
    }
  }
`
export type UpdateThingAliasMutationFn = Apollo.MutationFunction<
  UpdateThingAliasMutation,
  UpdateThingAliasMutationVariables
>

/**
 * __useUpdateThingAliasMutation__
 *
 * To run a mutation, you first call `useUpdateThingAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThingAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThingAliasMutation, { data, loading, error }] = useUpdateThingAliasMutation({
 *   variables: {
 *      mac: // value for 'mac'
 *      serialNumber: // value for 'serialNumber'
 *      alias: // value for 'alias'
 *   },
 * });
 */
export function useUpdateThingAliasMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateThingAliasMutation,
    UpdateThingAliasMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateThingAliasMutation,
    UpdateThingAliasMutationVariables
  >(UpdateThingAliasDocument, options)
}
export type UpdateThingAliasMutationHookResult = ReturnType<
  typeof useUpdateThingAliasMutation
>
export type UpdateThingAliasMutationResult =
  Apollo.MutationResult<UpdateThingAliasMutation>
export type UpdateThingAliasMutationOptions = Apollo.BaseMutationOptions<
  UpdateThingAliasMutation,
  UpdateThingAliasMutationVariables
>
export const ArchiveThingDocument = gql`
  mutation archiveThing($id: ID!, $reason: String, $title: String) {
    archiveThing(id: $id, reason: $reason, title: $title)
  }
`
export type ArchiveThingMutationFn = Apollo.MutationFunction<
  ArchiveThingMutation,
  ArchiveThingMutationVariables
>

/**
 * __useArchiveThingMutation__
 *
 * To run a mutation, you first call `useArchiveThingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveThingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveThingMutation, { data, loading, error }] = useArchiveThingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useArchiveThingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ArchiveThingMutation,
    ArchiveThingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ArchiveThingMutation,
    ArchiveThingMutationVariables
  >(ArchiveThingDocument, options)
}
export type ArchiveThingMutationHookResult = ReturnType<
  typeof useArchiveThingMutation
>
export type ArchiveThingMutationResult =
  Apollo.MutationResult<ArchiveThingMutation>
export type ArchiveThingMutationOptions = Apollo.BaseMutationOptions<
  ArchiveThingMutation,
  ArchiveThingMutationVariables
>
export const ChangeStoreNameDocument = gql`
  mutation changeStoreName($id: ID!, $name: String!) {
    changeStoreName(id: $id, name: $name) {
      id
      mac
      alias
      model
      isAuthorized
      isArchived
      isOnline
      authorizeExpireAt
      archivedAt
      archiveReason
      archiveTitle
      thingType
      publicIp
      localIp
      serialNumber
      firmwareVersion
      firmwareUpgradeDate
      lastContactDate
      channel2ghz
      channel5ghz1
      channel5ghz2
      txBytes
      rxBytes
      lastContactDate
      cpuUsage
      memoryUsage
      tenantId
      ownerId
      upTime
      createdAt
      updatedAt
      debugLogs {
        list {
          id
          content
          createdAt
          customContent
        }
        total
      }
      deviceLogs {
        list {
          id
          content
          createdAt
          eventType
        }
        total
      }
      configLogs {
        list {
          id
          item
          createdAt
          operator
          status
          detail
        }
        total
      }
    }
  }
`
export type ChangeStoreNameMutationFn = Apollo.MutationFunction<
  ChangeStoreNameMutation,
  ChangeStoreNameMutationVariables
>

/**
 * __useChangeStoreNameMutation__
 *
 * To run a mutation, you first call `useChangeStoreNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStoreNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStoreNameMutation, { data, loading, error }] = useChangeStoreNameMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useChangeStoreNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeStoreNameMutation,
    ChangeStoreNameMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ChangeStoreNameMutation,
    ChangeStoreNameMutationVariables
  >(ChangeStoreNameDocument, options)
}
export type ChangeStoreNameMutationHookResult = ReturnType<
  typeof useChangeStoreNameMutation
>
export type ChangeStoreNameMutationResult =
  Apollo.MutationResult<ChangeStoreNameMutation>
export type ChangeStoreNameMutationOptions = Apollo.BaseMutationOptions<
  ChangeStoreNameMutation,
  ChangeStoreNameMutationVariables
>
export const GetMessagesDocument = gql`
  query getMessages($id: ID!, $options: ListOptions!) {
    thing(id: $id) {
      id
      mac
      alias
      model
      isAuthorized
      isArchived
      isOnline
      authorizeExpireAt
      archivedAt
      archiveReason
      archiveTitle
      thingType
      publicIp
      localIp
      serialNumber
      firmwareVersion
      firmwareUpgradeDate
      lastContactDate
      channel2ghz
      channel5ghz1
      channel5ghz2
      txBytes
      rxBytes
      lastContactDate
      cpuUsage
      memoryUsage
      tenantId
      ownerId
      upTime
      createdAt
      updatedAt
      debugLogs {
        list {
          id
          content
          createdAt
          customContent
        }
        total
      }
      deviceLogs {
        list {
          id
          content
          createdAt
          eventType
        }
        total
      }
      configLogs {
        list {
          id
          item
          createdAt
          operator
          status
          detail
        }
        total
      }
    }
  }
`

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMessagesQuery,
    GetMessagesQueryVariables
  > &
    (
      | { variables: GetMessagesQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(
    GetMessagesDocument,
    options,
  )
}
export function useGetMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMessagesQuery,
    GetMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(
    GetMessagesDocument,
    options,
  )
}
export function useGetMessagesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMessagesQuery,
        GetMessagesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMessagesQuery, GetMessagesQueryVariables>(
    GetMessagesDocument,
    options,
  )
}
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>
export type GetMessagesLazyQueryHookResult = ReturnType<
  typeof useGetMessagesLazyQuery
>
export type GetMessagesSuspenseQueryHookResult = ReturnType<
  typeof useGetMessagesSuspenseQuery
>
export type GetMessagesQueryResult = Apollo.QueryResult<
  GetMessagesQuery,
  GetMessagesQueryVariables
>
export const GetThingDocument = gql`
  query getThing($id: ID!) {
    thing(id: $id) {
      id
      mac
      alias
      model
      isAuthorized
      isArchived
      authorizeExpireAt
      archivedAt
      archiveReason
      archiveTitle
      thingType
      publicIp
      localIp
      serialNumber
      firmwareVersion
      firmwareUpgradeDate
      lastContactDate
      channel2ghz
      channel5ghz1
      channel5ghz2
      txBytes
      rxBytes
      lastContactDate
      cpuUsage
      memoryUsage
      tenantId
      ownerId
      upTime
      createdAt
      updatedAt
      board
    }
  }
`

/**
 * __useGetThingQuery__
 *
 * To run a query within a React component, call `useGetThingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetThingQuery(
  baseOptions: Apollo.QueryHookOptions<GetThingQuery, GetThingQueryVariables> &
    ({ variables: GetThingQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetThingQuery, GetThingQueryVariables>(
    GetThingDocument,
    options,
  )
}
export function useGetThingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetThingQuery,
    GetThingQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetThingQuery, GetThingQueryVariables>(
    GetThingDocument,
    options,
  )
}
export function useGetThingSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetThingQuery, GetThingQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetThingQuery, GetThingQueryVariables>(
    GetThingDocument,
    options,
  )
}
export type GetThingQueryHookResult = ReturnType<typeof useGetThingQuery>
export type GetThingLazyQueryHookResult = ReturnType<
  typeof useGetThingLazyQuery
>
export type GetThingSuspenseQueryHookResult = ReturnType<
  typeof useGetThingSuspenseQuery
>
export type GetThingQueryResult = Apollo.QueryResult<
  GetThingQuery,
  GetThingQueryVariables
>
export const GetThingsDocument = gql`
  query GetThings(
    $region: String
    $filterString: String
    $status: String
    $ordering: OrderingInputType
    $pagination: PaginationInputType
  ) {
    things(
      status: $status
      region: $region
      filterString: $filterString
      ordering: $ordering
      pagination: $pagination
    ) {
      total
      list {
        id
        mac
        alias
        model
        isAuthorized
        isArchived
        isOnline
        authorizeExpireAt
        archivedAt
        archiveReason
        archiveTitle
        thingType
        publicIp
        localIp
        serialNumber
        firmwareVersion
        firmwareUpgradeDate
        lastContactDate
        channel2ghz
        channel5ghz1
        channel5ghz2
        txBytes
        rxBytes
        lastContactDate
        cpuUsage
        memoryUsage
        tenantId
        ownerId
        upTime
        createdAt
        updatedAt
        board
      }
    }
  }
`

/**
 * __useGetThingsQuery__
 *
 * To run a query within a React component, call `useGetThingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThingsQuery({
 *   variables: {
 *      region: // value for 'region'
 *      filterString: // value for 'filterString'
 *      status: // value for 'status'
 *      ordering: // value for 'ordering'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetThingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetThingsQuery,
    GetThingsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetThingsQuery, GetThingsQueryVariables>(
    GetThingsDocument,
    options,
  )
}
export function useGetThingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetThingsQuery,
    GetThingsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetThingsQuery, GetThingsQueryVariables>(
    GetThingsDocument,
    options,
  )
}
export function useGetThingsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetThingsQuery, GetThingsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetThingsQuery, GetThingsQueryVariables>(
    GetThingsDocument,
    options,
  )
}
export type GetThingsQueryHookResult = ReturnType<typeof useGetThingsQuery>
export type GetThingsLazyQueryHookResult = ReturnType<
  typeof useGetThingsLazyQuery
>
export type GetThingsSuspenseQueryHookResult = ReturnType<
  typeof useGetThingsSuspenseQuery
>
export type GetThingsQueryResult = Apollo.QueryResult<
  GetThingsQuery,
  GetThingsQueryVariables
>
export const SendCommandDocument = gql`
  mutation sendCommand($code: CommandCode!, $input: String, $thingIds: [ID!]) {
    executeCommand(command: $code, input: $input, thingIds: $thingIds)
  }
`
export type SendCommandMutationFn = Apollo.MutationFunction<
  SendCommandMutation,
  SendCommandMutationVariables
>

/**
 * __useSendCommandMutation__
 *
 * To run a mutation, you first call `useSendCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendCommandMutation, { data, loading, error }] = useSendCommandMutation({
 *   variables: {
 *      code: // value for 'code'
 *      input: // value for 'input'
 *      thingIds: // value for 'thingIds'
 *   },
 * });
 */
export function useSendCommandMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendCommandMutation,
    SendCommandMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SendCommandMutation, SendCommandMutationVariables>(
    SendCommandDocument,
    options,
  )
}
export type SendCommandMutationHookResult = ReturnType<
  typeof useSendCommandMutation
>
export type SendCommandMutationResult =
  Apollo.MutationResult<SendCommandMutation>
export type SendCommandMutationOptions = Apollo.BaseMutationOptions<
  SendCommandMutation,
  SendCommandMutationVariables
>
export const ThingLessLocationsDocument = gql`
  query thingLessLocations {
    thingLessLocations {
      id
      storeNameId
    }
  }
`

/**
 * __useThingLessLocationsQuery__
 *
 * To run a query within a React component, call `useThingLessLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useThingLessLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useThingLessLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useThingLessLocationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ThingLessLocationsQuery,
    ThingLessLocationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    ThingLessLocationsQuery,
    ThingLessLocationsQueryVariables
  >(ThingLessLocationsDocument, options)
}
export function useThingLessLocationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ThingLessLocationsQuery,
    ThingLessLocationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    ThingLessLocationsQuery,
    ThingLessLocationsQueryVariables
  >(ThingLessLocationsDocument, options)
}
export function useThingLessLocationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        ThingLessLocationsQuery,
        ThingLessLocationsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    ThingLessLocationsQuery,
    ThingLessLocationsQueryVariables
  >(ThingLessLocationsDocument, options)
}
export type ThingLessLocationsQueryHookResult = ReturnType<
  typeof useThingLessLocationsQuery
>
export type ThingLessLocationsLazyQueryHookResult = ReturnType<
  typeof useThingLessLocationsLazyQuery
>
export type ThingLessLocationsSuspenseQueryHookResult = ReturnType<
  typeof useThingLessLocationsSuspenseQuery
>
export type ThingLessLocationsQueryResult = Apollo.QueryResult<
  ThingLessLocationsQuery,
  ThingLessLocationsQueryVariables
>
export const UnregisterThingDocument = gql`
  mutation unregisterThing($id: ID!) {
    unregisterThing(id: $id)
  }
`
export type UnregisterThingMutationFn = Apollo.MutationFunction<
  UnregisterThingMutation,
  UnregisterThingMutationVariables
>

/**
 * __useUnregisterThingMutation__
 *
 * To run a mutation, you first call `useUnregisterThingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnregisterThingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unregisterThingMutation, { data, loading, error }] = useUnregisterThingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnregisterThingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnregisterThingMutation,
    UnregisterThingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UnregisterThingMutation,
    UnregisterThingMutationVariables
  >(UnregisterThingDocument, options)
}
export type UnregisterThingMutationHookResult = ReturnType<
  typeof useUnregisterThingMutation
>
export type UnregisterThingMutationResult =
  Apollo.MutationResult<UnregisterThingMutation>
export type UnregisterThingMutationOptions = Apollo.BaseMutationOptions<
  UnregisterThingMutation,
  UnregisterThingMutationVariables
>
