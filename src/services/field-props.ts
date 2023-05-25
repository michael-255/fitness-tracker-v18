import {
  nameValidator,
  textAreaValidator,
  percentValidator,
  timestampValidator,
  idValidator,
  booleanValidator,
  autoIdValidator,
  severityValidator,
  labelValidator,
  anyValidator,
  textValidator,
  keyValidator,
  valueValidator,
  idArrayValidator,
  exerciseInputsValidator,
  measurementInputValidator,
  zeroPlusNumberValidator,
  heightWeightValidator,
  requiredIdArrayValidator,
} from '@/services/validators'
import {
  Field,
  Key,
  Severity,
  type FieldProps,
  MeasurementInput,
  ExerciseInput,
} from '@/types/database'
import { Limit } from '@/types/general'
import { getDisplayDate } from '@/utils/common'
import { defineAsyncComponent } from 'vue'
import { uid } from 'quasar'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOG                                                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const autoIdField: Readonly<FieldProps> = {
  field: Field.AUTO_ID,
  label: 'Auto Id',
  getDefault: () => undefined,
  validator: autoIdValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: number) => `${val || '-'}`,
  // Not rendered
}

const severityField: Readonly<FieldProps> = {
  field: Field.SEVERITY,
  label: 'Severity',
  getDefault: () => undefined,
  validator: severityValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: Severity) => `${val || '-'}`,
  // Not rendered
}

const labelField: Readonly<FieldProps> = {
  field: Field.LABEL,
  label: 'Label',
  getDefault: () => undefined,
  validator: labelValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const detailsField: Readonly<FieldProps> = {
  field: Field.DETAILS,
  label: 'Details',
  getDefault: () => undefined,
  validator: anyValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: any) =>
    val
      ? Object.entries(val)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')
      : '-',
  // Not rendered
}

