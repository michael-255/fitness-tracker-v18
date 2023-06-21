import type { InferType, ObjectSchema, AnySchema } from 'yup'
import type { Icon } from '@/types/icons'
import type { QTableColumn } from 'quasar'
import type { defineAsyncComponent } from 'vue'
import type {
  logValidator,
  settingValidator,
  anyParentValidator,
  anyChildValidator,
  workoutValidator,
  exerciseValidator,
  measurementValidator,
  workoutResultValidator,
  exerciseResultValidator,
  measurementResultValidator,
} from '@/services/validators'
import type { I } from 'vitest/dist/types-94cfe4b4'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     DATABASE                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// Must be a URL friendly slug
export enum Type {
  WORKOUT = 'workout',
  EXERCISE = 'exercise',
  MEASUREMENT = 'measurement',
}

export enum Field {
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
  // CORE
  ID = 'id',
  TIMESTAMP = 'timestamp',
  TYPE = 'type',
  // PARENT
  NAME = 'name',
  DESC = 'desc',
  ENABLED = 'enabled',
  FAVORITED = 'favorited',
  LAST_CHILD = 'lastChild',
  // CHILD
  PARENT_ID = 'parentId',
  NOTE = 'note',
  ACTIVE = 'active',
  // WORKOUT
  EXERCISE_IDS = 'exerciseIds',
  // EXERCISE
  EXERCISE_INPUTS = 'exerciseInputs',
  // Measurements
  MEASUREMENT_INPUT = 'measurementInput',
  // WORKOUT RESULT
  FINISHED_TIMESTAMP = 'finishedTimestamp',
  EXERCISE_RESULT_IDS = 'exerciseResultIds',
  // EXERCISE RESULT
  REPS = 'reps',
  WEIGHT_LBS = 'weightLbs',
  DISTANCE_MILES = 'distanceMiles',
  DURATION_MINUTES = 'durationMinutes',
  WATTS = 'watts',
  SPEED_MPH = 'speedMph',
  CALORIES = 'calories',
  RESISTANCE = 'resistance',
  // MEASUREMENT RESULT
  HEIGHT_WEIGHT = 'heightWeight',
  PERCENT = 'percent',
  INCHES = 'inches',
  LBS = 'lbs',
}

export enum Severity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export enum SettingKey {
  USER_HEIGHT = 'user-height-inches',
  SHOW_WELCOME = 'show-welcome-overlay',
  SHOW_DESCRIPTIONS = 'show-dashboard-descriptions',
  DARK_MODE = 'dark-mode',
  SHOW_CONSOLE_LOGS = 'show-console-logs',
  SHOW_INFO_MESSAGES = 'show-info-messages',
  LOG_RETENTION_TIME = 'log-retention-time',
}

export enum MeasurementInput {
  BODY_WEIGHT = 'Body Weight (lbs)', // Uses HEIGHT_WEIGHT
  PERCENT = 'Percentage',
  INCHES = 'Inches',
  LBS = 'Lbs',
}

export enum ExerciseInput {
  NO_SETS = 'No Sets',
  REPS = 'Reps',
  WEIGHT_LBS = 'Weight (lbs)',
  DISTANCE_MILES = 'Distance (miles)',
  DURATION_MINUTES = 'Duration (minutes)',
  WATTS = 'Avg. Watts',
  SPEED_MPH = 'Avg. Speed (mph)',
  CALORIES = 'Calories Burned',
  RESISTANCE = 'Resistence',
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODELS                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// Infering record types from validators
export type Log = InferType<typeof logValidator>
export type Setting = InferType<typeof settingValidator>
export type ParentRecord = Partial<InferType<typeof anyParentValidator>>
export type ChildRecord = Partial<InferType<typeof anyChildValidator>>

export type Workout = InferType<typeof workoutValidator>
export type Exercise = InferType<typeof exerciseValidator>
export type Measurement = InferType<typeof measurementValidator>

export type WorkoutResult = InferType<typeof workoutResultValidator>
export type ExerciseResult = InferType<typeof exerciseResultValidator>
export type MeasurementResult = InferType<typeof measurementResultValidator>

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     DATA SCHMEA                                                           //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export type TypeSchema = {
  type: Type
  icon: Icon
  chartProps: ChartProps[]
  parentLabelSingular: string
  parentLabelPlural: string
  parentValidator: ObjectSchema<any, any, any>
  parentTableColumns: QTableColumn[]
  parentFieldProps: FieldProps[]
  childLabelSingular: string
  childLabelPlural: string
  childValidator: ObjectSchema<any, any, any>
  childTableColumns: QTableColumn[]
  childFieldProps: FieldProps[]
}

export type FieldProps = {
  field: Field
  label: string
  desc?: string // Optional
  getDefault: () => any
  validator: AnySchema<any, any, any>
  validationMessage: string
  inspectFormat: (val: any) => string
  component?: ReturnType<typeof defineAsyncComponent> // Optional = not rendered
}

export type ChartProps = {
  component: ReturnType<typeof defineAsyncComponent>
}
