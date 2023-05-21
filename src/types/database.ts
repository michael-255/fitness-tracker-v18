import type { InferType, MixedSchema } from 'yup'
import type { Icon } from '@/types/icons'
import type { QTableColumn } from 'quasar'
import type { defineAsyncComponent } from 'vue'
import type {
  logValidator,
  settingValidator,
  workoutValidator,
  workoutResultValidator,
  exerciseValidator,
  exerciseResultValidator,
  measurementValidator,
  measurementResultValidator,
  recordValidator,
} from '@/services/validators'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     DATABASE                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Defines both the Dexie table and record type.
 * - Must be a URL friendly slug
 */
export enum Type {
  LOG = 'log',
  SETTING = 'setting',
  WORKOUT = 'workout',
  EXERCISE = 'exercise',
  MEASUREMENT = 'measurement',
  WORKOUT_RESULT = 'workout-result',
  EXERCISE_RESULT = 'exercise-result',
  MEASUREMENT_RESULT = 'measurement-result',
}

/**
 * Defines all potential record fields used by all types.
 */
export enum Field {
  // SHARED
  ID = 'id', // Parent, Child
  TIMESTAMP = 'timestamp', // Parent, Child, Log
  // LOG
  AUTO_ID = 'autoId',
  SEVERITY = 'severity',
  LABEL = 'label',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
  // SETTING
  KEY = 'key',
  VALUE = 'value',
  // PARENT
  NAME = 'name',
  DESC = 'desc',
  ENABLED = 'enabled',
  FAVORITED = 'favorited',
  ACTIVE = 'active',
  // CHILD
  PARENT_ID = 'parentId',
  NOTE = 'note',
  // RECORD SPECIFIC
  PERCENT = 'percent',
  INCHES = 'inches',
  LBS = 'lbs',
}

/**
 * Defines log severity levels.
 */
export enum Severity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Defines key strings for all valid settings the app supports.
 */
export enum Key {
  SHOW_WELCOME = 'show-welcome-overlay',
  SHOW_DESCRIPTIONS = 'show-dashboard-descriptions',
  DARK_MODE = 'dark-mode',
  SHOW_CONSOLE_LOGS = 'show-console-logs',
  SHOW_INFO_MESSAGES = 'show-info-messages',
  LOG_RETENTION_TIME = 'log-retention-time',
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODELS                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// Infering user record types from the validators
export type Log = InferType<typeof logValidator>
export type Setting = InferType<typeof settingValidator>

export type Workout = InferType<typeof workoutValidator>
export type Exercise = InferType<typeof exerciseValidator>
export type Measurement = InferType<typeof measurementValidator>

// TODO - These may have to be partials to handle unused fields
export type WorkoutResult = InferType<typeof workoutResultValidator>
export type ExerciseResult = InferType<typeof exerciseResultValidator>
export type MeasurementResult = InferType<typeof measurementResultValidator>

export type Record = Partial<InferType<typeof recordValidator>>

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     DATA SCHMEA                                                           //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * How data in the app is set up for display and use.
 */
export type TypeSchema = {
  type: Type
  childType?: Type
  parentType?: Type
  databaseIndices: string
  group: Group
  icon: Icon
  labelSingular: string
  labelPlural: string
  validator: MixedSchema<any, any, any>
  supportedActions: Action[]
  visibleColumns: Field[]
  tableColumns: QTableColumn[]
  fieldProps: FieldProps[]
  chartProps: ChartProps[]
}

/**
 * Defined properties for each field.
 * - Description is optional
 * - Component can be omitted for non-rendered fields
 */
export type FieldProps = {
  field: Field
  label: string
  desc?: string // Optional
  getDefault: () => any
  validator: MixedSchema<any, any, any>
  validationMessage: string
  inspectFormat: (val: any) => string
  component?: ReturnType<typeof defineAsyncComponent>
}

/**
 * Defines properties for each chart.
 */
export type ChartProps = {
  component: ReturnType<typeof defineAsyncComponent>
}

/**
 * Defines actions that a database type can perform on the data view.
 */
export enum Action {
  INSPECT = 'Inspect',
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete',
  CHARTS = 'Charts',
}

/**
 * Defines the groups that a database type can belong to.
 */
export enum Group {
  PARENT = 'parent',
  CHILD = 'child',
  INTERNAL = 'internal',
}
