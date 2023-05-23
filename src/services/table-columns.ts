import { ExerciseInput, Field, Key, MeasurementInput, Severity } from '@/types/database'
import { truncateString, getDisplayDate } from '@/utils/common'
import type { QTableColumn } from 'quasar'

/**
 * Creates standard properties for a QTable column.
 * @param field
 * @param required
 */
function makeStandardColumn(field: any, required: boolean = false) {
  return {
    name: field,
    align: 'left',
    sortable: true,
    required,
    field: (row: any) => row[field],
  } as QTableColumn
}

/**
 * Creates required properties for a hidden QTable column.
 * @param field
 * @param name
 */
function makeHiddenColumn(field: any, name: string) {
  return {
    name,
    label: '',
    align: 'left',
    sortable: false,
    required: true,
    field: (row: any) => row[field],
    format: (val: any) => `${val}`,
    style: 'display: none', // Hide column in QTable
  } as QTableColumn
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOG                                                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Hidden Auto Id column required for some table actions. Hiding saves horizontal space on the data table.
 * @example
 * action(props.cols[0]) // <-- index!
 */
const hiddenAutoIdColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(Field.AUTO_ID, 'hiddenAutoId'),
}

const autoIdColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.AUTO_ID),
  label: 'Auto Id',
  format: (val: number) => `${val}`,
}

const severityColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.SEVERITY),
  label: 'Severity',
  format: (val: Severity) => `${val}`,
}

const labelColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.LABEL),
  label: 'Label',
  format: (val: string) => truncateString(val, 40, '...'),
}

const detailsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.DETAILS),
  label: 'Details',
  format: (val: any) => truncateString(JSON.stringify(val), 40, '...'),
}

const messageColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.MESSAGE),
  label: 'Message',
  format: (val: string) => truncateString(val, 40, '...'),
}

const stackColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.STACK),
  label: 'Stack',
  format: (val: string) => truncateString(val, 40, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTING                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const keyColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.KEY),
  label: 'Key',
  format: (val: Key) => `${val}`,
}

const valueColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.VALUE),
  label: 'Value',
  format: (val: Key) => truncateString(JSON.stringify(val), 40, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

/**
 * Hidden Id column required for some table actions. Hiding saves horizontal space on the data table.
 * @example
 * action(props.cols[0]) // <-- index!
 */
const hiddenIdColumn: Readonly<QTableColumn> = {
  ...makeHiddenColumn(Field.ID, 'hiddenId'),
}

const idColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.ID),
  label: 'Id*',
  format: (val: string) => truncateString(val, 8, '*'),
}

const timestampColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.TIMESTAMP),
  label: 'Created Date',
  format: (val: number) => getDisplayDate(val),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const nameColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.NAME),
  label: 'Name',
  format: (val: string) => truncateString(val, 40, '...'),
}

const descColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.DESC),
  label: 'Description',
  format: (val: string) => truncateString(val, 40, '...'),
}

const enabledColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.ENABLED),
  label: 'Enabled',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

const favoritedColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.FAVORITED),
  label: 'Favorited',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const parentIdColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.PARENT_ID),
  label: 'Parent Id*',
  format: (val: string) => truncateString(val, 8, '*'),
}

const noteColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.NOTE),
  label: 'Note',
  format: (val: string) => truncateString(val, 40, '...'),
}

const activeColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.ACTIVE),
  label: 'Active',
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     WORKOUT                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const exerciseIdsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.EXERCISE_IDS),
  label: 'Exercise Ids',
  format: (val: string[]) => truncateString(val?.join(', '), 40, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     EXERCISE                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const exerciseInputsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.EXERCISE_INPUTS),
  label: 'Exercise Inputs',
  format: (val: ExerciseInput[]) => truncateString(val?.join(', '), 40, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MEASUREMENT                                                           //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const measurementInputColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.MEASUREMENT_INPUT),
  label: 'Measurement Input',
  format: (val: MeasurementInput) => `${val}`,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     WORKOUT RESULT                                                        //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const finishedTimestampColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.FINISHED_TIMESTAMP),
  label: 'Finished Date',
  format: (val: number) => getDisplayDate(val), // TODO
}

const exerciseResultIdsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.EXERCISE_RESULT_IDS),
  label: 'Exercise Result Ids',
  format: (val: string[]) => truncateString(val?.join(', '), 40, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     EXERCISE RESULT                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const repsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.REPS),
  label: 'Reps',
  format: (val: number[]) => truncateString(val?.join(', '), 40, '...'),
}

const weightLbsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.WEIGHT_LBS),
  label: 'Weight (lbs)',
  format: (val: number[]) => truncateString(val?.join(', '), 40, '...'),
}

const distanceMilesColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.DISTANCE_MILES),
  label: 'Distance (miles)',
  format: (val: number[]) => truncateString(val?.join(', '), 40, '...'),
}

const durationMinutesColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.DURATION_MINUTES),
  label: 'Duration (minutes)',
  format: (val: number[]) => truncateString(val?.join(', '), 40, '...'),
}

const wattsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.WATTS),
  label: 'Watts',
  format: (val: number[]) => truncateString(val?.join(', '), 40, '...'),
}

const speedMphColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.SPEED_MPH),
  label: 'Speed (mph)',
  format: (val: number[]) => truncateString(val?.join(', '), 40, '...'),
}

const caloriesColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.CALORIES),
  label: 'Calories Burned',
  format: (val: number[]) => truncateString(val?.join(', '), 40, '...'),
}

const resistanceColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.RESISTANCE),
  label: 'Resistance',
  format: (val: number[]) => truncateString(val?.join(', '), 40, '...'),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MEASUREMENT RESULT                                                    //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const heightWeightLbsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.HEIGHT_WEIGHT_LBS),
  label: 'Height/Weight (lbs)',
  format: (val: number[]) => val?.join(', '),
}

const percentColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.PERCENT),
  label: 'Percentage',
  format: (val: number) => `${val}%`,
}

const inchesColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.INCHES),
  label: 'Inches',
  format: (val: number) => `${val} in`,
}

const lbsColumn: Readonly<QTableColumn> = {
  ...makeStandardColumn(Field.LBS),
  label: 'Pounds',
  format: (val: number) => `${val} lbs`,
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     APP SCHEMA TABLE COLUMNS                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const hiddenColumnNames: Readonly<string[]> = [hiddenIdColumn, hiddenAutoIdColumn].map(
  (c) => c.name
)

const coreColumns: Readonly<QTableColumn[]> = [idColumn, timestampColumn]
const parentColumns: Readonly<QTableColumn[]> = [
  nameColumn,
  descColumn,
  enabledColumn,
  favoritedColumn,
]
const childColumns: Readonly<QTableColumn[]> = [parentIdColumn, noteColumn, activeColumn]

export const logColumns: QTableColumn[] = [
  hiddenAutoIdColumn,
  autoIdColumn,
  timestampColumn,
  severityColumn,
  labelColumn,
  detailsColumn,
  messageColumn,
  stackColumn,
]
export const settingColumns: QTableColumn[] = [keyColumn, valueColumn]

export const workoutColumns: QTableColumn[] = [
  hiddenIdColumn,
  ...coreColumns,
  ...parentColumns,
  exerciseIdsColumn,
]
export const exerciseColumns: QTableColumn[] = [
  hiddenIdColumn,
  ...coreColumns,
  ...parentColumns,
  exerciseInputsColumn,
]
export const measurementColumns: QTableColumn[] = [
  hiddenIdColumn,
  ...coreColumns,
  ...parentColumns,
  measurementInputColumn,
]

export const workoutResultColumns: QTableColumn[] = [
  hiddenIdColumn,
  ...coreColumns,
  ...childColumns,
  finishedTimestampColumn,
  exerciseResultIdsColumn,
]
export const exerciseResultColumns: QTableColumn[] = [
  hiddenIdColumn,
  ...coreColumns,
  ...childColumns,
  repsColumn,
  weightLbsColumn,
  distanceMilesColumn,
  durationMinutesColumn,
  wattsColumn,
  speedMphColumn,
  caloriesColumn,
  resistanceColumn,
]
export const measurementResultColumns: QTableColumn[] = [
  hiddenIdColumn,
  ...coreColumns,
  ...childColumns,
  heightWeightLbsColumn,
  percentColumn,
  inchesColumn,
  lbsColumn,
]
