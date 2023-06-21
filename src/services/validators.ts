import { Type, Field, Severity, ExerciseInput, MeasurementInput } from '@/types/database'
import { mixed, object, array, string, number, boolean } from 'yup'

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     LOG                                                                   //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const autoIdValidator = number().integer().positive()
export const severityValidator = string().required().oneOf(Object.values(Severity))
export const labelValidator = string().required().trim()
export const anyValidator = mixed()
export const textValidator = string().trim()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     SETTING                                                               //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const keyValidator = string().required().trim()
export const valueValidator = mixed().required()
export const heightValidator = number().min(1).max(110).nullable()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CORE                                                                  //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const idValidator = string().required().uuid()
export const timestampValidator = number().required().integer()
export const typeValidator = string().required().oneOf(Object.values(Type))

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     PARENT                                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const nameValidator = string().required().min(1).max(50).trim()
export const textAreaValidator = string().defined().max(500).trim()
export const booleanValidator = boolean().defined()

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     CHILD                                                                 //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

// None yet...

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     RECORD SPECIFIC                                                       //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

export const idArrayValidator = array().of(idValidator).required()
export const requiredIdArrayValidator = array().of(idValidator).required().min(1)
export const percentValidator = number().required().min(0).max(100)
export const zeroPlusNumberValidator = number().required().min(0).max(Number.MAX_SAFE_INTEGER)
export const setNumberArrayValidator = array().of(zeroPlusNumberValidator).required()
export const heightWeightValidator = array()
  .of(number().required().min(0).max(1000))
  .length(2)
  .required()
export const exerciseInputsValidator = array()
  .of(string().required().oneOf(Object.values(ExerciseInput)))
  .required()
export const measurementInputValidator = string().required().oneOf(Object.values(MeasurementInput))

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
//     MODEL VALIDATORS                                                      //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

const core = object({
  [Field.ID]: idValidator,
  [Field.TIMESTAMP]: timestampValidator,
  [Field.TYPE]: typeValidator,
}).noUnknown()

const parent = object({
  [Field.NAME]: nameValidator,
  [Field.DESC]: textAreaValidator,
  [Field.ENABLED]: booleanValidator,
  [Field.FAVORITED]: booleanValidator,
  [Field.LAST_CHILD]: object({
    [Field.ID]: idValidator.optional(),
    [Field.TYPE]: typeValidator.optional(),
    [Field.TIMESTAMP]: timestampValidator.optional(),
    [Field.PARENT_ID]: idValidator.optional(),
    [Field.NOTE]: textAreaValidator.optional(),
  }).optional(),
}).noUnknown()

const child = object({
  [Field.PARENT_ID]: idValidator,
  [Field.NOTE]: textAreaValidator,
}).noUnknown()

const workout = object({
  [Field.EXERCISE_IDS]: requiredIdArrayValidator,
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
  [Field.HEIGHT_WEIGHT]: heightWeightValidator,
  [Field.PERCENT]: percentValidator,
  [Field.INCHES]: zeroPlusNumberValidator,
  [Field.LBS]: zeroPlusNumberValidator,
}).noUnknown()

export const logValidator = object({
  [Field.AUTO_ID]: autoIdValidator,
  [Field.TIMESTAMP]: timestampValidator,
  [Field.SEVERITY]: severityValidator,
  [Field.LABEL]: labelValidator,
  [Field.DETAILS]: anyValidator,
  [Field.MESSAGE]: textValidator,
  [Field.STACK]: textValidator,
}).noUnknown()

export const settingValidator = object({
  [Field.KEY]: keyValidator,
  [Field.VALUE]: valueValidator,
}).noUnknown()

export const anyParentValidator = core
  .concat(parent)
  .concat(workout)
  .concat(exercise)
  .concat(measurement)
export const anyChildValidator = core
  .concat(child)
  .concat(workoutResult)
  .concat(exerciseResult)
  .concat(measurementResult)

export const workoutValidator = core.concat(core).concat(parent).concat(workout)
export const exerciseValidator = core.concat(core).concat(parent).concat(exercise)
export const measurementValidator = core.concat(core).concat(parent).concat(measurement)

export const workoutResultValidator = core.concat(core).concat(child).concat(workoutResult)
export const exerciseResultValidator = core.concat(core).concat(child).concat(exerciseResult)
export const measurementResultValidator = core.concat(core).concat(child).concat(measurementResult)
