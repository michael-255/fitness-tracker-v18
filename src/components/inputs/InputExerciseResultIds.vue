<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { type Field, type ExerciseResult, Type } from '@/types/database'
import type { ObjectSchema } from 'yup'
import { truncateString } from '@/utils/common'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/Database'

const props = defineProps<{
  field: Field
  label: string
  desc: string
  getDefault: () => any
  validator: ObjectSchema<any, any, any>
  validationMessage: string
}>()

const { log } = useLogger()
const actionStore = useActionStore()

const options: Ref<any[]> = ref([])

onMounted(async () => {
  try {
    actionStore.record[props.field] = actionStore.record[props.field] ?? props.getDefault()

    const records = (await DB.getChildrenByType(Type.EXERCISE)) as ExerciseResult[]

    options.value = records.map((r: ExerciseResult) => ({
      value: r.id,
      label: truncateString(r.id, 8, '*'),
    }))
  } catch (error) {
    log.error('Error with input: exercise result ids', error)
  }
})

function validationRule() {
  return async (val: string) => (await props.validator.isValid(val)) || props.validationMessage
}
</script>

<template>
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
