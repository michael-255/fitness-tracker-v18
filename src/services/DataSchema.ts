import { type TypeSchema, Type, type FieldProps, type ChartProps } from '@/types/database'
import { Icon } from '@/types/icons'
import {
  exerciseColumns,
  exerciseResultColumns,
  measurementColumns,
  measurementResultColumns,
  workoutColumns,
  workoutResultColumns,
} from '@/services/table-columns'
import {
  exerciseFields,
  exerciseResultFields,
  measurementFields,
  measurementResultFields,
  workoutFields,
  workoutResultFields,
} from '@/services/field-props'
import {
  workoutValidator,
  workoutResultValidator,
  exerciseValidator,
  exerciseResultValidator,
  measurementValidator,
  measurementResultValidator,
} from '@/services/validators'
import type { AnySchema } from 'yup'
import type { QTableColumn } from 'quasar'

export default class DataSchema {
  private static instance: DataSchema | null = null
  private static dataSchema: TypeSchema[] = [
    {
      type: Type.WORKOUT,
      icon: Icon.WORKOUT,
      chartProps: [],
      parentLabelSingular: 'Workout',
      parentLabelPlural: 'Workouts',
      parentValidator: workoutValidator,
      parentTableColumns: workoutColumns,
      parentFieldProps: workoutFields,
      childLabelSingular: 'Workout Result',
      childLabelPlural: 'Workout Results',
      childValidator: workoutResultValidator,
      childTableColumns: workoutResultColumns,
      childFieldProps: workoutResultFields,
    },
    {
      type: Type.EXERCISE,
      icon: Icon.EXERCISE,
      chartProps: [],
      parentLabelSingular: 'Exercise',
      parentLabelPlural: 'Exercises',
      parentValidator: exerciseValidator,
      parentTableColumns: exerciseColumns,
      parentFieldProps: exerciseFields,
      childLabelSingular: 'Exercise Result',
      childLabelPlural: 'Exercise Results',
      childValidator: exerciseResultValidator,
      childTableColumns: exerciseResultColumns,
      childFieldProps: exerciseResultFields,
    },
    {
      type: Type.MEASUREMENT,
      icon: Icon.MEASUREMENT,
      chartProps: [],
      parentLabelSingular: 'Measurement',
      parentLabelPlural: 'Measurements',
      parentValidator: measurementValidator,
      parentTableColumns: measurementColumns,
      parentFieldProps: measurementFields,
      childLabelSingular: 'Measurement Result',
      childLabelPlural: 'Measurement Results',
      childValidator: measurementResultValidator,
      childTableColumns: measurementResultColumns,
      childFieldProps: measurementResultFields,
    },
  ]

  constructor() {
    // Singleton
    if (DataSchema.instance) {
      return DataSchema.instance
    } else {
      DataSchema.instance = this
    }
  }

  static getParentLabelSingular(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentLabelSingular as string
  }

  static getChildLabelSingular(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childLabelSingular as string
  }

  static getParentLabelPlural(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentLabelPlural as string
  }

  static getChildLabelPlural(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childLabelPlural as string
  }

  static getParentTypeOptions() {
    return this.dataSchema.map((s) => ({ value: s.type, label: s.parentLabelPlural, icon: s.icon }))
  }

  static getAllTypeOptions() {
    const options = [
      { value: ['internal', 'logs'], label: 'Logs', icon: Icon.LOGS },
      { value: ['internal', 'settings'], label: 'Settings', icon: Icon.SETTINGS },
    ]

    this.dataSchema.forEach((s) => {
      options.push({ value: ['parent', s.type], label: s.parentLabelPlural, icon: s.icon })
      options.push({ value: ['child', s.type], label: s.childLabelPlural, icon: s.icon })
    })

    return options
  }

  static getParentValidator(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentValidator as AnySchema<any, any, any>
  }

  static getChildValidator(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childValidator as AnySchema<any, any, any>
  }

  static getParentFieldProps(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentFieldProps as FieldProps[]
  }

  static getChildFieldProps(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childFieldProps as FieldProps[]
  }

  static getParentTableColumns(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentTableColumns as QTableColumn[]
  }

  static getChildTableColumns(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childTableColumns as QTableColumn[]
  }

  static getChartProps(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.chartProps as ChartProps[]
  }
}
