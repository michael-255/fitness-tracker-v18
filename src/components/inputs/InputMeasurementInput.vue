<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { type Field, MeasurementInput } from '@/types/database'
import type { MixedSchema } from 'yup'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'

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

    const inputs = Object.values(MeasurementInput)

    // Build select box options
    options.value = inputs.map((i: MeasurementInput) => ({
      value: i,
      label: i,
    }))
  } catch (error) {
    log.error('Error with input: measurement input', error)
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
