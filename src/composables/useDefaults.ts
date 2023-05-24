import { Icon } from '@/types/icons'
import {
  Field,
  type Exercise,
  type Workout,
  ExerciseInput,
  Type,
  MeasurementInput,
  type Measurement,
} from '@/types/database'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/Database'

/**
 * Composable with functions for generating default data for the app.
 */
export default function useDefaults() {
  const { log } = useLogger()
  const { confirmDialog } = useDialogs()

  /**
   * On confirmation, add the barbell strength workouts into the database.
   */
  async function onAddBarbellStrengthWorkouts() {
    confirmDialog(
      'Add Barbell Strength Workouts',
      `Would you like to add the Barbell Strength workouts into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const now = Date.now()

          const exercises: Exercise[] = [
            {
              [Field.ID]: '50c1fc75-0975-45f8-8177-ff4988b00de2', // From Fitness Tracker v16 (Alpha & Beta)
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Barbell Squat',
              [Field.DESC]: 'Standing barbell squat with the bar resting near your neck.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [ExerciseInput.REPS, ExerciseInput.WEIGHT_LBS],
            } as Exercise,
            {
              [Field.ID]: 'd681459e-10c8-40ae-94e9-9b06b7c40367', // From Fitness Tracker v16 (Alpha)
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Barbell Bench Press',
              [Field.DESC]: 'Lying barbell bench press chest exercise.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [ExerciseInput.REPS, ExerciseInput.WEIGHT_LBS],
            } as Exercise,
            {
              [Field.ID]: '08b12cc1-d4b9-4d22-82db-9e33b3e5c3fa', // From Fitness Tracker v16 (Alpha)
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Barbell Standing Rows',
              [Field.DESC]:
                'Standing barbell rows where you hinge at the waist and pull the bar up into your stomach.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [ExerciseInput.REPS, ExerciseInput.WEIGHT_LBS],
            } as Exercise,
            {
              [Field.ID]: 'cc279615-91a6-42ac-a073-4339e7c2034f', // From Fitness Tracker v16 (Beta)
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Barbell Overhead Press',
              [Field.DESC]:
                'Standing barbell overhead press. Flex your glutes and abs to keep your back straight while pushing the bar above your head.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [ExerciseInput.REPS, ExerciseInput.WEIGHT_LBS],
            } as Exercise,
            {
              [Field.ID]: 'b8f1a60e-7f21-4f62-8757-d9b371bffd45', // From Fitness Tracker v16 (Beta)
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Barbell Deadlift',
              [Field.DESC]:
                'Standing barbell deadlift. Keep your back straight and flexed while lifting with your legs and lower back.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [ExerciseInput.REPS, ExerciseInput.WEIGHT_LBS],
            } as Exercise,
          ]

          const workouts: Workout[] = [
            {
              [Field.ID]: '2158e1b2-27e0-4012-bb14-3846b3ee1d6a', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Barbell Strength - A',
              [Field.DESC]:
                'Workout A of the barbell strength building program where you alternate between this and workout B. Do this workout 1-2 times per week.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_IDS]: [
                '50c1fc75-0975-45f8-8177-ff4988b00de2',
                'd681459e-10c8-40ae-94e9-9b06b7c40367',
                '08b12cc1-d4b9-4d22-82db-9e33b3e5c3fa',
              ],
            } as Workout,
            {
              [Field.ID]: 'f3a1537c-4d63-43e1-99bd-df5ef59ac220', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Barbell Strength - B',
              [Field.DESC]:
                'Workout B of the barbell strength building program where you alternate between this and workout A. Do this workout 1-2 times per week. You should only do 1 set of the Barbell Deadlift exercise in this program.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_IDS]: [
                '50c1fc75-0975-45f8-8177-ff4988b00de2',
                'cc279615-91a6-42ac-a073-4339e7c2034f',
                'b8f1a60e-7f21-4f62-8757-d9b371bffd45',
              ],
            } as Workout,
          ]

          await Promise.all([
            DB.importRecords(Type.EXERCISE, exercises),
            DB.importRecords(Type.WORKOUT, workouts),
          ])

          log.info('Barbell Strength workouts added', {
            newExercises: exercises?.length ?? 0,
            newWorkouts: workouts?.length ?? 0,
          })
        } catch (error) {
          log.error('Error adding Barbell Strength workouts', error)
        }
      }
    )
  }

  /**
   * On confirmation, add the stretch routine into the database.
   */
  async function onAddStretchRoutine() {
    confirmDialog(
      'Add Stretch Routine',
      `Would you like to add the Stretch Routine into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const now = Date.now()

          const exercises: Exercise[] = [
            {
              [Field.ID]: 'e0cd33be-e28a-46c3-80e6-263240ad5b87',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Lying Glute Stretch',
              [Field.DESC]:
                'Lying on your back, bring your knee to your chest and then across your body. Hold for 30 seconds and then repeat on the other side.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: '9007a082-249b-48b7-ba59-463d58a20ba5',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Pigeon Stretch',
              [Field.DESC]:
                'Bring one leg in front of you at an angle with the other behind you. Hold for 30 seconds and then repeat on the other side.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: '8653a6cf-8d26-4115-bda3-d28598065d02',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Frog Stretch',
              [Field.DESC]: 'Get on all fours and spread your knees apart. Hold for 30 seconds.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: 'a6e35a70-9249-4515-a45f-6b7787e23156',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Standing Quad Stretch',
              [Field.DESC]:
                'Standing on one leg, bring your other leg up behind you. Hold for 30 seconds and then repeat on the other side.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: '7f40466f-8621-4567-9181-5fd45fa2418b',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Standing Toe Touch Stretch',
              [Field.DESC]:
                'Standing with your legs straight, bend over and try to touch your toes. Hold for 30 seconds.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: 'a291154a-bd22-4738-8559-0e4ee48e570d',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Standing Calf Stretch',
              [Field.DESC]:
                'Lean against a wall with one leg in front of the other. Hold for 30 seconds and then repeat on the other side.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: '5756d452-9272-4cbd-a144-e2b98acf8a3f',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Standing Chest Stretch',
              [Field.DESC]: 'Lean against a wall with your elbows behind you. Hold for 30 seconds.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: '66c24ef3-0d53-460f-bff4-4888fb687b93',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Cross Spinal Foam Roll',
              [Field.DESC]: 'Foam roll your back going up and down your spine for 90 seconds.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: '2a940995-08fc-4faf-9e52-d94f01e684b8',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Parallel Spinal Foam Roll',
              [Field.DESC]:
                'Lay on a foam roller with it aligned with your spine. Rest with your arms out to the side for 90 seconds.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
          ]

          const workouts: Workout[] = [
            {
              [Field.ID]: '80add653-aa96-4253-9d94-a30cb10cfa5f',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Stretch Routine',
              [Field.DESC]:
                'Simple routine with a variety of stretches focusing on larger muscle groups to help you relax and recover. Do this routine after a workout or every day if possible.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_IDS]: [
                'e0cd33be-e28a-46c3-80e6-263240ad5b87',
                '9007a082-249b-48b7-ba59-463d58a20ba5',
                '8653a6cf-8d26-4115-bda3-d28598065d02',
                'a6e35a70-9249-4515-a45f-6b7787e23156',
                '7f40466f-8621-4567-9181-5fd45fa2418b',
                'a291154a-bd22-4738-8559-0e4ee48e570d',
                '5756d452-9272-4cbd-a144-e2b98acf8a3f',
                '66c24ef3-0d53-460f-bff4-4888fb687b93',
                '2a940995-08fc-4faf-9e52-d94f01e684b8',
              ],
            } as Workout,
          ]

          await Promise.all([
            DB.importRecords(Type.EXERCISE, exercises),
            DB.importRecords(Type.WORKOUT, workouts),
          ])

          log.info('Stretch Routine added', {
            newExercises: exercises?.length ?? 0,
            newWorkouts: workouts?.length ?? 0,
          })
        } catch (error) {
          log.error('Error adding Stretch Routine', error)
        }
      }
    )
  }

  /**
   * On confirmation, add the carpal tunnel routine into the database.
   */
  async function onAddCarpalTunnelRoutine() {
    confirmDialog(
      'Add Carpal Tunnel Routine',
      `Would you like to add the Carpal Tunnel Routine into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const now = Date.now()

          const exercises: Exercise[] = [
            {
              [Field.ID]: 'db513a6b-b0c0-497a-a034-7456d072d98b',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Median Nerve Sliders',
              [Field.DESC]:
                'Bring you hand in front of your face, then fully extend your arm to the side while stretching your hand back and forth. Repeat 15 times on each hand.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: '3776575a-3c89-4286-904f-f724bd143aca',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Fist, Knuckle, Finger Extensions',
              [Field.DESC]:
                'Start with your hands in a fist, then role out to your knuckles, and then extend your fingers. Repeat 15 times.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: 'ceac93d5-6db9-4cca-bcaf-570a25e4a282',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Finger Tip Flexion',
              [Field.DESC]:
                'Flex each of your finger (including your thumbs) without bending your knuckles if possible one at a time. Repeat 15 times per finger.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: 'e7ddd519-807e-456e-9cb5-7496be50cb9c',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Finger Knuckle Flexion',
              [Field.DESC]:
                'Flex each of your finger knuckles one at a time. Repeat 15 times per finger (minus the thumbs).',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: 'ee84a9f7-961c-4dbc-bf97-aa9f5b8a353e',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'In/Out Thumb Stretch',
              [Field.DESC]:
                'Touch your thumbs as close to the base of your pinky as possible, then open your hands and spread them far apart. Repeat 15 times.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: 'f66d5c5f-03fc-43a4-b0f3-af0af58b41a7',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Gentle Wrist Stretch',
              [Field.DESC]:
                'Relax your arms in a T-Rex position, then bring them back while opening your hands for a brief stretch. Repeat 15 times.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
          ]

          const workouts: Workout[] = [
            {
              [Field.ID]: 'cba94a35-d450-4d0f-955f-df6315522622',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Carpal Tunnel Routine',
              [Field.DESC]:
                'Physical therapy routine for carpal tunnel syndrome. Do this routine on days where you did any heavy activity with your wrists.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_IDS]: [
                'db513a6b-b0c0-497a-a034-7456d072d98b',
                '3776575a-3c89-4286-904f-f724bd143aca',
                'ceac93d5-6db9-4cca-bcaf-570a25e4a282',
                'e7ddd519-807e-456e-9cb5-7496be50cb9c',
                'ee84a9f7-961c-4dbc-bf97-aa9f5b8a353e',
                'f66d5c5f-03fc-43a4-b0f3-af0af58b41a7',
              ],
            } as Workout,
          ]

          await Promise.all([
            DB.importRecords(Type.EXERCISE, exercises),
            DB.importRecords(Type.WORKOUT, workouts),
          ])

          log.info('Carpal Tunnel Routine added', {
            newExercises: exercises?.length ?? 0,
            newWorkouts: workouts?.length ?? 0,
          })
        } catch (error) {
          log.error('Error adding Carpal Tunnel Routine', error)
        }
      }
    )
  }

  /**
   * On confirmation, adds the deep breathing routine into the database.
   */
  async function onAddDeepBreathingRoutine() {
    confirmDialog(
      'Add Deep Breathing Routine',
      `Would you like to add the Deep Breathing Routine into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const now = Date.now()

          const exercises: Exercise[] = [
            {
              [Field.ID]: '729bcb7e-6b40-4497-ba0e-8cce6b57341a',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Pursed Lip Breathing',
              [Field.DESC]:
                'Inhale through your nose for 2 seconds, then exhale slowly through pursed lips for 4 seconds. Repeat 10 times.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: '15092ca3-e7c8-4214-a935-8c90126cf408',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Diaphragmatic Breathing',
              [Field.DESC]:
                'Place one hand on your chest. Inhale through your nose for 2 seconds, then contract your abdominal muscles and exhale slowly through pursed lips for 4 seconds. The hand on your chest should have minimal movement during this process. Repeat 10 times.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [Field.ID]: 'cd75a9c7-fed8-4c98-83db-9dc3a64725a0',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Box Breathing',
              [Field.DESC]:
                'Inhale through your nose for 4 seconds, hold your breath for 4 seconds, exhale through your mouth for 4 seconds, then hold your breath for 4 seconds. Repeat 10 times.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
          ]

          const workouts: Workout[] = [
            {
              [Field.ID]: 'b0752f64-e6ba-4d98-a981-67860d7ab665',
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Deep Breathing Routine',
              [Field.DESC]:
                'Deep breathing routine for improving lung compacity, oxygen intake, and relieving stress. Do this routine in a comfortable position (sitting or lying down) and in a quiet environment.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.EXERCISE_IDS]: [
                '729bcb7e-6b40-4497-ba0e-8cce6b57341a',
                '15092ca3-e7c8-4214-a935-8c90126cf408',
                'cd75a9c7-fed8-4c98-83db-9dc3a64725a0',
              ],
            } as Workout,
          ]

          await Promise.all([
            DB.importRecords(Type.EXERCISE, exercises),
            DB.importRecords(Type.WORKOUT, workouts),
          ])

          log.info('Deep Breathing Routine added', {
            newExercises: exercises?.length ?? 0,
            newWorkouts: workouts?.length ?? 0,
          })
        } catch (error) {
          log.error('Error adding Deep Breathing Routine', error)
        }
      }
    )
  }

  /**
   * On confirmation, add standard measurements into the database.
   */
  async function onAddStandardMeasurements() {
    confirmDialog(
      'Add Standard Measurements',
      `Would you like to add Standard Measurements into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const now = Date.now()

          const measurements: Measurement[] = [
            {
              [Field.ID]: '43e3fc4e-b419-468c-9888-b5e072d81dfb', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Body Fat',
              [Field.DESC]: 'Body fat percentage (%).',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.PERCENT,
            } as Measurement,
            {
              [Field.ID]: 'b4450018-1506-450f-a429-9903aded5c9b', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Body Weight',
              [Field.DESC]: 'Body weight in pounds (lbs).',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.LBS,
            } as Measurement,
            {
              [Field.ID]: '880cb344-e537-4f0f-bad4-e212a6df51cd', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Chest',
              [Field.DESC]: 'Chest circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: 'e126e959-1675-4b3b-866c-261e453d8dae', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Left Bicep',
              [Field.DESC]: 'Left bicep circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: '09108d87-8337-4424-83a1-1ee5be5e8585', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Left Calf',
              [Field.DESC]: 'Left calf circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: '96c7229d-91e8-4470-b0a9-ebb1234fe6e7', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Left Forearm',
              [Field.DESC]: 'Left forearm circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: '3e3d0d91-3280-491d-967e-d56dcfc51520', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Left Thigh',
              [Field.DESC]: 'Left thigh circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: '0090f468-5917-4124-98bd-1e7711ab360e', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Neck',
              [Field.DESC]: 'Neck circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: '9fddbad2-ba89-4476-95e4-10d9969e782c', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Right Bicep',
              [Field.DESC]: 'Right bicep circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: '0ee16da1-3c8d-48fc-9af1-41ec09cf6317', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Right Calf',
              [Field.DESC]: 'Right calf circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: 'fa4c25c7-e1d5-48bf-975a-4fdfd2305646', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Right Forearm',
              [Field.DESC]: 'Right forearm circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: '843c6b0f-ce23-4468-9d67-dd1af076b10a', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Right Thigh',
              [Field.DESC]: 'Right thigh circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: '222452a2-aa29-460e-85a8-4617092d1ba5', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Shoulders',
              [Field.DESC]: 'Shoulder circumference in inches.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
            {
              [Field.ID]: 'ed12d669-cffd-45f7-802c-9025426341fa', // From Fitness Tracker v16
              [Field.TIMESTAMP]: now,
              [Field.NAME]: 'Waist',
              [Field.DESC]: 'Waist circumference in inches at the belly button.',
              [Field.FAVORITED]: false,
              [Field.ENABLED]: true,
              [Field.MEASUREMENT_INPUT]: MeasurementInput.INCHES,
            } as Measurement,
          ]

          await DB.importRecords(Type.MEASUREMENT, measurements)

          log.info('Standard Measurements added', { newMeasurements: measurements?.length ?? 0 })
        } catch (error) {
          log.error('Error adding Standard Measurements', error)
        }
      }
    )
  }

  return {
    onAddBarbellStrengthWorkouts,
    onAddStretchRoutine,
    onAddCarpalTunnelRoutine,
    onAddDeepBreathingRoutine,
    onAddStandardMeasurements,
  }
}
