import { Type, Field, Severity, ExerciseInput, MeasurementInput } from '@/types/database'
import { mixed, object, array, string, number, boolean } from 'yup'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOG                                                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const autoIdValidator = number().integer()
export const timestampValidator = number().required().integer()
export const severityValidator = string().required().oneOf(Object.values(Severity))
export const labelValidator = string().required().trim()
export const anyValidator = mixed()
export const textValidator = string().trim()

const log = object({
  [Field.AUTO_ID]: autoIdValidator,
  [Field.TIMESTAMP]: timestampValidator,
  [Field.SEVERITY]: severityValidator,
  [Field.LABEL]: labelValidator,
  [Field.DETAILS]: anyValidator,
  [Field.MESSAGE]: textValidator,
  [Field.STACK]: textValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTING                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const keyValidator = string().required().trim()
export const valueValidator = mixed().required()

const setting = object({
  [Field.KEY]: keyValidator,
  [Field.VALUE]: valueValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const idValidator = string().required().uuid()
export const typeValidator = string().required().oneOf(Object.values(Type))

const core = object({
  [Field.ID]: idValidator,
  [Field.TIMESTAMP]: timestampValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const nameValidator = string().required().min(1).max(50).trim()
export const textAreaValidator = string().defined().max(500).trim()
export const booleanValidator = boolean().defined()

const parent = object({
  [Field.NAME]: nameValidator,
  [Field.DESC]: textAreaValidator,
  [Field.ENABLED]: booleanValidator,
  [Field.FAVORITED]: booleanValidator,
  [Field.ACTIVE]: booleanValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const child = object({
  [Field.PARENT_ID]: idValidator,
  [Field.NOTE]: textAreaValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const idArrayValidator = array().of(idValidator).required()
export const percentValidator = number().required().min(0).max(100)
export const zeroPlusNumberValidator = number().required().min(0).max(Number.MAX_SAFE_INTEGER)
export const setNumberArrayValidator = array().of(zeroPlusNumberValidator).required()
export const heightWeightValidator = array()
  .of(number().required().min(0).max(1000))
  .length(2)
  .required()
// TODO - Need to allow 0 elements
export const exerciseInputsValidator = array()
  .of(string().required().oneOf(Object.values(ExerciseInput)))
  .required()
export const measurementInputValidator = string().required().oneOf(Object.values(MeasurementInput))

const workout = object({
  [Field.EXERCISE_IDS]: idArrayValidator,
}).noUnknown()
const exercise = object({
  [Field.EXERCISE_INPUTS]: exerciseInputsValidator,
}).noUnknown()
const measurement = object({
  [Field.MEASUREMENT_INPUT]: measurementInputValidator,
}).noUnknown()

const workoutResult = object({
  [Field.FINISHED_TIMESTAMP]: timestampValidator,
  [Field.EXERCISE_RESULT_IDS]: idArrayValidator,
}).noUnknown()
const exerciseResult = object({
  [Field.REPS]: setNumberArrayValidator,
  [Field.WEIGHT_LBS]: setNumberArrayValidator,
  [Field.DISTANCE_MILES]: setNumberArrayValidator,
  [Field.DURATION_MINUTES]: setNumberArrayValidator,
  [Field.WATTS]: setNumberArrayValidator,
  [Field.SPEED_MPH]: setNumberArrayValidator,
  [Field.CALORIES]: setNumberArrayValidator,
  [Field.RESISTANCE]: setNumberArrayValidator,
}).noUnknown()
const measurementResult = object({
  [Field.HEIGHT_WEIGHT_LBS]: heightWeightValidator,
  [Field.PERCENT]: percentValidator,
  [Field.INCHES]: zeroPlusNumberValidator,
  [Field.LBS]: zeroPlusNumberValidator,
}).noUnknown()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODEL VALIDATORS                                                      //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const logValidator = mixed().concat(log)
export const settingValidator = mixed().concat(setting)

export const workoutValidator = mixed().concat(core).concat(parent).concat(workout)
export const exerciseValidator = mixed().concat(core).concat(parent).concat(exercise)
export const measurementValidator = mixed().concat(core).concat(parent).concat(measurement)

export const workoutResultValidator = mixed().concat(core).concat(child).concat(workoutResult)
export const exerciseResultValidator = mixed().concat(core).concat(child).concat(exerciseResult)
export const measurementResultValidator = mixed()
  .concat(core)
  .concat(child)
  .concat(measurementResult)

export const recordValidator = mixed()
  .concat(log)
  .concat(setting)
  .concat(core)
  .concat(parent)
  .concat(child)
  .concat(workout)
  .concat(exercise)
  .concat(measurement)
  .concat(workoutResult)
  .concat(exerciseResult)
  .concat(measurementResult)
