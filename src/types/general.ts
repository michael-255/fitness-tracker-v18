import {
  Type,
  type Field,
  type Record,
  type Workout,
  type Exercise,
  type Measurement,
  type WorkoutResult,
  type ExerciseResult,
  type MeasurementResult,
  ExerciseInput,
  MeasurementInput,
} from '@/types/database'
import type { Log, Setting } from '@/types/database'

/**
 * App display name.
 */
export const AppName = 'Fitness Tracker'

/**
 * App description used in useMeta and About page.
 */
export const AppDescription = `
${AppName} is used for tracking workouts, exercises, and measurements. You can view charts of your progress and export your data at any time.
`

/**
 * App header color. Must be a valid Quasar color.
 * @see https://quasar.dev/style/color-palette
 */
export const AppHeaderColor = 'primary'

/**
 * Limits for various fields, inputs, and rules in the app.
 */
export enum Limit {
  MAX_FILE_SIZE = 1_000_000,
  MAX_TEXT_AREA_LENGTH = 500,
  MAX_NAME_LENGTH = 50,
  MIN_NAME_LENGTH = 1,
}

/**
 * Milliseconds per time value.
 */
export enum Milliseconds {
  FOREVER = Number.MAX_SAFE_INTEGER,
  PER_YEAR = 31_536_000_000,
  PER_SIX_MONTHS = 15_552_000_000,
  PER_THREE_MONTHS = 7_776_000_000,
  PER_MONTH = 2_592_000_000,
  PER_WEEK = 604_800_000,
  PER_DAY = 86_400_000,
  PER_HOUR = 3_600_000,
  PER_MINUTE = 60_000,
  PER_SECOND = 1_000,
}

/**
 * Defines duration strings for log rentention.
 */
export enum LogRetention {
  ONE_WEEK = '7 Days',
  THREE_MONTHS = '90 Days',
  ONE_YEAR = 'One Year',
  FOREVER = 'Forever',
}

/**
 * Chart graphing time options.
 */
export enum ChartTime {
  ONE_MONTH = '1 Month',
  THREE_MONTHS = '3 Months',
  SIX_MONTHS = '6 Months',
  ONE_YEAR = 'One Year',
  ALL_TIME = 'All Time',
}

/**
 * Format of the JSON file from an export.
 */
export type BackupData = {
  appName: string
  backupTimestamp: number
  [Type.LOG]: Log[]
  [Type.SETTING]: Setting[]
  [Type.WORKOUT]: Workout[]
  [Type.EXERCISE]: Exercise[]
  [Type.MEASUREMENT]: Measurement[]
  [Type.WORKOUT_RESULT]: WorkoutResult[]
  [Type.EXERCISE_RESULT]: ExerciseResult[]
  [Type.MEASUREMENT_RESULT]: MeasurementResult[]
}

/**
 * Properties for parent cards on the Dashboard page.
 */
export type DashboardListCardProps = {
  type: Type
  [Field.ID]: string
  [Field.TIMESTAMP]: number
  [Field.NAME]: string
  [Field.DESC]: string
  [Field.FAVORITED]: boolean
  previousNote?: string
  previousTimestamp?: number
}

/**
 * Defines unique ids that are reserved for specific records.
 * - Mainly used for cross referencing when doing imports
 */
export enum ReservedId {
  UID_01 = '00000000-0000-0000-0000-000000000001',
}
