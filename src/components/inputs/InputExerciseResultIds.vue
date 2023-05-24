<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { type Field, type ExerciseResult, Type } from '@/types/database'
import type { MixedSchema } from 'yup'
import { truncateString } from '@/utils/common'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'

// Props & Emits
const props = defineProps<{
  field: Field
  label: string
  desc: string
  getDefault: () => any
  validator: MixedSchema<any, any, any>
  validationMessage: string
}>()

// Composables & Stores
const { log } = useLogger()
const actionStore = useActionStore()

// Data
const options: Ref<any[]> = ref([])

onMounted(async () => {
  try {
    actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()

    const records = (await DB.getAll(Type.EXERCISE_RESULT)) as ExerciseResult[]

    // Build select box options
    options.value = records.map((r: ExerciseResult) => ({
      value: r.id,
      label: truncateString(r.id, 8, '*'), // Truncate id for readability
    }))
  } catch (error) {
    log.error('Error with input: exercise result ids', error)
  }
})

/**
 * Input validation rule for the template component.
 */
function validationRule() {
  return async (val: string) => (await props.validator.isValid(val)) || props.validationMessage
}
</script>

<template>
  <!-- Always shown so the user knows what Parent record they a making a Child record for -->
  <QCard>
    <QCardSection>
      <p class="text-h6">{{ label }}</p>

      <p>{{ desc }}</p>

      <QSelect
        v-model="actionStore.record[field]"
        :rules="[validationRule()]"
        :options="options"
        lazy-rules
        counter
        multiple
        emit-value
        map-options
        options-dense
        dense
        outlined
        color="primary"
      />
    </QCardSection>
  </QCard>
</template>