const messageField: Readonly<FieldProps> = {
  field: Field.MESSAGE,
  label: 'Message',
  getDefault: () => undefined,
  validator: textValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const stackField: Readonly<FieldProps> = {
  field: Field.STACK,
  label: 'Stack',
  getDefault: () => undefined,
  validator: textValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTING                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const keyField: Readonly<FieldProps> = {
  field: Field.KEY,
  label: 'Key',
  getDefault: () => undefined,
  validator: keyValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: Key) => `${val || '-'}`,
  // Not rendered
}

const valueField: Readonly<FieldProps> = {
  field: Field.VALUE,
  label: 'Value',
  getDefault: () => undefined,
  validator: valueValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: any) => `${val ?? '-'}`, // ?? so booleans won't be '-' when false
  // Not rendered
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const idField: Readonly<FieldProps> = {
  field: Field.ID,
  label: 'Id',
  getDefault: () => uid(),
  validator: idValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const timestampField: Readonly<FieldProps> = {
  field: Field.TIMESTAMP,
  label: 'Created Date',
  getDefault: () => Date.now(),
  validator: timestampValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: number) => getDisplayDate(val) || '-',
  component: defineAsyncComponent(() => import('@/components/inputs/InputTimestamp.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const nameField: Readonly<FieldProps> = {
  field: Field.NAME,
  label: 'Name',
  getDefault: () => '',
  validator: nameValidator,
  validationMessage: `Name must be between ${Limit.MIN_NAME_LENGTH} and ${Limit.MAX_NAME_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputName.vue')),
}

const descField: Readonly<FieldProps> = {
  field: Field.DESC,
  label: 'Description',
  getDefault: () => '',
  validator: textAreaValidator,
  validationMessage: `Description cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputTextArea.vue')),
}

const enabledField: Readonly<FieldProps> = {
  field: Field.ENABLED,
  label: 'Enabled',
  desc: 'Whether the record is enabled and shows up on the Dashboard and in other lists.',
  getDefault: () => true,
  validator: booleanValidator,
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/inputs/InputToggle.vue')),
}

const favoritedField: Readonly<FieldProps> = {
  field: Field.FAVORITED,
  label: 'Favorited',
  desc: 'Whether the record is favorited and is prioritized on the Dashboard.',
  getDefault: () => false,
  validator: booleanValidator,
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/inputs/InputToggle.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const parentIdField: Readonly<FieldProps> = {
  field: Field.PARENT_ID,
  label: 'Parent Id',
  getDefault: () => undefined,
  validator: idValidator,
  validationMessage: `Invalid`,
  inspectFormat: (val: string) => `${val || '-'}`,
  // Not rendered
}

const noteField: Readonly<FieldProps> = {
  field: Field.NOTE,
  label: 'Note',
  desc: 'Text note about the record that can be viewed on the Dashboard.',
  getDefault: () => '',
  validator: textAreaValidator,
  validationMessage: `Note cannot exceed ${Limit.MAX_TEXT_AREA_LENGTH} characters`,
  inspectFormat: (val: string) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputTextArea.vue')),
}

const activeField: Readonly<FieldProps> = {
  field: Field.ACTIVE,
  label: 'Active',
  getDefault: () => false,
  validator: booleanValidator,
  validationMessage: '* Required',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  // Not rendered
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     WORKOUT                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const exerciseIdsField: Readonly<FieldProps> = {
  field: Field.EXERCISE_IDS,
  label: 'Exercises',
  desc: 'Exercises to be performed in the workout in the order selected.',
  getDefault: () => [],
  validator: requiredIdArrayValidator,
  validationMessage: 'Must have at least one exercise selected',
  inspectFormat: (val: string[]) => val?.join(', ') || '-',
  component: defineAsyncComponent(() => import('@/components/inputs/InputExerciseIds.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     EXERCISE                                                              //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const exerciseInputsField: Readonly<FieldProps> = {
  field: Field.EXERCISE_INPUTS,
  label: 'Exercise Inputs',
  desc: 'Select the exercise inputs that you can record data to for this record. Leave blank if you want the record to be purely instructional during a workout.',
  getDefault: () => [],
  validator: exerciseInputsValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: ExerciseInput[]) => val?.join(', ') || '-',
  component: defineAsyncComponent(() => import('@/components/inputs/InputExerciseInputs.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MEASUREMENT                                                           //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const measurementInputField: Readonly<FieldProps> = {
  field: Field.MEASUREMENT_INPUT,
  label: 'Measurement Inputs',
  desc: 'Select the measurement input that you can record data to for this record. You must select one',
  getDefault: () => undefined,
  validator: measurementInputValidator,
  validationMessage: 'Must select a measurement input',
  inspectFormat: (val: MeasurementInput) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputMeasurementInput.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     WORKOUT RESULT                                                        //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const finishedTimestampField: Readonly<FieldProps> = {
  field: Field.FINISHED_TIMESTAMP,
  label: 'Finished Date',
  getDefault: () => undefined,
  validator: timestampValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: number) => getDisplayDate(val) || '-',
  component: defineAsyncComponent(() => import('@/components/inputs/InputTimestamp.vue')),
}

const exerciseResultIdsField: Readonly<FieldProps> = {
  field: Field.EXERCISE_RESULT_IDS,
  label: 'Exercise Results',
  desc: 'The exercise results to be recorded for the workout in the order selected. Can be left blank for instructional workouts.',
  getDefault: () => [],
  validator: idArrayValidator,
  validationMessage: 'Invalid',
  inspectFormat: (val: string[]) => val?.join(', ') || '-',
  component: defineAsyncComponent(() => import('@/components/inputs/InputExerciseResultIds.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     EXERCISE RESULT                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const repsField: Readonly<FieldProps> = {
  field: Field.REPS,
  label: 'Reps',
  getDefault: () => 0,
  validator: zeroPlusNumberValidator,
  validationMessage: 'Must be 0 or greater',
  inspectFormat: (val: number[]) => val?.join(', ') || '-',
  // component: defineAsyncComponent(() => import('@/components/inputs/InputReps.vue')),
}

const weightLbsField: Readonly<FieldProps> = {
  field: Field.WEIGHT_LBS,
  label: 'Weight (lbs)',
  getDefault: () => 0,
  validator: zeroPlusNumberValidator,
  validationMessage: 'Must be 0 or greater',
  inspectFormat: (val: number[]) => val?.join(', ') || '-',
  // component: defineAsyncComponent(() => import('@/components/inputs/InputWeightLbs.vue')),
}

const distanceMilesField: Readonly<FieldProps> = {
  field: Field.DISTANCE_MILES,
  label: 'Distance (miles)',
  getDefault: () => 0,
  validator: zeroPlusNumberValidator,
  validationMessage: 'Must be 0 or greater',
  inspectFormat: (val: number[]) => val?.join(', ') || '-',
  // component: defineAsyncComponent(() => import('@/components/inputs/InputDistanceMiles.vue')),
}

const durationMinutesField: Readonly<FieldProps> = {
  field: Field.DURATION_MINUTES,
  label: 'Duration (minutes)',
  getDefault: () => 0,
  validator: zeroPlusNumberValidator,
  validationMessage: 'Must be 0 or greater',
  inspectFormat: (val: number[]) => val?.join(', ') || '-',
  // component: defineAsyncComponent(() => import('@/components/inputs/InputDurationMinutes.vue')),
}

const wattsField: Readonly<FieldProps> = {
  field: Field.WATTS,
  label: 'Watts',
  getDefault: () => 0,
  validator: zeroPlusNumberValidator,
  validationMessage: 'Must be 0 or greater',
  inspectFormat: (val: number[]) => val?.join(', ') || '-',
  // component: defineAsyncComponent(() => import('@/components/inputs/InputWatts.vue')),
}

const speedMphField: Readonly<FieldProps> = {
  field: Field.SPEED_MPH,
  label: 'Speed (mph)',
  getDefault: () => 0,
  validator: zeroPlusNumberValidator,
  validationMessage: 'Must be 0 or greater',
  inspectFormat: (val: number[]) => val?.join(', ') || '-',
  // component: defineAsyncComponent(() => import('@/components/inputs/InputSpeedMph.vue')),
}

const caloriesField: Readonly<FieldProps> = {
  field: Field.CALORIES,
  label: 'Calories Burned',
  getDefault: () => 0,
  validator: zeroPlusNumberValidator,
  validationMessage: 'Must be 0 or greater',
  inspectFormat: (val: number[]) => val?.join(', ') || '-',
  // component: defineAsyncComponent(() => import('@/components/inputs/InputCalories.vue')),
}

const resistanceField: Readonly<FieldProps> = {
  field: Field.RESISTANCE,
  label: 'Resistance',
  getDefault: () => 0,
  validator: zeroPlusNumberValidator,
  validationMessage: 'Must be 0 or greater',
  inspectFormat: (val: number[]) => val?.join(', ') || '-',
  // component: defineAsyncComponent(() => import('@/components/inputs/InputResistance.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MEASUREMENT RESULT                                                    //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const heightWeightLbsField: Readonly<FieldProps> = {
  field: Field.HEIGHT_WEIGHT_LBS,
  label: 'Body Weight (lbs)', // Stored with height in the database
  getDefault: () => [0, 0],
  validator: heightWeightValidator,
  validationMessage: 'Invalid', // TODO
  inspectFormat: (val: number[]) => `${val?.join(', ') || '-'}`,
  // component: defineAsyncComponent(() => import('@/components/inputs/BodyWeight.vue')),
}

const percentField: Readonly<FieldProps> = {
  field: Field.PERCENT,
  label: 'Percentage',
  getDefault: () => 0,
  validator: percentValidator,
  validationMessage: 'Must be between 0 and 100',
  inspectFormat: (val: number) => `${val}%`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputNumber.vue')),
}

const inchesField: Readonly<FieldProps> = {
  field: Field.INCHES,
  label: 'Inches',
  getDefault: () => 0,
  validator: zeroPlusNumberValidator,
  validationMessage: 'Must be 0 or greater',
  inspectFormat: (val: number) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputNumber.vue')),
}

const lbsField: Readonly<FieldProps> = {
  field: Field.LBS,
  label: 'Pounds',
  getDefault: () => 0,
  validator: zeroPlusNumberValidator,
  validationMessage: 'Must be 0 or greater',
  inspectFormat: (val: number) => `${val || '-'}`,
  component: defineAsyncComponent(() => import('@/components/inputs/InputNumber.vue')),
}

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     APP SCHEMA FIELD CARDS                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const coreFields: FieldProps[] = [idField, timestampField]
const parentFields: FieldProps[] = [nameField, descField, enabledField, favoritedField]
const childFields: FieldProps[] = [parentIdField, noteField, activeField]

export const logFields: FieldProps[] = [
  autoIdField,
  timestampField,
  severityField,
  labelField,
  detailsField,
  messageField,
  stackField,
]
export const settingFields: FieldProps[] = [keyField, valueField]

export const workoutFields: FieldProps[] = [...coreFields, ...parentFields, exerciseIdsField]
export const exerciseFields: FieldProps[] = [...coreFields, ...parentFields, exerciseInputsField]
export const measurementFields: FieldProps[] = [
  ...coreFields,
  ...parentFields,
  measurementInputField,
]

export const workoutResultFields: FieldProps[] = [
  ...coreFields,
  ...childFields,
  finishedTimestampField,
  exerciseResultIdsField,
]
export const exerciseResultFields: FieldProps[] = [
  ...coreFields,
  ...childFields,
  repsField,
  weightLbsField,
  distanceMilesField,
  durationMinutesField,
  wattsField,
  speedMphField,
  caloriesField,
  resistanceField,
]
export const measurementResultFields: FieldProps[] = [
  ...coreFields,
  ...childFields,
  heightWeightLbsField,
  percentField,
  inchesField,
  lbsField,
]
