import {
  type TypeSchema,
  Action,
  Field,
  Group,
  Type,
  type FieldProps,
  type ChartProps,
} from '@/types/database'
import { Icon } from '@/types/icons'
import {
  exerciseColumns,
  exerciseResultColumns,
  logColumns,
  measurementColumns,
  measurementResultColumns,
  settingColumns,
  workoutColumns,
  workoutResultColumns,
} from '@/services/table-columns'
import {
  exerciseFields,
  exerciseResultFields,
  logFields,
  measurementFields,
  measurementResultFields,
  settingFields,
  workoutFields,
  workoutResultFields,
} from '@/services/field-props'
import {
  logValidator,
  settingValidator,
  workoutValidator,
  workoutResultValidator,
  exerciseValidator,
  exerciseResultValidator,
  measurementValidator,
  measurementResultValidator,
} from '@/services/validators'
import type { MixedSchema } from 'yup'
import type { QTableColumn } from 'quasar'

export default class DataSchema {
  private static instance: DataSchema | null = null
  private static dataSchema: TypeSchema[] = [
    {
      type: Type.LOG,
      databaseIndices: `++${Field.AUTO_ID}`,
      group: Group.INTERNAL,
      icon: Icon.LOGS,
      labelSingular: 'Log',
      labelPlural: 'Logs',
      validator: logValidator,
      supportedActions: [Action.INSPECT],
      visibleColumns: [Field.TIMESTAMP, Field.SEVERITY, Field.LABEL],
      tableColumns: logColumns,
      fieldProps: logFields,
      chartProps: [],
    },
    {
      type: Type.SETTING,
      databaseIndices: `&${Field.KEY}`,
      group: Group.INTERNAL,
      icon: Icon.SETTINGS,
      labelSingular: 'Setting',
      labelPlural: 'Settings',
      validator: settingValidator,
      supportedActions: [Action.INSPECT],
      visibleColumns: [Field.KEY, Field.VALUE],
      tableColumns: settingColumns,
      fieldProps: settingFields,
      chartProps: [],
    },
    {
      type: Type.WORKOUT,
      childType: Type.WORKOUT_RESULT,
      databaseIndices: `&${Field.ID}`,
      group: Group.PARENT,
      icon: Icon.WORKOUT,
      labelSingular: 'Workout',
      labelPlural: 'Workouts',
      validator: workoutValidator,
      supportedActions: [Action.INSPECT, Action.CREATE, Action.EDIT, Action.DELETE, Action.CHARTS],
      visibleColumns: [Field.ID, Field.TIMESTAMP, Field.NAME],
      tableColumns: workoutColumns,
      fieldProps: workoutFields,
      chartProps: [],
    },
    {
      type: Type.EXERCISE,
      childType: Type.EXERCISE_RESULT,
      databaseIndices: `&${Field.ID}`,
      group: Group.PARENT,
      icon: Icon.EXERCISE,
      labelSingular: 'Exercise',
      labelPlural: 'Exercises',
      validator: exerciseValidator,
      supportedActions: [Action.INSPECT, Action.CREATE, Action.EDIT, Action.DELETE, Action.CHARTS],
      visibleColumns: [Field.ID, Field.TIMESTAMP, Field.NAME],
      tableColumns: exerciseColumns,
      fieldProps: exerciseFields,
      chartProps: [],
    },
    {
      type: Type.MEASUREMENT,
      childType: Type.MEASUREMENT_RESULT,
      databaseIndices: `&${Field.ID}`,
      group: Group.PARENT,
      icon: Icon.MEASUREMENT,
      labelSingular: 'Measurement',
      labelPlural: 'Measurements',
      validator: measurementValidator,
      supportedActions: [Action.INSPECT, Action.CREATE, Action.EDIT, Action.DELETE, Action.CHARTS],
      visibleColumns: [Field.ID, Field.TIMESTAMP, Field.NAME],
      tableColumns: measurementColumns,
      fieldProps: measurementFields,
      chartProps: [],
    },
    {
      type: Type.WORKOUT_RESULT,
      parentType: Type.WORKOUT,
      databaseIndices: `&${Field.ID}, ${Field.PARENT_ID}`,
      group: Group.CHILD,
      icon: Icon.WORKOUT,
      labelSingular: 'Workout Result',
      labelPlural: 'Workout Results',
      validator: workoutResultValidator,
      supportedActions: [Action.INSPECT, Action.EDIT, Action.DELETE],
      visibleColumns: [Field.ID, Field.TIMESTAMP],
      tableColumns: workoutResultColumns,
      fieldProps: workoutResultFields,
      chartProps: [],
    },
    {
      type: Type.EXERCISE_RESULT,
      parentType: Type.EXERCISE,
      databaseIndices: `&${Field.ID}, ${Field.PARENT_ID}`,
      group: Group.CHILD,
      icon: Icon.EXERCISE,
      labelSingular: 'Exercise Result',
      labelPlural: 'Exercise Results',
      validator: exerciseResultValidator,
      supportedActions: [Action.INSPECT, Action.EDIT, Action.DELETE],
      visibleColumns: [Field.ID, Field.TIMESTAMP],
      tableColumns: exerciseResultColumns,
      fieldProps: exerciseResultFields,
      chartProps: [],
    },
    {
      type: Type.MEASUREMENT_RESULT,
      parentType: Type.MEASUREMENT,
      databaseIndices: `&${Field.ID}, ${Field.PARENT_ID}`,
      group: Group.CHILD,
      icon: Icon.MEASUREMENT,
      labelSingular: 'Measurement Result',
      labelPlural: 'Measurement Results',
      validator: measurementResultValidator,
      supportedActions: [Action.INSPECT, Action.EDIT, Action.DELETE],
      visibleColumns: [Field.ID, Field.TIMESTAMP],
      tableColumns: measurementResultColumns,
      fieldProps: measurementResultFields,
      chartProps: [],
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

  static getLabelSingular(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.labelSingular as string
  }

  static getLabelPlural(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.labelPlural as string
  }

  static getTableColumns(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.tableColumns as QTableColumn[]
  }

  static getVisibleColumns(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.visibleColumns as Field[]
  }

  static getSupportedActions(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.supportedActions as Action[]
  }

  static getFieldProps(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.fieldProps as FieldProps[]
  }

  static getChartProps(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.chartProps as ChartProps[]
  }

  static getTypeOptions() {
    return this.dataSchema.map((s) => ({ value: s.type, label: s.labelPlural })) as {
      value: Type
      label: string
    }[]
  }

  static getParentTypeOptions() {
    return this.dataSchema
      .filter((s) => s.group === Group.PARENT)
      .map((s) => ({ value: s.type, label: s.labelPlural })) as {
      value: Type
      label: string
    }[]
  }

  static getDatabaseIndices(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.databaseIndices as string
  }

  static getParentTypes() {
    return this.dataSchema.filter((s) => s.group === Group.PARENT).map((p) => p.type) as Type[]
  }

  static getParentType(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.parentType as Type | undefined
  }

  static getChildType(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.childType as Type | undefined
  }

  static getValidator(type: Type) {
    return this.dataSchema.find((s) => s.type === type)?.validator as MixedSchema<any, any, any>
  }

  static getParentSchemas() {
    return this.dataSchema.filter((s) => s.group === Group.PARENT) as TypeSchema[]
  }
}
