import { Type, Field, Severity } from '@/types/database'
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

export const percentValidator = number().required().min(0).max(100)
export const zeroPlusValidator = number().required().min(0).max(Number.MAX_SAFE_INTEGER)

const workout = object({}).noUnknown()
const exercise = object({}).noUnknown()
const measurement = object({}).noUnknown()

const workoutResult = object({}).noUnknown()
const exerciseResult = object({}).noUnknown()
const measurementResult = object({
  [Field.PERCENT]: percentValidator,
  [Field.INCHES]: zeroPlusValidator,
  [Field.LBS]: zeroPlusValidator,
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

export const workoutResultValidator = mixed().concat(core).concat(parent).concat(workoutResult)
export const exerciseResultValidator = mixed().concat(core).concat(parent).concat(exerciseResult)
export const measurementResultValidator = mixed()
  .concat(core)
  .concat(parent)
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
